/*global window, require */

'use strict';

import $ from 'jquery';
import React from 'react';

$('document').ready(function () {
    // We create a function that will lazy load modules based on the current hash
    var resolveRoute = function () {
        var hash = window.location.hash;

        // If no hash or hash is '#' we lazy load the Home component
        if (!hash || hash.length === 1) {
            require.ensure([], function () {
                var NavigationList = require('./page/home');
                React.render(<NavigationList />, document.getElementById('js_main'));
            });
        } else if (hash === 'work') {
        }
    };

    // Resolve route on hash change
    window.onhashchange = resolveRoute;

    // Resolve current route
    resolveRoute();
});
