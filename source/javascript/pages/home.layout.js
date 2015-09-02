/*global module, require */

var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Link = Router.Link;

var HomeLayout, NavigationItem;

/*
HomeLayout = React.createClass({
    render: function () {
        return (
            <section className="vr-1">
                <div className="row">
                    <div className="column column--center small-12 medium-8 text--center">
                        <h1>this is the forest primeval</h1>
                    </div>
                </div>

                <nav className="navigation row vr-1">
                    <NavigationItem svgName="scylla" subtitle="mind" link="experience" />
                    <NavigationItem svgName="galley" subtitle="body" link="biography" />
                    <NavigationItem svgName="mirror" subtitle="spirit" link="recreation" />
                </nav>
            </section>
        );
    }
});
*/

HomeLayout = React.createClass({
    render: function () {
        return (
            <section className="vr-1">
                <div className="row">
                    <div className="column column--center small-12 medium-8 text--center">
                        <h1>something approaches</h1>
                        <h2 className="vr-1">10/10/15</h2>
                    </div>
                </div>
            </section>
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
            </div>
        );
    }
});

module.exports = HomeLayout;
