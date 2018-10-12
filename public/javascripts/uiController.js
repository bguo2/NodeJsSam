var app = angular.module('myapp');

app.controller('homeController', function ($scope, $rootScope, $location, $filter, $http, $timeout) {
 
});

app.controller('epController', function ($scope, $rootScope, $routeParams, $location, $filter, $http, $timeout) {
    $scope.pageOffset = 0;
    $scope.searchField = null;
    $scope.searchValue = null;
    $scope.supportAccountId = $routeParams.id;
    $scope.epResult = {};
    $scope.totalCount = 0;
    $scope.curPage = 0;
    $scope.itemsOnPage = [5, 10, 20, 50];
    $scope.itemsPerPage = $scope.itemsOnPage[1];
    $scope.userAcctId = 159893;
    
    $scope.GetEPs = function(payload)
    {
        var config = {headers : {'Content-Type': 'application/json'}};
        $http.post('/ep', payload, config).then(
                function(response) {                    
                    $scope.epResult = {};
                    $scope.totalCount = response.data.totalCount;
                    for(var i = 0; i < response.data.eps.length; i++) {
                        var originData = response.data.eps[i];
                        if(originData.SerialNumber.length === 0) {
                            continue;
                        }
                        var index = 0;
                        if($scope.epResult[originData.SerialNumber]) {
                            index = $scope.epResult[originData.SerialNumber].length;
                        }
                        else {
                            $scope.epResult[originData.SerialNumber] = [];
                        }
                        $scope.epResult[originData.SerialNumber][index] = originData;            
                    }
                    
                    if($scope.curPage === 0) {
                        $scope.curPage = 1;
                        $scope.setPaginaton($scope);
                    }
                }
                , function(response) {
                    alert("Encountered an error, error code: " + response.status);
                    $scope.curPage = 0;
                    $scope.setPaginaton($scope);
                }
        );
    }

    //initial call
    var payload = {
        "accountId": $scope.userAcctId,
        "supportAccountId":  $scope.supportAccountId,
        "pageOffset": $scope.pageOffset,
        "pageCount": $scope.itemsPerPage,
	    "searchField": null,
	    "searchValue": null
    };
    $scope.GetEPs(payload);

    //pagination
    $scope.setPaginaton = function($scope) {
        var options = { 
            total: ($scope.totalCount / $scope.itemsPerPage) + 1,
            page: 1,
            maxVisible: 10,
            leaps: true,
            firstLastUse: true,
            first: '←',
            last: '→',
            wrapClass: 'pagination',
            activeClass: 'active',
            disabledClass: 'disabled',
            nextClass: 'next',
            prevClass: 'prev',
            lastClass: 'last',
            firstClass: 'first'            
        };
        $('#pagination').bootpag(options).on("page", function(event, num) {
            $scope.curPage = num;
            var payload = {
                "accountId": $scope.userAcctId,
                "supportAccountId":  $scope.supportAccountId,
                "pageOffset": (num - 1) * $scope.itemsPerPage,
                "pageCount": $scope.itemsPerPage,
                "searchField": null,
                "searchValue": null
            };
            $scope.GetEPs(payload);            
        });
    };

    //items on page change
    $scope.$watch('itemsPerPage', function(newValue, oldValue, scope) {
        if(newValue != oldValue) {
            $scope.curPage = 0;
            var payload = {
                "accountId": $scope.userAcctId,
                "supportAccountId":  $scope.supportAccountId,
                "pageOffset": 0,
                "pageCount": $scope.itemsPerPage,
                "searchField": null,
                "searchValue": null
            };
            $scope.GetEPs(payload);            
        }
    });
});

app.controller('aboutController', function ($scope, $rootScope, $location, $filter, $http, $timeout) {
    
});

app.controller('errorController', function ($scope, $rootScope, $location, $filter, $http, $timeout) {
    
});
