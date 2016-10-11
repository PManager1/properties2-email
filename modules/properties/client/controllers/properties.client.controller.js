(function () {
  'use strict';

  // Properties controller
  angular
    .module('properties')
    .controller('PropertiesController', PropertiesController);

  PropertiesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'propertyResolve'];

  function PropertiesController ($scope, $state, $window, Authentication, property) {
    var vm = this;

    vm.authentication = Authentication;
    vm.property = property;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Property
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.property.$remove($state.go('properties.list'));
      }
    }

    // Save Property
    function save(isValid) {
      console.log(  ' calling function save(isValid) inside the properties.client.controller.js isValid = ', isValid); 
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.propertyForm');
        return false;
      }
      // TODO: move create/update logic to service
      if (vm.property._id) {
                  console.log ( 'vm.property._id = ', vm.property._id ); 
        vm.property.$update(successCallback, errorCallback);
      } else {
                console.log ( ' 40 save - >  vm.property._id = ', vm.property ); 
        vm.property.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
                          console.log ( '45 successCallback - >  res= ', res );         
        $state.go('properties.view', {
          propertyId: res._id
        });
      }

      function errorCallback(res) {
        console.log( '52  --- > calling the  errorCallback ');
        vm.error = res.data.message;
      }
    }
  }
}());









































