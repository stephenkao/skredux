/*global define */
define([
        'lib/jquery'
], function (
        $
) {
	'use strict';

        jQuery('document').ready(function () {
                var $baguajing = jQuery('.baguajing');

                $baguajing.on('click', '.trigram',  function () {
                        var $this = jQuery(this);

                        $baguajing
                                .removeClass(function (index, className) {
                                        debugger;

                                        return (className.match(/spun--[1-9]/g) || []).join(' ');
                                })
                                .addClass('spun--' + ($this.index() + 1));
                });
        });
});
