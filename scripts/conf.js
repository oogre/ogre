window.OGRE.conf = (function(){
	return {
		version : '0.1',
		requests : {
			getArticles : function(){
				return {
					url : 'http://ogre.local/ogre/articles/',
					dataType : 'HTML',
					selector : '[href^="_"]',
					make : function(raw){
						var articleName = raw.getAttribute('href');
						return {
							name : articleName.substr(1, articleName.length-2),
							images : window.OGRE.tools.getImages(articleName),
							movies : window.OGRE.tools.getMovies(articleName),
							links : window.OGRE.tools.getLinks(articleName),
							texts : window.OGRE.tools.getTexts(articleName)
						};
					}
				}
			},
			getTexts : function(name){
				var _url = 'http://ogre.local/ogre/articles/'+name+'texts';
				return{
					url : _url,
					dataType : 'HTML',
					selector : '[href$=".txt"]',
					make : function(raw){
						return _url+'/'+raw.getAttribute('href');
					}
				}	
			},
			getLinks : function(name){
				var _url = 'http://ogre.local/ogre/articles/'+name+'links';
				return{
					url : _url,
					dataType : 'HTML',
					selector : '[href^="_"]',
					make : function(raw){
						return _url+'/'+raw.getAttribute('href');
					}
				}	
			},
			getImages : function(name){
				var _url = 'http://ogre.local/ogre/articles/'+name+'images';
				return{
					url : _url,
					dataType : 'HTML',
					selector : '[href^="_"][href$="jpg"], [href^="_"][href$="jpeg"], [href^="_"][href$="png"], [href^="_"][href$="gif"]',
					make : function(raw){
						return _url+'/'+raw.getAttribute('href');
					}
				}	
			},
			getMovies : function(name){
				var _url = 'http://ogre.local/ogre/articles/'+name+'movies';
				return{
					url : _url,
					dataType : 'HTML',
					selector : '[href^="_"]',
					make : function(raw){
						return _url+'/'+raw.getAttribute('href');
					}
				}	
			}
		}
	}
}())