var url = window.location; //
var urlObject = new URL(url);
var id = urlObject.searchParams.get('level')
console.log(id);

function printFatturato(data) {
  var type = data["fatturato"]["type"];
  console.log(type);
  var data = Object.values(data["fatturato"]["data"]);
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

function printFatturatoAgent(data) {
  var type = data["fatturato_by_agent"]["type"];
  var label = Object.keys(data["fatturato_by_agent"]["data"]);
  var accesspie =  data["fatturato_by_agent"]["access"];
  console.log(accesspie);
  var data = Object.values(data["fatturato_by_agent"]["data"]);
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

function printTeam(data) {
  var type = data["team_efficiency"]["type"];
  var access =  data["team_efficiency"]["access"];
  console.log(access);
  var label = Object.keys(data["team_efficiency"]["data"]);
  console.log("arrayteam",label);
  var data1 = Object.values(data["team_efficiency"]["data"]['Team1']);
  var data2 = Object.values(data["team_efficiency"]["data"]['Team2']);
  var data3 = Object.values(data["team_efficiency"]["data"]['Team3']);
  var canvas = document.getElementById('team_efficiency').getContext("2d");
  new Chart(canvas, {
    type: type,
    data: {
      labels: moment.months(),
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
      printFatturato(data);
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
      printFatturatoAgent(data);
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
        printTeam(data);
    },
    error: function(err) {
      console.log("error",err);
    }
  })
}



function init() {

  if (id === 'guest') {
    getDataLine();

  }else if (id === 'employee') {
    getDataPie();
    getDataTeam();
  }else if (id === 'clevel') {
    getDataLine();
    getDataPie();
    getDataTeam();
  }

}
$(document).ready(init);
