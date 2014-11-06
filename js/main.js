

/**
 * addDeamon
 * Host : host name or ip address, localhost by default
 * Port : tcp docker port, 4243 by default
 * Callback : function (daemonInfo)
 **/
function addDeamon( host,  port, callBackSuccess, callBackError) {
	host = host || '127.0.0.1';
	port = port || '4243';
	
	$.ajax({
		crossDomain: true,
        type:"GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		url: 'http://' + host + ':' + port + '/info'
	}).done(function(data) {
		console.log( "success" );
		callBackSuccess(data);
	}).fail(function(data) {
		console.log( "error" );
		callBackError(data);
	});
	
}

function renderDockerDaemonView(info) {
	console.log("MUSTACHE");
	var template = $("#dockerDaemonView").html();
	console.log(template);
	var html = Mustache.to_html(template, info);
	$('#dockerDaemonViewContainer').html(html);
}


/**
 * Shorthand for $( document ).ready()
 **/
$(function() {
	var daemons = [];
	
	

	addDeamon(
		$('#addDockerDeamonHost').val(), 
		$('#addDockerDeamonPort').val(), 
		renderDockerDaemonView,
		function(info) {
			console.log("ERROR");
		}
	);
});

