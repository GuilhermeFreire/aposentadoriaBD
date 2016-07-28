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
			sqlButton.content.id = "active_SQL";
			sqlButton.query.forEach(function(element){
				element.className = "code";
			});
		}
		else if(sqlButton.on){
			sqlButton.on = false;
			sqlButton.content.id = "";
			sqlButton.query.forEach(function(element){
				element.className = "code hide";
			});
		}
	}
}

sqlButton.entity.addEventListener('click', sqlButton.toggleShow);


function AJAX(query, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      try{
	      var response = JSON.parse(xhttp.responseText);
	      callback(response);
      }catch(e){
      	console.log(e)
      }
    }
  };
  xhttp.open("GET", "http://159.203.135.67/query/chart"+query, true);
  xhttp.send();
}

function buildChart(params, response){
	var element = params[0];
	var dataset = params[1];
	dataset[0].data = response;
	dataset[0].backgroundColor = 'rgba(75, 192, 192, 0.2)';
	dataset[0].borderColor = 'rgba(75, 192, 192, 1)';
	if(params[0] == "chart2"){
		var dataset1 = [];
		var dataset2 = [];
		var dataset3 = [];
		var counter1 = 0, counter2 = 0, counter3 = 0;
		for(var i = 0; i < response.length; i++){
			if(i%3 == 0){
				dataset1[counter1] = response[i];
				counter1++;
			}
			else if(i%3 == 1){
				dataset2[counter2] = response[i];
				counter2++;
			}
			else if(i%3 == 2){
				dataset3[counter3] = response[i];
				counter3++;
			}
		}
		dataset[0].label = dataset1[0].label;
		dataset[0].data = dataset1;
		dataset[0].backgroundColor = 'rgba(255, 159, 64, 0.2)';
		dataset[0].borderColor = 'rgba(255, 159, 64, 1)';
		dataset[1] = {label: dataset2[0].label};
		dataset[1].data = dataset2;
		dataset[1].backgroundColor = 'rgba(75, 192, 192, 0.2)';
		dataset[1].borderColor = 'rgba(75, 192, 192, 1)';
		dataset[2] = {label: dataset3[0].label};
		dataset[2].data = dataset3;
		dataset[2].backgroundColor = 'rgba(54, 162, 235, 0.2)';
		dataset[2].borderColor = 'rgba(54, 162, 235, 1)';
	}
		
	if(params[0] == "chart3"){
		var dataset1 = [];
		var dataset2 = [];
		var total = [];
		var counter1 = 0, counter2 = 0;
		console.log(response[0].y);
		for(var i = 0; i < response.length; i++){
			if(i%2 == 0){
				dataset1[counter1] = {x: response[i].x, y: response[i].y};
				total[counter1] = parseInt(response[i].y);
				counter1++;
			}
			else if(i%2 == 1){
				dataset2[counter2] = {x: response[i].x, y: response[i].y};
				total[counter2] += parseInt(response[i].y);
				dataset1[counter2].y = parseInt(dataset1[counter2].y) * (100/total[counter2]);
				dataset2[counter2].y = parseInt(dataset2[counter2].y) * (100/total[counter2]);
				counter2++;
			}

		}
		console.log("dataset1[0].y = ", dataset1[0].y);
		console.log("dataset2[0].y = ", dataset2[0].y);
		console.log(dataset1, dataset2, total);
		dataset[0].label = dataset1[0].label;
		dataset[0].data = dataset1;
		dataset[0].backgroundColor = 'rgba(255, 159, 64, 0.2)';
		dataset[0].borderColor = 'rgba(255, 159, 64, 1)';
		dataset[1] = {label: dataset2[0].label};
		dataset[1].data = dataset2;
		dataset[1].backgroundColor = 'rgba(75, 192, 192, 0.2)';
		dataset[1].borderColor = 'rgba(75, 192, 192, 1)';
	}
	if(params[0] == "chart4"){
		var dataset1 = []
		for(var i = 0; i < response.length; i++){
			dataset1[i] = response[i].value;
		}
		dataset = dataset1;
		console.log(dataset)
	}

	console.log(element, dataset);
	var paramaters = {};
	paramaters[element] = {
	    	type: 'line',
		    data: {datasets: dataset},
		    options: {
		        scales: {
		            xAxes: [{
		                type: 'linear',
		                position: 'bottom',
		            }]
		        }
		    }
		};

	if(element === "chart3"){
		paramaters[element].options.scales.yAxes = [{stacked: true}];
		console.log("Parameters", paramaters);
	}
	// if(element === "chart4"){
	// 	paramaters.type = 'pie';
	// }
	
	keepChart = new Chart(
		(document.getElementById(element)).getContext("2d"), 
		paramaters[element]
	);
}

window.onload = function(){
	var totalQueires = 6;
	for(var count = 1; count <= totalQueires; count++){
		switch(count){
			case 1:
				drawChart1();
				break;
			case 2:
				drawChart2();
				break;
			case 3:
				drawChart3();
				break;
			case 4:
				drawChart4();
				break;
			case 5:
				drawChart5();
				break;
			case 6:
				drawChart6();
				break;

		}
	};
}


function drawChart1(){
	AJAX(1, function(response){
		keepChart = new Chart(
			(document.getElementById("chart1")).getContext("2d"), 
			{
		    	type: 'line',
			    data: {
			    	label: 'Total gasto por ano',
			    	datasets: [
			    				{
			    					data: response,
			    					label: 'Total gasto por ano',
			    					backgroundColor: 'rgba(75, 192, 192, 0.2)',
			    					borderColor: 'rgba(75, 192, 192, 1)'
			    				}
			    			  ]
			    },
			    options: {
			        scales: {
			            xAxes: [{
			                type: 'linear',
			                position: 'bottom',
			            }]
			        }
			    }
			}
		);	
	});
}

function drawChart2(){
	AJAX(2, function(response){
		var dataset1 = [];
		var dataset2 = [];
		var dataset3 = [];
		var counter1 = 0, counter2 = 0, counter3 = 0;
		for(var i = 0; i < response.length; i++){
			if(i%3 == 0){
				dataset1[counter1] = response[i];
				counter1++;
			}
			else if(i%3 == 1){
				dataset2[counter2] = response[i];
				counter2++;
			}
			else if(i%3 == 2){
				dataset3[counter3] = response[i];
				counter3++;
			}
		}
		keepChart2 = new Chart(
			(document.getElementById("chart2")).getContext("2d"), 
			{
		    	type: 'line',
			    data: {
			    	label: 'Número de acidentes por ano',
			    	datasets: [
			    				{
			    					data: dataset1,
			    					label: dataset1[0].label,
			    					backgroundColor: 'rgba(255, 159, 64, 0.2)',
			    					borderColor: 'rgba(255, 159, 64, 1)'
			    				},
			    				{
			    					data: dataset2,
			    					label: dataset2[0].label,
			    					backgroundColor: 'rgba(75, 192, 192, 0.2)',
			    					borderColor: 'rgba(75, 192, 192, 1)'
			    				},
			    				{
			    					data: dataset3,
			    					label: dataset3[0].label,
			    					backgroundColor: 'rgba(54, 162, 235, 0.2)',
			    					borderColor: 'rgba(54, 162, 235, 1)'
			    				}
			    			  ]
			    },
			    options: {
			        scales: {
			            xAxes: [{
			                type: 'linear',
			                position: 'bottom',
			            }]
			        }
			    }
			}
		);	
	});
}

function drawChart3(){
	AJAX(3, function(response){
		var dataset1 = [];
		var dataset2 = [];
		var total = [];
		var counter1 = 0, counter2 = 0;
		for(var i = 0; i < response.length; i++){
			if(i%2 == 0){
				dataset1[counter1] = response[i];
				total[counter1] = parseInt(response[i].y);
				counter1++;
			}
			else if(i%2 == 1){
				dataset2[counter2] = response[i];
				total[counter2] += parseInt(response[i].y);
				dataset1[counter2].y = parseInt(dataset1[counter2].y) * (100/total[counter2]);
				dataset2[counter2].y = parseInt(dataset2[counter2].y) * (100/total[counter2]);
				counter2++;
			}

		}
		keepChart2 = new Chart(
			(document.getElementById("chart3")).getContext("2d"), 
			{
		    	type: 'line',
			    data: {
			    	label: 'Contribuições por sexo por ano (%)',
			    	datasets: [
			    				{
			    					data: dataset1,
			    					label: dataset1[0].label,
			    					backgroundColor: 'rgba(255, 159, 64, 0.2)',
			    					borderColor: 'rgba(255, 159, 64, 1)'
			    				},
			    				{
			    					data: dataset2,
			    					label: dataset2[0].label,
			    					backgroundColor: 'rgba(75, 192, 192, 0.2)',
			    					borderColor: 'rgba(75, 192, 192, 1)'
			    				}
			    			  ]
			    },
			    options: {
			        scales: {
			            xAxes: [{
			                type: 'linear',
			                position: 'bottom',
			            }]
			        }
			    }
			}
		);	
	});
}


function drawChart4(){
	AJAX(4, function(response){
		google.charts.load('current', {'packages':['corechart']});
	    google.charts.setOnLoadCallback(drawChart);
	    function drawChart() {

	    	var values = [['Contribuintes', 'Faixa Etária']];
	    	for (var i = 0; i < response.length; i++) {
	    		values[i+1] = [response[i].label, parseInt(response[i].value)]
	    	}
	      var data = google.visualization.arrayToDataTable(values);

	      var options = {
	        title: ''
	      };

	      var chart = new google.visualization.PieChart(document.getElementById('piechart'));

	      chart.draw(data, options);
	    }	
	});
}

function drawChart5(){
	AJAX(5, function(response){
		keepChart = new Chart(
			(document.getElementById("chart5")).getContext("2d"), 
			{
		    	type: 'line',
			    data: {
			    	label: 'Benefício médio per capita',
			    	datasets: [
			    				{
			    					data: response,
			    					label: 'Benefício médio per capita',
			    					backgroundColor: 'rgba(75, 192, 192, 0.2)',
			    					borderColor: 'rgba(75, 192, 192, 1)'
			    				}
			    			  ]
			    },
			    options: {
			        scales: {
			            xAxes: [{
			                type: 'linear',
			                position: 'bottom',
			            }]
			        }
			    }
			}
		);	
	});
}

function drawChart6(){
	AJAX(6, function(response){
		console.log("Response", response);
		var labels = [];
		var values = [];
		for (var i = 0; i < response.length; i++) {
			labels[i] = response[i].x;
			values[i] = response[i].y;
		}
		console.log(labels, values);
		keepChart = new Chart(
			(document.getElementById("chart6")).getContext("2d"), 
			{
		    	type: 'bar',
			    data: {
			    	label: labels,
			    	datasets: [
			    				{
			    					data: values,
			    					label: 'Contribuintes médios mensais por categoria',
			    					backgroundColor: ['rgba(75, 192, 192, 0.2)',
			    										'rgba(75, 192, 192, 0.2)',
			    										'rgba(54, 162, 235, 0.2)',
			    										'rgba(255, 206, 86, 0.2)'],
			    					borderColor: ['rgba(75, 192, 192, 1)',
			    									'rgba(75, 192, 192, 1)',
			    									'rgba(54, 162, 235, 1)',
			    									'rgba(255, 206, 86, 1)'],
			    					borderWidth: 1
			    				}
			    			  ]
			    },
			    options: {
			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                }
			        	}]
			    	}
			    }
			}
		);	
	});
}