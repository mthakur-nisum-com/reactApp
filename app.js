var express = require('express'),
    bodyParser = require('body-parser'),
    validator = require('express-validator'),
    passwordHash = require('password-hash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    Promise = require('node-promise').Promise,
    fs = require('fs'),
    privateKey = fs.readFileSync('./certificates/key.pem').toString(),
    certificate = fs.readFileSync('./certificates/cert.pem').toString(),
    path = require('path'),
    app = express(),
    checkConnection = false,
    nodemailer = require("nodemailer"),
    https = require('https'),
    https = https.createServer({
        key: privateKey,
        cert: certificate
    }, app),
    io = require('socket.io')(https),
    email = null,
    status = 0,
    ActionEvents = require('./public/js/Actions/ActionEvents'),
    database = require('./database/databaseConnection'),
    UserObj = {},
    responseObj = {},
    isResolved = false,
    promiseObject = new Promise(),
    multer = require('multer'),
    userId, date = new Date(),
    /*chatshareteam@gmail.com*/
    emailConfig = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "chatshareteam@gmail.com",
            pass: "Killerneedsit"
        }
    });
app.engine('.html', require('ejs').__express);
app.use(session({
    secret: 'appsecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 5 * 60 * 1000,
        activeDuration: 5 * 60 * 1000
    }
}));
app.use(multer({
    dest: './public/images/uploads'
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'html'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(validator());

app.set('view engine', 'html');
app.get('/', function(req, res) {
    res.render('main.html');
});

app.post('/login', function(req, res) {
    var paramName,
        keys = Object.keys(req.body),
        responseObj = new Object();
    for (var i = 0; i < keys.length; i++) {
        paramName = keys[i];
        req.checkBody(paramName, 'please enter the ' + paramName + '').notEmpty();
        if (paramName === "userName") {
            req.checkBody(paramName, 'please enter the valid email ').notEmpty().isEmail();
        }
    }
    var error = req.validationErrors();
    if (error.length > 0) {
        responseObj.globalMessage = "please the enter require fields";
        responseObj.error = error;
    } else {
        UserObj = {
            "updateUserDetails": function(response) {
                ActionEvents.removeListener('updateEvent', UserObj.updateUserDetails);
                for (var key in response.userList[0]) {
                    if (key === "userEmail") {
                        responseObj[key] = response.userList[0].userEmail;
                    }
                    if (key === "status") {
                        if (response.userList[0].status) {
                            responseObj["loggedIn"] = true;
                            responseObj[key] = true;
                        } else {
                            responseObj.loggedIn = false;
                            responseObj[key] = false;
                        }
                    }
                    if (key === "chatName") {
                        responseObj[key] = response.userList[0].chatName;
                    }
                    if (key === "userName") {
                        responseObj[key] = response.userList[0].userName;
                    }
                    if (key === "userID") {
                        responseObj[key] = response.userList[0].userID;
                    }
                }
                 resolveObject(res,{responseObj:responseObj});
            },
            "findUser": function(response) {
                ActionEvents.removeListener('loginEvent', UserObj.findUser);
                if (response.userList.length) {
                    ActionEvents.removeListener('loginEvent', UserObj.findUser);
                    database.setQuery("UPDATE userdetails SET status = '1' WHERE userEmail='" + response.userList[0].userEmail + "' AND userID='" + response.userList[0].userID + "'");
                    database.executeQuery();
                    ActionEvents.addListeners('updateEvent', UserObj.updateUserDetails);
                    database.setQuery("select * from userdetails where userEmail = '" + req.body.username + "'");
                    database.executeQuery('updateEvent');
                    //
                } else {
                    responseObj.error = {
                        "message": 'Oops ! something went wrong... please enter your details correctly and try again!!'
                    };
                    resolveObject(res,{responseObj:responseObj});
                }
            
            }
        }
        ActionEvents.addListeners('loginEvent', UserObj.findUser);
        database.setQuery("select * from userdetails where userEmail = '" + req.body.username + "' AND password ='" + req.body.password + "'");
        database.executeQuery('loginEvent');
    }

});
app.post('/searchUser', function(req, res) {
    var tempObj;
    responseObj={
        userObj:[]
    };
    var UserObj = {
        'getUserDetailsList':function(response) {
           ActionEvents.removeListener('searchEvent', UserObj.getUserDetailsList);
              if(response.userList.length) {
                for(var i in response.userList) {
                    obj = new Object();
                     tempObj= response.userList[i];
                      for(var key in tempObj) {
                         if(key === "userName") {
                            obj[key] = tempObj[key];
                         }
                          if(key === "chatName") {
                             obj[key] = tempObj[key];
                          }
                      }
                      responseObj.userObj.push(obj);
                }
                //console.log(responseObj);
                resolveObject(res,responseObj);
              }
           
        }
    };
    ActionEvents.addListeners('searchEvent', UserObj.getUserDetailsList);
    database.setQuery("select * from userdetails where userName LIKE  '%" + req.body.searchText + "%'");
    database.executeQuery('searchEvent');
});
io.on('connection', function(socket) {
    socket.on('chatMessage', function(from, to, fromUserId, toUserId, msg) {
        /* console.log('from'+from)
        console.log('to'+to)
        console.log('userId'+userId)*/
        io.emit('chatMessage' + fromUserId + '', from, to, fromUserId, toUserId, msg);
        console.log(fromUserId + "" + toUserId);
        io.emit('chatMessage' + toUserId + '', from, to, fromUserId, toUserId, msg);
    });
    socket.on('notifyUser', function(user) {
        io.emit('notifyUser', user);
    });
    socket.on('createSocket', function(from) {
        io.emit('createSocket', true);
    });
    socket.on('callUser',function(fromUser,toUser){
        console.log('calling')
         console.log(fromUser+toUser)
        io.emit('callUser' + fromUser + '', fromUser, toUser);
        io.emit('callUser' + toUser + '',fromUser,toUser);
    });
});
app.post('/register', function(req, response) {
    var paramName,
        obj;
    responseObj = new Object();
    console.log(req.files);
    keys = Object.keys(req.body), error = [];
    for (var i = 0; i < keys.length; i++) {
        paramName = keys[i];
        req.checkBody(paramName, 'please enter the ' + paramName + '').notEmpty();
    }
    error = req.validationErrors();
    if (error.length > 0) {
        responseObj.globalMessage = "please the enter require fields";
        responseObj.error = error;
        resolveObject(response,responseObj);
    } else {
        UserObj = {
            "getUserInformation": function(resObj) {
                console.log(resObj)
                ActionEvents.removeListener('selectEvent', UserObj.getUserInformation);
                if (resObj.status) {
                    console.log(resObj.userList.length);
                    if (resObj.userList.length) {
                        for (var keys in resObj.userList[0]) {
                            if (keys === "userEmail") {
                                responseObj[keys] = resObj.userList[0].userEmail;
                            }
                            if (keys === "userName") {
                                responseObj[keys] = resObj.userList[0].userName;
                            }
                            if (keys === "chatName") {
                                responseObj[keys] = resObj.userList[0].chatName;
                            }
                            if (keys === "status") {
                                responseObj[keys] = resObj.userList[0].status;
                            }
                            if (keys === "userID") {
                                responseObj[keys] = response.userList[0].userID;
                            }
                        }
                        responseObj["isNewUser"] = true;
                        responseObj['loggedIn'] = true;
                        responseObj["msessage"] = null;
                        resolveObject(response,responseObj);
                    }
                }
            },
            "registerUserDetails": function(resObj) {
                ActionEvents.removeListener('insertRecord', UserObj.registerUserDetails);
                if (resObj.status) {
                    if (resObj.userList.affectedRows === 1) {
                        ActionEvents.addListeners('selectEvent', UserObj.getUserInformation);
                        database.setQuery("select * from userdetails where userEmail = '" + req.body.email + "'");
                        database.executeQuery('selectEvent');
                    } else {}
                }
            },
            "isUserIdExists": function(resObj) {
                ActionEvents.removeListener('selectEvent', UserObj.isUserIdExists);
                if (resObj.status) {
                    if (resObj.userList.length === 0) {
                        ActionEvents.addListeners('insertRecord', UserObj.registerUserDetails);
                        database.setQuery('insert into `profiles`.`userdetails` (`userEmail`, `userID`, `userName`, `firstName`, `lastName`, `chatName`, `password`, `encryptPassword`, `status`, `date`) values(' + "'" + req.body.email + "'" + "," + "'" + userId + "'" + "," + "'" + req.body.firstName + " " + req.body.lastName + "'" + "," + "'" + req.body.firstName + "'" + "," + "'" + req.body.lastName + "'" + "," + "'" + req.body.firstName + "" + req.body.lastName + "" + userId + "'" + "," + "'" + req.body.password + "'" + "," + "'" + generateEncryptPassword(req.body.password) + "'" + "," + "'" + 1 + "'" + "," + "'" + date + "'" + ')');
                        database.executeQuery('insertRecord');
                    }
                    /*else {
                        userId = generateUserId();
                        finduserDetails(userId);
                    }*/
                } else {
                    responseObj = {
                        msessage: 'Oops!!! something went wrong try after some time buddy',
                        codeType: 'system_error',
                        messageTye: 'warning',
                        isNewUser: false
                    };
                    resolveObject(response,responseObj);
                }
            },
            "isUserEmailExists": function(resObj) {
                ActionEvents.removeListener('selectEvent', UserObj.isUserEmailExists);
                if (resObj.status) {
                    if (resObj.userList.length) {
                        responseObj = {
                            message: 'Oops!!! your email id already with me try to login or change your email address',
                            codeType: 'user_error',
                            messageTye: 'error'
                        }
                        resolveObject(response,responseObj);
                    } else {
                        userId = generateUserId();
                        finduserDetails(userId);
                    }
                }
            }
        };
        ActionEvents.addListeners('selectEvent', UserObj.isUserEmailExists);
        database.setQuery("select * from userdetails where userEmail = '" + req.body.email + "'");
        database.executeQuery('selectEvent');
    }
});
app.post('/getUserList', function(request, response) {
    responseObj = {
        userList: []
    };
    UserObj = {
        userList: [],
        "processUserList": function(res) {
            ActionEvents.removeListener('updateEvent', UserObj.processUserList);
            if (res.status) {
                console.log(res);
                for (var i = 0; i < res.userList.length; i++) {
                    obj = new Object();
                    if (res.userList[i].userEmail) {
                        obj.email = res.userList[i].userEmail
                    }
                    if (res.userList[i].status === 1) {
                        obj.status = true;
                    }
                    if (res.userList[i].status === 0) {
                        obj.status = false;
                    }

                    if (res.userList[i].chatName) {
                        obj.chatName = res.userList[i].chatName;
                    }
                    if (res.userList[i].userName) {
                        obj.userName = res.userList[i].userName;
                    }
                    if (res.userList[i].userID) {
                        obj.userID = res.userList[i].userID;
                    }
                    responseObj.userList.push(obj);
                }
                resolveObject(response,responseObj);
            } else {
                resolveObject(response,responseObj);
            }
        }
    };
    database.connectToDatabse();
    database.setQuery("SELECT * from userdetails");
    ActionEvents.addListeners('updateEvent', UserObj.processUserList);
    database.executeQuery('updateEvent');
});
app.post('/getUserDetails', function(req, res) {
    responseObj = {};
    UserObj = {
        "getUserDetails": function(resObj) {
            ActionEvents.removeListener('updateEvent', UserObj.getUserDetails);
            for (var keys in resObj.userList[0]) {
                if (keys !== "userName" && keys !== "userID" && keys !== "chatName" && keys !== "encryptPassword" && keys !== "status" && keys !== "date") {
                    if (keys === "firstName")
                        responseObj[keys] = resObj.userList[0].firstName
                    if (keys === "lastName")
                        responseObj[keys] = resObj.userList[0].lastName
                    if (keys === "password")
                        responseObj[keys] = resObj.userList[0].password
                    if (keys === "userEmail")
                        responseObj[keys] = resObj.userList[0].userEmail
                }

            }
            res.send({
                responseObj: responseObj
            })

        }
    };
    database.setQuery("select * from userdetails where userEmail = '" + req.body.userEmail + "'");
    ActionEvents.addListeners('updateEvent', UserObj.getUserDetails);
    database.executeQuery('updateEvent');
});
app.post('/sendEmail', function(req, res) {
    var mailConfig = {
        to: req.body.toEmail.split(','),
        subject: 'From User ' + req.body.fromUser + '' + req.body.emailSubject,
        text: req.body.emailBody
    }
    emailConfig.sendMail(mailConfig, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

function getStatus(obj) {
    checkConnection = obj.status;
    console.log(obj.message + " " + obj.status);
}

function finduserDetails(userId) {
    ActionEvents.addListeners('selectEvent', UserObj.isUserIdExists);
    database.setQuery("select * from userdetails where userID = '" + userId + "'");
    database.executeQuery('selectEvent');
}

function generateUserId() {
    return Math.floor(Math.random() * 10000000);
}

function resolveObject(response,params) {
    
    if (isResolved) {
        promiseObject = new Promise();
    }
    isResolved = true;
    promiseObject.resolve(params);
    promiseObject.then(function(obj) {
        console.log(params);
        response.send(obj);
    });
}

function generateEncryptPassword(password) {
    return passwordHash.generate(password);
}
var port = process.env.PORT || 9090;
console.log('listening to port ' + port)
https.listen(port);