'use strict';
const cors = require('cors');
const controller = require('./controller');
const bodyParser = require("body-parser");

module.exports = function (app) {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.route('/about')
        .get(controller.about);
    app.route('/htmltopdf')
        .get(controller.convertHtmlToPdf);
    app.route('/convert/pdf')
        .post(controller.convertHtmlPdfPost)
};