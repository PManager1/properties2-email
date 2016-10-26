(function () {
  'use strict';

  angular
    .module('properties')
    .controller('PropertiesListController', PropertiesListController);

console.log( ' inside the list-properties-client-controller'); 


  PropertiesListController.$inject = ['$scope','$rootScope', '$location', '$http','$filter','PropertiesService','$mdToast'];

  function PropertiesListController($scope, $rootScope, $location, $http, $filter, PropertiesService, $mdToast) {


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
  


$scope.data = {};
  $scope.data.cb1 = false;



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
    
    var editDialog = {
      modelValue: dessert.comment,
      placeholder: 'Add a comment',
      save: function (input) {
        if(input.$modelValue === 'Donald Trump') {
          input.$invalid = true;
          return $q.reject();
        }
        if(input.$modelValue === 'Bernie Sanders') {
          return dessert.comment = 'FEEL THE BERN!'
        }
        dessert.comment = input.$modelValue;
      },
      targetEvent: event,
      title: 'Add a comment',
      validators: {
        'md-maxlength': 30
      }
    };
    
    var promise;
    
    if($scope.options.largeEditDialog) {
      promise = $mdEditDialog.large(editDialog);
    } else {
      promise = $mdEditDialog.small(editDialog);
    }
    
    promise.then(function (ctrl) {
      var input = ctrl.getInput();
      
      input.$viewChangeListeners.push(function () {
        input.$setValidity('test', input.$modelValue !== 'test');
      });
    });
  };
  



  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };

  $scope.getTypes = function () {
    return ['Biweekly', 'Red-Priority', 'Orange', 'Grey'];
  };


  $scope.logItemType = function (item) {
    console.log( ' Prioerity  selected'); 
  }; 
  
  
  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
  }
  
  $scope.logItem = function (item) {
    $rootScope.propertiesSelected = $scope.selected;
    console.log ( ' $rootScope.propertiesSelected  = ', $rootScope.propertiesSelected); 
  };
  


/*
    // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      var article = $scope.article;

      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
*/





    $scope.update = function (value) {
      $scope.error = null;

      // if (!isValid) {
      //   $scope.$broadcast('show-errors-check-validity', 'articleForm');
      //   return false;
      // }

      $scope.property = value;
      $scope.property.data = 'some data';

      property.$update(function () {
        $location.path('properties/' + property._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });


      // property.$update(function () {
      //   $location.path('properties/' + property._id);
      //   console.log( ' updating the value of the property'); 
      // }, function (errorResponse) {
      //   $scope.error = errorResponse.data.message;
      // });
    };



$scope.justCalled = function () {
    console.log( ' inside the  $scope.justCalled');   

    // var properties = $rootScope.propertiesSelected; 
    
    // var arrSelectedProperties=$rootScope.propertiesSelected; 

    // angular.forEach(arrSelectedProperties, function(value) {
    //   console.log( ' values = ', value); 
    //   var currentProperty = value; 

    // $http.post( '/sendEmailToSelectedProperties', value). 

    //  success( function (value,status,headers, config) {
    //    console.log(' 230 - value of "value" inside the success =',value); 
    //    var to = "Email sent to " + value.mailOptions.to; 
    //     $scope.showSimpleToast(to);
    //     // value.last_date_email_sent_on = "today"; 
    //     // $scope.update(value); 
    //     // debugger; 
    //     console.log('just before updating.... value._id=', value);
    //     console.log('just before updating.... currentProperty=', currentProperty);
  
    // currentProperty.county = "South LA";
    // currentProperty.address = "111 - Urban estate";     
    // PropertiesService.update({propertyId: currentProperty._id}, currentProperty);



    // console.log('just after updating....'); 

    //  }). 
    //  error(function (value,status,headers,config) {
    //    var to = value.email_address; 
    //    console.log( ' to  = ', to); 

    //    console.log( ' inside error func of sendEmail');
    //     $scope.showSimpleToast("Email FAIL.");      
    //  }); 
    // }); 

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




  $scope.logOrder = function (order) {
    console.log('order: ', order);
  };
  
  $scope.logPagination = function (page, limit) {
    console.log('page: ', page);
    console.log('limit: ', limit);
  }
      }
  }());
