var last_known_scroll_position = 0;
var ticking = false;
var top_bar_active = false;
var topBar = document.getElementById("top_bar");
var threshold = 420;

function doSomething(scroll_pos) {
  if(scroll_pos > threshold && !top_bar_active){
  	top_bar_active = true;
  	topBar.className = "";
  }
  if(scroll_pos < threshold && top_bar_active){
  	top_bar_active = false;
  	topBar.className = "hide";
  }
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });
  }
  ticking = true;
});


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