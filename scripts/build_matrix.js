var active_accounts;

function build_matrix(){
  var data = [];

  for (var i = 0; i < 1; i++){
    var day = [];
    data.push(patch);
    for (var j = 0; j < 26; j++){
      var rank = {novice:[], expert:[]};
      data[i].push(rank);
      for (var l = 0; l < champion_names; l++){
        var data_collection = {champion:champion_names[l], coeffs:[], data_points:[]};
        data[i][j].novice.push(data_collection);
        data[i][j].expert.push(data_collection);
      }
    }
  }

  console.log(data[0]);
  console.log(data[0][0]);
  console.log(data[0][0].novice);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "assets/summoner_ids/na/active_accounts_na.json", false);
  xmlhttp.send();
  active_accounts = JSON.parse(xmlhttp.responseText);

  recursive_build(0);
}

function recursive_build(i) {
  if (active_accounts.length == i) return;

  var ranked_data;
  var mastery_data;

  var url1 = "https://" + server + ".api.pvp.net/api/lol/" + server + "/v1.3/stats/by-summoner/" + active_accounts[i] + "/ranked?season=SEASON2016&api_key=2a81b03a-5c46-4bc7-a97a-e868931a1815";
  var xmlhttp1 = new XMLHttpRequest();
  xmlhttp1.onreadystatechange = function() {
    if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) ranked_data = JSON.parse(xmlhttp1.responseText);
  };
  xmlhttp1.open("GET", url, true);
  xmlhttp1.send();

  setTimeout(function(){
    console.log(i + " done");
    recursive_build(i + 1);
  }, 2401);
}
