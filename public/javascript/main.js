/*global define */
define([
    'lib/jquery'
], function (
    $
) {
	'use strict';

    jQuery('document').ready(function () {
        var $baguajing = jQuery('.baguajing');
        $baguajing.on('click', function () {
            jQuery('body').toggleClass('daytime nighttime');
        });

        var $clock = jQuery('.js_clock__digits');

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
});
