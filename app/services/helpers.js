function getDescription(extract) {
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