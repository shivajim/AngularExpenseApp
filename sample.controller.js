exp_app.controller('Expenses_controller',['$scope','Expenses_service', function($scope, Expenses_service){
	$scope.expenses= Expenses_service.expenses;

}]);
