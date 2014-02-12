(function(){
	"use strict";
	/*global OGRE:false */
	/*global $:false */
	OGRE.UI = function(){

		var _root = document.querySelector(window.OGRE.CONF.UI.root.selector);
		var _list = _root.querySelector(window.OGRE.CONF.UI.list.selector);
		
		var _createPictureViewer = function(gallery, images){
			if(undefined === images || 0 === images.length){
				gallery.parentNode.parentNode.removeChild(gallery.parentNode);
				return;
			}

			gallery.style.width = 100.0 * images.length +"%";
			images.map(function(src){
				var li = document.createElement("li");
				gallery.appendChild(li);
				li.style.backgroundImage = "url(\""+src+"\")";
				li.style.width = 100.0 / images.length +"%";
			});

			gallery.parentNode.style.backgroundColor = OGRE.CONF.colors[Math.floor(Math.random() * OGRE.CONF.colors.length)];
			

			var setfullscreen = document.querySelector(".setfullscreen");
			var setswitch = document.querySelector(".switch");
			
			gallery.parentNode.addEventListener("mousedown", function() {
				gallery.ismousedown = true;
			}, false);
			gallery.parentNode.addEventListener("mouseup", function() {
				gallery.ismousedown = false;
				_ajustScroll(gallery);
			}, false);


			gallery.parentNode.addEventListener("click", function(){
				var self = this;
				switch(this.style.cursor){
					case "w-resize":
						_scrollTo(this, this.scrollLeft-1);
					break;
					case "e-resize":
						_scrollTo(this, this.scrollLeft+1);
					break;
					case "none":
						this.classList.remove("fullscreen");
					break;
					default:
						this.classList.toggle("fullscreen");
						$(setfullscreen).toggleClass("hide");
						this.setAttribute("v_scroll_origine", window.scrollY);
						window.scrollTo(window.scrollY, $(this).position().top);
						var onScroll = function(){
							if(Math.abs(window.scrollY - self.getAttribute("v_scroll_origine"))>50){
								$(self).removeClass("fullscreen");
								setfullscreen.classList.add("hide");
							}
						};
						window.addEventListener("scroll", onScroll, false);
					break;
				}
			}, false);

			gallery.oldscrollLeft= 0;
			gallery.parentNode.addEventListener("scroll", function(){
				_ajustScroll(gallery);
			}, false);


			gallery.parentNode.addEventListener("mousemove", function(event){
				var x = event.x / this.offsetWidth * 100;
				setswitch.classList.add("hide");
				if(x < 33){
					setfullscreen.classList.add("hide");
					if(0 === this.scrollLeft){
						this.style.cursor = "none";
					}
					else{
						setswitch.classList.remove("hide");
						this.style.cursor = "w-resize";
					}
				}
				else if(x < 66){
					this.style.cursor = "pointer";
					if(false === this.classList.contains("fullscreen")){
						setfullscreen.classList.remove("hide");
					}
				}
				else{
					setfullscreen.classList.add("hide");
					if(0 === this.scrollWidth - this.scrollLeft - this.offsetWidth){
						this.style.cursor = "none";
					}
					else{
						setswitch.classList.remove("hide");
						this.style.cursor = "e-resize";
					}
				}
			}, false);

			gallery.parentNode.addEventListener("mouseover", function() {
			
			}, false);

			gallery.parentNode.addEventListener("mouseleave", function() {
				//setswitch.classList.add("hide");
				setfullscreen.classList.add("hide");
			}, false);

		};

		var _ajustScroll = function(elem){
			var self = elem.parentNode;
			
			var position = self.scrollLeft / $(self).width();
			var destination = (elem.oldscrollLeft - self.scrollLeft<0 ? Math.ceil(position) : Math.floor(position)) * $(self).width();
			elem.oldscrollLeft = self.scrollLeft;
			clearTimeout(elem.timer);
			elem.timer = setTimeout(function(){
				if(!elem.ismousedown){
					_scrollTo(elem.parentNode, destination);
				}
			}, 75);/**/
		};

		var _scrollTo = function(selected, destination){
			var start = Date.now();
			var time = 75;
			var position = selected.scrollLeft;
			
			var scroll = function(){
				var progress = Math.min(Math.max(Date.now() - start, 0), time);
				selected.scrollLeft = progress.map(0, time, position, destination);
				if (progress < time) {
					window.requestAnimationFrame(scroll);
				}
			};
			window.requestAnimationFrame(scroll);
		};


		var _addArticle = function(article){
			var item = $(window.OGRE.CONF.UI.item.backbone)[0];
			_list.appendChild(item);
			item.setAttribute("id", article.name);
			_createPictureViewer(item.querySelector(window.OGRE.CONF.UI.item.gallery.selector), article.images);
			var title = item.querySelector(window.OGRE.CONF.UI.item.title.selector);
			var text = item.querySelector(window.OGRE.CONF.UI.item.text.selector);
			return $.when($.ajax(article.title[0]), $.ajax(article.texts[0])).done(function(title_value, text_vallue) {
				title.innerHTML = title_value[0];
				text.innerHTML = text_vallue[0];
			});
		};
		
		var _updateArticlesSpacing = function (paddingSize) {
			document.querySelectorAll("#container li article").map(function(element){
				element.style.paddingBottom = paddingSize+"px";
			});

			var firstArticle = document.querySelector("#container li article");
			firstArticle.style.paddingTop = (paddingSize / 2)+"px";
			firstArticle.style.paddingBottom = paddingSize+"px";
		};

		var _updateSize = function(windowInnerHeight){
			_updateArticlesSpacing( windowInnerHeight);
			var articles = Array.prototype.slice.call(_list.children);
			articles.shift();
			/* FIX GALLERY POSITION 
			articles.map(function(article){
				_scrollTo(article.querySelector(".gallery"));
			});*/
		};

		var init = (function(){
			var deferred = $.Deferred();
			deferred.resolve();
			return deferred.promise();
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
		};
	};
}());