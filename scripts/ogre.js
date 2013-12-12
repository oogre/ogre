(function() {
	String.prototype.querySelector = function(selector){
		var htmlObject = document.createElement('div');
		htmlObject.innerHTML = this;
		return htmlObject.querySelector("div " + selector);
	};
	String.prototype.querySelectorAll = function(selector){
		var htmlObject = document.createElement('div');
		htmlObject.innerHTML = this;
		return htmlObject.querySelectorAll("div " + selector);
	};
	NodeList.prototype.map = function(fnc){
		return Array.prototype.slice.call(this).map(fnc);
	};
	Array.prototype.last = function(){
		return this[this.length-1];
	};
	Array.prototype.first = function(){
		return this[0];
	}

	window.OGRE = function(){
		var self = window.OGRE;
		
		var init = (function(){
			var deferred = $.Deferred(); 
			self.tools.getArticles(function(articles){
				self.articles = articles;
				deferred.resolve();
			})
			return deferred.promise()
		}());

		return {
			ready : function(fnc){
				var self = this;
				init.done(function(){
					fnc(self);
				});
				return this;
			},
			getArticles : function(){
				return self.articles;
			}
		}
	};
	window.OGRE.FILE = document.querySelector("[src$='ogre.js']").src
	window.OGRE.PATH = window.OGRE.FILE.substr(0, window.OGRE.FILE.length - window.OGRE.FILE.split('/').pop().length);
	window.OGRE.getScript = function(name) {
		document.write('<script src="' + ('/' === name.substr(0, 1) ? '' : window.OGRE.PATH) + '' + name + '" type="text/javascript"></script>');	
	};
	window.OGRE.getScript('conf.js');
	window.OGRE.getScript('tools.js');
}())