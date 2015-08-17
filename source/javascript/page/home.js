import React from 'react';

var NavigationList, NavigationItem;

NavigationList = React.createClass({
    render: function () {
        return (
            <nav className='navigation row vr-3'>
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
            <div className='navigation__item column small-7 medium-3'>
                <a>
                    <div className='navigation__setaform'>
                        <img src={'./target/svg/' + this.props.svgName + '.min.svg'} />

                        <span className='navigation__link'>{this.props.subtitle}</span>
                    </div>
                </a>
            </div>
        )
    }
});

module.exports = NavigationList;
