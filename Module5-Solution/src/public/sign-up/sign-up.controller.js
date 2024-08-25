(function () {
    "use strict";

    angular.module('public')
    .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$http', 'ApiPath', 'UserService'];
    function SignUpController($http, ApiPath, UserService) {
        var $ctrl = this;
        $ctrl.user = {};
        $ctrl.successMessage = "";
        $ctrl.errorMessage = "";

        $ctrl.submit = function() {
            if ($ctrl.signUpForm.$valid) {
                var menuNumber = $ctrl.user.favoriteMenuNumber;
                var category = 'L'; // Replace with logic to determine the correct category
                $http.get(ApiPath + '/menu_items/' + category + '/menu_items/' + menuNumber + '.json')
                .then(function(response) {
                    if (response.data) {
                        UserService.setUser($ctrl.user);
                        $ctrl.successMessage = "Your information has been saved.";
                        $ctrl.errorMessage = "";
                    } else {
                        $ctrl.errorMessage = "No such menu number exists.";
                    }
                });
            }
        };
    }

})();
