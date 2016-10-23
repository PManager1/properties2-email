
var create = function (req, res) {
    async.waterfall([
        _function1(req),
        _function2,
        _function3
    ], function (error, success) {
        if (error) { alert('Something is wrong!'); }
        return alert('Done!');
    });
};

function _function1 (req) {
    return function (callback) {
        var something = req.body;
        callback (null, something); // this "something"  will be passed on to _function2 in the form of soething. 
   }
}

function _function2 (something, callback) {
    return function (callback) {
       var somethingelse = function () {              // do something here 
       };
       callback (err, somethingelse);  // this "somethingelse" will be passed on to _function3 in the form of soething. 
    }
}

function _function3 (something, callback) {
    return function (callback) {
      var somethingmore = function () { // do something here 
      };
      callback (err, somethingmore);
    }
}




