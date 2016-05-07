function test_server() {
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:5000/cool";
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  var output = JSON.parse(xmlhttp.responseText);
  console.log(output);
}
