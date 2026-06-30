// Employee Management System


interface Employee {
    id: number;
    name: string;
    department: string;
    salary: number;
    isActive: boolean;
}

let employees: Employee[] = [];

let nextId = 1;

function addEmployee(name: string, department: string, salary: number, isActive: boolean = true): Employee {
    const newEmployee: Employee = {
        id: nextId,
        name,
        department,
        salary,
        isActive
    };

    employees.push(newEmployee);
    nextId++;

    return newEmployee;
}

function removeEmployee(id: number): boolean {
    const index = employees.findIndex(emp => emp.id === id);

    if (index === -1) {
        console.log(`Employee with id ${id} not found, nothing removed.`);
        return false;
    }

    employees.splice(index, 1);
    return true;
}

function getEmployeeById(id: number): Employee | undefined {
    return employees.find(emp => emp.id === id);
}

function updateSalary(id: number, newSalary: number): boolean {
    const emp = getEmployeeById(id);

    if (!emp) {
        console.log(`Cannot update salary, employee ${id} does not exist.`);
        return false;
    }

    if (newSalary < 0) {
        console.log("Salary cannot be negative.");
        return false;
    }

    emp.salary = newSalary;
    return true;
}

function toggleActiveStatus(id: number): void {
    const emp = getEmployeeById(id);

    if (!emp) {
        console.log(`Employee ${id} not found.`);
        return;
    }

    emp.isActive = !emp.isActive;
}


function getActiveEmployees(): Employee[] {
    return employees.filter(emp => emp.isActive);
}

function getEmployeesByDepartment(department: string): Employee[] {
    return employees.filter(emp => emp.department.toLowerCase() === department.toLowerCase());
}

function getAverageSalary(department?: string): number {
    const list = department ? getEmployeesByDepartment(department) : employees;

    if (list.length === 0) {
        return 0;
    }

    const total = list.reduce((sum, emp) => sum + emp.salary, 0);
    return total / list.length;
}

function getHighestPaidEmployee(): Employee | undefined {
    if (employees.length === 0) return undefined;


    let highest = employees[0];
    for (const emp of employees) {
        if (emp.salary > highest.salary) {
            highest = emp;
        }
    }

    return highest;
}

function printEmployee(emp: Employee): void {
    const status = emp.isActive ? "Active" : "Inactive";
    console.log(`#${emp.id} - ${emp.name} | ${emp.department} | $${emp.salary} | ${status}`);
}

function printAllEmployees(): void {
    if (employees.length === 0) {
        console.log("No employees to show.");
        return;
    }

    console.log("---- Employee List ----");
    employees.forEach(printEmployee);
    console.log("------------------------");
}


addEmployee("Ali Raza", "Engineering", 75000);
addEmployee("Sara Khan", "Marketing", 55000);
addEmployee("Bilal Ahmed", "Engineering", 82000);
addEmployee("Hina Tariq", "HR", 48000, false);
addEmployee("Usman Javed", "Sales", 60000);

printAllEmployees();

console.log("\nActive employees only:");
getActiveEmployees().forEach(printEmployee);

console.log("\nEngineering department:");
getEmployeesByDepartment("Engineering").forEach(printEmployee);

console.log(`\nAverage salary (all): $${getAverageSalary().toFixed(2)}`);
console.log(`Average salary (Engineering): $${getAverageSalary("Engineering").toFixed(2)}`);

const topEarner = getHighestPaidEmployee();
if (topEarner) {
    console.log(`\nHighest paid employee:`);
    printEmployee(topEarner);
}

console.log("\nGiving Sara a raise...");
updateSalary(2, 60000);
printEmployee(getEmployeeById(2)!);

console.log("\nToggling Hina's active status...");
toggleActiveStatus(4);
printEmployee(getEmployeeById(4)!);

console.log("\nRemoving Usman (id 5)...");
removeEmployee(5);
printAllEmployees();
