window.OGRE.UI = function(){

	var _root = document.querySelector(window.OGRE.conf.UI.root.selector);
	var _list = _root.querySelector(window.OGRE.conf.UI.list.selector);
	
	var _createPictureViewer = function(gallery, images){
		if(undefined === images || 0 === images.length){
			gallery.parentNode.parentNode.removeChild(gallery.parentNode);	
			return;
		}

		gallery.style.width = 100.0 * images.length +'%';
		images.map(function(src){
			var li = document.createElement('li');
			gallery.appendChild(li);
			li.style.backgroundImage = 'url("'+src+'")';
			li.style.width = 100.0 / images.length +'%';
		});



		gallery.parentNode.style.backgroundColor = OGRE.conf.colors[Math.floor(Math.random() * OGRE.conf.colors.length)];
		
		gallery.parentNode.addEventListener('click', function(){
			var self = $(this);
			self.toggleClass('fullscreen');
			window.scrollTo(window.scrollY, self.position().top);
			var onScroll = function(){
				if(Math.abs(window.scrollY - self.position().top)>50){
					window.removeEventListener('scroll', onScroll, false);
					self.toggleClass('fullscreen');
				}
			};
			window.addEventListener('scroll', onScroll, false);
		}, false);
	};

	var _addArticle = function(article){
		var item = $(window.OGRE.conf.UI.item.backbone)[0];
		_list.appendChild(item);
		item.setAttribute('id', article.name);
		_createPictureViewer(item.querySelector(window.OGRE.conf.UI.item.gallery.selector), article.images);
		var title = item.querySelector(window.OGRE.conf.UI.item.title.selector);
		var text = item.querySelector(window.OGRE.conf.UI.item.text.selector);
		return $.when($.ajax(article.title[0]), $.ajax(article.texts[0])).done(function(title_value, text_vallue) {
			title.innerHTML = title_value[0];
			text.innerHTML = text_vallue[0];
		});
	}
	
	var _updateArticlesSpacing = function (paddingSize) {
		document.querySelectorAll('#container li article').map(function(element){
			element.style.paddingBottom = paddingSize+'px';
		});

		var firstArticle = document.querySelector('#container li article');
		firstArticle.style.paddingTop = (paddingSize / 2)+'px';
		firstArticle.style.paddingBottom = paddingSize+'px';
	};

	var _updateSize = function(windowInnerHeight){
		_updateArticlesSpacing( windowInnerHeight);
	}

	var init = (function(){
		var deferred = $.Deferred(); 
		deferred.resolve();
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
		updateWindowSize : function(){
			_updateSize(window.innerHeight);
			return this;
		},
		addArticle : function(article) {
			return _addArticle(article);
		}
	}
};