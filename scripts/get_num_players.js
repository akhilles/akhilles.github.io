function get_num_players() {
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
  var xml_http = new XMLHttpRequest();
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
