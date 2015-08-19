import React from 'react';
import { Router, Route, Link } from 'react-router';
import NavigationLayout from 'home';

var routes = (
    <Route name='app' path='/' handler={App}>
        <DefaultRoute handler={NavigationLayout} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});
