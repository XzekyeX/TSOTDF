/**
*
* @author Mikko Tekoniemi 
* 
*/
var MAX_KEYS = 65536;
var MAX_BUTTONS = 10;
var keys = [MAX_KEYS];
var keyState = [MAX_KEYS];
var keyTyped = [MAX_KEYS];
var buttons = [MAX_BUTTONS];
var buttonState = [MAX_BUTTONS];
var buttonClicked = [MAX_BUTTONS];
function initInput(){
	window.addEventListener('keydown',function(e){
		keys[e.keyCode || e.which] = true;
	},true);    
	window.addEventListener('keyup',function(e){
		keys[e.keyCode || e.which] = false;
	},true);
	window.addEventListener('mousedown',function(e){
		buttons[e.keyCode] = true;
	},true);    
	window.addEventListener('mouseup',function(e){
		buttons[e.keyCode] = false;
	},true);
}

function updateInput() {
	for (var i = 0; i < MAX_KEYS; i++)
		keyTyped[i] = keys[i] && !keyState[i];
	for (var i = 0; i < MAX_KEYS; i++)
		keyState[i] = keys[i];
	for (var i = 0; i < MAX_BUTTONS; i++)
		buttonClicked[i] = buttons[i] && !buttonState[i];
	for (var i = 0; i < MAX_BUTTONS; i++)
		buttonState[i] = buttons[i];
}

function isKeyDown(key) {
	if (key >= 0 && key <= keys.length - 1) return keys[key];
	return false;
}

function isKeyTyped(key) {
	if (key >= 0 && key <= keyTyped.length - 1) return keyTyped[key];
	return false;
}

function isButtonDown(button) {
	if (button >= 0 && button <= buttons.length - 1) return buttons[button];
	return false;
}

function isButtonClicked(button) {
	if (button >= 0 && button <= buttonClicked.length - 1) return buttonClicked[button];
	return false;
}