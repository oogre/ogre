var ScrollList = function(gallery){
	var images = OGRE.articles[0].images;
	gallery.style.width = 100 * images.length +'%';
	images.map(function(src){
		var li = document.createElement('li');
		gallery.appendChild(li);
		li.style.backgroundImage = 'url("'+src+'")';
		li.style.width = 100.0 / images.length +'%';
	});
}