/**
 * Created by ydurur on 23/01/16.
 */

var app = angular.module('addUserApp', ["firebase","ngMessages"]),
    fireBaseUrl = "https://shining-torch-9442.firebaseio.com";


app.factory("userLists", ["$firebaseArray",
    function($firebaseArray) {
        // create a reference to the database location where we will store our data
        var ref = new Firebase(fireBaseUrl+'/users');
        var query = ref.orderByChild("name").limitToLast(10);
        // this uses AngularFire to create the synchronized array
        return $firebaseArray(query);
    }
]);

app.factory("User", ["$firebaseObject",
    function($firebaseObject) {
        return function(userKey) {
            // create a reference to the database node where we will store our data
            var ref = new Firebase(fireBaseUrl+'/users');
            var userRef = ref.child(userKey);
            // return it as a synchronized object
            return $firebaseObject(userRef);
        }
    }
]);

app.controller('addUserCtrl', ['$scope', '$firebaseObject', 'userLists', 'User', '$timeout',
    function($scope, $firebaseObject, userLists, User, $timeout){
        $scope.usersList = userLists;
        $scope.showAdded = false;

        $scope.submitForm = function() {
            $scope.usersList.$add({
                id: $scope.addUserForm.userId.$viewValue,
                name: $scope.addUserForm.userName.$viewValue,
                phone: $scope.addUserForm.userPhone.$viewValue,
                email : $scope.addUserForm.userEmail.$viewValue,
                username : $scope.addUserForm.userName.$viewValue,
                website : $scope.addUserForm.userWebSite.$viewValue,
                address: {
                    city: $scope.addUserForm.city,
                    street: $scope.addUserForm.street,
                    suite: $scope.addUserForm.suite,
                    zipcode: $scope.addUserForm.zipCode
                }
            }).then(function(ref) {
                $scope.showAdded = true;
                var id = ref.key();
                document.getElementById("addUserForm").reset();
                console.log("added record with id " + id);
            });

            $timeout(function() {
                $scope.showAdded = false;
            },2000);

        };

    }
]);

