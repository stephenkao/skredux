/*global require */

'use strict';

require('js/view/haunting/shouting.haunting');

var $ = require('js/lib/jquery');

$('document').ready(function () {
    var $window = $(window);
    $window.scrollTop(0);

    ////////// Update the clock -- if not completely corrupted
    if (!$('body').hasClass('corruption-4')) {
        var $clock = $('.js_clock__digits');

        var updateClock = function () {
            var now = new Date(),
                hours = now.getHours(),
                minutes = now.getMinutes(),
                seconds = now.getSeconds();

            hours = (hours < 10) ? '0' + hours : hours;
            minutes = (minutes < 10) ? '0' + minutes : minutes;
            seconds = (seconds < 10) ? '0' + seconds : seconds;

            $clock.text(hours + ':' + minutes + ':' + seconds);
        };

        updateClock();
        window.setInterval(updateClock, 100);
    }

    ////////// Toggle inventory
    var $inventory = $('.js_inventory'),
        $inventoryTrigger = $('.js_inventory-trigger');

    $inventoryTrigger.on('click', function () {
        $inventoryTrigger.toggleClass('active');
        $inventory.toggleClass('shown');
    });

    window.setTimeout(function () {
        $inventoryTrigger.addClass('ping');
    }, 5000);
});
