window.OGRE.conf = (function(){
	var backhand = window.location.protocol+'//'+window.location.host+'/';
	return {
		colors : [	"#11d3d3","#dddefd","#d1f1ec",
					"#E60042","#CCF600","#AC2B50",
					"#A1B92E","#95002B","#85A000",
					"#969192","#F23D70","#DAFB3F",
					"#969293","#F23D70","#E3FB71"],
		version : '0.1',
		UI : {
			root : {
				selector : '#container'
			},
			list : {
				selector : 'ul'
			},
			item : {
				title : {
					selector : '.titre'
				},
				text : {
					selector : '.text span'
				},
				gallery : {
					selector : '.gallery ul'
				},
				backbone : 	'	<li>'+
							'		<article>'+
							'			<h1 class="row titre"></h1>'+
							'			<div class="row text">'+
							'				<span class="col-xs-offset-3 col-sm-6"></span>'+
							'			</div>'+
							'			<div class="row gallery">'+
							'				<ul class="list-unstyled"></ul>'+
							'			</div>'+
							'		</article>'+
							'	</li>'
			}
		},
		requests : {
			
			getArticles : function(){
				
				return {
					url : backhand+'/articles/',
					dataType : 'HTML',
					selector : '[href^="_"]',
					make : function(raw){
						var articleName = raw.getAttribute('href');
						var image_deferred = $.Deferred();
						var movies_deferred = $.Deferred();
						var link_deferred = $.Deferred();
						var texts_deferred = $.Deferred();
						var title_deferred = $.Deferred();
						var deferred = $.when(image_deferred, movies_deferred, link_deferred, texts_deferred, title_deferred);
						return {
							deferred : deferred,
							name : articleName.substr(1, articleName.length-2),
							images : window.OGRE.tools.getImages(articleName, function(){image_deferred.resolve()}),
							movies : window.OGRE.tools.getMovies(articleName, function(){movies_deferred.resolve()}),
							links : window.OGRE.tools.getLinks(articleName, function(){link_deferred.resolve()}),
							texts : window.OGRE.tools.getTexts(articleName, function(){texts_deferred.resolve()}),
							title : window.OGRE.tools.getTitle(articleName, function(){title_deferred.resolve()})
						};
					}
				}
			},
			getTexts : function(name){
				var _url = backhand+'articles/'+name+'texts';
				return{
					url : _url,
					dataType : 'HTML',
					selector : '[href$=".txt"]',
					make : function(raw){
						return _url+'/'+raw.getAttribute('href');
					}
				}	
			},
			getTitle : function(name){
				var _url = backhand+'articles/'+name+'title';
				return{
					url : _url,
					dataType : 'HTML',
					selector : '[href$=".html"]',
					make : function(raw){
						return _url+'/'+raw.getAttribute('href');
					}
				}	
			},
			getLinks : function(name){
				var _url = backhand+'articles/'+name+'links';
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
				var _url = backhand+'articles/'+name+'images';
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
				var _url = backhand+'articles/'+name+'movies';
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