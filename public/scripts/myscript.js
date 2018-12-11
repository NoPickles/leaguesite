var ctx = document.getElementById("myChart").getContext('2d');
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "NoPickles",
            backgroundColor: 'rgb(228, 21, 69)',
            borderColor: 'rgb(228, 21, 69)',
            data: [],
            fill: false,
        }, {
            label: "Scarra",
            fill: false,
            backgroundColor: 'rgba(204, 51, 255)',
            borderColor: 'rgba(204, 51, 255)',
            data: [],
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: "LP of some people"
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Month"
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
});



function makeGetCall(callback){
    $.ajax({
        type: 'GET',
        url:  "http://localhost:3000/rank",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(data){
            console.log(data);
            callback(myLineChart, data[0].date, data[0].leaguePoints);
        }
    });
};

function addData(chart, label, newdata){
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newdata);
    });
    chart.update();
    console.log(newdata);
};



$(document).ready(function(){
    makeGetCall(addData);
});