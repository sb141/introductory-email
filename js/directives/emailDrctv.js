angular.module('emailApp',[])
	.directive('email',function emailDrctv($timeout){
		'use strict';
		return{
			restrict:'E',
			replace: 'true',
			scope : 'true',
			tempelateUrl : "email.tmpl.html",
			controllerAs : 'email',
			controller : function($routeParams,$scope,eamilFactory){
				this.message = [];
				this.reply = function(message){
					eamilFactory.reply(message);
				};
				var getMessage = eamilFactory.getMessage($routeParams);
				if(getMessage){
					getMessage.then(angular.bind(this,function(response){
						eamilFactory.message = response;
						this.message = eamilFactory.message;
						$scope.$parent.email.title = this.message.subject;
					}));
				}
			},
			link : function(scope,element,attrs,ctrl){
				var textarea = element.find('.email__response-text')[0];
				scope.$watch('reply',function(newVal,oldVal){
					if(newVal === oldVal) return;
					if(newVal){
						$timeout(function(){
							textarea.focus();
						},0);
					}
				})
			}
		}
	});
