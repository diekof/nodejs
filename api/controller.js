'use strict';

const html_to_pdf = require('html-pdf-node');
const fs = require('fs');

var properties = require('../package.json')

var controllers = {
    about: function (req, res) {
        var aboutInfo = {
            name: properties.name,
            version: properties.version
        }
        res.json(aboutInfo);
    },
    convertHtmlToPdf: function (req, res) {        
        
        let file = { content: "<h1>HTML to PDF convert</h1>" };
        html_to_pdf.generatePdf(file, options)
            .then((re) => {
                res.status(200).send({
                    isSuccess: true,
                })
            }).catch((err) => {
                res.status(200).send({
                    isSuccess: false,
                    error: err
                })
            });
    },
    convertHtmlPdfPost: function(req,res){
        const nomeArquivo = req.body.nome_arquivo ? req.body.nome_arquivo : 'pdf/convert.pdf';
        let options = { format: 'A4', path: nomeArquivo, displayHeaderFooter: true, headerTemplate: 'teste - cabecalho', footerTemplate: 'teste - rodape' };
        let file = { content: req.body.conteudo };
        
        html_to_pdf.generatePdf(file, options)
            .then((re) => {
                var bitmap = fs.readFileSync(nomeArquivo);

                // Create a buffer from the string and return the results
                var vase64= new Buffer.from(bitmap).toString('base64');

                // res.status(200).download(nomeArquivo)
                res.status(200).send({base64: vase64,filename:nomeArquivo})
            }).catch((err) => {
                res.status(200).send({
                    isSuccess: false,
                    error: err
                })
            });        
    }
};

module.exports = controllers;