// Faraday Penetration Test IDE
// Copyright (C) 2017  Infobyte LLC (http://www.infobytesec.com/)
// See the file 'doc/LICENSE' for the license information

"use strict";

angular.module('faradayApp')
    .controller('modalNewEditCredentialCtrl',
        ['$scope', '$modalInstance', 'title', 'credential', 'targetFact', '$routeParams',
        function($scope, $modalInstance, title, credential, targetFact, $routeParams) {
        $scope.title = title;
        $scope.workspace = $routeParams.wsId;
        $scope.targets;
        $scope.credentialData = {
            'name': '',
            'username': '',
            'password': '',
            'hostSelectedId': '',
            'serviceSelectedId': '',
            'target': ''
        };
        
        var init = function(){
            if(credential !== undefined){
                $scope.credentialData.name = credential.name;
                $scope.credentialData.username = credential.username;
                $scope.credentialData.password = credential.password;
            }
        };

        $scope.ok = function() {
             $modalInstance.close($scope.credentialData);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        targetFact.getTargets($scope.workspace).then(function(targets){
                $scope.targets = targets;
            });


        $scope.showTargets = function() {
            // Don't show targets in modal:
            // If Credential creation from hosts/services tab
            // If user wants to create credential and not edit it
            if(($routeParams.hId === undefined && $routeParams.sId === undefined) && title === 'New credential'){
                return true;
            }
            else {
                return false;
            }
        }

        $scope.assignTarget = function(target, hostIp) {
            // Receive hostIp as parameter because if target
            // is Service, it does not have hostIp
            if(target.type === "Host"){
                $scope.credentialData.hostSelectedId = target.id;
                $scope.credentialData.target = hostIp;
            }
            else if(target.type === "Service") {
                $scope.credentialData.serviceSelectedId = target.id;
                $scope.credentialData.target = hostIp + "/" + target.name;
            }
        }

        init();
}]);
