var app = app || {};

app.vm = (function () {
  var sw = './sw.js';
  var title = ko.observable('Wikipedia-Viewer');
  var pages = ko.observable();
  var searchTerm = '';
  var searchResult = ko.observableArray();
  var searchValue = ko.observable(searchResult()[0]);
  var searchValueIndex = ko.observable();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(sw)
      .then(function () {
        console.info('Service worker registered');
      })
      .catch(function (error) {
        console.error('Error in Service worker', error);
      });
  }

  if (!('indexedDB' in window)) {
    console.error('This browser doesn\'t support IndexedDB');
    return;
  }

  // if (!window.navigator.onLine) {
    readAllData('terms')
      .then(function (data) {
        searchResult(data);
      });
  // }

  function searchPage(term) {
    var query = term.toLowerCase();
    var url = 'https://en.wikipedia.org/w/api.php?format=' +
      'json&action=query&origin=*&prop=pageimages%7Cpageterms%7Cextracts%7Cinfo&list=&generator=search&piprop=' +
      'thumbnail&pithumbsize=500&pilimit=10&wbptterms=description&exsentences=3&explaintext=' +
      '1&exlimit=10&inprop=url&exintro=1&gsrsearch=' + query + '&gsrlimit10=';

    addSearchResult(query);

    if (query && window.navigator.onLine) {
      $.getJSON(url).then(function (response) {
        response.query ? pages(response.query.pages) : pages({
          info: 'The search parameter must be set'
        });
      });
    }
  }

  function addSearchResult(search) {
    if (search && _.indexOf(searchResult(), search) === -1) {
      searchResult.push(search);
      readAllData('terms')
        .then(function (response) {
          if (_.indexOf(response, search) === -1) {
            writeData('terms', search);
          }
        })
    }
    return;
  }

  var wikiKeys = ko.computed(function () {
    var storage = [];
    _.forIn(pages(), function (value, key) {
      storage.push(key);
    })
    return storage;
  });;

  function getFirstSentence(extract) {
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
    if (!window.navigator.onLine) {
      readAllData('input')
        .then(function (data) {
          pages(_.find(data, ['key', searchValue()]).pages)
          wikiKeys();
        })
    }
  }

  var vm = {
    title: title,
    searchTerm: searchTerm,
    searchPage: searchPage,
    wikiKeys: wikiKeys,
    pages: pages,
    visitSelectedWikiPage: visitSelectedWikiPage,
    getFirstSentence: getFirstSentence,
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
