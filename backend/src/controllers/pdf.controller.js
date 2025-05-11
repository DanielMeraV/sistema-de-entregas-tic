// controllers/pdfController.js
const PDFService = require("../services/pdf.service");

async function generatePDFController(req, res) {
    try {
        const { template, id } = req.body;
        
        // Llamada al servicio para generar el PDF (toda la lógica está aquí)
        const pdfPath = await PDFService.generatePDF(template, id);

        // Enviar el PDF como respuesta
        res.download(pdfPath, "documento.pdf", (err) => {
            if (err) console.error("Error al enviar el archivo:", err);
            PDFService.deletePDF(pdfPath); // Eliminar el archivo
        });

    } catch (error) {
        // Manejo de errores (el servicio lanza errores con status y message)
        res.status(error.status || 500).send(error.message || "Error interno.");
    }
}

module.exports = { generatePDFController };