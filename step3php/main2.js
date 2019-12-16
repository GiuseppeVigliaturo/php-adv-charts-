function printFatturato(data) {
  var type = data[0]["type"];
  console.log(type);
  var data = Object.values(data[0]["data"]);
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
  var type = data[1]["type"];
  var label = Object.keys(data[1]["data"]);
  console.log(label);
  var accesspie =  data[1]["access"];
  console.log(accesspie);
  var data = Object.values(data[1]["data"]);
  var ctx = document.getElementById("fatturatobyagent").getContext("2d");
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
  var type = data[2]["type"];
  var access =  data[2]["access"];
  console.log(access);
  var label = Object.keys(data[2]["data"]);
  console.log("arrayteam",label);
  var data1 = Object.values(data[2]["data"]['Team1']);
  var data2 = Object.values(data[2]["data"]['Team2']);
  var data3 = Object.values(data[2]["data"]['Team3']);



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


function getData(level){


  $.ajax ({
    url:"server2.php",
    data:{
      level:level
    },
    method:'GET',
    success: function(data){
      console.log(data);

      if (level == 'guest') {
        printFatturato(data);
      }else if (level == 'employee') {
        printFatturato(data);
        printFatturatoAgent(data);
      }else {
        printFatturato(data);
        printFatturatoAgent(data);
        printTeam(data);
      }
    },
    error: function(err) {
      console.log("error",err);
    }
  })
}

function init() {

  var url = window.location; //
  var urlObject = new URL(url);
  var level = urlObject.searchParams.get('level')
  console.log(level);
  getData(level);


}
$(document).ready(init);
