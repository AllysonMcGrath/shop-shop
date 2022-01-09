export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    //open connection to database with version 1
    const request = window.indexedDB.open('shop-shop', 1);

    //create variables to hold reference to database, transaction, object store
    let db, tx, store;

    //if version changed or first time using database, run this and create object stores
    request.onupgradeneeded = function(e) {
      const db = request.result;
      //create object store for each and set key to _id
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' })
      db.createObjectStore('cart', { keyPath: '_id' })
    };
    //handle errors
    request.onerror = function(e) {
      console.log('There was an error');
    };

    request.onsuccess = function(e) {
      //save reference of database to db variable
      db = request.result;
      //open transaction to do what is passed into storeName
      tx = db.transaction(storeName, 'readwrite');
      //save reference to that object store
      store = tx.objectStore(storeName);

      //if errors let us know
      db.onerror = function(e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }
      //when transaction complete close connection
      tx.oncomplete = function() {
        db.close();
      };
    };

  });
}