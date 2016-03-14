var mysql = require('mysql');
var ActionEvents = require('./../public/js/Actions/ActionEvents'),count=0;
var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'profiles'
    }),
    query = null;
var checkStatus;
module.exports = {
    setStatus: function(check) {
        this.checkStatus = check;
    },
    connectToDatabse: function(callback) {
        var obj = {};
        connection.connect(function(error, db) {
            if (error) {
                obj = {
                    message: error,
                    status: false
                }
                this.checkStatus = false;
                //connection.prototype.apply('connected',false);
                //this.setStatus(false);
            } else {
                obj = {
                    message: 'connected to database ' + connection.config.database,
                    status: true
                };
            }
            if (callback) {
                callback.call(this, obj);
            }

        });
    },
    setQuery: function(query) {
        this.query = query;
    },
    getQuery: function() {
        return this.query;
    },
    executeQuery: function(eventType, callback) {
        var resultObj = {};
        console.log(this.getQuery())
        connection.query(this.getQuery(), function(err, rows, fields) {
            if (!err) {
                resultObj.userList = rows;
                resultObj.status = true;
                if (eventType) {
                     ActionEvents.updateCallBack(eventType,resultObj);
                     return;
                }
                if(callback) {
                	callback.call(this,resultObj)
                	return;
                }
            } else {
                if (callback) {
                    callback.call(this, err);
                    return;
                }
                resultObj = err;
                resultObj.userList=[];
                resultObj.status = false;
                if (eventType) {
                   ActionEvents.updateCallBack(eventType,resultObj);
                    return;
                }
            }

        });
    },
    endConnection: function() {
        connection.end();
    },
    checkConnection: function() {
        return this.checkStatus;
    }
};