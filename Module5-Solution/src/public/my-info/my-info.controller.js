(function () {
    "use strict";

    angular.module('public')
    .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['UserService', 'MenuService'];
    function MyInfoController(UserService, MenuService) {
        var $ctrl = this;
        $ctrl.user = UserService.getUser();
        $ctrl.favoriteItem = null;

        if ($ctrl.user && $ctrl.user.favoriteMenuNumber) {
            var category = 'L'; // Replace with logic to determine the correct category
            MenuService.getMenuItems(category).then(function (items) {
                for (var key in items.menu_items) {
                    if (items.menu_items[key].short_name === $ctrl.user.favoriteMenuNumber) {
                        $ctrl.favoriteItem = items.menu_items[key];
                        break;
                    }
                }
            });
        }
    }

})();
