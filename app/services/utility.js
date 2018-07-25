function registerServiceWorker(sw) {
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
  return;
}

function validateIndexedDB() {
  if (!('indexedDB' in window)) {
    console.error('This browser doesn\'t support IndexedDB');
    return;
  }
  return;
}

var dbPromise = idb.open('wikipedia', 1, function (db) {
  if (!db.objectStoreNames.contains('pages')) {
    db.createObjectStore('pages', {
      autoIncrement: true
    });
  }
  if (!db.objectStoreNames.contains('queries')) {
    db.createObjectStore('queries', {
      autoIncrement: true
    });
  }
});

function writeData(st, data) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      store.add(data);
      return tx.complete;
    });
}

function readAllData(st) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readonly');
      var store = tx.objectStore(st);
      return store.getAll();
    });
}

function clearAllData(st) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      store.clear();
      return tx.complete;
    });
}

function getSearchInputFromUrl(url) {
  var searchUrl = url.split('&');
  return searchUrl[searchUrl.length - 2].slice(10)
}
