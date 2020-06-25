const mysql = require("mysql");
const inquirer = require("inquirer");
// const { response } = require("express");

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
    // departmentTable();
    // roleTable();
    // mainMenu();

    connection.end();
});


query1 = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM ((employee INNER JOIN role ON employee.role_ID=role.id) INNER JOIN department ON role.department_id=department.id)";

/*
"INNER JOIN role ON employee.role_ID=role.id"
"INNER JOIN department ON department_id=department.id"
*/

query2 = "SELECT employee.first_name, employee.last_name, role.title, role.salary FROM employee INNER JOIN role ON employee.role_ID=role.id";

/*
department.name
employee.first_name
employee.last_name
role.title
role.salary
*/


function employeeTable() {
    connection.query(query1, function (err, res) {
        if (err) throw err;
        console.table(res)
    });
};

function departmentTable() {
    connection.query(query2, function (err, res) {
        if (err) throw err;
        console.table(res)
    });
};

function roleTable() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res)
    });
};

function mainMenu() {
    inquirer.prompt({
        name: "main",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee",
            "Update Employee Manager",
            "Update Employee Role"
        ]
    }).then(function (results) {
        switch (results.main) {
            case "View All Employees":
                function1();
                mainMenu();
                break;
            case "View All Employees by Department":
                function2();
                mainMenu();
                break;
            case "View All Employees by Manager":
                break;
            case "Add Employee":
                break;

            case "Remove Employee":
                break;

            case "Update Employee":
                break;

            case "Update Employee Manager":
                break;

            case "Update Employee Role":
                break;

        }
    });
}

function function1() {

};

function function2() {

};