angular.module('emailApp')
	.directive('inbox',function inboxDrctv(){
		'use strict';
		return{
			restrict: 'EA',
      		replace: true,
      		scope: true,
      		templateUrl: "inbox.tmpl.html",
      		controllerAs: 'inbox',
      		controller:function(inboxFactory){
      			this.messages = [];
      			this.goToMessage = function (id) {
          			InboxFactory.goToMessage(id);
        		};
        		this.deleteMessage = function(id,index){
        			 inboxFactory.deleteMessage(id,index);
        		};
        		inboxFactory.getMessages()
        		.then(angular.bind(this,function then(){
        			this.messages = inboxFactory.messages;
        		}));
      		},
      		link : function(scope,element,attrs,ctrl){

      		}
		}
	});
