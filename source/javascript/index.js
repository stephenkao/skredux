/*global window, require */

'use strict';

var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    RouteHandler = Router.RouteHandler,
    DefaultRoute = Router.DefaultRoute;

var HomeLayout = require('./page/home'),
    BlogLayout = require('./page/blog');

////////// Main app

var App = React.createClass({
    getInitialState: function () {
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        return {
            hour: hour,
            minute: minute,
            second: second
        };
    },

    clockTick: function(){
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        this.setState({hour: hour, minute: minute, second: second});
    },

    render: function () {
        return (
            <div className="main">
                <div className="menu">
                    <div className="menu__trigger framed framed--circle"></div>
                    <div className="menu__title">
                        <span>[Antechamber]</span>
                        <time>{this.state.hour}:{this.state.minute}:{this.state.second}</time>
                    </div>
                </div>

                <RouteHandler/>
            </div>
        );
    },

    componentDidMount: function () {
        window.setInterval(this.clockTick, 1000);
    }
});

var routes = (
    <Route handler={App}>
        <Route name="biography" path="biography" handler={HomeLayout} />
        <Route name="experience" path="experience" handler={HomeLayout} />
        <Route name="recreation" path="recreation" handler={HomeLayout} />
        <DefaultRoute handler={HomeLayout} />
    </Route>
);

window.onload = function () {
    Router.run(routes, Router.HistoryLocation, function (Handler, state) {
        React.render(<Handler />, document.body);
    });
};
