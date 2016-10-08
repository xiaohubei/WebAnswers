var path = require('path');

var parseUrl = function (url) {
    if (!url) return url;
    if (url.substr(url.length - 1, 1) === '/')
        url = url.substr(0, url.length - 1);
    return url;
};

var rootPath = path.dirname(path.dirname(__dirname));
var currentPort = process.env.PORT;
var serviceBaseUrl = parseUrl(process.env.SERVICE);
var imageServerUrl = parseUrl(process.env.IMAGE);
var needCompress = process.env.MODE !== 'debug' && process.env.ZIP === 'true' ? true : false;
var needPatch = process.env.PATCH === 'true' ? true : false;
debugger;
var isDebugMode = process.env.MODE === 'debug' ? true : false;

module.exports = {
    rootPath: rootPath,
    currentPort: currentPort,
    serviceBaseUrl: serviceBaseUrl,
    imageServerUrl: imageServerUrl,
    needCompress: needCompress,
    needPatch: needPatch,
    isDebugMode: isDebugMode,
};