/*global require */

'use strict';

var $ = require('./lib/jquery.js');

$('document').ready(function () {
    ////////// Update the clock
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

    ////////// Toggle inventory
    var $inventory = $('.js_inventory'),
        $inventoryTrigger = $('.js_inventory-trigger');
    $inventoryTrigger.on('click', function () {
        $inventory.toggleClass('shown');
    });

    ////////// Crazy
    var $what = $('.js_what'),
        oldText = 'you\'re not here ',
        text = '',
        index = 0;

    var what = window.setInterval(function () {
        $what.text(text);
        text = text + oldText.charAt(index % oldText.length);
        index += 1;

        if (index >= 500) {
            window.clearInterval(what);

            window.setTimeout(function () {
                $what.append('<p style="font-size: 2em;">you\'re not here </p>');
            }, 100);
            window.setTimeout(function () {
                $what.append('<p style="font-size: 4em;">you\'re not here </p>');
            }, 1000);
            window.setTimeout(function () {
                $what.append('<p style="font-size: 8em;">you\'re not here </p>');
            }, 2000);
            window.setTimeout(function () {
                $what.append('<p style="font-size: 10em;">you\'re not here </p>');
            }, 3000);
            window.setTimeout(function () {
                $what.append('<p style="font-size: 20em;">you\'re not here </p>');
            }, 4000);
            window.setTimeout(function () {
                $what.append('<p style="font-size: 20em;">you\'re not her<a href="https://en.wikipedia.org/wiki/Proof_that_e_is_irrational">e</a> </p>');
            }, 6000);
        }
    }, 25);
});
