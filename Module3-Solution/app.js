(function () {
    'use strict';
  
    angular.module('MenuCategoriesApp', [])
      .controller('MenuCategoriesController', MenuCategoriesController)
      .service('MenuCategoriesService', MenuCategoriesService)
      .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
  
    MenuCategoriesController.$inject = ['MenuCategoriesService'];
    function MenuCategoriesController(MenuCategoriesService) {
      var menu = this;
  
      menu.searchTerm = "";
      menu.foundItems = [];
      menu.itemsToRemove = [];
  
      // Fetch menu categories
      var promise = MenuCategoriesService.getMenuCategories();
      promise.then(function (response) {
        menu.categories = response.data;
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
  
      // Function to get menu items for a category
      menu.logMenuItems = function (shortName) {
        var promise = MenuCategoriesService.getMenuForCategory(shortName);
        promise.then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      };
  
      // Function to search menu items
      menu.narrowDown = function () {
        if (!menu.searchTerm.trim()) {
          menu.foundItems = [];
          return;
        }
  
        var promise = MenuCategoriesService.getAllMenuItems();
        promise.then(function (response) {
          var allItems = response.data.menu_items;
          menu.foundItems = allItems.filter(function (item) {
            return item.description.toLowerCase().includes(menu.searchTerm.toLowerCase());
          });
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        });
      };
  
      // Function to remove an item from the found list
      menu.removeItem = function (itemIndex) {
        menu.foundItems.splice(itemIndex, 1);
      };
    }
  
    MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
    function MenuCategoriesService($http, ApiBasePath) {
      var service = this;
  
      // Get menu categories
      service.getMenuCategories = function () {
        return $http({
          method: "GET",
          url: (ApiBasePath + "/categories.json")
        });
      };
  
      // Get menu items for a specific category
      service.getMenuForCategory = function (shortName) {
        return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json"),
          params: {
            category: shortName
          }
        });
      };
  
      // Get all menu items
      service.getAllMenuItems = function () {
        return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        });
      };
    }
  
  })();
  