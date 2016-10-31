// Properties service used to communicate Properties REST endpoints
(function () {
  'use strict';

  angular
    .module('properties')
    .service('shareDataService', function() {

                                              console.log( 'Hi from shareDataService'); 

    var myList = [];

    var addList = function(newObj) {
        myList.push(newObj);
                                               console.log( 'Added properteis inside the myList ', myList); 
    }

    var getList = function(){
        return myList;
    }

    var popList = function(){
        myList = [];
        return myList;
    }

    return {
        addList: addList,
        getList: getList,
        popList: popList
    };
})

    .factory('PropertiesService', PropertiesService);

  PropertiesService.$inject = ['$resource'];

  function PropertiesService($resource) {
    return $resource('api/properties/:propertyId', {
      propertyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());



