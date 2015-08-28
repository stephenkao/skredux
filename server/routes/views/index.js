/*global require, exports, module */

var keystone = require('keystone'),
    _ = require('underscore');

exports = module.exports = function (req, res) {
    var corruption = req.query.corruption ? parseInt(req.query.corruption, 10) : parseInt(req.cookies.skcorrupt, 10),
        view = new keystone.View(req, res),
        locals = res.locals;

    locals.data.paragraphs = {};
    locals.data.posts = [];
    locals.section = 'index';

    ////////// Set up the paragraphs
    locals.data.paragraphs.introduction = [
        '<redacted_3>I\'m not sure where </redacted_3>he is<redacted_3>.  Or if he\'s even alive at this point.\
           He could be </redacted_3>lying in pieces, getting scraped off the subway tracks<redacted_3> for all I know.\
           Or he could be in the Bahamas, </redacted_3>laughing<redacted_3> his ass off at me for thinking this.</redacted_3>',

        '<redacted_3>In any case, he left a lot of his things here.\
           Considering the nearly opaque layers of dust, it doesn\'t look like it\'s been touched in a while.\
           If you have some time, take a look around and see if you can find something.</redacted_3>',

        '<redacted_3>Just be careful.  I have a bad feeling about this place.</redacted_3>'
    ];

    locals.data.paragraphs.biography = [
        'I don\'t know if everything is true, but it\'s all I could find.',

        '<a href="/">Stephen</a> was born on <redacted_0>February 24</redacted_0>, 1989, \
           a habitually taciturn son of <redacted_0>Ming-Lai</redacted_0> and <redacted_0>Grace</redacted_0> Kao.\
           As a self-diagnosed and -proclaimed dyssemic child,\
           he found solace in various forms of escapism, ranging from <redacted_1>literature</redacted_1> and <redacted_1>writing</redacted_1> to <redacted_1>video games</redacted_1> and <redacted_1>television</redacted_1>.',

        'After graduating from <redacted_2>Emmaus High School</redacted_2> in 2007,\
           he attended the <redacted_2>University of Pittsburgh</redacted_2>,\
           majoring in <redacted_3>computer science and Chinese</redacted_3>. \
           He always showed a perverse interest in <redacted_2>linguistics and morphology</redacted_2>, \
           but any hopes he had of pursuing a career in it were dashed by callous pragmatism.',

        'From 2007 through 2013, he worked as an engineer at the <redacted_4>Pittsburgh-based</redacted_4> startup <a href="http://flashgroup.com"><redacted_4>Flashgroup Inc</redacted_4></a>.\
           Before his disappearance, he was last seen working at <a href="http://gawker.com"><redacted_4>Gawker Media</redacted_4></a> in <redacted_4>New York</redacted_4> as a front-end engineer.'
    ];

    // Redact certain details depending on the current corruption level
    corruption = corruption || 0;
    var regexpString = corruption ? '<redacted_[0-' + corruption + ']{1}>([\\w\\-\\s\',\\.]*)</redacted_[0-' + corruption + ']{1}>' : '<redacted_0>([\\w\\-\\s\',\\.]*)</redacted_0>',
        redactRegexp = new RegExp(regexpString, 'g');

    _.each(locals.data.paragraphs, function (paragraphs, type) {
        locals.data.paragraphs[type] = _.map(paragraphs, function (paragraph) {
            return paragraph.replace(redactRegexp, function (matchString, group) {
                var retVal = '';

                for (var i = 0; i < group.length; ++i) {
                    retVal += '&#9608;';
                }

                return retVal;
            });
        });
    });

    // Load the posts
    view.on('init', function(next) {

        var q = keystone.list('Post').model.find()
                .where('state', 'published')
                .populate('author categories')
                .sort('-publishedDate')
                .limit(3);

        q.exec(function(err, results) {
            var posts = _.pluck(results, '_doc');

            locals.data.posts = posts;

            next(err);
        });

    });


    // antechamber
    // workshop
    // library
    // gallery
    locals.data.map = [
        [0, 0, 0, 0],
        [0, 'g', 0, 0],
        [0, 'w', 'l', 0],
        [0, 'a', 0, 0]
    ];

    view.render('index');
};
