var server = "na";
var api_key = "2a81b03a-5c46-4bc7-a97a-e868931a1815";
var xml_http;
var valid_accounts;
var active_accounts = [];
var patch_67_release = 1459915201000;
var patch_68_release = 1461124801000;

function get_active_player_list(){
  xml_http = new XMLHttpRequest();
  xml_http.open("GET", "assets/summoner_ids/na/valid_accounts_na.json", false);
  xml_http.send();
  valid_accounts = JSON.parse(xml_http.responseText);

  build_active_list(0);
}

function build_active_list(index) {
  if (index == valid_accounts.length){
    console.log(valid_accounts.length);
    console.log(active_accounts.length);
    return;
  }
  var summoner_id = valid_accounts[index];
  var url = "https://" + server + ".api.pvp.net/api/lol/" + server + "/v2.2/matchlist/by-summoner/" + summoner_id + "?rankedQueues=RANKED_SOLO_5x5&seasons=SEASON2016&api_key=" + api_key;
  xml_http.onreadystatechange = function() {
    if (xml_http.readyState == 4){
      var data_array = JSON.parse(xml_http.responseText);
      var newest_game_time = data_array.matches[0].timestamp;
      if (newest_game_time > patch_67_release) active_accounts.push(valid_accounts[index]);
    }
  };
  xml_http.open("GET", url, true);
  xml_http.send();

  setTimeout(function(){
    build_active_list(index + 1);
  }, 1201);
}
