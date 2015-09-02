/*global window, require, module */

'use strict';

////////// Dependencies
var React = require('react');

////////// Entry point

var ClockView = React.createClass({
    /**
     * On initializing this View, pass in the current time
     *
     * @return {!{hours: number, minutes: number, seconds: number}}
     */
    getInitialState: function () {
        return this.getTime();
    },

    render: function () {
        return (
            <div className="menu">
                <div className="menu__trigger framed framed--circle"></div>
                <div className="menu__title">
                    <span>[Nowhere]</span>
                    <time>
                        {this.state.hours < 10 ? '0' + this.state.hours : this.state.hours}:
                        {this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes}:
                        {this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds}
                    </time>
                </div>
            </div>
        );
    },

    /**
     * On mounting this View, kick off the ticking clock
     *
     * VOID->VOID
     */
    componentDidMount: function () {
        window.setInterval(this.updateTime, 1000);
    },

    ////////// Helpers
    /**
     * A convenience function that just returns a parsed time object
     * @return {!{hours: number, minutes: number, seconds: number}}
     */
    getTime: function () {
        var date = new Date();

        return {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        };
    },
    /**
     * A method that updates the time state of this View
     *
     * VOID->VOID
     */
    updateTime: function () {
        var time = this.getTime();

        this.setState({
            hours: time.hours,
            minutes: time.minutes,
            seconds: time.seconds
        });
    }
});

module.exports = ClockView;
