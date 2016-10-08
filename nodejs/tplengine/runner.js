var fs = require('fs');
var path = require('path');
var async = require('async');
var conf = require('../common/conf');
var _cb = require('../common/cube');

var runner = {};
var generator = {};
var preloadCommonTpl = function (commonTplDict){
	if(!commonTplDict.header || conf.isDebugMode){
		generator.readHtml("header", function (err, result){
			if(err)return;
			commonTplDict.header = result;
		});
	};
	if(!commonTplDict.footer || conf.isDebugMode){
		generator.readHtml("footer", function (err, result){
			if(err)return;
			commonTplDict.footer = result;
		});
	};
};

generator.readHtml = function (tpl, callback){
    var self = this;
    var htmlPath = this.getWidgetsPath(tpl);
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

generator.getWidgetsPath = function (tpl){
	return conf.rootPath + '/widgets/' + tpl + '.html';
};

if (typeof exports !== "undefined") {
	module.exports = {
		preloadCommonTpl : preloadCommonTpl
	};
};
