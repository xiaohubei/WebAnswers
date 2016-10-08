var url = require('url');
var os = require('os');
var fs = require('fs');
var path = require('path');
var async = require('async');
var xml2js = require('xml2js');
var conf = require('../common/conf');
var log = require('../logger/log');
var mkdirp = require('mkdirp');

var _cb = require('../common/cube');
var _runner = require('../tplengine/runner');
var commonTplDict = {
    header:null,
    footer:null
};

var preloadCommonTpl = function (callback){
    _runner.preloadCommonTpl(commonTplDict)
    if(typeof callback == 'function') callback();
};
preloadCommonTpl();
var renderTemplate = function (req, res, params){
    if(!commonTplDict.header ||  conf.isDebugMode ) preloadCommonTpl();
    var urlPath = url.parse(req.url).path;
    log.logger.info('开始页面加载：' + urlPath, 'communication.renderTemplate');
    var htmlPath = getHtmlPath(params);
    var callback = function (err, result) {
        if(err){
            _cb.webserver.application.renderError(res, err) 
        }else{
            if(!commonTplDict.header){
                preloadCommonTpl(function (){
                    renderTemplateInner(res, result);
                })
            }else{
                renderTemplateInner(res, result);
            }
        }
        log.logger.info('开始页面加载完成');
    };
    var self = this;
    fs.exists(htmlPath, function (exists) {
        if (exists) {
            fs.readFile(htmlPath, 'utf-8', function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, result);
                //self.isBusy = false;
            });
        } else {
            callback(htmlPath + ' not exists');
        }
    });
};

var renderTemplateInner = function (res, result){
    var hasHeader = result.indexOf('<header></header>') !== -1;
    var hasFooter = result.indexOf('<footer></footer>') !== -1;
    if(hasHeader) result = result.replace('<header></header>',commonTplDict.header);
    if(hasFooter) result = result.replace('<footer></footer>',commonTplDict.footer);
    res.end(result.html ? result.html : result);
};

var getHtmlPath = function (params){
    var path = params.subroute ? 
            conf.rootPath + '/views/'  + params.route + '/' + params.subroute 
            : conf.rootPath + '/'  + params.route;
    return  path + '.html';
};

var redirectService = function (req, res, isBatch, callback) {
    isBatch ? _cb.webserver.application.batchService(req, res) : _cb.webserver.application.doService(req, res, callback);
};


if (typeof exports !== "undefined") {
    module.exports = {
    	renderTemplate : renderTemplate,
    	redirectService : redirectService
    }
}
