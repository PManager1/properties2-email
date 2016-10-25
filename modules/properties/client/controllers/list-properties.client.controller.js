(function () {
  'use strict';

  angular
    .module('properties')

    .controller('PropertiesListController', function($scope, $mdToast) {
  console.log( ' loading MyController  ========== for mdToast', $mdToast); 

  // var last = {
  //     bottom: false,
  //     top: true,
  //     left: false,
  //     right: true
  //   };

  // $scope.toastPosition = angular.extend({},last);

  // $scope.getToastPosition = function() {
  //   sanitizePosition();

  //   return Object.keys($scope.toastPosition)
  //     .filter(function(pos) { return $scope.toastPosition[pos]; })
  //     .join(' ');
  // };

  // function sanitizePosition() {
  //   var current = $scope.toastPosition;

  //   if ( current.bottom && last.top ) current.top = false;
  //   if ( current.top && last.bottom ) current.bottom = false;
  //   if ( current.right && last.left ) current.left = false;
  //   if ( current.left && last.right ) current.right = false;

  //   last = angular.extend({},current);
  // }

  // $scope.showSimpleToast = function() {
  //   var pinTo = $scope.getToastPosition();

  //   $mdToast.show(
  //     $mdToast.simple()
  //       .textContent('Simple Toast!')
  //       .position(pinTo )
  //       .hideDelay(3000)
  //   );
  // };

  // $scope.showActionToast = function() {
  //   var pinTo = $scope.getToastPosition();
  //   var toast = $mdToast.simple()
  //     .textContent('Marked as read')
  //     .action('DISMISS')
  //     .highlightAction(true)
  //     .highlightClass('md-warn')// Accent is used by default, this just demonstrates the usage.
  //     .position(pinTo);

  //   $mdToast.show(toast).then(function(response) {
  //     if ( response == 'ok' ) {
  //       alert('You clicked the \'DISMISS\' action.');
  //     }
  //   });
  // };

})



    .controller('PropertiesListController', PropertiesListController);

console.log( ' inside the list-properties-client-controller'); 


  PropertiesListController.$inject = ['$scope','$rootScope','$http','$filter','PropertiesService','$mdToast'];

  function PropertiesListController($scope,$rootScope,$http, $filter, PropertiesService,$mdToast) {


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
  

// **********


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
  
  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
  }
  
  $scope.logItem = function (item) {
    $rootScope.propertiesSelected = $scope.selected;
    console.log ( ' $rootScope.propertiesSelected  = ', $rootScope.propertiesSelected); 
    $scope.showSimpleToast("Item selected"); 
  };
  

  $scope.sendEmail = function () {

    console.log( ' insdie the  $scope.sendEmail'); 
    var properties = $rootScope.propertiesSelected; 
    
    var arrSelectedProperties=$rootScope.propertiesSelected; 

    angular.forEach(arrSelectedProperties, function(value) {
      console.log( ' values = ', value); 

    $http.post( '/sendEmailToSelectedProperties', value). 

     success( function (value,status,headers, config) {
        console.log(' value of value inside the success =',value); 
       console.log( ' inside SUCCESS func of sendEmail'); 
       var to = value.email_address; 
       console.log( ' to  = ', to);

        $scope.showSimpleToast("Email sent to");
     }). 
     error(function (value,status,headers,config) {
       var to = value.email_address; 
       console.log( ' to  = ', to); 

       console.log( ' inside error func of sendEmail');
        $scope.showSimpleToast("Email FAIL.");      
     }); 



    }); 



    // $http.post( '/sendEmailToSelectedProperties', arrSelectedProperties). 
    // 	success( function (arrSelectedProperties,status,headers, config) {
    // 		console.log( ' inside SUCCESS func of sendEmail');    		
    //     $scope.showSimpleToast("Email sent.");
    // 	}). 
    // 	error(function (arrSelectedProperties,status,headers,config) {
    // 		console.log( ' inside error func of sendEmail');
    // 	}); 
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
