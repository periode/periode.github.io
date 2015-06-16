document.addEventListener("DOMContentLoaded", function() { 
	console.log("DOM fully loaded and parsed");

	var video = document.querySelector("video");
	var constraints = {audio: false, video: true};
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||     navigator.mozGetUserMedia;

	function successCallback(stream) 
	{
	  window.stream = stream; // stream available to console
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