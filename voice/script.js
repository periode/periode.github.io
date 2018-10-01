var voice;
// voice.onEnd = nextWord;
var words;
var current_word = 0;

var canSpeak = true;
var autocontinue = true;

var input_text_holder;
var saved_text_holder;

var keyboard_shortcuts = true;

document.addEventListener('load', function(){
	input_text_holder = document.getElementById('input_text_holder');
	saved_text_holder = document.getElementById('saved_text_holder');

});

function setup(){
	voice = new p5.Speech('Thomas');
	voice.interrupt = true;
	voice.setVolume(0.7);
	voice.setRate(0.9);
	voice.setPitch(1);

	input_text_holder = document.getElementById('input_text_holder');
	saved_text_holder = document.getElementById('saved_text_holder');

	saveText();
}

function draw(){

}

function speak(){
	voice.speak(speech[current_word]);

	if(autocontinue)
		nextWord();
}

function readFullText(){
	var full_speech = speech.join(' ');
	voice.speak(full_speech);
}

function saveText(){

	eraseText();

	speech = input_text_holder.value.split(' ');
	for(var i = 0; i < speech.length; i++){
		var node = document.createElement('span');
		node.className = "utterance";
		var word = speech[i].replace(',', '.');
		node.innerText = word+" ";
		saved_text_holder.appendChild(node);
	}
	// saved_text_holder.innerText = speech.join('~');
	current_word = 0;
	updateWordHighlight();
}

function setNewVoice(_voice){
	voice.setVoice(_voice);
}

function hardStop(){
	voice.cancel();
}

function pause(){
	voice.pause();
}

function resume(){
	voice.resume();
}

function eraseText(){
	while(document.getElementsByClassName('utterance').length > 0){
		document.getElementsByClassName('utterance')[0].remove();
	}
}

function updateVolume(_val){
	voice.setVolume(_val);
	document.getElementById("volume_value").innerText = _val;
}

function updateRate(_val){
	voice.setRate(_val);
	document.getElementById("rate_value").innerText = _val;
}

function updatePitch(_val){
	voice.setPitch(_val);
	document.getElementById("pitch_value").innerText = _val;
}

function nextWord(){
	if(current_word < speech.length-1)
		current_word++;
	else {
		current_word = 0;
	}

	updateWordHighlight();
}

function previousWord(){
	if(current_word > 0)
		current_word--;
	else {
		current_word = speech.length
	}

	updateWordHighlight();
}

function updateWordHighlight(){
	// var whole_speech = document.getElementsByClassName("utterance");
	// 
	// for(var i = 0; i < whole_speech.length; i++){
	// 	whole_speech[i].style.backgroundColor = 'white';
	// }
	// 
	// whole_speech[current_word].style.backgroundColor = 'rgb(250, 234, 128)';

}

function keyPressed(){
	if(keyboard_shortcuts){
		if(key == 'a' || key == 'A')
			previousWord();

		if(key == 's' || key == 'S')
			saveText();

		if(key == 'd' || key == 'D')
			nextWord();

		if(key == 'f' || key == 'F')
			readFullText();
	}
}

function isInputting(){
	keyboard_shortcuts = false;
}

function isNotInputting(){
	keyboard_shortcuts = true;
}
