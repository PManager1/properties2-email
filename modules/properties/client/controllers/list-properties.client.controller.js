(function () {
  'use strict';

  angular
    .module('properties')




// SIDE BAR stuff BEGINS 
  .controller('SideNavCtrl', function ($scope, $rootScope, $timeout, $mdSidenav, $log, shareDataService) {
    console.log ('9- SideNav Ctrl initiated'); 
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right'); 



$scope.lists = shareDataService.getList();

// $scope.propertylists = shareDataService.getList();


console.log ( '13 --- $rootScope.propertiesSelected = ', $rootScope.propertiesSelected); 

$scope.property = $rootScope.propertiesSelected; 

 console.log (   'shareDataService.getList();   =', shareDataService.getList()) ; 


$scope.desserts = {
    "count": 9,
    "data": [
      {
        "name": "Frozen yogurt",
        "type": "Ice cream",
        "calories": { "value": 159.0 },
        "fat": { "value": 6.0 },
        "carbs": { "value": 24.0 },
        "protein": { "value": 4.0 },
        "sodium": { "value": 87.0 },
        "calcium": { "value": 14.0 },
        "iron": { "value": 1.0 }
      }, {
        "name": "KitKat",
        "type": "Candy",
        "calories": { "value": 518.0 },
        "fat": { "value": 26.0 },
        "carbs": { "value": 65.0 },
        "protein": { "value": 7.0 },
        "sodium": { "value": 54.0 },
        "calcium": { "value": 12.0 },
        "iron": { "value": 6.0 }
      }
    ]
  };


    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            console.log( '152 -  navID =  ' , navID); 
            $log.debug("inside buildDelayedToggler is done");
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("inside buildToggler is done");            
            $log.debug("toggle " + navID + " is done");
          });
      }
    }

  })




  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log, shareDataService) {
    console.log( '112 - Left Ctrl initiated'); 
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  })



  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log, shareDataService) {
      console.log( '127 - Right Ctrl initiated'); 

  var currentProperty = shareDataService.lastonList(); 

console.log ( ' 177-  currentProperty = ', currentProperty); 

 

$scope.desserts = {
    "count": 19,
    "data": [
      {
        "name": "Frozen yogurt",
        "type": "Ice cream",
        "calories": { "value": 159.0 },
        "fat": { "value": 6.0 },
        "carbs": { "value": 24.0 },
        "protein": { "value": 4.0 },
        "sodium": { "value": 87.0 },
        "calcium": { "value": 14.0 },
        "iron": { "value": 1.0 }
      }, {
        "name": "Ice cream sandwich",
        "type": "Ice cream",
        "calories": { "value": 237.0 },
        "fat": { "value": 9.0 },
        "carbs": { "value": 37.0 },
        "protein": { "value": 4.3 },
        "sodium": { "value": 129.0 },
        "calcium": { "value": 8.0 },
        "iron": { "value": 1.0 }
      }, {
        "name": "Eclair",
        "type": "Pastry",
        "calories": { "value":  262.0 },
        "fat": { "value": 16.0 },
        "carbs": { "value": 24.0 },
        "protein": { "value":  6.0 },
        "sodium": { "value": 337.0 },
        "calcium": { "value":  6.0 },
        "iron": { "value": 7.0 }
      }, {
        "name": "Cupcake",
        "type": "Pastry",
        "calories": { "value":  305.0 },
        "fat": { "value": 3.7 },
        "carbs": { "value": 67.0 },
        "protein": { "value": 4.3 },
        "sodium": { "value": 413.0 },
        "calcium": { "value": 3.0 },
        "iron": { "value": 8.0 }
      }, {
        "name": "Jelly bean",
        "type": "Candy",
        "calories": { "value":  375.0 },
        "fat": { "value": 0.0 },
        "carbs": { "value": 94.0 },
        "protein": { "value": 0.0 },
        "sodium": { "value": 50.0 },
        "calcium": { "value": 0.0 },
        "iron": { "value": 0.0 }
      }, {
        "name": "Lollipop",
        "type": "Candy",
        "calories": { "value": 392.0 },
        "fat": { "value": 0.2 },
        "carbs": { "value": 98.0 },
        "protein": { "value": 0.0 },
        "sodium": { "value": 38.0 },
        "calcium": { "value": 0.0 },
        "iron": { "value": 2.0 }
      }, {
        "name": "Honeycomb",
        "type": "Other",
        "calories": { "value": 408.0 },
        "fat": { "value": 3.2 },
        "carbs": { "value": 87.0 },
        "protein": { "value": 6.5 },
        "sodium": { "value": 562.0 },
        "calcium": { "value": 0.0 },
        "iron": { "value": 45.0 }
      }, {
        "name": "Donut",
        "type": "Pastry",
        "calories": { "value": 452.0 },
        "fat": { "value": 25.0 },
        "carbs": { "value": 51.0 },
        "protein": { "value": 4.9 },
        "sodium": { "value": 326.0 },
        "calcium": { "value": 2.0 },
        "iron": { "value": 22.0 }
      }, {
        "name": "KitKat",
        "type": "Candy",
        "calories": { "value": 518.0 },
        "fat": { "value": 26.0 },
        "carbs": { "value": 65.0 },
        "protein": { "value": 7.0 },
        "sodium": { "value": 54.0 },
        "calcium": { "value": 12.0 },
        "iron": { "value": 6.0 }
      }
    ]
  };


    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  })

// SIDE BAR stuff ENDS 




    .controller('PropertiesListController', PropertiesListController);

console.log( ' inside the list-properties-client-controller');                                                                       


  PropertiesListController.$inject = ['$scope','$rootScope', '$q', '$location', '$http','$filter','PropertiesService', 'shareDataService', '$mdToast','moment','$mdEditDialog','$timeout', '$mdSidenav', '$log'];

  function PropertiesListController($scope, $rootScope, $q, $location, $http, $filter, PropertiesService, shareDataService, $mdToast, moment,  $mdEditDialog, $timeout, $mdSidenav, $log) {


  console.log( ' loading PropertiesListController  ========== for mdToast =>', $mdToast); 

    var vm = this;

    vm.properties = PropertiesService.query();
    $scope.properties = vm.properties; 

    console.log(' vm.properties =',vm.properties); 


  $scope.selected = [];
  
  $rootScope.propertiesSelected = []; 


  $scope.limitOptions = [5, 10, 15];
  
  $scope.options = {
    rowSelection: true,
    multiSelect: true,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: false,
    boundaryLinks: false,
    limitSelect: true,
    pageSelect: true
  };
  
  $scope.query = {
    order: 'address',
    limit: 5,
    page: 1
  };

$scope.rowSelected; 
  


// $scope.data = {};
//   $scope.data.cb1 = true;



// ***** TOAST *****
  var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }

  $scope.showSimpleToast = function(e) {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent(e)
        .position(pinTo )
        .hideDelay(3000)
    );
  };

// ***** TOAST *****

// ************
  
  $scope.editComment = function (event, dessert) {
    event.stopPropagation(); // in case autoselect is enabled


    var arrSelectedProperties = $rootScope.propertiesSelected;
    console.log( ' inside editComments arrSelectedProperties =', arrSelectedProperties); 
    
    var editDialog = {
      modelValue: arrSelectedProperties.comment,
      placeholder: 'Add a comment..',
      // save: function (input) {
      //   if(input.$modelValue === 'Donald Trump') {
      //     input.$invalid = true;
      //     console.log( '116 -  calling the save function'); 
      //     return $q.reject();
      //   }
      //   if(input.$modelValue === 'Bernie Sanders') {
      //     return dessert.comment = 'FEEL THE BERN!'
      //   }
      //   arrSelectedProperties.comment = input.$modelValue;
      // },
      targetEvent: event,
      title: 'Add a comment',
      validators: {
        'md-maxlength': 1000
      }
    };
    
    var promise;
    
    // if($scope.options.largeEditDialog) {
    //   promise = $mdEditDialog.large(editDialog);
    // } else {
    //   promise = $mdEditDialog.small(editDialog);
    // }
    
    // promise.then(function (ctrl) {
    //   var input = ctrl.getInput();
      
    //   input.$viewChangeListeners.push(function () {
    //     input.$setValidity('test', input.$modelValue !== 'test');
    //   });
    // });
  };
  



  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };

  $scope.getTypes = function () {
    return ['Bi_weekly', 'Red-Priority', 'Orange', 'Grey'];
  };



  /* DELETE this func - if nobody is using it.  */
  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
  }
  

  $scope.logItem = function (item) {
    $rootScope.propertiesSelected = $scope.selected;
    console.log ( ' $rootScope.propertiesSelected  = ', $rootScope.propertiesSelected); 


  $scope.someData = $rootScope.propertiesSelected;  

  shareDataService

  shareDataService.addList($scope.someData);

    // shareDataService.popList(); 
    // shareDataService.addList($rootScope.propertiesSelected);
  };

  
  $scope.logOrder = function (order) {
    console.log('order: ', order);
  };
  

  $scope.logPagination = function (page, limit) {
    console.log('page: ', page);
    console.log('limit: ', limit);
  }






$scope.selectChangedPriority = function(type) {
    console.log(' 165 - selectChanged triggered   & selected Priority = ', type);

    var arrSelectedProperties = $rootScope.propertiesSelected;

    console.log('169 - arrSelectedProperties  = ', arrSelectedProperties);

    window.arrSelectedProperties = arrSelectedProperties; 

    // angular.forEach(arrSelectedProperties, function(value) {

    // console.log(' values = ', value);  [arrSelectedProperties.length-1]
    var currentProperty = arrSelectedProperties[arrSelectedProperties.length-1];

    currentProperty.call_priority = type;


    var nowMoment = moment();
    var nowMomentFormatted = nowMoment.format('YYYY-M-D');

    console.log('  182- nowMomentFormatted =', nowMomentFormatted);

    currentProperty.last_date_call_was_made = nowMoment.format('YYYY-M-D');
    console.log(' BEFORE property update sent backend - >  currentProperty.call_priority', currentProperty);


    PropertiesService.update({ propertyId: currentProperty._id }, currentProperty);

    console.log(' property update sent backend');
    // });
    // });
}




  $scope.logItemType = function (item) {
    console.log( ' Priority  selected'); 


    var properties = $rootScope.propertiesSelected;  // delete this line.
    var arrSelectedProperties = $rootScope.propertiesSelected;

    angular.forEach(arrSelectedProperties, function(value) {
        console.log(' values = ', value);
        var currentProperty = value;

      currentProperty.last_date_call_was_made = nowMoment.format('YYYY-M-D');
      PropertiesService.update({propertyId: currentProperty._id}, currentProperty), function (error) {
        console.log(' error found =' , error); 
      };
    });



  }; 
  

  









$scope.justCalled = function() {
    console.log(' inside the  $scope.justCalled');

    var nowMoment = moment();
    var nowMomentFormatted = nowMoment.format('YYYY-M-D');

    console.log(' nowMomentFormatted =', nowMomentFormatted);

    moment().subtract(30, 'days'); // or...
    moment().add(-30, 'days');

    var add = moment().add(30, 'days').format('YYYY-M-D');
    console.log(' add = ', add);

    var properties = $rootScope.propertiesSelected;
    var arrSelectedProperties = $rootScope.propertiesSelected;

    angular.forEach(arrSelectedProperties, function(value) {
        console.log(' values = ', value);
        var currentProperty = value;

      currentProperty.last_date_call_was_made = nowMoment.format('YYYY-M-D');
      PropertiesService.update({propertyId: currentProperty._id}, currentProperty), function (error) {
        console.log(' error found =' , error); 
      };
    });
};






  $scope.sendEmail = function () {

    console.log( ' insdie the  $scope.sendEmail'); 
    var properties = $rootScope.propertiesSelected; 
    
    var arrSelectedProperties=$rootScope.propertiesSelected; 

    angular.forEach(arrSelectedProperties, function(value) {
      console.log( ' values = ', value); 
      var currentProperty = value; 
    $http.post( '/sendEmailToSelectedProperties', value). 

     success( function (value,status,headers, config) {
       console.log(' 230 - value of "value" inside the success =',value); 
       var to = "Email sent to " + value.mailOptions.to; 
        $scope.showSimpleToast(to);
        // value.last_date_email_sent_on = "today"; 
        // $scope.update(value); 
        // debugger; 
        console.log('just before updating.... value._id=', value);
        console.log('just before updating.... currentProperty=', currentProperty);
  
    currentProperty.county = "South LA";
    currentProperty.address = "111 - Urban estate";     
    PropertiesService.update({propertyId: currentProperty._id}, currentProperty);


    console.log('just after updating....'); 

     }). 
     error(function (value,status,headers,config) {
       var to = value.email_address; 
       console.log( ' to  = ', to); 

       console.log( ' inside error func of sendEmail');
        $scope.showSimpleToast("Email FAIL.");      
     }); 
    }); 

}; 






      }
  }());
