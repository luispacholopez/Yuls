(function(){
	angular.module('gemStore')
	.controller('AuthController', ['$scope', 'Constantes' ,function($scope, Constantes, authFactory){        

		$scope.ruta= Constantes.ruta_imagenes + "botones/";    
		$scope.logo= $scope.ruta + "logo.png";    
		$scope.getCredentials = function(){
            return {username: $scope.username, password: $scope.password};
        };

        $scope.login = function(){
            authFactory.auth.login($scope.getCredentials()).
            $promise.
                then(function(data){
                    // on good username and password
                    $scope.user = data.username;
                }).
                catch(function(data){
                    // on incorrect username and password
                    alert(data.data.detail);
                });
        };

        $scope.logout = function(){
            authFactory.auth.logout(function(){
                $scope.user = undefined;
            });
        };
	}]);
})();