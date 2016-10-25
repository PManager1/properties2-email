'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),  
  Property = mongoose.model('Property'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  nodemailer = require('nodemailer'),
  config = require(path.resolve('./config/config')),
  async = require('async'),
  crypto = require('crypto');  
  
var smtpTransport = nodemailer.createTransport(config.mailer.options);

  // colors = require('colors'); 



/**
 * sendEmailToSelectedProperties sendEmailToSelectedProperties
 */

 /*
exports.ssendEmailToSelectedProperties = function (req, res) {


  console.log( ' inside the server  exports.sendEmailToSelectedProperties 27'); 
  // console.log( ' I have user here ', user); 

            var PathRenderer =   path.resolve('modules/users/server/templates/reset-password-email'); 
                console.log( ' PathRenderer 65  = ', PathRenderer); 
                console.log( ' ==================='); 

  var arrSelectedProperties = req.body; 
  console.log( ' arrSelectedProperties = ',  arrSelectedProperties); 


    for ( var i = 0; i < arrSelectedProperties.length; i++) {
      console.log('arrSelectedProperties.length ', arrSelectedProperties.length); 

            arrSelectedProperties[i]


      res.render(path.resolve('modules/users/server/templates/reset-password-email'), {
        name:  arrSelectedProperties[i].agentName,
        appName: arrSelectedProperties[i]._id,
        url: arrSelectedProperties[i].phone_no
      }, function (err, emailHTML) {
        if (!err) {
          console.log( 'An email has been sent to the provided email with further instructions. '); 

        } else {
          console.log( 'EMAIL SENDING FAILURE ...'); 
        }

      });                
    }
      // var mailOptions = {
      //   to: 'jpca999@gmail.com',
      //   from: 'jpca999@gmail.com',
      //   subject: 'All Commission Yours |  Cash  offer attached for 810 SE 4TH CT',
      //   html: emailHTML
      // };
      // smtpTransport.sendMail(mailOptions, function (err) {
      //   if (!err) {
      //     console.log( 'An email has been sent to the provided email with further instructions. '); 

      //   } else {
      //     console.log( 'EMAIL SENDING FAILURE ...'); 
      //   }

      //   done(err);
      // });
    }

*/

exports.sendEmailToSelectedProperties = function (req, res, next) {

  async.waterfall([
    // Generate random token
    function (done) {
      crypto.randomBytes(20, function (err, buffer) {
        var token = buffer.toString('hex');
        done(err, token);
      });
    },

/*    
    // Lookup user by username
    function (token, done) {
        console.log('token in function (token, done) - token =  = ', token); 
      if (req.body.username) {
        User.findOne({
          username: req.body.username.toLowerCase()
        }, '-salt -password', function (err, user) {
          if (!user) {
            return res.status(400).send({
              message: 'No account with that username has been found'
            });
          } else if (user.provider !== 'local') {
            return res.status(400).send({
              message: 'It seems like you signed up using your ' + user.provider + ' account'
            });
          } else {
            // user.resetPasswordToken = token;
            // user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            // user.save(function (err) {
            //   done(err, token, user);
            // });
          }
        });
      } else {
        return res.status(400).send({
          message: 'Username field must not be blank'
        });
      }
    },

*/

    // function (token, user, done) {
    function (token, done) {    

      var httpTransport = 'http://';
      if (config.secure && config.secure.ssl === true) {
        httpTransport = 'https://';
      }
              var PathRenderer =   path.resolve('modules/properties/server/templates/reset-password-email'); 
                console.log( ' PathRenderer 65  = ', PathRenderer); 
                console.log( ' ==================='); 


    var value  = req.body; 
    var str1 = "Follow up for  ";
    var str2 = value.address;
    var agent = str1.concat(str2);
    console.log( "143- - req.body = " + req.body);


    var value  = req.body; 
    var str1 = "Follow up for  ";
    var str2 = value.address;
    var propertyAddress = str1.concat(str2);
    console.log( "property Address = " + res);



      res.render(path.resolve('modules/properties/server/templates/reset-password-email'), {
        name: value.agentName,
        propertyAddress: propertyAddress,
        // jay here. 
        appName: "config.app.title",
        url: "httpTransport + req.headers.host + '/api/auth/reset/' + token"
      }, 
      function (err, emailHTML) {
      // console.log( '=====================> 145 here the emailHTML =', emailHTML ); 
        // done(err, emailHTML, user);
        done(err, emailHTML);
      });
    },
    // If valid email, send reset email using service
    function (emailHTML, done) {

    var value  = req.body; 
    var str1 = "Follow up for  ";
    var str2 = value.address;
    var propertyAddress = str1.concat(str2);

    console.log( "property Address = " + res);


      var mailOptions = {
        // to: user.email,
        to: value.email_address,        
        from: config.mailer.from,
        subject: propertyAddress,
        html: emailHTML
      };
      console.log( '159 ---> mailOptions =  ', mailOptions); 
      // var poo = "poo"; 
      smtpTransport.sendMail(mailOptions, function (err) {
        if (!err) {
          res.send({
            message: 'An email has been sent to the provided email with further instructions.', 
            mailOptions: mailOptions
            // console.log( ' an email has been sent to  - mailOptions.to',mailOptions.to ); 
            // console.log( ' poo value = ', poo); 
          });
        } else {
          return res.status(400).send({
            message: 'Failure sending email'
          });
        }

        done(err);
      });
    }
  ], function (err) {
    if (err) {
      return next(err);
    }
  });
};








/**
 * Create a Property
 */
exports.create = function(req, res) {
  var property = new Property(req.body);
  property.user = req.user;
console.log( '19 ----- inside the exports.create ',property ); 
console.log( '20 ----- inside the property.res ',property.res ); 
  property.save(function(err) {
    if (err) {
      console.log( ' 23- server/controller error =', err); 
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log( ' 28-  server/controller no-error  res =', res);       
      res.jsonp(property);
    }
  });
};

/**
 * Show the current Property
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var property = req.property ? req.property.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  property.isCurrentUserOwner = req.user && property.user && property.user._id.toString() === req.user._id.toString();

  res.jsonp(property);
};

/**
 * Update a Property
 */
exports.update = function(req, res) {
  var property = req.property;

  property = _.extend(property, req.body);

  property.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(property);
    }
  });
};

/**
 * Delete an Property
 */
exports.delete = function(req, res) {
  var property = req.property;

  property.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(property);
    }
  });
};

/**
 * List of Properties
 */
exports.list = function(req, res) {
  console.log( ' < - > calling  exports.list inside the  properties/server/controller/prop.server.controller < - >'); 
  Property.find().sort('-created').populate('user', 'displayName').exec(function(err, properties) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(properties);
    }
  });
};

/**
 * Property middleware
 */
exports.propertyByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Property is invalid'
    });
  }

  Property.findById(id).populate('user', 'displayName').exec(function (err, property) {
    if (err) {
      return next(err);
    } else if (!property) {
      return res.status(404).send({
        message: 'No Property with that identifier has been found'
      });
    }
    req.property = property;
    next();
  });
};