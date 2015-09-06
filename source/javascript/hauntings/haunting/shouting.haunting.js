/*global require */

'use strict';

var $ = require('js/lib/jquery'),
    $window = $(window),
    $what = $('.js_what'),
    oldText = 'you\'re not here ',
    text = '',
    index = 0;

if ($what.length) {
    var what = window.setInterval(function () {
        $what.text(text);
        text = text + oldText.charAt(index % oldText.length);
        index += 1;

        if (index >= 12) {
            window.clearInterval(what);

            window.setTimeout(function () {
                $what.append('<p style="font-size: 2em; line-height: 0.5; margin-bottom: 0;">you\'re not here </p>');
                $window.scrollTop(9999);
            }, 100);
            window.setTimeout(function () {
                $what.append('<p style="font-size: 4em; line-height: 0.5; margin-bottom: 0;">you\'re not here </p>');
                $window.scrollTop(9999);
            }, 1000);
            window.setTimeout(function () {
                $what.append('<p style="font-size: 8em; line-height: 0.5; margin-bottom: 0;">you\'re not here </p>');
                $window.scrollTop(9999);
            }, 2000);
            window.setTimeout(function () {
                $what.append('<p style="font-size: 10em; line-height: 0.5; margin-bottom: 0;">you\'re not here </p>');
                $window.scrollTop(9999);
            }, 3500);
            window.setTimeout(function () {
                $what.append('<p style="font-size: 20em; line-height: 0.5; margin-bottom: 0;">you\'re not here </p>');
                $window.scrollTop(9999);
            }, 5000);
            window.setTimeout(function () {
                $what.append('<p style="font-size: 40em; line-height: 0.5; margin-bottom: 0;">you\'re not her<a href="https://en.wikipedia.org/wiki/Proof_that_e_is_irrational">e</a> </p>');
                $window.scrollTop(9999);
            }, 6000);
        }
    }, 25);
}
