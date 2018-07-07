var app = app || {};

app.vm = (function () {
  var sw = './sw.js';
  var title = ko.observable('Wikipedia-Viewer');
  var pages = ko.observable();
  var searchTerm = '';
  var showMessages = ko.observable(false);
  var searchResult = ko.observableArray()
  var searchValue = ko.observable(searchResult()[0]);
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(sw)
      .then(function () {
        console.log('Service worker registered');
      })
      .catch(function (error) {
        console.log('Error in Service Worker', error);
      })
  }

  function searchPage(term) {
    var url = 'https://en.wikipedia.org/w/api.php?action=query&format=' +
      'json&prop=pageimages%7Cpageterms%7Cextracts%7Cinfo&list=&generator=search&piprop=' +
      'thumbnail&pithumbsize=500&pilimit=10&wbptterms=description&exsentences=3&explaintext=' +
      '1&exlimit=10&inprop=url&exintro=1&gsrsearch=' + term.toLowerCase() + '&gsrlimit10=&callback=?'
    
    var url1 = 'https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=' + term.toLowerCase();
    var mocky = 'https://www.mocky.io/v2/5b3fa2f0340000c809001bc2'
    // TO DO:
    // 1. Fetch instead of $getJSON
    // 2. Fetch in sw with random api call/ replace url with random api endpoint
    // 3. In SW replace fetch with $getJSON
    // 4. Invistigate Headers and Cross-Origin of Wikipedia - add 2nd param to fetch request {headers: etc}
    // pass Content-Type: application/json or text/javascript
    // var options = {
    //   "Content-Type": "application/json; charset=UTF-8",
    //   "Access-Control-Allow": '*',
    //   mode: 'no-cors'
    // }
    let header = new Headers({
      'Access-Control-Allow-Origin':'',
      'Content-Type': 'multipart/form-data'
      });
    
    addSearchResult(term);
    if (term) {
      fetch(url, header).then( function (data) {
          console.log('DATA', data);
          data.query ? pages(data.query.pages) : pages({
          info: 'The search parameter must be set'
        });
        showMessages(true);
      })
    }
  }

  function addSearchResult(search) {
    if (search && searchResult().indexOf(search.toLowerCase()) === -1) {
      searchResult.push(search.toLowerCase());
    }
  }

  var wikiKeys = ko.computed(function () {
    var storage = [];
    for (var key in pages()) {
      storage.push(key);
    }
    return storage;
  });

  function firstSentence(extract) {
    return extract ? extract.split('. ')[0] : undefined;
  }

  function visitSelectedWikiPage(id) {
    var url = 'https://en.wikipedia.org/?curid='
    return window.location.href = (url + id);
  }

  function visitRandomWikiPage() {
    var url = "https://en.wikipedia.org/wiki/Special:Random";
    return window.location.href = url;
  }

  function onChange(event) {
    searchPage(searchValue());
  }

  var vm = {
    title: title,
    searchTerm: searchTerm,
    searchPage: searchPage,
    wikiKeys: wikiKeys,
    pages: pages,
    visitSelectedWikiPage: visitSelectedWikiPage,
    showMessages: showMessages,
    firstSentence: firstSentence,
    visitRandomWikiPage: visitRandomWikiPage,
    searchResult: searchResult,
    searchValue: searchValue,
    onChange: onChange
  };

  return vm;
}());

$(function () {
  ko.applyBindings(app.vm);
});