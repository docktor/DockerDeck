/**
 * addDeamon
 * Host : host name or ip address, localhost by default
 * Port : tcp docker port, 4243 by default
 * Callback : function (daemonInfo)
 **/
function addDeamon( host,  port, callBackSuccess, callBackError) {
	console.log("Try to connect to " + host + ":" + port + "...");
	var daemon = {
			host : host, 
			port : port, 
			info : null,
			textStatus : null,
			error : null,
			version : null,
			since : new Date().getTime()
		};

	daemon.host = host || '127.0.0.1';
	daemon.port = port || '4243';
	
	$.ajax({
		crossDomain: true,
        type:"GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		url: 'http://' + host + ':' + port + '/info'
	}).done(function(data,  textStatus, jqXHR) {
		daemon.info = data;
		daemon.textStatus = textStatus;
		callBackSuccess(daemon);
	}).fail(function( jqXHR, textStatus, errorThrown) {
		daemon.info = null;
		daemon.textStatus = "Connection to Docker Daemon failed";
		daemon.error = "Error : unable to connect to " + daemon.host + ":"+ daemon.port;
		callBackError(daemon);
	});
	
$.ajax({
		crossDomain: true,
        type:"GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		url: 'http://' + host + ':' + port + '/version'
	}).done(function(data,  textStatus, jqXHR) {
		daemon.version = data;
		daemon.textStatus = textStatus;
		callBackSuccess(daemon);
	}).fail(function( jqXHR, textStatus, errorThrown) {
		daemon.version = null;
		daemon.textStatus = "Connection to Docker Daemon failed";
		daemon.error = "Error : unable to connect to " + daemon.host + ":"+ daemon.port;
		callBackError(daemon);
	});

}

function renderDockerDaemonView(daemon) {
	emptyDockerDaemonView(daemon.error);
	if (daemon.info) {
		var template = $("#dockerDaemonView").html();
		var html = Mustache.to_html(template, daemon);
		$('#dockerDaemonViewContainer').html(html);
	}
	if (daemon.version) {
		var template = $("#dockerDaemonVersion").html();
		var html = Mustache.to_html(template, daemon);
		$('#dockerDaemonVersionContainer').html(html);
	}

	initControllers();
}

function renderDockerDaemonViewError(daemon) {
	console.log("Connection Failed");
	emptyDockerDaemonView(daemon.error);
	var template = $("#dockerDaemonViewError").html();
	var html = Mustache.to_html(template, daemon);
	$('#dockerDaemonViewErrorContainer').html(html);
}

function loadDockerDaemonEvents() {
	//http://localhost:4243/events?since=1415727850&until=1415729025
}

function emptyDockerDaemonView(error) {
	if (error) {
		$('#dockerDaemonViewContainer').html('');
		$('#dockerDaemonVersionContainer').html('');
		$('#dockerDaemonConnectForm').fadeIn();
	} else {
		$('#dockerDaemonViewContainer').html('');
		$('#dockerDaemonVersionContainer').html('');
		$('#dockerDaemonViewErrorContainer').html('');
		$('#dockerDaemonConnectForm').fadeOut();
	}	

}

function connectToDaemon() {
	addDeamon(
		$('#addDockerDeamonHost').val(), 
		$('#addDockerDeamonPort').val(), 
		renderDockerDaemonView,
		renderDockerDaemonViewError
	);
}

function validateConnectForm() {
	return document.getElementById('connectForm').checkValidity();
}


/**
 * Shorthand for $( document ).ready()
 **/
$(function() {
	$('#dockerDaemonConnectForm').hide();
	
	connectToDaemon();

	$('#daemonConnectButton').click(
		function(event) {
			event.preventDefault();
			if (validateConnectForm()) {
				addDeamon(
					$('#host').val(), 
					$('#port').val(), 
					renderDockerDaemonView,
					renderDockerDaemonViewError
				);
			}
		}
	);
});

function initControllers() {
	$('#disconnectButton').click(
		function() {
			emptyDockerDaemonView(true);
		}
	);
	
}
