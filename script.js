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


//Chart related javascript
var canvas1 = document.getElementById("chart1");
var ctxChart1 = canvas1.getContext("2d");

var data1 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
            label: 'Scatter Dataset',
            data: [
            		{x:1996, y:12048},
            		{x:1997, y:13947},
            		{x:1998, y:29477}
            	  ]
        }]
};


var chart1 = new Chart(ctxChart1, {
    type: 'line',
    data: data1,
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});