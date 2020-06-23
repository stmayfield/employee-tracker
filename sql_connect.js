const mysql = require("mysql");
const inquirer = require("inquirer");
const { response } = require("express");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;

    console.log("connected as id " + connection.threadId);

    employeeTable();
    departmentTable();
    roleTable();

    connection.end();
});


function employeeTable() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res)
    });
}

function departmentTable() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res)
    });
}

function roleTable() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res)
    });
}