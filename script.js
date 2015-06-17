var webcamstream;

document.addEventListener("DOMContentLoaded", function() { 
	console.log("DOM fully loaded and parsed");

	var video = document.querySelector("video");
	var constraints = {audio: false, video: true};
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||     navigator.mozGetUserMedia;

	function successCallback(stream) 
	{
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

	function errorCallback(error)
	{
	    console.log("navigator.getUserMedia error: ", error);
	}

	navigator.getUserMedia(constraints, successCallback, errorCallback);
});

function recordVideo(){
	console.log("start recording");
	streamRecorder = webcamstream.record();
    setTimeout(stopRecording, 1000);
}

function stopRecording(){
	streamRecorder.getRecordedData(saveVideoToServer);
}

function saveVideoToServer(){
	var data = {};
	data.video = videoblob;
	data.metadata = 'test metadata';
	data.action = "upload_video";
	jQuery.post("/data", data, onSuccessSave);
}

function onSuccessSave(){
	console.log("fukkin saved!");
}