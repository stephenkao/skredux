/*global require */

////////// Dependencies
var React = require('react');

var Gallery;

export default Gallery = React.createClass({
    render: function () {
        return (
            <section>
                <div className="row">
                    <div className="column small-14 medium-8">
                        <div className="framed framed--square">
                            <iframe className="embed" width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/221405380&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
                        </div>
                    </div>

                    <div className="column small-14 medium-6">
                        <div className="framed framed--square">
                            <img alt="Dog-tired" className="embed" src="https://scontent-lga1-1.cdninstagram.com/hphotos-xfa1/t51.2885-15/e35/11253614_1514900288802266_61360257_n.jpg" />
                        </div>
                    </div>
                </div>

                <div className="row rhythm-1">
                    <div className="column small-14 medium-6">
                        <div className="framed framed--square">
                            <img alt="Dog-tired" className="embed" src="https://scontent-lga1-1.cdninstagram.com/hphotos-xfa1/t51.2885-15/e35/11253614_1514900288802266_61360257_n.jpg" />
                        </div>
                    </div>

                    <div className="column small-14 medium-8">
                        <div className="framed framed--square">
                            <iframe className="embed" width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/221405380&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});
