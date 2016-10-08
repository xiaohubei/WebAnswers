var url = require('url');

var express = require('express');
var router = express.Router();

var conf = require('../common/conf');
var log = require('../logger/log');
var cb = require('../common/cube');
var communication = require('./communication');
//var mockData = require('../mockdata/MockData');
var urlencoded = require('body-parser').urlencoded({ extended: false });
//var currentProject = "views/";

router.get('/', function (req, res) {
    communication.renderTemplate(req, res, { route: 'index'});
});

router.get('/index', function (req, res) {
    communication.renderTemplate(req, res, { route: 'index'});
});

router.get('/demo/:subroute', function (req, res) {
    var subroute = req.params['subroute'];
    communication.renderTemplate(req, res, { route: 'demo', subroute: subroute });
});

router.all('*', function (req, res, next) {
    var contentType = req.header('content-type');
    var isService = contentType && contentType.indexOf('application/json') !== -1;
    if (isService) {
        communication.redirectService(req, res);
        return;
    }
    next();
    return;
});


if (typeof exports !== "undefined") {
    module.exports = router;
}