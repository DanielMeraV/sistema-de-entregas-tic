const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdf.controller");

router.post('/generate-pdf', pdfController.generatePDFController);

module.exports = router;