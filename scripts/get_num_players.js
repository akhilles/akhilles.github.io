var server;
var api_key;
var xml_http;

function get_num_players() {
  server = "na";
  var api_key;

  var api_key_url = "development_api_key.txt";
  xml_http = new XMLHttpRequest();
  xml_http.open("GET", api_key_url, false);
  xml_http.send();
  api_key = xml_http.responseText;

  var low = 70000000;
  var high = 80000000;

  find_cutoff(low, high);
}

function find_cutoff(low, high) {
  var rate_control = true;
  setTimeout(function() {rate_control = false;}, 1000);

  if (high - low == 1){
    console.log("= " + low);
    return low;
  }

  middle = ((low + high) / 2) >> 0;
  var url = "https://" + server + ".api.pvp.net/api/lol/" + server + "/v1.4/summoner/" + middle + "?api_key=" + api_key;
  console.log(url);

  xml_http.open("GET", url, false);
  xml_http.send();

  if (xml_http.status == 200){
    low = middle;
    console.log("> " + middle);
  }
  else{
    high = middle;
    console.log("<" + middle);
  }

  while (rate_control){}

  return find_cutoff(low, high);
}
