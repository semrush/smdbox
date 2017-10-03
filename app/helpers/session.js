import cloneDeep from 'lodash/cloneDeep';

export const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
export const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

const dbName = 'smdboxdb';
const storeName = 'smdboxstorage';
const storageKey = 'smdboxfullstore';

const logerr = (err) => {
    console.log(err);
};

const connectDB = (f) => {
    const request = indexedDB.open(dbName, 1);
    request.onerror = logerr;
    request.onsuccess = function(){
        f(request.result);
    }
    request.onupgradeneeded = function(e){
        e.currentTarget.result.createObjectStore(storeName);
        connectDB(f);
    }
}

export const get = (f) => {
    connectDB(function(db){
        const request = db.transaction([storeName], "readonly").objectStore(storeName).get(storageKey);
        request.onerror = logerr;
        request.onsuccess = function(){
            if (typeof (request.result) === 'object'){
                f(request.result);
            } else {
                f(false);
            }
        }
    });
}

export const write = (data) => {
    connectDB(function(db){
        const request = db.transaction([storeName], "readwrite").objectStore(storeName).put(data, storageKey);
        request.onerror = logerr;
        request.onsuccess = function(){
            return request.result;
        }
    });
};


export const syncStore = (store) => {
    store.subscribe( () => {
        // remove formData from store
        let stateData = cloneDeep(store.getState());
        
        // hotfix - react-json-schema cannot restore object values. Do not save formData
        if (stateData.selectedMethod &&
            stateData.selectedMethod.formData &&
            Object.keys(stateData.selectedMethod.formData).length) {
            stateData.selectedMethod.formData = {};
        }
        write(stateData);
    })
}
