const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const ManifestoService = require("./manifesto.service");
const { errorResponse, notFoundResponse } = require("../lib/utils/responseHandler");

async function generatePDF(template, id) {
    // Validación con errorResponse
    if (!template || !id) {
        throw errorResponse("Plantilla e ID son requeridos.", 400);
    }

    let data;

    switch (template) {
        case "manifesto":
            const manifestoResponse = await ManifestoService.findById(id);
            
            // Usar notFoundResponse
            if (manifestoResponse.status !== 200) {
                throw notFoundResponse(manifestoResponse.message || "Manifiesto no encontrado.");
            }

            data = formatManifestoData(manifestoResponse.data);
            break;

        default:
            throw errorResponse("Plantilla no válida.", 400);  // Error genérico
    }

    const pdfPath = path.join(__dirname, "../temp.pdf");
    const htmlContent = loadTemplate(template, data);

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "load" });
        await page.pdf({ path: pdfPath, format: "A4" });
        await browser.close();
    } catch (err) {
        throw errorResponse("Error al generar el PDF: " + err.message);  // Error de Puppeteer
    }

    return pdfPath;
}

function loadTemplate(templateName, data) {
    const templatePath = path.join(__dirname, `../lib/templates/${templateName}.html`);
    let template = fs.readFileSync(templatePath, "utf8");
    Object.keys(data).forEach((key) => {
        template = template.replace(new RegExp(`{{${key}}}`, "g"), data[key]);
    });
    return template;
}

function deletePDF(pdfPath) {
    fs.unlink(pdfPath, (err) => {
        if (err) console.error("Error al borrar el PDF:", err);
    });
}

function formatManifestoData(manifesto) {
    // Validación con errorResponse
    if (!manifesto.orders || !Array.isArray(manifesto.orders)) {
        throw errorResponse("El manifiesto no tiene órdenes válidas.", 400);
    }

    // Validación de matrícula
    if (!manifesto.truck?.licensePlate) {
        throw errorResponse("El camión no tiene matrícula registrada.", 400);
    }

    const orders = manifesto.orders
        .map((order) => `
            <tr>
                <td>${order.id}</td>
                <td>${order.senderId}</td>
                <td>${order.receiverId}</td>
                <td>${order.totalPackages}</td>
            </tr>
        `)
        .join("");

    return {
        id: manifesto.id,
        truck: manifesto.truck.licensePlate,
        assignmentDate: manifesto.assignmentDate,
        orders,
    };
}

module.exports = { generatePDF, deletePDF };