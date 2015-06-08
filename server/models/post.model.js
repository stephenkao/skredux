/*global require */
(function () {
    'use strict';

    /**
     * Post Model
     * ==========
     */
    var keystone = require('keystone'),
        Types = keystone.Field.Types,
        PostModel;

    PostModel = new keystone.List('Post', {
        map: {
            name: 'title'
        },
        autokey: {
            path: 'slug',
            from: 'title',
            unique: true
        }
    });

    PostModel.add({
        title: {
            type: String,
            required: true
        },
        state: {
            type: Types.Select,
            options: 'draft, published, archived',
            default: 'draft',
            index: true
        },
        author: {
            type: Types.Relationship,
            ref: 'User',
            index: true
        },
        publishedDate: {
            type: Types.Date,
            index: true,
            dependsOn: {
                state: 'published'
            }
        },
        image: {
            type: Types.CloudinaryImage
        },
        content: {
            brief: {
                type: Types.Html,
                wysiwyg: true,
                height: 150
            },
            extended: {
                type: Types.Html,
                wysiwyg: true,
                height: 400
            }
        },
        categories: {
            type: Types.Relationship,
            ref: 'PostCategory',
            many: true
        }
    });

    PostModel.schema.virtual('content.full').get(function() {
        return this.content.extended || this.content.brief;
    });

    PostModel.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';

    PostModel.register();
}());
