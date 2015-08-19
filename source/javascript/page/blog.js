/*global module */

import React from 'react';
import { RouteHandler, Link} from 'react-router';

var BlogLayout, BlogPost;

BlogLayout = React.createClass({
    render: function () {
        return (
            <ul>
                <BlogPost />
                <BlogPost />
                <BlogPost />
                <BlogPost />
                <BlogPost />
                <BlogPost />
                <BlogPost />
                <BlogPost />
                <BlogPost />
            </ul>
        );
    }
});

BlogPost = React.createClass({
    render: function () {
        return (
            <div>
                <p style={{color: 'black'}}>POST POST POST</p>
            </div>
        );
    }
});

module.exports = BlogLayout;
