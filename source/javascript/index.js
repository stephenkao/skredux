/*global window, require */

'use strict';

////////// Dependencies
var $ = require('jquery'),
	React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    RouteHandler = Router.RouteHandler,
    DefaultRoute = Router.DefaultRoute;

////////// Rooms
var Antechamber = require('./rooms/antechamber'),
    Gallery = require('./rooms/gallery');

////////// Tools
var Clock = require('./tools/clock');

////////// Entry point
var AppLayout = React.createClass({
    render: function () {
        return (
            <div>
                <RouteHandler/>
            </div>
        );
    }
});

// @TODO: Date-/content-hash the routes so they can't be predictably navigated to by URL
var routes = (
    <Route handler={AppLayout}>
        <DefaultRoute handler={Gallery} />
    </Route>
);

window.onload = function () {
    var body = document.body;

    // Bind the pre-rendered clock
    React.render(<Clock />, document.getElementById('js_menu'));

    Router.run(routes, Router.HistoryLocation, function (Handler, state) {
        React.render(<Handler />, document.getElementById('js_main'));
    });
};
