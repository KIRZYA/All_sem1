var music = [];

function play(track) {

	var x = document.getElementById('audio');
	x.src = 'audio/' + track;
	x.play();
}