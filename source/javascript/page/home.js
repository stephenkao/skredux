/*global module */

import React from 'react';
import { RouteHandler, Link} from 'react-router';

var NavigationLayout, NavigationItem;

NavigationLayout = React.createClass({
    render: function () {
        return (
            <nav className='navigation row vr-1'>
                <NavigationItem svgName='mirror' subtitle='life' link='sanguine' />
                <NavigationItem svgName='bristle' subtitle='eyes' link='melancholic' />
                <NavigationItem svgName='scylla' subtitle='ears' link='phlegmatic' />
                <NavigationItem svgName='galley' subtitle='hands' link='choleric' />
            </nav>
        );
    }
});

NavigationItem = React.createClass({
    render: function () {
        return (
            <div className='navigation__item column small-6 medium-3'>
                <Link to={this.props.link}>
                    <div className='navigation__setaform'>
                        <img src={'./assets/svg/' + this.props.svgName + '.min.svg'} />

                        <span className='navigation__link'>{this.props.subtitle}</span>
                    </div>
                </Link>

                <RouteHandler />
            </div>
        );
    }
});

module.exports = NavigationLayout;
