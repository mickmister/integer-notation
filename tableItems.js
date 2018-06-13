function chordAction(){
	var array = this.id.split("-");
	var chord = parseInt(array[0]);
	var inversion = parseInt(array[1]);
	if(parseInt(array[2])){
		playChord(chord, inversion);
	}
	else{
		storeChord(chord, inversion);
	}
}


function oneChordInfo(chordNumber, inversionIndex, table){
	var scaleOffset = Math.floor(scaleNumber / 2);
	var scaleInfo = allChordInfo[chordNumber];
	var baseNumber = (Math.floor(chordNumber/2) - scaleOffset + 12) % 12;
	var label, left, middle, right, leftNum, midNum, rightNum, modifier;
	if(chordNumber % 2 == 0){
		modifier = 4;
	}else{
		modifier = 3;
	}
	var labelStuff = ["Root:", "First Inversion:", "Second Inversion:"];
	var scaleInfoStuff = [scaleInfo.root, scaleInfo.middle, scaleInfo.dominant];
	var scaleNumberStuff = [baseNumber % 12, (baseNumber + modifier) % 12, (baseNumber + 7) % 12];

	label = labelStuff[inversionIndex];
	left = scaleInfoStuff[(0 +  inversionIndex) % 3];
	middle = scaleInfoStuff[(1 +  inversionIndex) % 3];
	right = scaleInfoStuff[(2 +  inversionIndex) % 3];
	leftNum = scaleNumberStuff[(0 +  inversionIndex) % 3];
	midNum = scaleNumberStuff[(1 +  inversionIndex) % 3];
	rightNum = scaleNumberStuff[(2 +  inversionIndex) % 3];


	row = document.createElement("tr");
	var cell1 = document.createElement("td");
	cell1.className = "left";
	cell1.innerHTML = label;
	var cell2 = document.createElement("td");
	cell2.className = "center";
	cell2.innerHTML = left;
	var cell3 = document.createElement("td");
	cell3.className = "center";
	cell3.innerHTML = middle;
	var cell4 = document.createElement("td");
	cell4.className = "center";
	cell4.innerHTML = right;
	var cell5 = document.createElement("td");
	cell5.className = "center";
	cell5.id = chordNumber + "-" + inversionIndex + "-0";
	cell5.onclick = chordAction;
	cell5.innerHTML = "Add";
	row.appendChild(cell1);
	row.appendChild(cell2);
	row.appendChild(cell3);
	row.appendChild(cell4);
	row.appendChild(cell5);
	table.appendChild(row);

	row = document.createElement("tr");
	cell1 = document.createElement("td");
	cell1.className = "left";
	cell2 = document.createElement("td");
	cell2.className = "center";
	cell3 = document.createElement("td");
	cell3.className = "center";
	cell4 = document.createElement("td");
	cell4.className = "center";
	cell5 = document.createElement("td");
	cell5.className = "center";
	cell5.id = chordNumber + "-" + inversionIndex + "-1";
	cell5.onclick = chordAction;
	cell5.innerHTML = "Play";
	cell1.innerHTML = "";
	cell2.innerHTML = leftNum;
	cell3.innerHTML = midNum;
	cell4.innerHTML = rightNum;

	row.appendChild(cell1);
	row.appendChild(cell2);
	row.appendChild(cell3);
	row.appendChild(cell4);
	row.appendChild(cell5);
	table.appendChild(row);
}

function getTableOfChordInfo(scaleNum)
{
	var scaleInfo = allChordInfo[scaleNum];
	var middleNumber = scaleNum % 2 == 0 ? 4 : 3;
	var table = document.createElement("table");
	table.className = "small";

	var row = document.createElement("tr");
	var headerCell = document.createElement("th");
	headerCell.innerHTML = scaleInfo.name;
	headerCell.className = "left";
	row.appendChild(headerCell);
	table.appendChild(row);

	oneChordInfo(scaleNum, 0, table);
	oneChordInfo(scaleNum, 1, table);
	oneChordInfo(scaleNum, 2, table);

	return table;
}
