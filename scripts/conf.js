(function(){
	"use strict";
	/*global OGRE:false */

	OGRE.CONF = {
		colors : [	"#11d3d3","#dddefd","#d1f1ec",
					"#E60042","#CCF600","#AC2B50",
					"#A1B92E","#95002B","#85A000",
					"#969192","#F23D70","#DAFB3F",
					"#969293","#F23D70","#E3FB71"],
		version : "0.1",
		UI : {
			root : {
				selector : "#container"
			},
			list : {
				selector : "ul"
			},
			item : {
				title : {
					selector : ".titre"
				},
				text : {
					selector : ".text span"
				},
				gallery : {
					selector : ".gallery ul.container"
				},
				backbone :	"	<li>"+
							"		<article>"+
							"			<h1 class='row titre'></h1>"+
							"			<div class='row text'>"+
							"				<span class='col-xs-offset-3 col-sm-6'></span>"+
							"			</div>"+
							"			<div class='row gallery'>"+
							"				<ul class='list-unstyled container'></ul>"+
							"			</div>"+
							"		</article>"+
							"	</li>"
			}
		},
		backhand :{
			url : window.location.protocol+"//"+window.location.host,
			filename : "contents",
			getContents : {
				request :{
					url : "http://www.ogre.be/articles/"
				}
			}
		},
	
		cleaner : {
			autoindex : {
				selector : "a:not([href='../'])",
				get : function(elem){
					return {
						name : elem.innerHTML,
						dir : null !== elem.innerHTML.match(/\//g, "")
					};
				}
			}
		},

		
		init : function(){
			this.backhand.getContents.request.url = this.backhand.getContents.request.url.replace("{backhand_url}", this.backhand.url);
			delete this.init;
			return this;
		}
	}.init();
}());