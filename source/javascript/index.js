/*global window, require */

'use strict';

////////// Dependencies
var $ = require('jquery'),
	React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    RouteHandler = Router.RouteHandler,
    DefaultRoute = Router.DefaultRoute;

var HomeLayout = require('./pages/home.layout'),
    ClockView = require('./components/clock.view');

////////// Entry point

var AppLayout = React.createClass({
    render: function () {
        return (
            <div>
                <ClockView />
                <RouteHandler/>
            </div>
        );
    }
});

// @TODO: Date-/content-hash the routes so they can't be predictably navigated to by URL
var routes = (
    <Route handler={AppLayout}>
        <Route name="biography" path="biography" handler={HomeLayout} />
        <Route name="experience" path="experience" handler={HomeLayout} />
        <Route name="recreation" path="recreation" handler={HomeLayout} />
        <DefaultRoute handler={HomeLayout} />
    </Route>
);

window.onload = function () {
    var body = document.body;

    Router.run(routes, Router.HistoryLocation, function (Handler, state) {
        React.render(<Handler />, document.getElementById('js_page'));
    });
};
