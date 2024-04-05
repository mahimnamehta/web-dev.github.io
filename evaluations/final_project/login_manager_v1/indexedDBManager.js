// <!-- Code Written By
// Mahimna Mehta
// 2331798 -->
let db = null;

initialize();

function initialize() {
    let request = window.indexedDB.open("LoginManagerDB");

    request.onsuccess = function (event) {
        db = event.target.result;
        loadFromStorage();
    };

    request.onerror = function (event) {
        console.error("Error while opening IndexedDB connection:", event.target.error);
    };

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        db.createObjectStore("Logs", { keyPath: "id"});
    };
}

function loadFromStorage() {

    let transaction = db.transaction("Logs", "readonly");
    let request = transaction.objectStore("Logs").getAll();

    request.onsuccess = function () {
        // console.log(request.result,'logindata loaded and sent');
        displayLoadedLoginData(request.result);
    };

    request.onerror = function (event) {
        console.error("Error retrieving data:", event.target.error);
    };
}

function findByLogsNumber(id, callback) {

    let transaction = db.transaction("Logs", "readonly");
    let request = transaction.objectStore("Logs").get(id);
    request.onsuccess = function (event) {
        let log = event.target.result;
        callback(log);
    };
    request.onerror = function (event) {
        console.error("Error while opening IndexedDB connection:", event.target.error);
    };
}

function saveToStorage(log, callback) {

    findByLogsNumber(log.id, function (foundLog) {

        let transaction = db.transaction("Logs", "readwrite");
        let request;

        if (foundLog == null)
            request = transaction.objectStore("Logs").add(log);
        else
            request = transaction.objectStore("Logs").put(log);

        request.onsuccess = function () {
            callback();
        };

        request.onerror = function () {
            console.error("Error updating log: " + request.error);
        };
    });
}

function deleteFromStorage(log, callback) {
    let transaction = db.transaction("Logs", "readwrite");
    let request = transaction.objectStore("Logs").delete(log.id);

    // console.log('deleteFromStorage() - debugging here - using console.log to check if getting the value as needed.')
    // console.log(log,'log');
    // console.log(transaction,'transaction');
    // console.log(request,'request');
    // console.log('deleteFromStorage() - debugging here - using console.log to check if getting the value as needed.')


    request.onsuccess = function () {
        callback();
        loadFromStorage();
    };

    request.onerror = function () {
        console.error("Error deleting log: " + request.error);
    };
}