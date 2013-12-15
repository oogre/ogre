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
		})
		.fail(function(){
			callback && callback();
		});
		return result;
	},
	getArticles : function(articleName, callback){
		return window.OGRE.tools.getContents(window.OGRE.conf.requests.getArticles, null, callback);
	},
	getImages : function(articleName, callback){
		return window.OGRE.tools.getContents(window.OGRE.conf.requests.getImages, articleName, callback);
	},
	getTitle : function(articleName, callback){
		return window.OGRE.tools.getContents(window.OGRE.conf.requests.getTitle, articleName, callback);
	},
	getMovies : function(articleName, callback){
		return window.OGRE.tools.getContents(window.OGRE.conf.requests.getMovies, articleName, callback);
	},
	getLinks : function(articleName, callback){
		return window.OGRE.tools.getContents(window.OGRE.conf.requests.getLinks, articleName, callback);
	},
	getTexts : function(articleName, callback){
		return window.OGRE.tools.getContents(window.OGRE.conf.requests.getTexts, articleName, callback);
	}
}