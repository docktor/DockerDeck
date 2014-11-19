/**
 * connectDaemon
 * Host : host name or ip address, localhost by default
 * Port : tcp docker port, 4243 by default
 * Callback : function (daemonInfo)
 **/
function connectDaemon( host,  port, callBackSuccess, callBackError) {
	console.log("Try to connect to " + host + ":" + port + "...");
	var daemon = {
			host : host, 
			port : port, 
			info : null,
			textStatus : null,
			error : null,
			version : null,
			since : Math.floor(new Date().getTime() / 1000),
			runningContainers : []
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

	setInterval(loadDockerDaemonEvents, 5000);
	setInterval(loadDockerDaemonLive, 5000);
}

function getRunningContainers(host,  port, callBackSuccess, callBackError) {
	var daemon = {
			host : host, 
			port : port, 
			textStatus : null,
			error : null,
			runningContainers : []
		};

	$.ajax({
		crossDomain: true,
        type:"GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		url: 'http://' + host + ':' + port + '/containers/json'
	}).done(function(data,  textStatus, jqXHR) {
		daemon.runningContainers = data;
		daemon.textStatus = textStatus;
		callBackSuccess(daemon);
	}).fail(function( jqXHR, textStatus, errorThrown) {
		daemon.runningContainers = null;
		daemon.textStatus = "Connection to Docker Daemon failed";
		daemon.error = "Error : unable to connect to " + daemon.host + ":"+ daemon.port;
		callBackError(daemon);
	});
}

function getEvents(host,  port, since, until, callBackSuccess, callBackError) {
	var url = 'http://' + host + ':' + port + '/events?since=' + since + '&until=' + until;
	console.log(url);

	if (host !== null && port !== null && since !== null && !until !== null ) {	
		listEvents = {
			events: []
		};
		$.get(url)
		.done(
			function(data,  textStatus, jqXHR) {
				console.log(data);
				listEvents.events =  data;
				console.log(listEvents);
				callBackSuccess(listEvents);
			})
		.fail(function( jqXHR, textStatus, errorThrown) {
			try {
				var data = JSON.parse('[' + jqXHR.responseText.replace(/}{/g, '},{') + ']');
				listEvents.events =  data;
				console.log(listEvents);
				callBackSuccess(listEvents);
			} catch (err) {
				console.error(err);
			}
		});
	} else {
		console.log("wait...")
	}
}

function renderMustache(idTemplate, idTarget, object) {
	var template = $("#" + idTemplate).html();
	var html = Mustache.to_html(template, object);
	$('#' + idTarget).html(html);
}

function renderDockerDaemonView(daemon) {
	emptyDockerDaemonView(daemon.error);
	if (daemon.info) {
		renderMustache('dockerDaemonView', 'dockerDaemonViewContainer', daemon);
	}
	if (daemon.version) {
		renderMustache('dockerDaemonVersion', 'dockerDaemonVersionContainer', daemon);
	}
	renderLive(daemon);
	renderMustache('dockerDaemonEventsView', 'dockerDaemonEventsContainer', {});

	initControllers();
}

function renderEvents(listEvents) {
	renderMustache('dockerDaemonEventsList', 'dockerDaemonEventsListContainer', listEvents);
}

function renderLive(daemon) {
	if (daemon.runningContainers) {
		console.log(daemon.runningContainers);
		renderMustache('dockerDaemonLive', 'dockerDaemonLiveContainer', daemon);
	}
}

function renderDockerDaemonViewError(daemon) {
	console.log("Connection Failed");
	emptyDockerDaemonView(daemon.error);
	var template = $("#dockerDaemonViewError").html();
	var html = Mustache.to_html(template, daemon);
	$('#dockerDaemonViewErrorContainer').html(html);
}

function loadDockerDaemonEvents() {
	var host = $('#dockerDaemonHost').val();
	var port = $('#dockerDaemonPort').val();
	var since = $('#dockerDaemonConnectionTime').val();
	var until = Math.floor(new Date().getTime() / 1000);	
	getEvents(host, port, since, until, renderEvents, renderDockerDaemonViewError);
	
}

function loadDockerDaemonLive() {
	var host = $('#dockerDaemonHost').val();
	var port = $('#dockerDaemonPort').val();
	getRunningContainers(host, port, renderDockerDaemonView, renderDockerDaemonViewError);
	
}

function emptyDockerDaemonView(error) {
	if (error) {
		$('#dockerDaemonViewContainer').html('');
		$('#dockerDaemonVersionContainer').html('');
		$('#dockerDaemonEventsContainer').html('');
		$('#dockerDaemonLiveContainer').html('');
		$('#dockerDaemonConnectForm').fadeIn();
	} else {
		$('#dockerDaemonViewContainer').html('');
		$('#dockerDaemonVersionContainer').html('');
		$('#dockerDaemonEventsContainer').html('');
		$('#dockerDaemonLiveContainer').html('');
		$('#dockerDaemonViewErrorContainer').html('');
		$('#dockerDaemonConnectForm').fadeOut();
	}	

}

function connectToDaemon() {
	connectDaemon(
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
