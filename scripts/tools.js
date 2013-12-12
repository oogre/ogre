window.OGRE.tools = {
	getContents : function(request, name, callback){
		var result = [];
		$.ajax(request(name))
		.done(function(html){
			var self = this;
			html.querySelectorAll(self.selector)
			.map(function(raw){
				result.push(self.make(raw));
			});
			callback && callback(result);
		});
		return result;
	},
	getArticles : function(callback){
		return window.OGRE.tools.getContents(window.OGRE.conf.requests.getArticles, null, callback);
	},
	getImages : function(articleName){
		return window.OGRE.tools.getContents(window.OGRE.conf.requests.getImages, articleName);
	},
	getMovies : function(articleName){
		return window.OGRE.tools.getContents(window.OGRE.conf.requests.getMovies, articleName);
	},
	getLinks : function(articleName){
		return window.OGRE.tools.getContents(window.OGRE.conf.requests.getLinks, articleName);
	},
	getTexts : function(articleName){
		return window.OGRE.tools.getContents(window.OGRE.conf.requests.getTexts, articleName);
	}
}