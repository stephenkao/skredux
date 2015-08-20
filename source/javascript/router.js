/*global module, require */

import React from 'react';
import { Router, Route, Link, DefaultRoute } from 'react-router';

var NavigationLayout = require('./page/home');
var BlogLayout = require('./page/blog');

var routes = (
    <Route path='/' handler={NavigationLayout}>
        <Route name='sanguine' path='/life' handler={NavigationLayout} />
        <Route name='melancholic' path='/scripts' handler={BlogLayout} />
        <Route name='phlegmatic' path='/mirth' handler={NavigationLayout} />
        <Route name='choleric' path='/toil' handler={NavigationLayout} />
    </Route>
);

module.exports = routes;
