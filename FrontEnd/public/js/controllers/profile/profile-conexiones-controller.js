(function(){
	angular.module('gemStore')
	.controller('ConexionesListController', ['$scope','Constantes','$location','questionnaireService','navBar','$mdToast','LogoutFactory','autenticacionService','ConexionListFactory',
		function($scope,Constantes,$location,questionnaireService,navBar,$mdToast,LogoutFactory,autenticacionService,ConexionListFactory){                              	
      $scope.load = true;
      $scope.usuario = autenticacionService.getUser();
      console.log($scope.usuario);
      ConexionListFactory.query({'id_user': $scope.usuario.id}).$promise.then(function(datos){                            
        $scope.data = datos;                  
        console.log("COnversa:",$scope.data); 
        $scope.load = false;
      }).catch(function(error){
        console.log(error);                    
      });
      
      $scope.toggleRight = function(){                                
        navBar.open();
      }

      $scope.close= function(){
        navBar.close();
      }

      $scope.menu_bar = function (view){
        questionnaireService.changeView(view);                      
      }      
      

      $scope.logout = function(){
        // Falta llamar ruta de logout
        LogoutFactory.logear(autenticacionService.getInfo()).save().$promise.then(function(respuesta){                                                                                       
          console.log(respuesta);   
          autenticacionService.setInfo('');                                  
          $location.path('/signin');
        }).catch(function(error){
          console.log(error);            
        });         
      } 
		}
	]);
})();