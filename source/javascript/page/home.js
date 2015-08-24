/*global module, require */


var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Link = Router.Link;

var HomeLayout, NavigationItem;

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
                    <NavigationItem svgName="mirror" subtitle="body" link="sanguine" />
                    <NavigationItem svgName="bristle" subtitle="eyes" link="melancholic" />
                    <NavigationItem svgName="scylla" subtitle="mind" link="phlegmatic" />
                    <NavigationItem svgName="galley" subtitle="hands" link="choleric" />
                </nav>
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
