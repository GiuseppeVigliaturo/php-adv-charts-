function printChartJs(data){

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: moment.months(),
        datasets: [{
            label: 'Vendite',
            data: data

        }],
      
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

}
function getData(){
  $.ajax ({
    url:"server.php",
    method:'GET',
    success: function(data){
      console.log(data);
      printChartJs(data);
    },
    error: function(err) {
      console.log("error",err);
    }
  })
}

function init() {
  getData();
}
$(document).ready(init);
