// Handler para respuestas exitosas
function successResponse(data = null, message = null) {
    return {
        status: 200,
        data: data || message,
    };
}

// Handler para respuestas con error
function errorResponse(message, statusCode = 500) {
    return {
        status: statusCode,
        message,
    };
}

// Handler para "No encontrado"
function notFoundResponse(message) {
    return {
        status: 404,
        message,
    };
}

// Handler para "Sin contenido"
function noContentResponse() {
    return {
        status: 204,
    };
}

module.exports = { successResponse, errorResponse, notFoundResponse, noContentResponse };