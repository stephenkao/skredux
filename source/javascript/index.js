/*global window, require */

'use strict';

import $ from 'jquery';
import React from 'react';

$('document').ready(function () {
    // We create a function that will lazy load modules based on the current hash
    var resolveRoute = function () {

        // If no hash or hash is '#' we lazy load the Home component
        if (!window.location.hash || window.location.hash.length === 1) {
            require.ensure([], function () {
                var NavigationList = require('./page/home');
                React.render(<NavigationList />, document.getElementById('js_main'));
            });
        }
    };

    // Resolve route on hash change
    window.onhashchange = resolveRoute;

    // Resolve current route
    resolveRoute();
    var $window = $(window);
    $window.scrollTop(0);
});
