var server;
var api_key;
var xml_http;
var total_count;
var num_intervals;
var console_log_output;
var valid_accounts_array = [];
var start_time_epoch = 1430884801000;   // May 6th, 2015 when champion mastery was implemented on all servers

function get_valid_player_list() {
  server = "na";
  api_key = "2a81b03a-5c46-4bc7-a97a-e868931a1815";
  xml_http = new XMLHttpRequest();

  total_count = 0;
  num_intervals = 40;
  console_log_output = "";
  generate_list(1, 1000, 80000001);
}

function generate_list(start, interval, end){
  if (start == end){
    console_log_output += "TOTAL: " + total_count + "/" + (end-1)/interval + " (" + total_count * 100 / ((end-1)/interval) + "%)<br>";
    document.getElementById("console_log").innerHTML = console_log_output;
    return;
  }
  var summoner_ids = "" + start;
  for (var j = 1; j <= 39; j++) summoner_ids += "," + (start + (j * interval));
  var url = "https://" + server + ".api.pvp.net/api/lol/" + server + "/v1.4/summoner/" + summoner_ids + "?api_key=" + api_key;

  xml_http.onreadystatechange = function() {
    if (xml_http.readyState == 4){
      if (xml_http.status == 200){
        var data_array = JSON.parse(xml_http.responseText);

        for (var key in data_array){
          if (data_array[key].revisionDate >= start_time_epoch){
            valid_accounts_array.push(key);
            total_count++;
          }
        }
      }
      var interval_length = (end - 1) / num_intervals;
      if ((start + (40 * interval) - 1) % interval_length == 0){
        var json = JSON.stringify(valid_accounts_array);
        var blob = new Blob([json], {type: "application/json"});
        var url  = URL.createObjectURL(blob);

        console_log_output += (start + (40 * interval) - 1) / interval_length + ": <a download=\"valid_accounts.json\" href=\""+url+"\">download</a><br>";
        document.getElementById("console_log").innerHTML = console_log_output;
      }
    }
  };
  xml_http.open("GET", url, true);
  xml_http.send();

  setTimeout(function(){
    generate_list(start + (40 * interval), interval, end);
  }, 1201);
}
