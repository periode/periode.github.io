init = () => {

	var poem = document.getElementById("poem")
	var characters = ['<', '>', '/', '=', '\\', '"']

	setInterval(replace, 100)

	document.body.onwheel =  replace
}

replace = () => {
	if(Math.random() < 0.05){
		var text = poem.innerText
		var rand = Math.floor(Math.random()*text.length)
		var t1 = text.slice(0, rand)
		var t2 = text.slice(rand, text.length)
		var replaced_text = t1 + characters[Math.floor(Math.random()*characters.length)] + t2
		poem.innerText = replaced_text
	}
}

//duplicate instances of a word
duplicateInstance = (base_el, els) => {

}


//replace word by another word
replace = (word, replace) => {

}

//add subtext to line
addText = (text, type) => {
	if(type == "main"){

	}else if(type == "sub"){

	}
}

//change style
changeStyle = (text, style) => {

}

//insert things throughout poem
insertThroughout = (word) => {

}

//insert words in the following paragraph
insertAfter = (word, anchor) => {

}
