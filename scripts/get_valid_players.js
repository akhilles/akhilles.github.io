var temp_count;
var total_count;
var num_intervals;
var console_log_output;
var start_time_epoch = 1430884801000;   // May 6th, 2015 when champion mastery was implemented on all servers

function get_valid_players() {
  var xml_http = new XMLHttpRequest();

  temp_count = 0;
  total_count = 0;
  num_intervals = 40;
  console_log_output = "";
  query_machine(1, 100000, 160000001);
}

function query_machine(start, interval, end){
  if (start == end){
    console_log_output += "TOTAL: " + total_count + "/" + (end-1)/interval + " (" + total_count * 100 / ((end-1)/interval) + "%)<br>";
    document.getElementById("console_log").innerHTML = console_log_output;
    return;
  }
  var summoner_ids = "" + start;
  for (var j = 1; j <= 39; j++) summoner_ids += "," + (start + (j * interval));
  var url = "https://" + server + ".api.pvp.net/api/lol/" + server + "/v1.4/summoner/" + summoner_ids + "?api_key=" + api_key;

  var xml_http = new XMLHttpRequest();
  xml_http.onreadystatechange = function() {
    if (xml_http.readyState == 4){
      if (xml_http.status == 200){
        var data_array = JSON.parse(xml_http.responseText);

        for (var key in data_array){
          if (data_array[key].revisionDate >= start_time_epoch){
            temp_count++;
            total_count++;
          }
        }
      }
      var interval_length = (end - 1) / num_intervals;
      if ((start + (40 * interval) - 1) % interval_length == 0){
        console_log_output += (start + (40 * interval) - 1) / interval_length + ": " + temp_count + "/" + (interval_length / interval) + " (" + (temp_count * 100 / (interval_length / interval)) + "%)<br>";
        document.getElementById("console_log").innerHTML = console_log_output;
        temp_count = 0;
      }
    }
  };
  xml_http.open("GET", url, true);
  xml_http.send();

  setTimeout(function(){
    query_machine(start + (40 * interval), interval, end);
  }, 1201);
}
