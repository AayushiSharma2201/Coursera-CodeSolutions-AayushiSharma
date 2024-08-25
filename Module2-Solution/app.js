// Define the AngularJS module and controller
angular.module('shoppingApp', [])
    .controller('MainController', function() {
        var vm = this;

        // Initialize lists with sample data
        vm.toBuyList = [
            { name: 'cookies', quantity: 10 },
            { name: 'milk', quantity: 2 },
            { name: 'bread', quantity: 1 },
            { name: 'apples', quantity: 5 },
            { name: 'chicken', quantity: 3 }
        ];

        vm.boughtList = [];

        // Function to handle buying an item
        vm.buyItem = function(item) {
            // Find the index of the item in the toBuyList
            var index = vm.toBuyList.indexOf(item);

            // Remove the item from the toBuyList
            if (index > -1) {
                vm.toBuyList.splice(index, 1);
            }

            // Add the item to the boughtList
            vm.boughtList.push(item);
        };
    });
