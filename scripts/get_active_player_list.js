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

  var summoner_ids = "" + valid_accounts[index];
  for (var j = index + 1; j < Math.min(valid_accounts.length, index + 40); j++) summoner_ids += "," + valid_accounts[j];
  var url = "https://" + server + ".api.pvp.net/api/lol/" + server + "/v2.5/league/by-summoner/" + summoner_ids + "?entry&api_key=" + api_key;
  console.log(summoner_ids);
  xml_http.onreadystatechange = function() {
    if (xml_http.readyState == 4 && xml_http.status == 200){
      var data_array = JSON.parse(xml_http.responseText);

      for (var key in data_array){
        if (!data_array[key][0].entries[0].isInactive){
          active_accounts.push(key);
          console.log("YES - " + key);
        }
        else console.log("NO - " + key);
      }
    }
  };
  xml_http.open("GET", url, true);
  xml_http.send();

  setTimeout(function(){
    build_active_list(index + 40);
  }, 1201);
}
