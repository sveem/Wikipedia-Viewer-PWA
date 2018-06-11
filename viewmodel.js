var app = app || {};

app.vm = (function() {
  var title = ko.observable('Wikipedia-Viewer');
  var pages = ko.observable();
  var searchTerm = '';
  
  function searchPage(term) {
    // var url = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&
    // gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max
    // &gsrsearch=${encodeURIComponent(term)}&callback=?`;
    var url2 = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms%7Cextracts%7Cinfo&list=&generator=search&piprop=thumbnail&pithumbsize=500&pilimit=10&wbptterms=description&exsentences=3&explaintext=1&exlimit=10&inprop=url&exintro=1&gsrsearch=" + term + "&gsrlimit10=&callback=?"
    $.getJSON(url2, function (data) {
      console.log('Wikipedia-Data', data);
      data.query ? pages(data.query.pages) : pages( {info: 'The search parameter must be set'} );
      console.log('PAGES', pages());
    })
  }
//30446
  var wikiKeys = ko.computed(function() {
    var storage = [];
    for (var key in pages()) {
      storage.push(key);
    }
    return storage;
  });
  

  var vm = {
    title: title,
    searchTerm: searchTerm,
    searchPage: searchPage,
    wikiKeys: wikiKeys,
    pages: pages  
  };
 
  return vm;
}());

$(function() {
  ko.applyBindings(app.vm);  
});