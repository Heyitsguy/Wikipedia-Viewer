var textSearch = document.getElementById("wiki-search");
var searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", clickedBtn);
var wikiData = document.querySelector(".wiki-data");

function clickedBtn(event) {
  event.preventDefault();
  var rdyString = "";
  var len = textSearch.value.length;
  var queryString = textSearch.value;
  for (var i = 0; i < len; i++) {
    if (queryString[i] === " ") {
      rdyString += "%20";
    }
    else {
      rdyString += queryString[i];
   }
 }

 function getWiki() {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", 'https://en.wikipedia.org/w/api.php?  action=opensearch&format=json&origin=*&search=' + rdyString, true);
   xhr.send();
   xhr.onreadystatechange = function() {
     if (xhr.readyState === 4 && xhr.status === 200) {
       var wikitext = JSON.parse(xhr.responseText);
       showScreen(wikitext);
     }
   }
 }
 getWiki();
};
function showScreen(wikitext){
  var data = "";
  for(var i=0; i<wikitext[1].length;i++){
    var url = wikitext[3][i];
    data += "<a class = 'wiki-link' target='_blank' href = " + "'"+ url +"'" + "><li><h3>"+wikitext[1][i]+"</h3><hr><p>" +wikitext[2][i] + "</p></li></a>"
  }
    wikiData.innerHTML = data;
}
