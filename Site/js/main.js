
var recording = -1;
var dur = 0;
var vol = 0;
var cameras = [];
var speakers = [];

var flashReady = function() {
	console.log('ready');
	flash.connect("rtmp://localhost/SMSServer");
}

var connected = function(success, error) {
	if(success) {
		flash.startPlaying('hobbit_vp6.flv');

		vol = flash.getVolume();
		$('.vscrubber').css('margin-left', vol*4);

		cameras = flash.getCameras();

		$(cameras).each(function(index) {
			$('.camera').append('<option>'+cameras[index]+'</option>');
		});

		speakers = flash.getMicrophones();
		
		$(speakers).each(function(index) {
			$('.speaker').append('<option>'+speakers[index]+'</option>');
		});
	}else {
		console.log('fuck you');
	}
}

var seekTime = function(time) {
	var prc = (time/dur) * 100;
	$('.scrubber').css('margin-left',(prc*4));
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

$('.slider').click(function(e) {
	var prc = (e.pageX - $(this).offset().left)/400;
	console.log(prc*=100);
	flash.setTime((dur/100)*prc);
});

$('.vslider').click(function(e) {
	var prc = (e.pageX - $(this).offset().left)/400;
	flash.setVolume(prc*=100);
	$('.vscrubber').css('margin-left', prc*4);
});