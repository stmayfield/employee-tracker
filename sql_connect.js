const connection = require("./assets/js/connection.js")
const inquirer = require("inquirer");
const consoleTable = require('console.table');
require("./assets/js/connection.js");

mainMenu();

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
                removeEmployee();
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


const allTables = `SELECT employee.id AS ID, employee.first_name AS First, employee.last_name AS Last, role.title AS Title, role.salary AS Salary, department.name AS Department
FROM ((employee INNER JOIN role ON employee.role_ID=role.id) 
INNER JOIN department ON role.department_id=department.id);`

const allTablesConsole = `SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    role.salary, 
    department.name
    FROM ((employee INNER JOIN role ON employee.role_ID=role.id) 
    INNER JOIN department ON role.department_id=department.id)`

function displayEmp() {
    connection.query(allTables, function (err, res) {
        if (err) throw err;
        console.table(res)
        mainMenu();
    });
}

function displayDept() {
    let query = `SELECT * FROM department`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "showDept",
                type: "rawlist",
                message: "Select Department: ",
                choices: function () {
                    const deptArr = [];

                    if (err) throw err;
                    for (let i = 0; i < res.length; i++) {
                        deptArr.push(res[i].name);
                    }
                    return deptArr;
                }
            }
        ]).then(
            function (answer) {
                let query = `
                SELECT employee.id, 
                employee.first_name AS First, 
                employee.last_name AS Last, 
                role.title AS Title, 
                role.salary AS Salary, 
                department.name AS Department
                FROM ((employee INNER JOIN role ON employee.role_ID=role.id) 
                INNER JOIN department ON role.department_id=department.id) WHERE department.name=?`;
                connection.query(query, [answer.showDept], function (err, res) {
                    if (err) throw err;
                    console.table(res)
                    mainMenu();
                });
            }
        );
    });
}

function addEmployee() {
    connection.query("SELECT * FROM role", function (err, res) {
        console.log(res)
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
                type: "rawlist",
                message: "Job Title: ",
                choices:
                    function () {
                        if (err) throw err;
                        const insertArr = [];
                        for (let i = 0; i < res.length; i++) {
                            insertArr.push(res[i].title);
                        }
                        return insertArr;
                    }
            }


        ]).then(function (answer) {
            console.log(answer)
            console.log(`Table has been updated for ${answer.nameFirst} ${answer.nameLast}`)
            let query = `
            
            INSERT INTO employee (first_name, last_name, full_name, role_id)
            VALUES ("${answer.nameFirst}", "${answer.nameLast}", "${answer.nameFirst} ${answer.nameLast}", 1);`


            // function getDeptID() {
            //     const idArr = [];
            //     for (let i = 0; i < res.length; i++) {
            //         if (res.title === answer.title) {
            //             idArr.push(res[i].id)
            //             return
            //         }
            //     }
            // }

            function getRoleID() {
                connection.query("SELECT * FROM role", function (err, res) {
                    console.log(res);
                    if (err) throw err;
                })
            }


            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log(res)
                mainMenu();

            });
        });
    });

};



function addEmployee2(title) {
    connection.query("SELECT * FROM department", function (err, res) {
        console.log(res)
        if (err) throw err;
        inquirer.prompt([

            {
                name: "dept",
                type: "rawlist",
                message: "Department: ",
                choices:
                    function () {
                        if (err) throw err;
                        const insertArr = [];
                        for (let i = 0; i < res.length; i++) {
                            insertArr.push(res[i].id);
                        }
                        return insertArr;
                    }
            }

        ]).then(function (answer) {
            console.log(answer)
            let query = `
            INSERT INTO role (title, department_id) 
            VALUES ("${title}", "${answer.dept}");`


            connection.query(query, function (err, res) {
                if (err) throw err;
                mainMenu();
            })
        })
    })
}


function removeEmployee() {
    let query = `SELECT * FROM employee;`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
        inquirer.prompt(
            {
                name: "remove",
                type: "rawlist",
                message: "Which employee do you want to remove?",
                choices: function () {
                    const removeArr = [];

                    for (let i = 0; i < res.length; i++) {
                        removeArr.push(res[i].full_name);
                    }
                    console.log(removeArr)
                    return removeArr;
                }
            }
        ).then(function (answer) {
            console.log(answer);
            let query = `DELETE FROM employee WHERE full_name=?`;
            connection.query(query, [answer.remove], function (err) {
                if (err) throw err;
                mainMenu();
            });
        });
    });

}

function newConnect() {
    let query = ``;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
    });
}


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



        connection.query(allTablesLite, function (err, res) {
        if (err) throw err;
        console.log(res);

    */