var stream;
//var video = document.getElementById('webcam');
var video = document.querySelector('video');

document.addEventListener("DOMContentLoaded", function() { 

	navigator.webkitGetUserMedia(
		{video: true, audio: true}, // Options
		function(localMediaStream) { // Success

			stream = localMediaStream;
			video.src = window.URL.createObjectURL(stream);
		},
		function(err) { // Failure
			alert('getUserMedia failed: Code ' + err.code);
		}
	);
});