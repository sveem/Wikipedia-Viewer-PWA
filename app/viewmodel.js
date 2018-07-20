var app = app || {};

app.vm = (function () {
  var sw = './sw.js';
  var title = ko.observable('Wikipedia-Viewer');
  var pages = ko.observable();
  var searchTerm = '';
  var showMessages = ko.observable(false);
  var searchResult = ko.observableArray();
  var searchValue = ko.observable(searchResult()[0]);
  var searchValueIndex = ko.observable();
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(sw)
      .then(function () {
        console.log('Service worker registered');
      })
      .catch(function (error) {
        console.log('Error in Service Worker', error);
      });
  }

  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }


  function searchPage(term) {
    var url = 'https://en.wikipedia.org/w/api.php?format=' +
    'json&action=query&origin=*&prop=pageimages%7Cpageterms%7Cextracts%7Cinfo&list=&generator=search&piprop=' +
      'thumbnail&pithumbsize=500&pilimit=10&wbptterms=description&exsentences=3&explaintext=' +
      '1&exlimit=10&inprop=url&exintro=1&gsrsearch=' + term.toLowerCase() + '&gsrlimit10=';

    addSearchResult(term);
    openIndexedDB();
   if (term && !window.navigator.onLine) {
      readAllData('input')
        .then(function (data) {
          console.log('Term-Data', data);

        })
   }

    if (term && window.navigator.onLine) {
      $.getJSON(url).then(function (response) {
        response.query ? pages(response.query.pages) : pages({
          info: 'The search parameter must be set'
        });
        showMessages(term);
      });
    }
  }

  function addSearchResult(search) {
    // ToDo: Show all offline records once you'r back online
    if (search && searchResult().indexOf(search.toLowerCase()) === -1) {
      searchResult.push(search.toLowerCase());
      writeData('terms', search);
    }
    return;
  }

  var wikiKeys = ko.computed(function () {
    var storage = [];
    for (var key in pages()) {
      storage.push(key);
    }
    return storage;
  });
  
  if(!window.navigator.onLine) {
    readAllData('terms')
      .then(function(data) {
        searchResult(data);
    });
  }

  function openIndexedDB() {
    if ('indexedDB' in window && !window.navigator.onLine) {
      readAllData('input')
        .then(function(data) {
        pages(data);  
      });
    }
  }

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
    readAllData('terms')
      .then(function (data) {
        console.log(data.indexOf(searchValue()));
      })
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



// workbox.routing.registerRoute(/.*(?:wikipedia)\.org.*$/, function (args) {
//   fetch(args.event.request)
//     .then(function (res) { 
//       var clonedRes = res.clone();
//       // Remove clearAllData - Create a button to clean the collection in indexedDB
//       clearAllData('input')
//         .then(function () {
//           return clonedRes.json();
//         })
//         .then(function (data) {
//           var pages = data.query.pages;
//           writeData('input', {pageid : 123, pages: pages})
//           // TODO: Modify pageid - Everything works!!!!
//           // Add lodash, remove pages.pageid - change the shape of the data
//           // 
//           // for (var key in pages) {
//           //   writeData('input', pages[key]);
//           // }  
//         });
//       return res;
//     });
// });
