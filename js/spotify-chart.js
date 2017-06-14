var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";


var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks.slice(0, 10)
}

function extractPopularity(tracks) {
  var playCount = []
  for (var i = 0; i < tracks.length; i++) {
    playCount.push(tracks[i].popularity)
  }
  return playCount
}

function extractNames(tracks) {
  var names = []
  for (var i = 0; i < tracks.length; i++) {
    names.push(tracks[i].name)
  }
  return names
}

function chartData(songNames, playCount) {
  var chartObj = {}
  chartObj.labels = songNames
  chartObj.datasets = [{
    fillColor: 'rgba(220,220,220,0.5)',
    strokeColor: 'rgba(220,220,220,0.8)',
    highlightFill: 'rgba(220,220,220,0.75)',
    highlightStroke: 'rgba(220,220,220,1)',
    data: playCount
  }]
  return chartObj
}

// your ajax call here, on success it should call on the
// parameter it's passed (it's a function), and pass it's
// parameter the data it received
// use the url variable defined above if it helps
function getSpotifyTracks(callback) {
  $.ajax({
    url: url,
    contentType: 'application/json',
    dataType: 'json',
    success: function(dataResult) {
      callback(dataResult)
    },
    error: function functionName() {
      alert("sorry we couldn't get that data at this time... ")
    }
  })
}

// this function will make a new bar chart, refer to this url:
// http://www.chartjs.org/docs/#bar-chart
// you will need to call on:
//  1. extractTop20Tracks - pass it tracks
//  2. extractNames -  pass it the result of #1
//  3. extractPopularity - pass it the result of #1
//  4. chartData - pass it results of #2 and #3
//  5. make a variable `ctx` and select the canvas with the id of spotify-chart* also make sure to specify 2d context
//  6. make a new bar chart!
function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON.tracks)
  var playCount = extractPopularity(tracks)
  var names = extractNames(tracks)
  var chartData = chartData(names, playCount)
  var ctx = document.getElementById("spotify-chart").getContext('2d');
  new Chart(ctx).Bar(data);
}
