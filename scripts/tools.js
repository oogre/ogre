(function(){
	"use strict";
	/*global $:false */
	/*global OGRE:false */

	OGRE.TOOLS = (function(){
		var _xhr = function(request){
			//request.data = $.extend(request.data, {date : new Date().getTime()});
			return $.ajax(request);
		};

		var directoryParser = function(directory, parser){
			return directory.querySelectorAll(parser.selector).map(function(item){
				return parser.get(item);
			});
		};

		var fileFinder = function(conf, asynchrony){
			_xhr(conf.request)
			.done(function (data){
				directoryParser(data, OGRE.CONF.cleaner.autoindex).map(function(item){
					if(true === item.dir){
						var itemRequest = $.extend(true, {}, conf);
						itemRequest.request.url += item.name;
						fileFinder(itemRequest, asynchrony.witness());
					}else{
						asynchrony.witness().testify(conf.request.url+item.name);
					}
				});
			})
			.always(function(){
				asynchrony.testify();
			});
		};

		var xhrautoindex = function(conf){
			var asynchrony = OGRE.Asynchrony();
			fileFinder(conf, asynchrony.witness());
			return asynchrony;
		};

		return {
			getContents : function(callback){
				var contents = {};
				_xhr(OGRE.CONF.backhand.getContents.request).done(function(respons){
					if(respons.status && "ok" === respons.status){
						console.log(respons.data);
					}
/*
					Array.prototype.slice.call(arguments).map(function(view){
						var _view = view.replace(OGRE.CONF.backhand.getContents.request.url, "").split("/")
						var titre = _view.shift();
						var cat = _view.shift();
						var name = _view.shift();
						contents[titre] = contents[titre] || { name : titre};
						contents[titre][cat] = contents[titre][cat] || [];
						contents[titre][cat].push(view);
					});
					console.log(contents);
					callback(contents);*/
				});
			}
		};
	}());
}());