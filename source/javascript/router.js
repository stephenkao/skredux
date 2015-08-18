import React from 'react';
import { Router, Route, Link } from 'react-router';

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
React.render((
    <Router history={history}>

    <Route path="/" component={Home}>
        <Route path="about" component={About}/>
        <Route path="users" component={Users}>
            <Route path="/user/:userId" component={User}/>
        </Route>
        <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
), document.body);
