/*global module, require */

var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Link = Router.Link;

var HomeLayout, NavigationItem;

HomeLayout = React.createClass({
    render: function () {
        return (
            <section>
                <p>
                    Haven't seen you here before.
                    <a href="/">Stephen</a>'s been gone awhile.
                    Might be dead, who cares?
                </p>

                <p>
                    Left a load of crap.
                    Depressing journal entries, pictures of his dog, that kinda shit.
                    Seems a sorry-ass loser if you ask me.
                </p>

                <p>
                    Seeing if there's anything valuable, no luck yet.
                    Take a look around, what do I care.
                    Just gimme a cut if you find something.
                </p>

                -

                <p>
                    You again?  <a href="/">Stephen</a>'s still gone.
                </p>

                -

                <p>
                    Getting real sick of seeing your ugly mug.
                </p>
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
