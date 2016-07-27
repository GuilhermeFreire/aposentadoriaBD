var scrollChange = {
	last_known_scroll_position: 0,
	ticking: false,
	top_bar_active: false,
	topBar: document.getElementById("top_bar"),
	threshold: 420,
	doSomething: function (){
		if(scrollChange.last_known_scroll_position > scrollChange.threshold && !scrollChange.top_bar_active){
	  		scrollChange.top_bar_active = true;
	  		scrollChange.topBar.className = "";
		}
		if(scrollChange.last_known_scroll_position < scrollChange.threshold && scrollChange.top_bar_active){
	 		scrollChange.top_bar_active = false;
	 		scrollChange.topBar.className = "hide";
		}
	}
}

window.addEventListener('scroll', function(e) {
  scrollChange.last_known_scroll_position = window.scrollY;
  if (!scrollChange.ticking) {
    window.requestAnimationFrame(function() {
      scrollChange.doSomething();
      scrollChange.ticking = false;
    });
  }
  scrollChange.ticking = true;
});

var sqlButton = {
	entity: document.querySelector("#sql_button"),
	content: document.querySelector(".content"),
	query: document.querySelectorAll(".code"),
	on: false,
	toggleShow: function(){
		if(!sqlButton.on){
			sqlButton.on = true;
			console.log(sqlButton.entity, sqlButton.content);
			sqlButton.content.id = "active_SQL";
			sqlButton.query.forEach(function(element){
				element.className = "code";
			});
			console.log("Activating!");
		}
		else if(sqlButton.on){
			sqlButton.on = false;
			sqlButton.content.id = "";
			sqlButton.query.forEach(function(element){
				element.className = "code hide";
			});
			console.log("Deactivating!");
		}
	}
}

sqlButton.entity.addEventListener('click', sqlButton.toggleShow);


function AJAX(query, params, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      try{
	      var response = JSON.parse(xhttp.responseText);
	      callback(params, response);
      }catch(e){
      	console.log(e)
      }
    }
  };
  xhttp.open("GET", "http://159.203.135.67/query/"+query, true);
  xhttp.send();
}

function buildChart(params, response){
	var element = params[0];
	var dataset = params[1];
	dataset[0].data = response;
	console.log(element, dataset);
	new Chart(
		(document.getElementById(element)).getContext("2d"), 
		{
	    	type: 'line',
		    data: {datasets: dataset},
		    options: {
		        scales: {
		            xAxes: [{
		                type: 'linear',
		                position: 'bottom'
		            }]
		        }
		    }
		}
	);
}

window.onload = function(){
	for(var count = 1; count <= 3; count++){
		var params = [
		'chart'+count,
		dataset = [{
				label: 'Total gasto por ano',
			}]
		];
		AJAX('chart'+count, params, buildChart);
	};
}