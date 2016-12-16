'use strict'

const Model = require('./mongoConnection.js').Account;
const crypto = require('crypto');

const salt = "absghkfdlrlkfjhsdfskjffhefglsfdhfghdgdf";

function md5Hash(pass) {
  return crypto.createHash('md5').update(pass).digest('hex');
}

function saltAndHash(pass) {
  return salt + md5Hash(pass + salt)
}

function validatePassword(plainPass, hashedPass, cb) {
  var validHash = saltAndHash(plainPass);
  return hashedPass === validHash;
}

exports.getByEmail = (email, cb) => {
  Model.findOne({ email: email }, (err, doc) => {
    if (err)
      cb(err, null);
    else
      cb(null, doc);
  });
}

exports.autoLogin = (email, hashedPass, cb) => {
  Model.findOne({ email: email }, (err, doc) => {
    if (err)
      cb(err, null);
    else if (doc.password == hashedPass)
      cb(null, doc);
    else
      cb("not correct email ro password", null);
  });
}

exports.manualLogin = (emal, pass, cb) => {
  var hashedPass = saltAndHash(pass);
  exports.autoLogin(emal, hashedPass, cb);
}

exports.signUp = (email, pass, name, secondName, address, phone, cb) => {
  exports.getByEmail(email, (err, doc) => {
    if (!doc) {
      var account = Model({
        date: new Date().toISOString(),
        email: email,
        name: name,
        secondName: secondName,
        address: address,
        phone: phone,
        password: saltAndHash(pass)
      });

      account.save((err) => {
        if(err) 
          cb(err);
        else
          cb(null, account);  
      })
    } else {
      cb("email alredy used", null);
    }
  });
}
