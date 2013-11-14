
var recording = -1;
var clicking = -1;
var dur = 0;
var vol = 0;
var cameras = [];
var speakers = [];

var flashReady = function() {
	flash.connect("rtmp://localhost/SMSServer");
}

var connected = function(success, error) {
	if(success) {
		flash.startPlaying('hobbit_vp6.flv');

		vol = flash.getVolume();
		console.log(vol*100);
		$('.vscrubber').css('background-position', String(vol*100)+'%');

		cameras = flash.getCameras();

		$(cameras).each(function(index) {
			$('.camera').append('<option>'+cameras[index]+'</option>');
		});

		speakers = flash.getMicrophones();
		
		$(speakers).each(function(index) {
			$('.speaker').append('<option>'+speakers[index]+'</option>');
		});
	}
}

var seekTime = function(time) {
	var prc = (time/dur) * 100;
	$('.scrubber').css('background-position',(String(prc)+'%'));
}

var getDuration = function(duration) {
	dur = duration;
}

$('.play').click(function(e) {
	flash.playPause();
});

$('.record').click(function(e) {
	recording *= -1;
	if(recording == -1) {
		flash.stopRecording();
	}else {
		flash.startRecording('my_reaction', 0, 0);
	}
});

$('.scrubber').mousedown(function(e) {
	clicking*=-1;
	var prc = (e.pageX - $(this).offset().left)/400;
	prc*=100;
	flash.setTime((dur/100)*prc);
});

$('.vscrubber').mousedown(function(e) {
	clicking*=-1;
	var prc = (e.pageX - $(this).offset().left)/200;
	flash.setVolume(prc);
	$('.vscrubber').css('background-position', String(prc*100)+'%');
});

$('.scrubber').mousemove(function(e) {
	if(clicking == 1) {
		var prc = (e.pageX - $(this).offset().left)/400;
		prc*=100;
		flash.setTime((dur/100)*prc);
	}
});

$('.vscrubber').mousemove(function(e) {
	if(clicking == 1) {
		var prc = (e.pageX - $(this).offset().left)/200;
		flash.setVolume(prc);
		$('.vscrubber').css('background-position', String(prc*100)+'%');
	}
});

$('.vscrubber').mouseup(function(e){clicking*=-1;});
$('.scrubber').mouseup(function(e){clicking*=-1;});







