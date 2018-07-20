var dbPromise = idb.open('search', 1, function (db) {
  if (!db.objectStoreNames.contains('input')) {
    db.createObjectStore('input', { autoIncrement: true });
  }
  if (!db.objectStoreNames.contains('terms')) {
    db.createObjectStore('terms', { autoIncrement: true });
  }
 });

function writeData(st, data) {
  return dbPromise
    .then(function(db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      store.add(data);
      return tx.complete;
    });
}

function readAllData(st) {
  return dbPromise
    .then(function(db) {
      var tx = db.transaction(st, 'readonly');
      var store = tx.objectStore(st);
      return store.getAll();
    });
}

function clearAllData(st) {
  return dbPromise
    .then(function(db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      store.clear();
      return tx.complete;
    });
}

function deleteItemFromData(st, id) {
  dbPromise
    .then(function(db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      store.delete(id);
      return tx.complete;
    })
    .then(function() {
      console.log('Item deleted!');
    });
}