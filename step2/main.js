function printChartJsFatturato(data) {
  var ctx = document.getElementById("fatturato").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: moment.months(),
      datasets: [
        {
          label: "vendite",
          data: data
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}

function fatturatoAgent(type, label, data) {
  var ctx = document.getElementById("fatturatobyagent").getContext("2d");
  new Chart(ctx, {
    type: type,
    data: {
      labels: label,
      datasets: [
        {
          label: "Agents",
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 32, 192, 0.2)"
          ],
          //stessi colori solo più scuri
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)"
          ],
          borderWidth: 2
        }
      ]
    }
  });
}




function getDataLine(){
  $.ajax ({
    url:"server.php",
    method:'GET',
    success: function(data){
      console.log(data);
      printChartJsFatturato(data);
    },
    error: function(err) {
      console.log("error",err);
    }
  })
}

function getDataPie(){
  $.ajax ({
    url:"server.php",
    method:'GET',
    success: function(data){
      console.log(data);
      var type = data["fatturato_by_agent"]["type"];
      var label = Object.keys(data["fatturato_by_agent"]["data"]);
      //con object.keys mi prendo i nomi degli agenti
      var data = Object.values(data["fatturato_by_agent"]["data"]);
      //con object.values mi prendo i valori associati a ogni nome
      //estraggo direttamente dal file php i parametri che mi servono e li metto in delle variabili
      fatturatoAgent(
       type,
       label,
       data
     );

    },
    error: function(err) {
      console.log("error",err);
    }
  })
}

function init() {
  getDataLine();
  getDataPie();
}
$(document).ready(init);
