var server;
var api_key = "2a81b03a-5c46-4bc7-a97a-e868931a1815";
var xml_http;

function get_num_players() {
  server = "na";

  //var api_key_url = "development_api_key.txt";
  xml_http = new XMLHttpRequest();
  //xml_http.open("GET", api_key_url, false);
  //xml_http.send();
  //api_key = xml_http.responseText;

  var low = 70000000;
  var high = 80000000;

  find_cutoff(low, high);
}

function find_cutoff(low, high) {

  if (high - low == 1){
    console.log("= " + low);
    return;
  }
  middle = ((low + high) / 2) >> 0;
  var url = "https://" + server + ".api.pvp.net/api/lol/" + server + "/v1.4/summoner/" + middle + "?api_key=" + api_key;
  console.log(url);
  xml_http.onreadystatechange = function() {
    if (xml_http.readyState == 4){
      if (xml_http.status == 200){
        console.log("> " + middle);
        low = middle;
      }
      else{
        console.log("< " + middle);
        high = middle;
      }
    }
  };
  xml_http.open("GET", url, true);
  xml_http.send();

  setTimeout(function(){
    find_cutoff(low, high);
  }, 1201);
}
