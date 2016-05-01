var server = na;
var api_key = "2a81b03a-5c46-4bc7-a97a-e868931a1815";
var xml_http;
var valid_accounts;

function get_active_player_list(){
  xml_http = new XMLHttpRequest();
  xml_http.open("GET", "assets/summoner_ids/na/valid_accounts_na.json", false);
  xml_http.send();
  valid_accounts = JSON.parse(xml_http.responseText);
  console.log(valid_accounts.length);
}
