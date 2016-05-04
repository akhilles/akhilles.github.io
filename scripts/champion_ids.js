var champion_names = [];
var champion_ids = [];

build_champions();

function build_champions(){
  var xml_http = new XMLHttpRequest();
  xml_http.open("GET", "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=2a81b03a-5c46-4bc7-a97a-e868931a1815", false);
  xml_http.send();
  var champion_info = JSON.parse(xml_http.responseText);
  for (var key in champion_info.data){
    var champion = champion_info.data[key];
    champion_names.push(champion.name);
    champion_ids.push(champion.id);
  }
  for (var i = 0; i < champion_names.length; i++){
    for (var j = 0; j < champion_names.length - 1; j++){
      if (champion_ids[j].localeCompare(champion_ids[j+1]) > 0){
        var temp_name = champion_names[j];
        champion_names[j] = champion_names[j+1];
        champion_names[j+1] = temp_name;
        var temp_id = champion_ids[j];
        champion_ids[j] = champion_ids[j+1];
        champion_ids[j+1] = temp_id;
      }
    }
  }
  
}
