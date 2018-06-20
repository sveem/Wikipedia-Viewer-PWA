var app = app || {};

app.vm = (function() {
  var title = ko.observable('Wikipedia-Viewer');
  var pages = ko.observable();
  var searchTerm = '';
  var showMessages = ko.observable(false);

  function searchPage(term) {
    var url2 = 'https://en.wikipedia.org/w/api.php?action=query&format=' +
      'json&prop=pageimages%7Cpageterms%7Cextracts%7Cinfo&list=&generator=search&piprop=' +
      'thumbnail&pithumbsize=500&pilimit=10&wbptterms=description&exsentences=3&explaintext=' +
      '1&exlimit=10&inprop=url&exintro=1&gsrsearch=' + term.toLowerCase() + '&gsrlimit10=&callback=?'
    $.getJSON(url2, function(data) {
      data.query ? pages(data.query.pages) : pages({
        info: 'The search parameter must be set'
      });
      console.log('PAGES', pages());
      showMessages(true);
    })
  }

  var wikiKeys = ko.computed(function() {
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

  var vm = {
    title: title,
    searchTerm: searchTerm,
    searchPage: searchPage,
    wikiKeys: wikiKeys,
    pages: pages,
    visitSelectedWikiPage: visitSelectedWikiPage,
    showMessages: showMessages,
    firstSentence: firstSentence,
    visitRandomWikiPage: visitRandomWikiPage
  };

  return vm;
}());

$(function() {
  ko.applyBindings(app.vm);
});