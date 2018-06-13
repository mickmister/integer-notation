
var frequencies = [];
frequencies[0] = 261.63;
frequencies[1] = 277.18;
frequencies[2] = 293.66;
frequencies[3] = 311.13;
frequencies[4] = 329.63;
frequencies[5] = 349.23;
frequencies[6] = 369.99;
frequencies[7] = 392;
frequencies[8] = 415.3;
frequencies[9] = 440;
frequencies[10] = 466.16;
frequencies[11]	= 493.88;
frequencies[12]	= 523.25;
frequencies[13]	= 554.37;
frequencies[14]	= 587.33;
frequencies[15]	= 622.25;
frequencies[16]	= 659.25;
frequencies[17]	= 698.46;
frequencies[18]	= 739.99;
frequencies[19]	= 783.99;
frequencies[20]	= 830.61;
frequencies[21]	= 880;
frequencies[22]	= 932.33;
frequencies[23]	= 987.77;

var context;
// var gainNode;
window.addEventListener('load', init, false);
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
    // gainNode = context.createGain();
    // gainNode.connect(context.destination);
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
// var context;
// if(isChrome || isSafari){
// 	// var context = new webkitAudioContext();
// 	var context = new AudioContext();
// }else{
// 	var context = null;
// }

function noteHit(noteNumber, key, duration){
	if(context){

		var oscillator = context.createOscillator();
		oscillator.type = 'triangle';
		oscillator.frequency.value = frequencies[noteNumber];
		// oscillator.connect(context.destination);
		var gainNode = context.createGain();
		oscillator.connect(gainNode);
		gainNode.connect(context.destination);

		play(oscillator, gainNode);
		setTimeout(function() {stop(oscillator, gainNode); key.classList.remove("red"); }, duration);
		key.classList.add("red");
	}
}

function play(oscillator, gainNode)
{
	gainNode.gain.value = 0;
	oscillator.start();
	// gainNode.gain.value = 1.0;
	setTimeout(function() { gainNode.gain.value = 1.0; }, 20);

}

function stop(oscillator, gainNode)
{
	setTimeout(function() { gainNode.gain.value = 0; }, 20);
	setTimeout(function() { oscillator.stop(); }, 100);
}



/*
oscillator.frequency.value = 200;
oscillator.start(0);

function boop() {
  gainNode.gain.value = 0.1;
  // The sound should last for 250ms
  setTimeout(function() {
    gainNode.gain.value = 0;
  }, 250);
  oscillator.frequency.value++;
}

setInterval(boop, 500);

*/
