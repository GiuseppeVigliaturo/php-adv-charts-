function printFatturato(type,data) {
  var ctx = document.getElementById("fatturato").getContext("2d");
  new Chart(ctx, {

    type: type,
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

function printFatturatoAgent(type, label, data) {
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

function printTeam(type,data1,data2,data3) {
  var canvas = document.getElementById('team_efficiency').getContext("2d");
  new Chart(canvas, {
    type: type,
    data: {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [{
        label: 'Team1',
        yAxisID: 'A',
        data: data1,
        borderColor:"rgb(57, 92, 56)"
      },
      {
        label: 'Team2',
        yAxisID: 'B',
        data: data2,
        borderColor:"rgb(222, 53, 16)"
      },
      {
        label: 'Team3',
        yAxisID: 'C',
        data: data3,
        borderColor:"rgb(185, 144, 23)"
      }
    ]
    },
    options: {
      scales: {
        yAxes: [{
          id: 'A',
          type: 'linear',
          position: 'left',
        },
        {
          id: 'B',
          type: 'linear',
          position: 'left',
        },

          {
            id: 'C',
            type: 'linear',
            position: 'left',
        }
      ]
      }
    }
  });
}




function getDataLine(){
  $.ajax ({
    url:"server.php",
    method:'GET',
    success: function(data){
      console.log(data);
      var type = data["fatturato"]["type"];
      var data = Object.values(data["fatturato"]["data"]);
      printFatturato(type,data);
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
      printFatturatoAgent(
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

function getDataTeam(){
  $.ajax ({
    url:"server.php",
    method:'GET',
    success: function(data){
      console.log("team",data);
      var type = data["team_efficiency"]["type"];
      var label = Object.keys(data["team_efficiency"]["data"]);
      console.log("arrayteam",label);
      //con object.keys mi prendo i nomi degli agenti
      var data1 = Object.values(data["team_efficiency"]["data"]['Team1']);
      var data2 = Object.values(data["team_efficiency"]["data"]['Team2']);
      var data3 = Object.values(data["team_efficiency"]["data"]['Team3']);
      console.log("arraydat",data1);

      //con object.values mi prendo i valori associati a ogni nome
      //estraggo direttamente dal file php i parametri che mi servono e li metto in delle variabili
      printTeam(type,data1,data2,data3);


    },
    error: function(err) {
      console.log("error",err);
    }
  })
}

function init() {
  getDataLine();
  getDataPie();
  getDataTeam();
}
$(document).ready(init);