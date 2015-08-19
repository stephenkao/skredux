/*global module */

import React from 'react';
import classNames from 'classNames';

var NavigationLayout, NavigationItem;

NavigationLayout = React.createClass({
    render: function () {
        return (
            <nav className='navigation row vr-1'>
                <NavigationItem svgName='mirror' subtitle='life' />
                <NavigationItem svgName='bristle' subtitle='eyes' />
                <NavigationItem svgName='scylla' subtitle='ears' />
                <NavigationItem svgName='galley' subtitle='hands' />
            </nav>
        );
    }
});

NavigationItem = React.createClass({
    render: function () {
        return (
            <div className='navigation__item column small-6 medium-3'>
                <a>
                    <div className='navigation__setaform'>
                        <img src={'./target/svg/' + this.props.svgName + '.min.svg'} />

                        <span className='navigation__link'>{this.props.subtitle}</span>
                    </div>
                </a>
            </div>
        );
    }
});

module.exports = NavigationLayout;
