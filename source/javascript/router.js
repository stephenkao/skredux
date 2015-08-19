/*global module, require */

import React from 'react';
import { Router, Route, Link, DefaultRoute } from 'react-router';

var NavigationLayout = require('./page/home');
var BlogLayout = require('./page/home');

var routes = (
    <Route name='app' path='/' handler={NavigationLayout}>
        <Route name='sanguine' path='/' handler={NavigationLayout} />
        <Route name='melancholic' path='/' handler={NavigationLayout} />
        <Route name='phlegmatic' path='/' handler={NavigationLayout} />
        <Route name='choleric' path='/' handler={NavigationLayout} />
    </Route>
);

module.exports = routes;
