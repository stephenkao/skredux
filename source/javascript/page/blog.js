/*global module, require */

var React = require('react');

var BlogLayout, BlogPost;

BlogLayout = React.createClass({
    render: function () {
        debugger;

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
