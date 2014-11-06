

/**
 * addDeamon
 * Host : host name or ip address, localhost by default
 * Port : tcp docker port, 4243 by default
 * Callback : function (daemonInfo)
 **/
function addDeamon( host,  port, callBack) {
	host = host || '127.0.0.1';
	port = port || '4243';
	
	$.ajax({
		crossDomain: true,
        type:"GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		url: 'http://' + host + ':' + port + '/info'
	}).done(function() {
		console.log( "success" );
	}).fail(function() {
		console.log( "error" );
	}).always(function(data) {
		console.log( "complete" );
		console.log(data);
	});
	
}

/**
 * Shorthand for $( document ).ready()
 **/
$(function() {
	var daemons = [];

	$('#addDockerDeamonButton').click(

		function( event ) {
			console.log("ici");
			addDeamon($('#addDockerDeamonHost').val(), 
			$('#addDockerDeamonPort').val(), 
			function(){
				console.log("ici");
			}
			);
			console.log("là");
		}
	);
});