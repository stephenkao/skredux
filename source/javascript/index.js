/*global window, require */

'use strict';

var React = require('react');
var Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

var HomeLayout = require('./page/home'),
    BlogLayout = require('./page/blog');

var routes = (
    <Route path="/" handler={HomeLayout}>
        <Route name="sanguine" path="life" handler={HomeLayout} />
        <Route name="melancholic" path="scripts" handler={BlogLayout} />
        <Route name="phlegmatic" path="mirth" handler={HomeLayout} />
        <Route name="choleric" path="toil" handler={HomeLayout} />
    </Route>
);

window.onload = function () {
    Router.run(routes, Router.HistoryLocation, function (Handler, state) {
        React.render(<Handler />, document.getElementById('js_main'));
    });
};
