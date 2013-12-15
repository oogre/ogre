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
	};
	Number.prototype.map = function(istart, istop, ostart, ostop) {
      	return ostart + (ostop - ostart) * ((this - istart) / (istop - istart));
    };

	window.OGRE = function(){
		var self = window.OGRE;

		var init = (function(){
			var deferred = $.Deferred(); 
			self.tools.getArticles(null, function(articles){
				$.when.apply(null, articles.map(function(article){
					return article.deferred;
				}))
				.always(function(){
					self.articles = articles;
					new window.OGRE.UI().ready(function(UI){
						window.addEventListener('resize', UI.updateWindowSize, false);
						$.when.apply(null, articles.map(function(article){
							return UI.addArticle(article);
						}))
						.always(function(){
							UI.updateWindowSize();
							deferred.resolve();	
						});

					});
				});
			});
			return deferred.promise()
		}());

		return {
			ready : function(fnc){
				var self = this;
				init.done(function(){
					fnc(self);
				});
				return this;
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
	window.OGRE.getScript('UI.js');	
}());

jQuery().ready(function(){
	OGRE().ready(function(o){
		var article = $(window.location.hash);
		0 < article.length && window.scrollTo(window.scrollY, article.position().top);

		document.querySelectorAll('a').map(function(elem){
			elem.addEventListener('mouseover', function(event){
				$(event.target).animate({
					'color' : OGRE.conf.colors[Math.floor(Math.random() * OGRE.conf.colors.length)]
				},200);
			}, false);
			elem.addEventListener('mouseout', function(event){ 
				$(event.target).animate({
					'color': "#0000ff"
				},200);
			}, false);
			elem.setAttribute('target', '_blank');
		});
		var footer = document.querySelector('footer');
		window.addEventListener('scroll', function(){
			footer.style.opacity = Math.max(window.scrollY.map(0, 100, 1.0, 0.0), 0.0);
		}, false);
	});
});

