angular.module('gemStore')
.controller('SolutionDetailController', ['$scope','Constantes','SolutionFactory','solutionService', '$location', 'QuestionnaireFactory','questionnaireService', 'navBar', 'DetailFactory',
	function($scope,Constantes,SolutionFactory,solutionService, $location, QuestionnaireFactory, questionnaireService, navBar, DetailFactory){
                //Rutas Imagenes
        $scope.ruta = Constantes.ruta_imagenes + "botones/";                        
        $scope.img1 = $scope.ruta + 'icono-registro.png';              
        // $scope.solution = solutionService.getSolution();        
        $scope.questionnaires = questionnaireService.getQuestionnaires();
        // 
        $scope.solutions = solutionService.getSolutions();                
        

        $scope.toggleRight = function(){                                
	      navBar.open();
	    }

	    $scope.close= function(){
	      navBar.close();
	    }

	    $scope.menu_bar = function (view){
	      questionnaireService.changeView(view);                      
	    }

        getDetailSolution();

        function getDetailSolution() {            
            // Información del cuestionario para enviarlo
            var qf = new QuestionnaireFactory();
            qf.cuestionarios = questionnaireService.getQuestionnaires();                                        
            qf.tipo = questionnaireService.getTipo();    

            DetailFactory.get({cuestionario:qf,id_ps:solutionService.getId()}).$promise.
            then(function(respuesta){                                
                $scope.detail = respuesta.respuesta;
                $scope.solution = $scope.solutions[solutionService.getIndex()];
                console.log('Detalle:',$scope.detail);
                console.log('Solución:',$scope.solution);
            })
            .catch(function(errors){
                console.log(errors);
            })
            .finally(function(){
                console.log("Finally");                
            });          
        }

        $scope.siguiente = function(){            
            if (solutionService.getIndex() < 9) {
                solutionService.setIndex(solutionService.getIndex() + 1);
                solutionService.setId($scope.solutions[solutionService.getIndex()].problema_solucion.id);
                getDetailSolution();
            }
            else{                
                getResultsPage(solutionService.getPage() + 1);
                solutionService.setIndex(0);
                solutionService.setId($scope.solutions[solutionService.getIndex()].problema_solucion.id);
                getDetailSolution();                
                // $scope.solutions = solutionService.getSolutions();                
                
            };
        }

        $scope.anterior = function(){            
            if (solutionService.getIndex() >= 0) {
                solutionService.setIndex(solutionService.getIndex() - 1);
                solutionService.setId($scope.solutions[solutionService.getIndex()].problema_solucion.id);
                getDetailSolution();
            }
            else{

            };
        }        

        function getResultsPage(pageNumber) {            
        //Definición de objeto para envio cuestionario y tipo
            var qf = new QuestionnaireFactory();
            qf.cuestionarios = questionnaireService.getQuestionnaires();                                        
            qf.tipo = questionnaireService.getTipo();

            SolutionFactory.get({cuestionario:qf,pagina:pageNumber}).$promise.
            then(function(info){                                
                solutionService.setSolutions(info.problemas_soluciones);                
            })
            .catch(function(errors){
                console.log(errors);
            })
            .finally(function(){
                console.log("in finally");                
                $scope.solutions = solutionService.getSolutions();                
            });          
        }

}]);