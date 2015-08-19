/*global window, require */

'use strict';

import Router from 'react-router';
import React from 'react';

var routes = require('./router');

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler />, document.getElementById('js_main'));
});
