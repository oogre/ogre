window.OGRE.UI = function(){

	var _root = document.querySelector(window.OGRE.conf.UI.root.selector);
	var _list = _root.querySelector(window.OGRE.conf.UI.list.selector);
	var _article = $(window.OGRE.conf.UI.item.backbone)[0];


	var _updateArticlesPadding = function (paddingSize) {
		document.querySelectorAll('#container li').map(function(element){
			element.style.paddingTop = paddingSize+'px';
			element.style.paddingBottom = paddingSize+'px';
		});
	};

	var _updateSize = function(windowInnerHeight){
		_updateArticlesPadding( windowInnerHeight / 2 );
	}

	var init = (function(){
		var deferred = $.Deferred(); 
		_updateSize(window.innerHeight);
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
		}
	}
};