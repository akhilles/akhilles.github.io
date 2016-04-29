function get_num_players() {


  var server = "na";
  var api_key;

  var url = "development_api_key.txt";
  var jsonFile = new XMLHttpRequest();
  jsonFile.open("GET",url,false);
  jsonFile.send();
  api_key = jsonFile.responseText;
  console.log(api_key);
  var low = 70000000;
  var high = 80000000;
}
