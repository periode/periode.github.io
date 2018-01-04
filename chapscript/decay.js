let poem

let characters = ['<', '>', '/', '=', '\\', '"']

let replacements = {
	'sweat':'vaso-motor system glitch/evolution',
	'mother': 'versus progeny',
	'skin': 'paper',
	'see': 'to touch',
	'insignia': '<s>insignia</s>',
	'gift': 'I feel a gift is difficult',
	'speech': '<s>speech</s>',
	'screen': 'screens [See the <a href="https://enoughproject.org/files/CorporateRankings2012.pdf">2012 Conflict Minerals Electronics Company Ranking</a>]'
}

let subtexts = {
	'indigo': 'women dye indigo men pour metal',
	'climacteric': 'climacteric/tipping point',
	'patriot': 'patriot and refugee make each other',
	'tycoon': 'referring to the 2016 US presidential election',
	'with':'between',
	'wind':'<i>I, Lall: The Poems of Lal Ded</i>, translated by Ranjit Hoskote',
	'extract': 'Are you a college student interested in working with your college to be conflict mineral free?',
	'sung': 'sung by Ms. Eupheme Cooper',
	'cadmium': '[Cadmium used in contacts and switches in electroplating, and in rechargeable nickel-cadmium batteries used in many laptop computers]',
	'whales': '"Why Killer Whales Go Through Menopause" by Steph Yien, <i>NY Times,</i> January 12, 2017"',
	'maps': 'The government and rebel armues finance their operations through mining tin, tantalum and tungsten (known as the 3 Ts)',
	'airport': '[at Kochi airport, February 2017]',
	'culture': '<i>Culture of One, by Alice Notley',
	'rights': 'From Civil Rights to Human Rights: Martin Luther King Jr., and the Struggle for Economic Justice by Thomas F. Jackson',
	'pulp':'‘A Crack in an Antarctic Ice Shelf Grew 17 Miles in the Last Two Months’ by Jugal K. Patel, <i>NY Times</i>, February 7, 2017',
	'autology': '<i>The Empire of Live</i> by Elizabeth Povinelli',
	'blues': '‘Why Do Ladies Sing the Blues? Indigo Dyeing, Cloth Production, and Gender Symbolism in Kodi’ by Janet Hoskins in <i>Cloth and Human Experience</i>'
}

let inserts = {
	'dis': 'DIS-',
	'inaudible': '<i>[inaudible]</i>',
	'freedom': 'until her freedom is finally<br><br>to know their freedom was never<br><br>	for her<br>'
}

init = () => {

	poem = document.getElementById("poem")

	//setInterval(replace, 100)
	//document.body.onwheel =  replace
	setupListeners()
}

setupListeners = () => {

		let word_replacements = document.querySelectorAll('.replace-word')
		for(i in word_replacements){
			if(word_replacements[i].className){
				let tag = word_replacements[i].className.split(' ')[2]
				let repl = replacements[tag]
				word_replacements[i].addEventListener('click', ()=>{replaceWord(tag, repl)})
			}

		}

		let line_inserts = document.querySelectorAll('.insert-line')
		for(i in line_inserts){
			if(line_inserts[i].className){
				let tag = line_inserts[i].className.split(' ')[2]
				let repl = subtexts[tag]
				line_inserts[i].addEventListener('click', ()=>{addText(tag, repl)});
			}
		}

		let word_inserts = document.querySelectorAll('.insert')
		for(i in word_inserts){
			if(word_inserts[i].className){
				let tag = word_inserts[i].className.split(' ')[2]
				word_inserts[i].onclick = function(){insertThroughout(inserts[tag])}
			}
		}
}

replace = () => {
	if(Math.random() < 0.05){
		var text = poem.innerHTML
		var rand = Math.floor(Math.random()*text.length)
		var t1 = text.slice(0, rand)
		var t2 = text.slice(rand, text.length)
		var replaced_text = t1 + characters[Math.floor(Math.random()*characters.length)] + t2
		poem.innerHTML = replaced_text
	}
}

//duplicate instances of a word
duplicateInstance = (base_el, els) => {

}


//replace word by another word
replaceWord = (tag, repl) => {
	let all_words = document.querySelectorAll(".sweat")
	console.log(all_words);
	for(index in all_words){
			all_words[index].innerHTML = repl
	}

}

//add subtext to line
addText = (tag, addition) => {
	document.getElementById(tag).innerHTML = "<br>"+addition+"<br>"
	document.getElementById(tag).setAttribute('id', 'decayed')
}

//insert things throughout poem
insertThroughout = (word) => {
	let all_words = poem.innerHTML.split(' ')
	let r = Math.floor(Math.random()*all_words.length)
	// all_words[r] = "DIS-" + all_words[r]
	// poem.innerHTML = all_words
	poem.innerHTML = poem.innerHTML.replace(all_words[r], "DIS-" + all_words[r])
	setupListeners()
}
