'use strict';

module.exports = cursor;

cursor.$inject = [];

function cursor() {
    return {
        restrict: 'A',
        link: function ($scope, element) {
            $scope.$on('cursor-move', move);

            function move(event, { x, y }) {
                element[0].style.top = `${y}px`;
                element[0].style.left = `${x}px`;
            }
        }
    }
}