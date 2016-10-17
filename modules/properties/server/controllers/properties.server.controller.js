'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Property = mongoose.model('Property'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  nodemailer = require('nodemailer'),
  config = require(path.resolve('./config/config')),
  async = require('async'); 
  
var smtpTransport = nodemailer.createTransport(config.mailer.options);

  // colors = require('colors'); 



/**
 * sendEmailToSelectedProperties
 */
exports.sendEmailToSelectedProperties = function (emailHTML, user, done) {

  console.log( ' inside the server  exports.sendEmailToSelectedProperties'); 

      var mailOptions = {
        to: 'jpca999@gmail.com',
        from: 'jpca999@gmail.com',
        subject: 'All Commission Yours |  Cash  offer attached for 810 SE 4TH CT',
        html: emailHTML
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        if (!err) {
          console.log( 'An email has been sent to the provided email with further instructions. '); 

        } else {
          console.log( 'EMAIL SENDING FAILURE ...'); 
        }

        done(err);
      });
    }













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
