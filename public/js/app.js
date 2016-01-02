var socket = io();

socket.on('connect', function () {
	console.log('Connected to socket.io server');
});

socket.on('message', function(message) {
	var momenttimestamp = moment.utc(message.timestamp);
	console.log("New message:", message.text);

	jQuery('.messages').append("<p><strong>"+ momenttimestamp.local().format('h:mm a') + ": </strong>" + message.text + "</p>");
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	socket.emit('message', {
		text: $form.find('input[name=message]').val()
	});
	$form.find('input[name=message]').val("")
});