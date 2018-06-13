var minorScaleDegrees = [0, 2, 3, 5, 6, 7, 8, 10];
var majorScaleDegrees = [0, 2, 4, 5, 7, 9, 11];

var minorPentatonicDegrees = [0, 3, 5, 7, 10];
var majorPentatonicDegrees = [0, 2, 4, 7, 9];

function getClassName(degree, majorBool)
{
	if(majorBool)
	{
		if(degree == 0) return "tonic";
		else if(degree == 2) return "pentatonic";
		else if(degree == 4) return "chord";
		else if(degree == 5) return "dissonant";
		else if(degree == 7) return "chord";
		else if(degree == 9) return "pentatonic";
		else if(degree == 11) return "dissonant";
	}
	else
	{
		if(degree == 0) return "tonic";
		else if(degree == 2) return "dissonant";
		else if(degree == 3) return "chord";
		else if(degree == 5) return "pentatonic";
		else if(degree == 6) return "dissonant";
		else if(degree == 7) return "chord";
		else if(degree == 8) return "dissonant";
		else if(degree == 10) return "pentatonic";
	}
}

function getChordInfo(number)
{
	if(number % 2 == 0) //major
	{
		return createMajorInfo(number);
	}
	else
	{
		return createMinorInfo(number);
	}
}

var allChordInfo = [];

//populates the allChordInfo array
function createChordInfo()
{
	for(var i=0; i<12; i++)
	{
		var majorInfo = createMajorInfo(i);
		var minorInfo = createMinorInfo(i);
		allChordInfo[2 * i] = majorInfo;
		allChordInfo[2 * i + 1] = minorInfo;
	}
}

function createMajorInfo(i)
{
	var index = i * 2;
	var majorRoot = noteNames[i % 12];
	var majorThird = noteNames[(i + 4) % 12];
	var majorFifth = noteNames[(i + 7) % 12];

	var rootChord = majorRoot + " " + majorThird + " " + majorFifth;
	var firstInversion = majorThird + " " + majorFifth + " " + majorRoot;
	var secondInversion = majorFifth + " " + majorRoot + " " + majorThird;

	var nameOfChord = majorRoot + " Major";

	var info = new Object();
	info.index = index;
	info.name = nameOfChord;
	info.root = majorRoot;
	info.middle = majorThird;
	info.dominant = majorFifth;

	return info;
}

function createMinorInfo(i)
{
	var index = i * 2 + 1;
	var minorRoot = noteNames[i % 12];
	var minorThird = noteNames[(i + 3) % 12];
	var minorFifth = noteNames[(i + 7) % 12];

	var rootChord = minorRoot + " " + minorThird + " " + minorFifth;
	var firstInversion = minorThird + " " + minorFifth + " " + minorRoot;
	var secondInversion = minorFifth + " " + minorRoot + " " + minorThird;

	var nameOfChord = minorRoot + " Minor";

	var info = new Object();
	info.index = index;
	info.name = nameOfChord;
	info.root = minorRoot;
	info.middle = minorThird;
	info.dominant = minorFifth;

	return info;
}


var noteNames = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];


function getFrequencies(chordNum, inversionNum)
{
	var root = Math.floor(chordNum / 2);
	var middleOffset = chordNum % 2 == 0 ? 4 : 3;
	var middleNumber = (root + middleOffset) % 12;
	var thirdNumber = (root + 7) % 12;


	if(inversionNum == 0)
	{
		if(middleNumber < root) middleNumber += 12;
		if(thirdNumber < root) thirdNumber += 12;

	}
	if(inversionNum == 1)
	{
		if(root < middleNumber) root += 12;
		if(thirdNumber < middleNumber) thirdNumber += 12;

	}
	else if(inversionNum == 2)
	{
		if(root < thirdNumber) root += 12;
		if(middleNumber < thirdNumber) middleNumber += 12;
	}

	var array = [root, middleNumber, thirdNumber];

	var result = [array[inversionNum], array[(inversionNum + 1) % 3], array[(inversionNum + 2) % 3]];

	return result;


}
