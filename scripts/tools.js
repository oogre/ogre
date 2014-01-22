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
						var articles = respons.data;
						for(var titre in articles){
							var article = articles[titre];
							for(var cat in article){
								contents[titre] = contents[titre] || { name : titre};
								contents[titre][cat] = contents[titre][cat] || [];
								article[cat].map(function(element){
									contents[titre][cat].push(respons.directory+titre+'/'+cat+'/'+element);
								});
							}
						}
					}
					callback(contents);
				});
			}
		};
	}());
}());