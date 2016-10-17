(function () {
  'use strict';

  angular
    .module('properties')
    .controller('PropertiesListController', PropertiesListController);

console.log( ' inside the list-properties-client-controller'); 


  PropertiesListController.$inject = ['$scope','$rootScope','$http','$filter','PropertiesService'];

  function PropertiesListController($scope,$rootScope,$http, $filter, PropertiesService) {
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
    // console.log(item.name, 'was selected');
    console.log(item, 'only item was selected'); 

    // console.log( 'in logItem  $scope = ', $scope);


    $rootScope.propertiesSelected = $scope.selected;
    console.log ( ' $rootScope.propertiesSelected  = ', $rootScope.propertiesSelected); 

  };
  

  $scope.sendEmail = function ($scope) {
    // body...
    console.log ( ' $rootScope.propertiesSelected  inside the sendEmail function = ', $rootScope.propertiesSelected); 
    var properties = $rootScope.propertiesSelected; 
    
   var data = ({
    	contactName : "hoola", 
    	contactEmail : "jpca999@gmail.com", 
    	contactMsg : "some mofo bold message"
    }); 

    $http.post( '/sendEmailToSelectedProperties', data). 
    	success( function (data,status,headers, config) {
    		console.log( ' inside SUCCESS func of sendEmail');    		
    	}). 
    	error(function (data,status,headers,config) {
    		console.log( ' inside error func of sendEmail');
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
