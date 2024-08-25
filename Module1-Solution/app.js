// Define the AngularJS module and controller
angular.module('lunchApp', [])
    .controller('LunchController', function() {
        var vm = this;
        // Function to check the number of lunch items
        vm.checkLunch = function() {
            if (vm.lunchItems == undefined || vm.lunchItems == null) {
                vm.message = "Please enter data first";
                return;
            }
            // Split input by commas and trim each item
            var items = vm.lunchItems.split(',').map(item => item.trim()).filter(item => item.length > 0);
 
            // Determine the message based on the number of items
            if (vm.lunchItems.trim() === ''|| items.length <= 0) {
                vm.message = "Please enter data first";
            } else if (items.length <= 3) {
                vm.message = "Enjoy!";
            } else {
                vm.message = "Too much!";
            }
        };
    });
