/*global require, module */
(function () {
	var MongoClient, PostsData;

	MongoClient = require('mongodb').MongoClient;
	MongoClient.connect('mongodb://localhost:27017/stephenkao', function(err, db) {
		if (err) {
			console.warn(err.message);
		}
	});

	PostsData = {
		getLatest: function () {
		}
	};

	module.exports = PostsData;
})();
