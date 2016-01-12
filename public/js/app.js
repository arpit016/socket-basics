var name = getQueryVariable('name') || "Anonymous";
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join '+ room);

socket.on('connect', function () {
	console.log('Connected to socket.io server');
});

socket.on('message', function(message) {
	var momenttimestamp = moment.utc(message.timestamp);
	console.log("New message:", message.text);

	jQuery('.messages').append("<p><strong>"+ momenttimestamp.local().format('h:mm a') + " " + message.name +": </strong>" + message.text + "</p>");
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	socket.emit('message', {
		name: name,
		text: $form.find('input[name=message]').val()
	});
	$form.find('input[name=message]').val("")
});