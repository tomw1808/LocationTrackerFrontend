(function() {
        'use strict';


        angular.module('angularLocationservice')
            .filter('mysqlDatetime', function () {
                return function (item) {
                    if (item instanceof Date) {
                        return item.getFullYear() + '-' + ('0' + (item.getMonth() + 1)).slice(-2) + '-' + ('0' + item.getDate()).slice(-2);
                    } else if (typeof item === 'string') {
                        var dateString = item.split(/[- :]/);
                        return Date.UTC(parseInt(dateString[0]), parseInt(dateString[1]) - 1, parseInt(dateString[2]), parseInt(dateString[3]), parseInt(dateString[4]), parseInt(dateString[5]));
                    }
                };
            });
    }
)();