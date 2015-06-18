var canvas;
var dataUrl;
var reqAnimFrame = null;
var canvasW;
var canvasH;
var frames = [];
var video;
var constraints;

document.addEventListener("DOMContentLoaded", function() { 
	console.log("DOM fully loaded and parsed");

	canvas = document.querySelector('canvas');
	dataUrl = canvas.toDataURL('image/webp', 1);

	reqAnimFrame;
	frames = [];
	canvasW = canvas.width;
	canvasH = canvas.height;

	video = document.querySelector("video");
	constraints = {audio: false, video: true};
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||     navigator.mozGetUserMedia;

	function successCallback(stream) {
	  window.stream = stream; // stream available to console
	  webcamstream = stream;
	  if (window.URL) 
	    {
	         video.src = window.URL.createObjectURL(stream);
	    } else 
	    {
	         video.src = stream;
	    }
	}

	function errorCallback(error){
	    console.log("navigator.getUserMedia error: ", error);
	}

	navigator.getUserMedia(constraints, successCallback, errorCallback);
});

function startRecording(){
	console.log("started recording");
	var ctx = canvas.getContext('2d');
	function drawVideoFrame(time){
		reqAnimFrame = requestAnimationFrame(drawVideoFrame);
		//ctx.drawImage(video, 0, 0, canvasW, canvasH);
		frames.push(dataUrl);
	}

	reqAnimFrame = requestAnimationFrame(drawVideoFrame);
}
	
function stopRecording(){
	console.log("stopping recording...");
	cancelAnimationFrame(reqAnimFrame);

	var webmBlob = Whammy.fromImageArray(frames, 1000/60);
	var videoOut = document.createElement('video');
	videoOut.style.width = canvas.height + 'px';
	videoOut.style.height = canvas.height + 'px';
	videoOut.src = window.URL.createObjectURL(webmBlob);
	videoOut.autoplay = true;

	document.querySelector('#container').appendChild(videoOut);

	console.log("recording stopped");
	embedVideoPreview(window.URL.createObjectURL(webmBlob));
}

function embedVideoPreview(optional_url) {

	var url = optional_url || null;
	console.log('url : ' + url);
	var video = document.querySelector('#video-preview video') || null;

	if (!video) {
		console.log('no video');
		video = document.createElement('video');
		video.autoplay = true;
		video.controls = false;
		video.loop = true;
		video.style.width = canvas.width + 'px';
		video.style.height = canvas.height + 'px';
		document.querySelector('#video-preview').appendChild(video);
	} else {
		window.URL.revokeObjectURL(video.src);
	}

	if (!url) {
		console.log('no url');
		var webmBlob = Whammy.fromImageArray(frames, 1000 / 60);
		url = window.URL.createObjectURL(webmBlob);
	}

	video.src = url;
  //the 'url' variable is the video that should be posted to db?
}