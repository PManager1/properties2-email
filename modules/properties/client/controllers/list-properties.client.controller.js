(function () {
  'use strict';

  angular
    .module('properties')
    .controller('PropertiesListController', PropertiesListController);

console.log( ' inside the list-properties-client-controller'); 


  PropertiesListController.$inject = ['$scope','$rootScope', '$q', '$location', '$http','$filter','PropertiesService','$mdToast','moment','$mdEditDialog','$mdDialog'];

  function PropertiesListController($scope, $rootScope, $q, $location, $http, $filter, PropertiesService, $mdToast, moment,  $mdEditDialog, $mdDialog) {


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

// ***** TOAST ends here *****

// ************
  
     $scope.retter = [{
          _id: '56e827ba0ec7a8d02bf7747d',
          name: 'test',
          info: 'testinfo',
          type: 'kød',
          active: true
        },{
          _id: '56e827ba0ec7a8d02bf77473',
          name: 'test3',
          info: 'testinfo3',
          type: 'kød',
          active: true
        },{
          _id: '56e827ba0ec7a8d02bf77474',
          name: 'test4',
          info: 'testinfo4',
          type: 'salat',
          active: false
        }];
  
    $scope.types = ['kød','salat','kartofler'];
    
    $scope.tableRows = ['Navn:','Info:','Type:','Aktiv:','Slet:']

    $scope.showPrompt = function(ev, ret, value) {
      
      var getValue = function(){
      switch(value){
        case 'Navn':
        currentValue = ret.name;
        break;
        case 'Info':
        currentValue = ret.info;
        break;
        case 'Type':
        currentValue = ret.type;
        break;
      }
      return currentValue;
    };
    var setValue = function(result){
      switch(value){
      case 'Navn':
      ret.name = result;
      break;
      case 'Info':
      ret.info = result;
      break;
      case 'Type':
      ret.type = result;
      break;
    }
  };
  
    var confirm = $mdDialog.prompt()
    .title('Rediger ' + value)
    .textContent('Indtast en ny værdi for: ' + value)
    .placeholder(getValue())
    .ariaLabel('Ny ' + value)
    .targetEvent(ev)
    .ok('Accepter')
    .cancel('Annuller');
    $mdDialog.show(confirm).then(function(result) {
      setValue(result);
    });
    var currentValue;

    //retService.update(ret);
    //socket.syncUpdates('ret', $scope.retter);
  };

  





    $scope.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('What would you name your dog?')
      .textContent('Bowser is a common name.')
      .placeholder('Dog name')
      .ariaLabel('Dog name')
      .initialValue('Buddy')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('I\'m a cat person');

    $mdDialog.show(confirm).then(function(result) {
      $scope.status = 'You decided to name your dog ' + result + '.';
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
  };






  $scope.editComment = function (event, dessert) {
    event.stopPropagation(); // in case autoselect is enabled


    var arrSelectedProperties = $rootScope.propertiesSelected;
    console.log( ' inside editComments arrSelectedProperties =', arrSelectedProperties); 
    
    var editDialog = {
      modelValue: arrSelectedProperties.comment,
      placeholder: 'Add a comment',
      save: function (input) {
        console.log( '144-  insdie the save function '); 
        if(input.$modelValue === 'Donald Trump') {
          input.$invalid = true;
          return $q.reject();
        }
        if(input.$modelValue === 'Bernie Sanders') {
          return dessert.comment = 'FEEL THE BERN!'
        }
        arrSelectedProperties.comment = input.$modelValue;
      },
      targetEvent: event,
      title: 'Add a comment',
      validators: {
        'md-maxlength': 1000
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
    return ['Bi_weekly', 'Red-Priority', 'Orange', 'Grey'];
  };


  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
  }


  /* DELETE this func - if nobody is using it.  */
  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
  }
  
  $scope.logItem = function (item) {
    $rootScope.propertiesSelected = $scope.selected;
    console.log ( ' $rootScope.propertiesSelected  = ', $rootScope.propertiesSelected); 
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
