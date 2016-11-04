var cb = {};

cb.eventUtil = {
    //添加事件处理函数
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = handler;
        }
    },

    //删除事件处理函数
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }
        else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = null;
        }
    },

    //获取事件
    getEvent: function (event) {
        return event ? event : window.event;
    },

    //获取事件目标
    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    //取消默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    },

    //取消冒泡
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            event.cancelBubble = true;
        }
    }
};
cb.domUtil = {
    addClass :function (elem, classN) {
        if (elem.className == "") { elem.className = classN; }
        else if (elem.className.match(new RegExp("(\\s|^)" + classN + "(\\s|$)"))) {
            elem.className = elem.className;
        }
        else { elem.className += " " + classN; }
    },
    removeClass: function (elem, classN) {
        if (elem.className.match(new RegExp("(\\s|^)" + classN + "(\\s|$)")))
            elem.className = elem.className.replace(new RegExp("(\\s|^)" + classN + "(\\s|$)"), " ");
    },
};
cb.cookieUtil = {
    setASCIICookie : function (sName, sValue, oExpires, sPath, sDomain, bSecure) {
        if ( "string" == typeof(sName) && "string" == typeof(sValue) ) {
            sValue = escape(sValue) ;
            this.setCookie(sName, sValue, oExpires, sPath, sDomain, bSecure) ;
        }
    },
    setUnicodeCookie : function (sName, sValue, oExpires, sPath, sDomain, bSecure) {
        if ( "string" == typeof(sName) && "string" == typeof(sValue) ) {
            sValue = encodeURIComponent(sValue) ;
            this.setCookie(sName, sValue, oExpires, sPath, sDomain, bSecure) ;
        }
    },
    setCookie : function (sName, sValue, oExpires, sPath, sDomain, bSecure) {
        if ( "string" == typeof(sName) && "string" == typeof(sValue) ) {
            var sCookie = sName + "=" + sValue ;
            if (oExpires) {
                sCookie += "; expires=" + oExpires.toGMTString() ;
            }
            if (sPath) {
                sCookie += "; path=" + sPath ;
            }
            if (sDomain) {
                sCookie += "; domain=" + sDomain ;
            }
            if (bSecure) {
                sCookie += "; secure" ;
            }
            document.cookie = sCookie ;
        }
    },
    getUnicodeCookie : function (sName) {
        var sValue = getCookie(sName) ;
        if ( "string" == typeof(sName) ) {
            var sEncVal = getCookie(sName) ;
            if (null == sEncVal) {
                return null ;
            } else {
                return decodeURIComponent(sEncVal) ;
            }
        } else {
            var sCookies = document.cookie ;
            return sCookies ;
        }
    },
    getASCIICookie : function (sName) {
        var sValue = getCookie(sName) ;
        if ( "string" == typeof(sName) ) {
            var sEncVal = getCookie(sName) ;
            if (null == sEncVal) {
                return null ;
            } else {
                return unescape(sEncVal) ;
            }
        } else {
            var sCookies = document.cookie ;
            return sCookies ;
        }
    },
    getCookie : function (sName) {
        var sCookies = document.cookie ;
        if ("string" == typeof(sName)) {
            var sRE = "(?:; )?"+sName+"=([^;]*);?" ;
            var reRE = new RegExp(sRE) ;
            if (reRE.test(sCookies)) {
                return RegExp["$1"] ;
            } else {
                return null ;
            }
        } else {
            return sCookies ;
        }
    },
    deleteCookie :function (sName, sPath, sDomain) {
        this.setCookie(sName, "", new Date(0), sPath, sDomain) ;
    } 
};
cb.util = {
    copyToClipboard : function (hrefId) {
        var txt = document.getElementById(hrefId).value;
        if(window.clipboardData) {
            window.clipboardData.setData("Text", txt);
        } else if(navigator.userAgent.indexOf("Opera") != -1) {
            window.location = txt;
        } else if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("当前浏览器不支持此功能，请按Ctrl+c复制！");
            }
            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if (!clip)
                return;
            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if (!trans)
                return;
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var len = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = txt;
            str.data = copytext;
            trans.setTransferData("text/unicode",str,copytext.length*2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip)
                return false;
            clip.setData(trans,null,clipid.kGlobalClipboard);

        } else {
            $('#' + hrefId).focus().select();
            document.execCommand('Copy', false, null);
        }
        alert("复制成功！");
    }
}
/**
 * @function：原型扩展
 * @description：基于对象原型扩展
 * @author：xingguojie@le.com 2016-11-03
*/
//解决ie8中数组不支持indexOf方法的问题
if(!Array.prototype.indexOf){
    Array.prototype.indexOf = function(elt){
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++){
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
};

Array.prototype.each = function(fun){
    if(typeof fun != "function")
        throw new Error("argumets should be a function object!");
    for(var i = 0,len = this.length;i<len;i++){
         fun.call(this,i,this[i]);
    }
};
Array.prototype.isIn = function(name){
    for(var i = 0 ,len = this.length; i < len; i++){
        if(this[i] == name)
            return true;
    }
    return false;
};
Array.prototype.isEmpty = function(){
    return this.length==0?true:false;
};

Array.prototype.index = function(item){
    for(var i = 0, len = this.length; i < len; i++){
        if(this[i] == item)
            return i;
    }
    return -1;
};

Array.prototype.del = function(ele){
    var index = this.index(ele);
    if(index != -1){
          this.splice(index,1);
    }
    return this;
};

Array.prototype.aUnique = function(arr){
    if(arr.constructor != Array)
        throw new Error('aUnique:argument error');
    var _result = [];
    for(var i = 0, len = arr.length; i < len; i++){
        if(!this.isIn(arr[i]))
            _result.push(arr[i]);
    }
    return _result;
};
Array.prototype.getIndex = function(arg){
    var isUrl = typeof(arg) == "string" && (arg.indexOf("http://") == 0 || arg.indexOf("https://") == 0 || arg.indexOf("//") == 0);
    for(var i = 0, len = this.length; i < len; i++){
        var url = this[i];
        if(isUrl && typeof(url) == "string" && (url.indexOf("http://") == 0 || url.indexOf("https://") == 0 || url.indexOf("//") == 0)){
            url = url.replace(/^http(s)?:/, "");
            arg = arg.replace(/^http(s)?:/, "");
        }
        if(url == arg)
            return i;
    }
    return -1;
    
};
Array.prototype.stringFormat = function(){
    for(var i =  0,len = this.length;i<len;i++){
        if(typeof this[i] == 'string'){
            this[i] = '"' + this[i] + '"';
        }else if(this[i] instanceof Array){
            this[i] = this[i].stringFormat();
        }else if(typeof this[i] == 'function'){
            this[i] = this[i];
        }
        else{
            this[i] = _jsonFormat(this[i]);
        }
    }
    return "["+this.join(",")+"]";

    function _jsonFormat(json){
        var substr = '{';
        for(var a in json){
            if(json.hasOwnProperty(a)){
                var pro = json[a];
                if(typeof pro == 'string'){
                    substr += a + ':"' + pro + '",';
                }
                else if(pro instanceof Array){
                    substr += a + ':' + pro.stringFormat() + ',';
                }
                else if(typeof pro == 'function'){
                    substr += a + ':' + pro + ',';
                }
                else{
                    substr += a + ':' + _jsonFormat(pro) + ',';
                }
            }
        }
        return substr.replace(/,$/,'') + '}';
    }
 };

/* 给数组原型绑定each方法，用在banner增加和移除css */
Array.prototype.jBannerEach = function(fun){
    if(typeof fun != "function")
        throw new Error("Array:each argument error!");
    for(var i = 0,len = this.length;i<len;i++){
        fun.call(this,i,this[i]);
    }
};
/*区间删除*/
String.prototype.subDelete = function(startIndex,endIndex){
    if(!startIndex)
        throw new Error("subDelete is no-use!");
    if(!endIndex) return this.slice(startIndex);
    var str = this;
    return this.slice(0,startIndex).concat(this.slice(endIndex));
};
String.prototype.ltrim = function(){
    return this.replace(/(^s*)/g, "");
};
String.prototype.rtrim = function(){
    return this.replace(/(s*$)/g, "");
};
String.prototype.trim = function(){
    return this.rtrim(this.ltrim());
};

/**全局替换字符**/
String.prototype.replaceAll=function(oldStr,newStr){
    return this.replace(new RegExp(oldStr,"gm"),newStr);
};
String.prototype.getQuery = function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),
        r = this.substr(this.indexOf("\?")+1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
};
String.prototype.trim = function(isGlobal){
    var result; 
    
    result = this.replace(/(^\s+)|(\s+$)/g,"");
    
    if(isGlobal){
        result = result.replace(/\s/g,"");
    }
    return result;
};
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
