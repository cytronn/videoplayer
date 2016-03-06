/**
* SET UP
*/
var colorInterval;
var video = document.querySelector('video');
var start_duration;
var colorThief = new ColorThief(); 
var dominantColor;
var myImage;
var url = window.location.href;
var volume_memory = 1;
var player = {};


player.container       = document.querySelector('.player');
player.video           = player.container.querySelector('video');
player.seek_bar        = player.container.querySelector('.seek-bar');
player.progress_bar    = player.container.querySelector('.progress-bar');
player.preview         = player.container.querySelector('#previz');
player.full_screen     = player.container.querySelector('.full-screen');
player.volume_button   = player.container.querySelector('.volume-btn');
player.volume_bar      = player.container.querySelector('.volume-bar');
player.volume_progress = player.container.querySelector('.volume-progress');
player.forward         = player.container.querySelector('.forward');
player.backward        = player.container.querySelector('.backward');
player.play_button     = player.container.querySelector('.play-pause-button');
player.play_pause      = player.container.querySelector('.play-pause');
player.pause           = player.container.querySelector('.pause-support');
player.restart         = player.container.querySelector('.container-restart');
player.time_display    = player.container.querySelector('.time-container');
player.share           = player.container.querySelector('.share');




/**
* 1 - READING CUSTOM SHARE URL
*/

if(url[url.length-1] == 's'){
	player.video.currentTime = url.substring((url.indexOf('=')+1), url[url.length]).split('s')[0];
	player.video.addEventListener('loadedmetadata', function(){
		start_duration = time_management(player.video.currentTime) + '/' +  time_management(Math.floor(player.video.duration));
		player.time_display.innerHTML = start_duration;
	});
} 
else {
	player.video.addEventListener('loadedmetadata', function(){
		start_duration = time_management(0) + '/' +  time_management(Math.floor(player.video.duration));

		player.time_display.innerHTML = start_duration;

	});
}

/**
* 2 - SEEK BAR
*/

var interval;

window.setInterval(function(){
	var ratio = player.video.currentTime / player.video.duration;
	player.progress_bar.style.transform = 'scaleX(' + ratio + ')';
},100);

player.seek_bar.addEventListener('mousedown', function(e){

	var bounding_rect  = player.seek_bar.getBoundingClientRect(),
		pixel_position = e.clientX - bounding_rect.left,
		ratio		   = pixel_position / bounding_rect.width,
		time           = ratio * player.video.duration;

		player.video.currentTime = time;
	
});

var drag;

player.seek_bar.addEventListener('mousedown', function(e){
	drag = function(e){
		player.video.currentTime = refresh_video_time(e); 
		e.preventDefault();
	};
	window.addEventListener('mousemove',drag);
	e.preventDefault();
});

window.addEventListener('mouseup', function(e){
	window.removeEventListener('mousemove',drag);
	
});

player.seek_bar.addEventListener('click', function(e){
	player.video.currentTime = refresh_video_time(e); 
});

function refresh_video_time(e){
	var bounding_rect = player.seek_bar.getBoundingClientRect(), 
		x 			  = e.clientX - bounding_rect.left;
	
	player.time_display.innerHTML =time_management(Math.round(player.video.currentTime))  + '<span> / </span> ' +  time_management(player.video.duration);

	return (x / bounding_rect.width) * player.video.duration;
}

/**
* 3 - SOUND MANAGING
*/

player.volume_button.addEventListener('mouseover', function(){
	player.time_display.style.left = '300px';
});

player.volume_button.addEventListener('mouseout', function(){
	player.time_display.style.left = '150px';
});

var volume_interval;

window.setInterval(function(){
	var volume_ratio = player.video.volume;
	player.volume_progress.style.transform = 'scaleX(' + volume_ratio + ')';
},100);

player.volume_bar.addEventListener('mousedown', function(e){

	var bounding_rect  = player.volume_bar.getBoundingClientRect(),
		pixel_position = e.clientX - bounding_rect.left,
		volume         = pixel_position / 150;
		player.video.volume = volume;
	
	if(player.video.volume > 0.6){
		document.querySelector('.volume-btn > i').setAttribute('class', 'fa fa-volume-up fa-2x');
	}
	else if(player.video.volume < 0.6 && player.video.volume > 0){
		document.querySelector('.volume-btn > i').setAttribute('class', 'fa fa-volume-down fa-2x');
	}
	else if(player.video.volume === 0){
		document.querySelector('.volume-btn > i').setAttribute('class', 'fa fa-volume-off fa-2x');
	}
});

// creating a draggable effect on progress bar
var volume_drag;

// make the video time following mouse moves only when mouse click is down
player.volume_bar.addEventListener('mousedown', function(e){
	volume_drag = function(e){
		player.video.volume = refresh_video_volume(e); 
		if(player.video.volume > 0.6){
			document.querySelector('.volume-btn > i').setAttribute('class', 'fa fa-volume-up fa-2x');
		}
		else if(player.video.volume < 0.6 && player.video.volume > 0){
			document.querySelector('.volume-btn > i').setAttribute('class', 'fa fa-volume-down fa-2x');
		}
		else if (player.video.volume === 0){
			document.querySelector('.volume-btn > i').setAttribute('class', 'fa fa-volume-off fa-2x');

		}
		e.preventDefault();
	};
	window.addEventListener('mousemove',volume_drag);
	e.preventDefault();
});

// prevent the video time from following mouse when mouse is up
window.addEventListener('mouseup', function(e){
	window.removeEventListener('mousemove',volume_drag);
	
});

// player.seek_bar.addEventListener('click', function(e){
// 	player.video.currentTime = refresh_video_time(e); 
// });

// refresh video time compared to the progress bar position when asked
function refresh_video_volume(e){
	var bounding_rect = player.volume_bar.getBoundingClientRect(), 
		x 			  = e.clientX - bounding_rect.left;
		volume        = x / 150;

	if (volume <= 0) volume = 0;
	if (volume > 1) volume = 1;
	return volume;
}


player.volume_button.addEventListener('click', function(e){
	if(e.target === document.querySelector('.volume-btn > i')){
		if(player.video.volume > 0){
			volume_memory = player.video.volume;
			player.video.volume = 0;
			document.querySelector('.volume-btn > i').setAttribute('class', 'fa fa-volume-off fa-2x');
		} else{
			player.video.volume = volume_memory;

			if(player.video.volume > 0.6){
				document.querySelector('.volume-btn > i').setAttribute('class', 'fa fa-volume-up fa-2x');

			} else{
				document.querySelector('.volume-btn > i').setAttribute('class', 'fa fa-volume-down fa-2x');
			}
		}
	} else{
		refresh_video_volume(e);
	}
});

/**
* 4 - VIDEO PREVISUALIZATION
*/

player.seek_bar.addEventListener('mouseover', function(){
	
	var img = document.querySelector('#previzimg');
	var thecanvas = document.querySelector('#previzcanvas');

	player.seek_bar.addEventListener('mousemove', function(e){
		player.preview.style.display = 'inline-block';
		var bounding_rect  = player.seek_bar.getBoundingClientRect(),
		pixel_position = e.clientX - bounding_rect.left,
		ratio		   = pixel_position / bounding_rect.width,
		time           = ratio * player.video.duration;

		if( pixel_position < 100){
			player.preview.style.left = 0 + 'px';
		}
		else if(pixel_position > 1160 ){
			player.preview.style.left = 1125 +'px';
		} 
		else{
			player.preview.style.left = (e.clientX - 100) + "px";

		}
		player.preview.currentTime = time;
	});

});

player.seek_bar.addEventListener('mouseout', function(){
	player.preview.style.display = 'none';
});



/**
* 5 - PLAY PAUSE
*/


player.video.addEventListener('click', function(){
	if(player.video.currentTime == player.video.duration){
		player.restart.style.display = 'none';
		player.play_button.style.display = 'block';
		player.video.currentTime = 0;
		player.play_pause.setAttribute('class','play-pause pause');
	    player.pause.setAttribute('class', 'pause-support pause');
		player.video.play();
	}
	else{	
		if(player.video.paused){
			player.video.play();
	   		player.play_pause.setAttribute('class','play-pause pause');
	    	player.pause.setAttribute('class', 'pause-support pause');

		} else{
			player.video.pause();
			player.play_pause.setAttribute('class','play-pause play');
	    	player.pause.setAttribute('class', 'pause-support');
		}
	}
});

player.video.addEventListener('play', function(){
	player.container.classList.add('playing');
	player.container.classList.remove('paused');
});

player.video.addEventListener('pause', function(){
	player.container.classList.add('paused');
	player.container.classList.remove('playing');

});




/**
* 6 - AMBILIGHT
*/

video.onplay = function(){

	colorInterval  = window.setInterval(function(){

	var thecanvas = document.getElementById('thecanvas');
	var img = document.getElementById('thumbnail_img');
	
	draw( video, thecanvas, img);
	}, 1);
} ;

video.onpause = function(){
	clearInterval(colorInterval);
};

 

 
function draw( video, thecanvas, img ){

	// get the canvas context for drawing
	var context = thecanvas.getContext('2d');

	// draw the video contents into the canvas x, y, width, height
    context.drawImage( video, 0, 0, thecanvas.width, thecanvas.height);

	// get the image data from the canvas object
    var dataURL = thecanvas.toDataURL();

	// set the source of the img tag
	img.setAttribute('src', dataURL);

	myImage =  document.querySelector('#thumbnail_img');

	myImage.onload = function(){
		var colorThief = new ColorThief();
		var ambientColor = colorThief.getColor(myImage, 10);
		changeBackground(ambientColor);
	};

}

function changeBackground(ambientColor){
	document.querySelector('.gradients').style.background = '-webkit-radial-gradient(center, ellipse cover, rgba('+ambientColor[0]+','+ambientColor[1]+','+ambientColor[2]+',1) 0%, rgba(103,103,103,0)  70%)';

}


/**
* 7 - FULL SCREEN
*/


player.full_screen.addEventListener('click', function(){

	if (document.webkitIsFullScreen) {
		player.video.webkitExitFullscreen();
	}
	else {
  		player.video.webkitRequestFullscreen();

	}
});

/**
* 8 - FORWARD AND BACKWARD
*/

player.forward.addEventListener('click',function(){

	player.video.currentTime += 10;
	player.time_display.innerHTML = time_management(Math.round(player.video.currentTime)) + '<span> / </span> ' +  time_management(player.video.duration);

});

player.backward.addEventListener('click', function(){ 

	player.video.currentTime -= 10;
	player.time_display.innerHTML = time_management(Math.round(player.video.currentTime)) + '<span> / </span> ' +  time_management(player.video.duration);

});


/**
* 9 - PLAY AND PAUSE BUTTON
*/

var pause_support = document.querySelector('.pause-support');
function changeIt(){
var state = player.play_pause.getAttribute('class');

  if(state == 'play-pause play'){

    player.play_pause.setAttribute('class','play-pause pause');
    player.pause.setAttribute('class', 'pause-support pause');
  	player.video.play();

  }
    if(state == 'play-pause pause'){

    player.play_pause.setAttribute('class','play-pause play');
    player.pause.setAttribute('class', 'pause-support');
    player.video.pause();
  }
  return false;
}



/**
* 10 - RESTART BUTTON
*/

player.video.addEventListener('ended', function() {
if(player.video.currentTime === player.video.duration){

	player.restart.style.display = 'block';
	player.play_button.style.display = 'none';
}
});

player.restart.addEventListener('click', function(){

	player.restart.style.display = 'none';
	player.play_button.style.display = 'block';
	player.video.currentTime = 0;
	player.play_pause.setAttribute('class','play-pause pause');
    player.pause.setAttribute('class', 'pause-support pause');
	player.video.play();
});


/**
* 11 - TIME DISPLAY
*/

function time_management(duration){

	var current_duration = Math.round(parseInt(duration));
	var pretty_hours,
		pretty_minutes,
		pretty_seconds;

	if(duration === 0){
		pretty_time = '0:00';

		return pretty_time;
	}else{
		do{
			if(current_duration > 3600){
				var hours = current_duration / 3600;
					current_duration = current_duration - (hours * 3600);
					pretty_hours = hours < 10 ? '0' + hours : hours;
			}

			if(current_duration >= 60){
				var minutes = current_duration / 60;
					current_duration = current_duration -  (minutes * 60);
				 	pretty_minutes = minutes < 10 ?  '0' + minutes : minutes;

			}

			if(current_duration >= 1){
				var seconds = current_duration / 1;
					current_duration = current_duration - seconds;
					pretty_seconds = seconds < 10 ?  '0' + seconds : seconds;

			}
		}
		while(current_duration > 0);

			if( isNaN(pretty_hours) || pretty_hours === undefined){
				if(isNaN(pretty_minutes) || pretty_minutes === undefined){
					pretty_time = '0:' + pretty_seconds;
				} else{ 
					pretty_time = '0 <span>:</span>' + pretty_minutes + ': ' + pretty_seconds;
				}
			} else pretty_time  = pretty_hours + ' <span>:</span> ' + pretty_minutes + '<span>: </span> ' + pretty_seconds;

		return pretty_time;
	}
}


player.video.addEventListener('play', function(){

	window.setInterval(function(){

		player.time_display.innerHTML = time_management(Math.round(player.video.currentTime)) + '<span> / </span> ' +  time_management(player.video.duration);

	},1000);
}); 

/**
* 12 - PLAYING RATE
*/

player.rates = player.container.querySelectorAll('.playing-rate li');

player.rates_list = document.querySelector(".playing-rate ul");

player.rates_list.addEventListener("click", selectRate, false);
 
function selectRate(e) {

	player.rates = document.querySelectorAll('.playing-rate li');
	for (var i = 0; i < player.rates.length; i++){
		player.rates[i].setAttribute('class','');
	}
    if (e.target !== e.currentTarget) {
    	if(e.target !== player.rates_list){
    		e.target.setAttribute('class', 'rate-selected');
    		changeRate(e.target);
    	}
    }
    e.stopPropagation();
}

function changeRate(element){
	var rate = element.getAttribute('rate');
	player.video.playbackRate = rate;
}


/**
* 13 - SHARE
*/

function time_out(action) {
    var timeOut = setTimeout(action, 3000);
	
}

function fade(){
	document.querySelector('.url-copied').style.opacity = 0;
}

player.share.addEventListener('click', function(){
	if(url[url.length-1] == 's'){
		url = url.slice(0, url.indexOf('?'));
	}

 	document.querySelector('.url-copied').style.opacity = 1;
 	document.querySelector('.share-url').innerHTML = url + '?t=' + Math.floor(player.video.currentTime)+'s';
 	document.querySelector('.share-url').select();
 	document.querySelector('.url-copied').innerHTML = 'THE URL HAS BEEN COPIED TO THE CLIPBOARD';
 	time_out(fade);
  	try {
	    var successful = document.execCommand('copy');
	  } 
	catch (err) {
 		document.querySelector('.url-copied').innerHTML = 'COULDNT COPY';
	}
});


