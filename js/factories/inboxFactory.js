angular.module('emailApp')
	.factory('inboxFactory',function inboxFactory($q,$http,$location){
		'use strict';
		var exports ={};
		exports.messages  = [];
		exports.goToMessage = function(id){
			if(angular.isNumber(id)){
				 console.log('inbox/email/' + id)
        		 $location.path('inbox/email/' + id)
			}
		}
		exports.deleteMesage = function(id,index){
			this.messages.splice(index, 1);
		}
		exports.getMessages = function () {
      		var deferred = $q.defer();
      		return $http.get('json/emails.json')
        		.success(function (data) {
          		exports.messages = data;
          		deferred.resolve(data);
        	})
        	.error(function (data) {
          		deferred.reject(data);
        	});
      		return deferred.promise;
    	};
	return exports;
	});
