var io = require('socket.io');
var urlObj = require('url');
var http = require('http');

var _sio;
var _captureConsole = false;
var _unhookConsole;
var _latestLogs = [];
var _logSocketNS = "/_logs_";

function hook_stdout(stdoutcallback, stderrcallback) {
    var old_stdout_write = process.stdout.write;
    var old_stderr_write = process.stderr.write;
 
    process.stdout.write = (function(write) {
        return function(string, encoding, fd) {
            write.apply(process.stdout, arguments);
            stdoutcallback(string, encoding, fd);
        }
    })(process.stdout.write);
 
    process.stderr.write = (function(write) {
        return function(string, encoding, fd) {
            write.apply(process.stderr, arguments);
            stderrcallback(string, encoding, fd);
        }
    })(process.stderr.write);

    return function() {
        process.stdout.write = old_stdout_write;
        process.stderr.write = old_stderr_write;
    }
}

function consoleStdoutCallback(message, encoding, fd){
    internalLog(message, "console", "I");
}

function consoleStderrCallback(message, encoding, fd){
    internalLog(message, "console", "E");
}

function internalLog(message, source, level){
    var date = new Date().toISOString();// moment.utc().format("MM-DD-YYYY HH:mm:ss");
    var output = { date: date, message: message, source: source, level: level };
    
    if(_latestLogs.length >= logger.historyCount) {
        _latestLogs.pop();
    }
    
    _latestLogs.unshift(output);
    
    sio.of(_logSocketNS).emit('log_data', output);
    
    if(logger.externalLogURL) {
        var replacedURL = logger.externalLogURL.replace("{message}", message);
        replacedURL = replacedURL.replace("{date}", date);
        replacedURL = replacedURL.replace("{source}", source);
        replacedURL = replacedURL.replace("{level}", level);
        
        var url = urlObj.parse(replacedURL);
        var options = {
            host : url.hostname,
            path : url.path                        
        }
        
        http.get(options, function(res){
           //message sent 
        });
    }
};

var logger = {
    historyCount: 10,
    externalLogURL : undefined,
    init: function(server, captureConsole, historyCount){
        sio = io.listen(server);
        sio.set('log level', 1); 
        sio.of(_logSocketNS).emit('log_start');

        logger.historyCount = historyCount || logger.historyCount;

        if(captureConsole){
            logger.enableCaptureConsole(captureConsole);
        }
    },
    log: internalLog,
    add: function(req, resp){
        var msg = req.query.message;
        var source = req.query.source;
        var level = req.query.level;
        
        internalLog(msg, source || 'unknown', level || 'I');
        
        resp.end("OK");
    },
    view: function(req, resp){
        resp.render('log.html', 
        {
            logHistory : _latestLogs,
            requestURL: req.protocol + "://" + req.get('host'), 
            logSocketNS : _logSocketNS
        });
    },
    clear: function(req, resp){
        _latestLogs =  [];
        resp.end("OK");
    },
    test: function(req, res){
        internalLog("Direct log information", "web", "I");
        internalLog("Direct log warning", "web", "W");
        internalLog("Direct log information", "web", "I");
        internalLog("Direct log error", "web", "E");
        console.log("Console log");
        console.error("Console error");
        res.end("OK");
    },
    enableCaptureConsole: function(enable){
        if(enable && !_captureConsole) {
             _unhookConsole = hook_stdout(consoleStdoutCallback, consoleStderrCallback);
            _captureConsole = true;
        }
        else if(_captureConsole) {
            _unhookConsole();
            _captureConsole = false;           
        }
    },
};

module.exports = logger;

