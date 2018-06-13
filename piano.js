var scaleNumber;

window.onload = function(){
	// var info = $('progression').innerHTML;
	var info = "none";
	if(info == "none")
	{
		scaleNumber = 0;
	}
	else
	{
		scaleNumber = parseInt(info.split("|")[0]);
	}

	createPiano();
	populateScaleBox();
	// $("save").onclick = function(){saveData();};
	$("keyappearance").onchange = function(){clearKeyInfo(); displayKeyInfo();};
	$("play").onclick = function(){playProgression();};
	$('clear').onclick = clearProgression;
	createChordInfo();
	populateProgression();
	displayChordInfo();
	$('scaleBox').selectedIndex = scaleNumber;
	$("scaleBox").onchange = function(){getScaleData();};
};

// function saveData(){
// 	var area = $('chordArea');
// 	var notes = area.childNodes;
// 	var data = "" + scaleNumber;
// 	for(var i = 0; i<notes.length; i++){
// 		data += "|" + notes[i].className;
// 	}
// 	var name = $('name').innerHTML;
// 	var id = $('prog_id').innerHTML;
// 	var userID = $('user_id').innerHTML;

// 	var formData = "name=" + name + "&prog_id=" + id + "&user_id=" + userID + "&progression=" + data;
// 	new Ajax.Request(
// 		// requests the meaning of the name
// 		"store.php?",
// 		{
// 			method : "GET",
// 			parameters:
// 			{
// 				name: name,
// 				prog_id: id,
// 				user_id: userID,
// 				progression: data
// 			},
// 			onSuccess: function (ajax){
// 				var text = ajax.responseText.trim();
// 				if(id == "none")
// 				{
// 					$('prog_id').innerHTML = text;
// 				}
// 				alert("Success!");
// 			},
// 			onFailure : scaleFail
// 		}
// 		);
// }

function clearProgression()
{
	$('chordArea').innerHTML = "";
}

function populateProgression(){
	var progNode = $('progression');
	if(false) {
	// if(progNode.innerHTML != "none"){
		var array = progNode.innerHTML.split("|");
		scaleNumber = parseInt(array[0]);
		for(var i = 1; i < array.length; i++){
			var chordArray = array[i].split("-");
			storeChord(chordArray[0], chordArray[1]);
		}
	}
}

function playProgression()
{
	var chordArea = $('chordArea');
	var children = chordArea.childNodes;
	var time = 0;
	for(var i=0; i<children.length; i++)
	{
		var child = children[i];
		var chord = child.className.split("-");
		var chordIndex = chord[0];
		var inversion = chord[1];
		playChordHelper(chordIndex, inversion, time);
		time += 750;
	}
}

function playChordHelper(chord, inversion, time)
{
	setTimeout(function() {playChord(chord, inversion);}, time);
}

function displayChordInfo()
{
	displayPrimaryInfo(scaleNumber);
	displayTwoNoteMatching(scaleNumber);
	displayThreeNoteMatching(scaleNumber);
	clearKeyInfo();
	displayKeyInfo();
}

function clearKeyInfo()
{
	var piano = $("piano");
	var keys = document.getElementsByClassName("key");
	for(var i=0; i<24; i++)
	{
		var key = keys[i];
		var names = key.className.split(" ");
		key.className = names[0] + " " + names[1];
		$("keyspan" + i).innerHTML = "&nbsp";
	}
}

function displayKeyInfo()
{
	var dropDownIndex = $("keyappearance").selectedIndex;
	if(dropDownIndex == 0) return;
	var includeDissonantBool = dropDownIndex == 2;
	var majorBool = scaleNumber % 2 == 0;
	var scaleDegrees;
	if(majorBool)
	{
		if(includeDissonantBool)
		{
			scaleDegrees = majorScaleDegrees;
		}
		else
		{
			scaleDegrees = majorPentatonicDegrees;
		}
	}
	else
	{
		if(includeDissonantBool)
		{
			scaleDegrees = minorScaleDegrees;
		}
		else
		{
			scaleDegrees = minorPentatonicDegrees;
		}
	}
	var scaleNum = Math.floor(scaleNumber / 2);
	var piano = $("piano");
	var keys = document.getElementsByClassName("key");
	for(var i=0; i<24; i++)
	{
		var index = (i - scaleNum + 12) % 12;
		if(scaleDegrees.indexOf(index) != -1)
		{
			var key = keys[i];
			var className = getClassName(index, majorBool);
			key.classList.add(className);
			$("keyspan" + i).innerHTML = index;
		}
	}
}


function displayPrimaryInfo(scaleNum){
	var area = $('upperarea');
	area.innerHTML = "";
	var table = getTableOfChordInfo(scaleNum);
	table.className = "";
	area.appendChild(table);
}

function displayTwoNoteMatching(scaleNum)
{
	var offsets = [];
	if(scaleNum % 2 == 0)
	{
		offsets = [4, 8, 11, 15, 18, 23];
	}
	else
	{
		offsets = [3, 6, 9, 13, 16, 20];
	}


	var area = $("twoNoteSelector");
	area.innerHTML = "";
	for(var i=0; i<offsets.length; i++)
	{
		var currentScaleNumber = (scaleNum + offsets[i]) % 24;
		var table = getTableOfChordInfo(currentScaleNumber);
		area.appendChild(table);
	}
}

function displayThreeNoteMatching(scaleNum)
{
	var offsets = [];
	if(scaleNum % 2 == 0)
	{
		offsets = [5, 9, 10, 14, 19];
	}
	else
	{
		offsets = [4, 5, 10, 14, 15, 19];
	}


	var area = $("threeNoteSelector");
	area.innerHTML = "";

	for(var i=0; i<offsets.length; i++)
	{
		var currentScaleNumber = (scaleNum + offsets[i]) % 24;
		var table = getTableOfChordInfo(currentScaleNumber);
		area.appendChild(table);
	}
}



function playChord(chord, inversion){
	var frequencies = getFrequencies(chord, inversion);
	var keys = [$(frequencies[0] + ""), $(frequencies[1] + ""), $(frequencies[2] + "")];

	var choice = $("playstyle").value;

	if(choice === 'Chord')
	{
		noteHit(frequencies[0], keys[0], 750);
		noteHit(frequencies[1], keys[1], 750);
		noteHit(frequencies[2], keys[2], 750);
	}
	else if(choice === 'Lead')
	{
		noteHit(frequencies[0], keys[0], 250);
		setTimeout(function() {noteHit(frequencies[1], keys[1], 250);}, 250);
		setTimeout(function() {noteHit(frequencies[2], keys[2], 250);}, 500);
	}



}



function storeChord(chord, inversion){
	var noteArea = $('chordArea');
	var span = document.createElement('span');
	span.onclick = function(){noteArea.removeChild(span);};
	span.className = chord + "-" + inversion;
	var chordName = scaleNames[chord];
	var labelStuff = ["Root", "First Inversion", "Second Inversion"];
	var labelName = labelStuff[inversion];
	var textBody = chordName + ", " + labelName + "  ";

	var text = document.createTextNode(textBody);
	span.appendChild(text);
	noteArea.appendChild(span);
}

function fillClassList(elements, stringToFill)
{
	for(var i = 0; i < elements.length; i++)
	{
		elements[i].innerHTML = stringToFill;
	}
}

var populateScaleBox = function()
{
	var box = $('scaleBox');
	for(var i=0; i<scaleNames.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = scaleNames[i];
		box.appendChild(option);
	}
};

var getScaleData = function(){
	scaleNumber = $('scaleBox').selectedIndex;
	displayChordInfo();
};

var setScaleData = function(ajax){
	var json = ajax.responseJSON;
	setInversion(json['inversion']);
	setThreeNoteAdjacent(json['threeNoteAdjacent']);
	setTwoNoteAdjacent(json['twoNoteAdjacent']);
};

var scaleFail = function(){
	window.location.replace("failure.html");
};

var setInversion = function(inversionInput){
	var div = $('inversions');
	var text = document.createTextNode(inversionInput);
	div.appendChild(text);
};

var setThreeNoteAdjacent = function(adjacent){
	var div = $('threeNoteSelector');
	div.innerHTML = "";
	for (var i = 0; i<adjacent.length; i++){
		var span = document.createElement('span');
		span.onclick = function(){
			$('search').value = adjacent[i].id;
			getScaleData();
		};
		var text = document.createTextNode(adjacent[i].scale);
		span.appendChild(text);
		div.appendChild(span);
	}
};

var setTwoNoteAdjacent = function(adjacent){
	var div = $('twoNoteSelector');
	div.innerHTML = "";
	for (var i = 0; i<adjacent.length; i++){
		var span = document.createElement('span');
		span.onclick = function(){
			$('search').value = adjacent[i].id;
			getScaleData;
		};
		var text = document.createTextNode(adjacent[i].scale);
		span.appendChild(text);
		div.appendChild(span);
	}
};

var createPiano = function(){
	var piano = $('piano');
	for(var i=0; i<24; i++)
	{
		var span = document.createElement("span");
		span.id="keyspan" + i;
		span.className = "keyspan";
		piano.appendChild(span);
	}
	piano.innerHTML += "<br />";
	createScale(piano, 0);
	createScale(piano, 1);
};

var createScale = function(piano, octave){
	createWhiteKey(piano, octave*12 + 0);
	createBlackKey(piano, octave*12 + 1);
	createWhiteKey(piano, octave*12 + 2);
	createBlackKey(piano, octave*12 + 3);
	createWhiteKey(piano, octave*12 + 4);
	createWhiteKey(piano, octave*12 + 5);
	createBlackKey(piano, octave*12 + 6);
	createWhiteKey(piano, octave*12 + 7);
	createBlackKey(piano, octave*12 + 8);
	createWhiteKey(piano, octave*12 + 9);
	createBlackKey(piano, octave*12 + 10);
	createWhiteKey(piano, octave*12 + 11);
};

var createWhiteKey = function(piano, keyNumber){
	var key = document.createElement("div");
	key.classList.add('white');
	key.classList.add('key');
	key.id = keyNumber;

	var outerDiv = document.createElement("div");
	var span = document.createElement("span");

	key.appendChild(span);
	key.onclick = keyPressed;
	piano.appendChild(key);
};

var createBlackKey = function(piano, keyNumber){
	var key = document.createElement("div");
	key.classList.add('black');
	key.classList.add('key');
	key.id = keyNumber;

	var outerDiv = document.createElement("div");
	var span = document.createElement("span");

	key.appendChild(span);
	key.onclick = keyPressed;
	piano.appendChild(key);
};

var keyPressed = function(){
	var id = parseInt(this.id);
	noteHit(id, $(id + ""), 250);
};

var scaleNames =
	["C major", "C minor", "C#/Db major", "C#/Db minor", "D major", "D minor",
	"D#/Eb major", "D#/Eb minor", "E major", "E minor", "F major", "F minor",
	"F#/Gb major", "F#/Gb minor", "G major", "G minor", "G#/Ab major",
	"G#/Ab minor", "A major", "A minor", "A#/Bb major", "A#/Bb minor",
	"B major", "B minor"];
