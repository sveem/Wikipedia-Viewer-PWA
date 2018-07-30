var app = app || {};

app.vm = (function () {
  var sw = './sw.js';
  var title = ko.observable('Wikipedia-Viewer');
  var pages = ko.observable();
  var searchTerm = '';
  var searchResult = ko.observableArray();
  var searchValue = ko.observable(searchResult()[0]);
  var self = this;

  self.registerServiceWorker(sw);
  self.validateIndexedDB();

  loadDropDownMenu();

  function searchPage(term) {
    var query = term.toLowerCase();
    var url = 'https://en.wikipedia.org/w/api.php?format=' +
      'json&action=query&origin=*&prop=pageimages%7Cpageterms%7Cextracts%7Cinfo&list=&generator=search&piprop=' +
      'thumbnail&pithumbsize=500&pilimit=10&wbptterms=description&exsentences=3&explaintext=' +
      '1&exlimit=10&inprop=url&exintro=1&gsrsearch=' + query + '&gsrlimit10=';

    addSearchResult(query);

    if (query && window.navigator.onLine) {
      $.getJSON(url)
        .then(function (response) {
          response.query 
          ? pages(response.query.pages) 
          : pages({ info: 'The search parameter must be set' });
        });
    }
  }

  function addSearchResult(search) {
    if (window.navigator.onLine) {
      if (search && _.indexOf(searchResult(), search) === -1) {
        searchResult.push(search);
        self.readAllData('queries')
          .then(function (response) {
            if (_.indexOf(response, search) === -1) {
              self.writeData('queries', search);
            }
          })
      }
    }
  }

  var wikiKeys = ko.computed(function () {
    var keyStorage = [];
    _.forIn(pages(), function (value, key) {
      keyStorage.push(key);
    })
    return keyStorage;
  });;

  function loadDropDownMenu() {
    self.readAllData('queries')
      .then(function (data) {
        searchResult(data);
      });
  }

  function clearDropDownMenu() {
    self.clearAllData('queries');
    self.clearAllData('pages');
    searchResult([]);
  }

  function onChange(event) {
    searchPage(searchValue());
    if (!window.navigator.onLine) {
      self.readAllData('pages')
        .then(function (data) {
          pages(_.find(data, ['key', searchValue()]).pages);
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
    visitSelectedWikiPage: this.visitSelectedWikiPage,
    getDescription: this.getDescription,
    visitRandomWikiPage: this.visitRandomWikiPage,
    searchResult: searchResult,
    searchValue: searchValue,
    onChange: onChange,
    clearDropDownMenu: clearDropDownMenu
  };

  return vm;
}());

$(function () {
  ko.applyBindings(app.vm);
});