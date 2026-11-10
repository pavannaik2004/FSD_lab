// Program 7: MongoDB Queries using Comparison Selectors and Logical Selectors

// 1. Select database
use company

// 2. Drop existing employees collection
db.employees.drop()

// 3. Insert sample employee records
db.employees.insertMany([
  {
    employee_id: 101,
    name: "Sonia Rao",
    department: "Engineering",
    salary: 95000,
    hire_date: new Date("2023-01-15"),
    performance_score: 4.5,
    status: "Active"
  },
  {
    employee_id: 102,
    name: "Rajesh Kumar",
    department: "HR",
    salary: 68000,
    hire_date: new Date("2024-03-22"),
    performance_score: 4.1,
    status: "Active"
  },
  {
    employee_id: 103,
    name: "Arjun Singh",
    department: "Engineering",
    salary: 120000,
    hire_date: new Date("2022-06-01"),
    performance_score: 4.8,
    status: "Active"
  },
  {
    employee_id: 104,
    name: "Priya Mehta",
    department: "Sales",
    salary: 85000,
    hire_date: new Date("2023-11-10"),
    performance_score: 4.2,
    status: "Active"
  },
  {
    employee_id: 105,
    name: "Vikram Reddy",
    department: "Sales",
    salary: 85000,
    hire_date: new Date("2024-08-01"),
    status: "On Leave"
  }
])

// 4. Comparison Selectors

// 4a. $gt and $lte: Salary greater than 90000 and less than or equal to 120000
db.employees.find({
  salary: { $gt: 90000, $lte: 120000 }
})

// 4b. $in: Employees belonging to HR or Sales department
db.employees.find({
  department: { $in: ["HR", "Sales"] }
})

// 4c. $ne: Employees whose status is not On Leave
db.employees.find({
  status: { $ne: "On Leave" }
})

// 5. Logical Selectors

// 5a. Implicit $and: Engineering employees with performance score >= 4.5
db.employees.find({
  department: "Engineering",
  performance_score: { $gte: 4.5 }
})

// 5b. $or: Employees belonging to HR department OR earning more than 100000
db.employees.find({
  $or: [
    { department: "HR" },
    { salary: { $gt: 100000 } }
  ]
})

// 6. Combining Comparison and Logical Selectors

// Find Active employees in Engineering or Sales hired before 2024
db.employees.find({
  status: "Active",
  department: { $in: ["Engineering", "Sales"] },
  hire_date: { $lt: new Date("2024-01-01") }
})

// 7. Display all employees
db.employees.find()

// 8. Count total employees
db.employees.countDocuments()