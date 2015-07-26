/*global require */

'use strict';

var $ = require('./lib/jquery.js');

$('document').ready(function () {
    var $baguajing = $('.baguajing');
    $baguajing.on('click', function () {
        $('body').toggleClass('daytime nighttime');
    });

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
});
