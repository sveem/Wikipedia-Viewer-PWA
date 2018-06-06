var app = app || {};

app.vm = (function() {
  var title = ko.observable('Wikipedia-Viewer');
  var searchTerm = '';
  
  function searchPage(term) {
    console.log('searchPage', term);
    var url = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&
    gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max
    &gsrsearch=${term}&callback=JSON_CALLBACK`;
    $.get(url, (data) => {
      console.log('Wikipedia-Data', JSON.parse(data));  
    })
  }
  
  var vm = {
    title: title,
    searchTerm: searchTerm,
    searchPage: searchPage  
  };
 
  return vm;
}());

$(function() {
  ko.applyBindings(app.vm);  
});