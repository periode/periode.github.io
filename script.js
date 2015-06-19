var canvas;
var dataUrl;
var dataUrlPNG;
var dataPNG;
var asArray;
var reqAnimFrame = null;
var canvasW;
var canvasH;
var frames = [];
var framesPNG = [];
var framesDataPNG = [];
var video;
var constraints;

document.addEventListener("DOMContentLoaded", function() { 
	console.log("DOM fully loaded and parsed");

	canvas = document.querySelector('canvas');
	dataUrl = canvas.toDataURL('image/webp', 1);
	dataUrlPNG = canvas.toDataURL('image/png', 1);

	//encoding as PNG but it has to be done in startRecording()
	dataPNG = atob(dataUrlPNG.substring("data:image/png;base64,0".length))
	asArray = new Uint8Array(dataPNG.length);

	for(var i = 0; i < dataPNG.length; i++){
		asArray[i] = dataPNG.charCodeAt(i);
	}

	var blob = new Blob([ asArray.buffer ], {type: "image/png"});

	//resuming animation
	reqAnimFrame;
	frames = [];
	framesPNG = [];
	//canvasW = canvas.width;
	//canvasH = canvas.height;
	canvasW = 320;
	canvasH = 240;

	video = document.querySelector("video");
	constraints = {audio: false, video: true};
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||     navigator.mozGetUserMedia;

	function successCallback(stream) {
	  	window.stream = stream; // stream available to console

	  	if (window.URL){
	         video.src = window.URL.createObjectURL(stream);
	    }else{
	         video.src = stream;
	    }

		finishVideoSetup();
	}

	function errorCallback(error){
	    console.log("navigator.getUserMedia error: ", error);
	}

	var finishVideoSetup = function(){
		setTimeout(function(){
			video.width = 320;
			video.height = 240;
			canvas.width = video.width;
      		canvas.height = video.height;
		}, 1000);
	}
	navigator.getUserMedia(constraints, successCallback, errorCallback);
});

//show question and text input
function showQuestion(){
	var questionContainer = document.querySelector('#questionContainer');
	var textInputContainer = document.querySelector('#textInputContainer');

	var question = document.createElement('h3');
	question.innerHTML = 'what is regret ?';
	questionContainer.appendChild(question);

	var textInput = document.createElement('input');
	textInput.type = 'text';
	//textInput.placeholder = 'answer here';
	textInputContainer.appendChild(textInput);

	//TODO transform the 'stop' button into a 'submit' button)
}


function startRecording(){
	showQuestion();
	console.log("started recording");

	var ctx = canvas.getContext('2d');

	function drawVideoFrame(time){
		reqAnimFrame = requestAnimationFrame(drawVideoFrame);
		ctx.drawImage(video, 0, 0, canvasW, canvasH);

		//saving each image in an array
		dataUrl = canvas.toDataURL('image/webp', 1);
		dataUrlPNG = canvas.toDataURL('image/png', 1);
		frames.push(dataUrl);
		framesPNG.push(dataUrlPNG);
		console.log("png: "+framesPNG[dataUrlPNG]);
	}

	reqAnimFrame = requestAnimationFrame(drawVideoFrame);
}
	
function stopRecording(){
	console.log("stopping recording...");
	console.log(frames.length + ' frames stored');
	cancelAnimationFrame(reqAnimFrame);
	embedVideoPreview();
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
		video.style.width = canvasW + 'px';
		video.style.height = canvasH + 'px';
		document.querySelector('#video-preview').appendChild(video);
	} else {
		window.URL.revokeObjectURL(video.src);
	}

	if (!url) {
		console.log('no url');
		var webmBlob = Whammy.fromImageArray(frames, 1000 / 60);
		console.log('embedPreview: '+webmBlob);
		url = window.URL.createObjectURL(webmBlob);
		console.log('urlPreview: ' + url);
	}

	video.src = url;
  //the 'url' variable is the video that should be posted to db?
}

function getJPEG(){
	console.log('framesPNG: '+framesPNG);
	if(!framesPNG){
		for(var i = 0; i < framesPNG; i++){
			console.log('img #'+i+': '+framesPNG[i]);
		}
	}
}