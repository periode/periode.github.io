//using this to clean data: http://gsx2json.com/
var SPREADSHEET_URL = "https://gsx2json.com/api?id=1iqTPWhv5OdzZAR9qzRidtDgpz3u4BGHrykTvtN4QcRo";


function init(){
    $.getJSON(SPREADSHEET_URL, function(data){
	    console.log(data);
	    for(var i = 0; i < data.rows.length; i++){
		addPosting(data.rows[i]);
	    }
    });
}


function addPosting(item){
    var e = document.createElement('div');
	e.setAttribute('class', 'posting');

	var title = document.createElement('span');
	title.setAttribute('class', 'title');
	title.innerText = (item.title == null) ? 'PROJECT' : item.title;
	e.append(title);

	var name = document.createElement('span');
	name.setAttribute('class', 'name');
	name.innerHTML = item.name;
	e.append(name);

	var department = document.createElement('span');
	department.setAttribute('class', 'department');
	department.innerHTML = item.department;
	e.append(department);
	
	var description = document.createElement('span');
	description.setAttribute('class', 'description');
	description.innerHTML = item.description;
	e.append(description);
	
	var needs = document.createElement('span');
	needs.setAttribute('class', 'needs');
	needs.innerHTML = item.needs;
	e.append(needs);

	var line = document.createElement('hr');
	e.append(line);

	document.getElementById('container').append(e);
}
