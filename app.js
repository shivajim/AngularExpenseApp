var exp_app = angular.module('Expenses_app_module',['ngRoute']);


exp_app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'views/expenses.html',
		controller:'Expenses_controller'
	})
	.when('/expenses',{
		templateUrl:'views/expenses.html',
		controller:'Expenses_controller'
	})
	.when('/form_expenses/new',{
		templateUrl:'views/expenses_form.html',
		controller:'ExpensesFormController'
	})
	.when('/expenses/edit/:id',{
		templateUrl:'views/expenses_form.html',
		controller:'ExpensesFormController'
	})
	.otherwise({redirectTo:'/'
	});
});

exp_app.factory('Expenses_service',function(){
	var exp_service = {};
	exp_service.expenses= [{id:1, amount:10,description:'food', date:'2012-10-01'},
			{id:2, amount:10.565,description:'Phone', date:'2012-10-18'},
			{id:3, amount:565,description:'ticket', date:'2012-10-14'},
			{id:4, amount:265,description:'travel', date:'2012-10-02'},
			{id:5, amount:165,description:'snack', date:'2012-10-12'},
			{id:6, amount:55,description:'lunch', date:'2012-10-08'},
			{id:7, amount:66,description:'coldrinks', date:'2012-10-06'},
			{id:8, amount:566.889,description:'dinner', date:'2012-10-02'}];


		exp_service.getById = function(id){
			return _.find(exp_service.expenses, function(entry){return entry.id == id;}); 
		}

		exp_service.getNewId = function(){
			if(exp_service.newId){
				exp_service.newId++;
				return exp_service.newId;
			}
			else{
				var maxId = _.max(exp_service.expenses, function(entry){return entry.id;});
				exp_service.newId =maxId.id++;
				return exp_service.newId;
			}	
		} 
		
		exp_service.save = function(entry){
			var toUpdate = exp_service.getById(entry.id);
			if(toUpdate){
				_.extend(toUpdate,entry)
			}
			else{
				entry.id = exp_service.getNewId();
				exp_service.expenses.push(entry);
			}
		}
		
	return exp_service; 
});

exp_app.controller('Expenses_controller',['$scope','Expenses_service', function($scope, Expenses_service){
	$scope.expenses= Expenses_service.expenses;

}]);


exp_app.controller('ExpensesFormController',['$scope','$routeParams','Expenses_service','$location', function($scope,$routeParams,Expenses_service, $location){
	
	if(!$routeParams.id){
		$scope.expenses = {date: new Date()};
	}
	else{
		$scope.expenses = _.clone(Expenses_service.getById($routeParams.id)) ;
	}

	$scope.save = function(){

		Expenses_service.save($scope.expenses);
		$location.path('/'); 
	}
}]);		

exp_app.controller('HomeController',['$scope',function($scope){
	$scope.title ="Simple Expenses Application";
}]);



exp_app.directive('grexpenses', function(){
	return {
		restrict:'E',
		templateUrl:'views/exp_cust_dir.html'
	}
});