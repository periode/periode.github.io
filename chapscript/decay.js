let poem, all

let characters = ['<', '>', '/', '=', '\\', '"']

let replacements = {
	'_sweat':'vaso-motor system glitch/evolution',
	'_climateric': 'climacteric/tipping point',
	'_mother': 'versus progeny',
	'_skin': 'paper',
	'_see': 'to touch',
	'_insignia': '<s>INSIGNIA</s>',
	'_gift': 'I feel a gift is difficult',
	'_speech': '<s>speech</s>',
	'_minerals': 'screens [See the <a href="https://enoughproject.org/files/CorporateRankings2012.pdf">2012 Conflict Minerals Electronics Company Ranking</a>]'
}

let subtexts = {
	'who':' who',
	'indigo': 'women dye indigo men pour metal',
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
	'oh':' oh!',
	'autology': '<i>The Empire of Live</i> by Elizabeth Povinelli',
	'blues': '‘Why Do Ladies Sing the Blues? Indigo Dyeing, Cloth Production, and Gender Symbolism in Kodi’ by Janet Hoskins in <i>Cloth and Human Experience</i>'
}

let inserts = {
	'dis': 'DIS-',
	'inaudible': '<i>[inaudible]</i>',
	'freedom': 'until her freedom is finally<br><br>to know their freedom was never<br><br>	for her<br>'
}

let line_inserts, word_inserts, word_replacements

let replacement_prob = 0.9
let insert_prob = 0.11
let interrupt_prob = 0.0045
let element_height = 0.7

init = () => {

	poem = document.getElementById("poem")
	all = document.getElementsByClassName("modifiable")

	setInterval(interrupt, 300)
	document.body.onwheel = decay
	setupListeners()
}

setupListeners = () => {

		word_replacements = document.getElementsByClassName('replace-word')
		for(word of word_replacements){
			let tag = word.className.split(' ')[2]
			let repl = replacements[tag]

			word.tag = tag
			word.repl = repl
		}

		line_inserts = document.getElementsByClassName('insert-line')
		for(line of line_inserts){
			let tag = line.className.split(' ')[2]
			let repl = subtexts[tag]

			line.tag = tag
			line.repl = repl
		}

		word_inserts = document.getElementsByClassName('insert')
		for(word of word_inserts){
			let tag = word.className.split(' ')[2]
			word.tag = tag
			word.repl = inserts[tag]
		}
}

decay = () =>{


	if(Math.random() < replacement_prob){
		for(line of line_inserts){
			insertLine(line)
		}

		for(word of word_replacements){
			replaceWord(word)
		}
	}

	if(Math.random() < insert_prob){
		for(word of word_inserts){
			insertThroughout(word)
		}
	}

	interrupt()
}

interrupt = () => {
	for(one of all){
		if(Math.random() < interrupt_prob){
			let child = document.createElement('span')
			let text = one.innerHTML
			let rand = Math.floor(Math.random()*text.length)
			let t1 = text.slice(0, rand)
			let t2 = text.slice(rand, text.length)
			let replaced_text = t1 + characters[Math.floor(Math.random()*characters.length)] + t2
			child.innerHTML = replaced_text
			one.innerText = ''
			one.appendChild(child)
		}
	}
}

//replace word by another word
replaceWord = (origin) => {
	if(!checkVisible(origin)) return

	if(origin.tag != undefined){
		let tag = origin.tag.replace('_', '')
		let all_words = document.getElementsByClassName(tag)
		for(word of all_words){
				word.innerHTML = origin.repl
		}
	}
}

//add subtext to line
insertLine = (origin) => {
	if(!checkVisible(origin)) return

	let tag = origin.tag
	let addition = origin.repl
	let el = document.getElementById(tag)
	if(el == null) return

	if(tag != "oh" && tag != "who"){
		let rep = document.createElement('span')
		rep.innerHTML = "<br>"+addition+"<br>"
		el.append(rep)
	}else
		el.innerHTML = addition

	el.setAttribute('id', 'decayed')
}

//insert things throughout poem
insertThroughout = (origin) => {
	if(!checkVisible(origin)) return
	if(origin.tag == "freedom"){
		if(Math.random() < 0.9)
			return
	}

	let all_words = poem.innerHTML.split(' ')
	let r = Math.floor(Math.random()*all_words.length)

	poem.innerHTML = poem.innerHTML.replace(all_words[r], origin.repl + all_words[r])
	setupListeners()
}


checkVisible = (elm) =>{
	if(elm == null || elm == "null") return
	var rect = elm.getBoundingClientRect();

	return rect.top < (window.innerHeight || document.documentElement.clientHeight)*element_height
}
