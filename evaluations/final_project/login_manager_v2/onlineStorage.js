// <!-- Code Written By
// Mahimna Mehta
// 2331798 -->
const endpoint = "http://sandboxserver-001-site1.atempurl.com/SimpleLogin";

const studentId = '2331798';
const getData = `${endpoint + `/GetList?studentNumber=` + studentId}`
const saveData = `${endpoint + `/Save?studentNumber=` + studentId}`
const deleteData = `${endpoint + `/Delete?studentNumber=` + studentId}`

$(document).ready(function () {
    loadFromStorage();
});

function loadFromStorage() {
    $.ajax({
        url: getData,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (listOfLogs) {
            displayLoadedLoginData(listOfLogs);
        },
        error: function (error) {
            console.log("Error: " + JSON.stringify(error));
        }
    });
}

function saveToStorage(login, callback) {
    // generating response as the server's api need it in format.
    const data = {
        id : login.id,
        url : login.url,
        username : login.username,
        password : login.password,
    }
    $.ajax({
        url: saveData,
        type: "POST",
        data: data, // Send the data object
        success: function (response) {
            console.log(response.message);
            callback();
        },
        error: function (error) {
            console.log("Error: " + JSON.stringify(error));
        }
    });
}

function deleteFromStorage(login, callback) {
        // generating response as the server's api need it in format.
    const data = {
        id : login.id,
        url : login.url,
        username : login.username,
        password : login.password,
    }
    $.ajax({
        url: deleteData,
        type: "POST",
        data: data, // Send the data object
        success: function (response) {
            if (response.success) {
                console.log(response.message);
                callback();
                // calling to update the list of data - if no data found - table should be hidden.
                loadFromStorage();
            }
            else
                console.log("Errors: " + response.errors.join(", "));
        },
        error: function (error) {
            console.log("Error: " + JSON.stringify(error));
        }
    });
}