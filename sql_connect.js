const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require('console.table');
const { query } = require("express");


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
    mainMenu();
    // connection.end();
});

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
                displayEmp();
                break;
            case "View All Employees by Department":
                displayDept();
                break;
            case "View All Employees by Manager":
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Remove Employee":
                break;
            case "Update Employee":
                break;
            case "Update Employee Manager":
                break;
            case "Update Employee Role":
                break;
        };
    });
}


function displayDept() {

}

function displayEmp() {
    let query = `SELECT employee.first_name AS First, 
    employee.last_name AS Last, 
    role.title AS Title, 
    role.salary AS Salary, 
    department.name AS Department
    FROM ((employee INNER JOIN role ON employee.role_ID=role.id) 
    INNER JOIN department ON role.department_id=department.id)`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        mainMenu();

    });
}

function displayDept() {
    let query = `SELECT * FROM department`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        return res
    });
}


function addEmployee() {
    let query = `SELECT * FROM department`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "nameFirst",
                type: "input",
                message: "First Name: "
            },

            {
                name: "nameLast",
                type: "input",
                message: "Last Name: "
            },

            {
                name: "title",
                type: "input",
                message: "Job Title: "
            },

            {
                name: "salary",
                type: "input",
                message: "Gross Annual Salary (estimated): "
            },

            {
                name: "dept",
                type: "rawlist",
                message: "Department: ",
                choices: function () {
                    const deptArray = [];
                    for (let i = 0; i < res.length; i++) {
                        deptArray.push(res[i].name);
                    }
                    return deptArray;
                }

            }
        ]).then(function (answer) {

            console.log(`Table has been updated for ${answer.nameFirst}`)
            let query = `INSERT INTO employee (first_name, last_name, role_id)
            VALUES ("${answer.nameFirst}", "${answer.nameLast}");
            INSERT INTO role (title, salary, department_id)
            VALUES ("${answer.title}", ${answer.salary});
            INSERT INTO department (name)
            VALUES ("${answer.dept}")`;

            connection.query(query, function (err, res) {
                if (err) throw err;
                mainMenu();
            });

        });
    });








};


/*
let query = ;

connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res)
});
*/
/*
function roleTable() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res)
    });
};



function newQuery(sqlQuery) {
    connection.query(sqlQuery, function (err, res) {
        if (err) throw err;
    })
};

newQuery(`SELECT * FROM department;`)

function listDept() {
    for (let i = 0; i < dept.length; i++) {
        if ( === ) {

        }
    }

    */