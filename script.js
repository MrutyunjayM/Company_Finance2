// Array to store employees
let employees = [];

// Add employee button
document.getElementById("addEmployee").addEventListener("click", () => {
  const name = prompt("Enter employee name:");
  const salary = parseFloat(prompt("Enter salary (₹):")) || 0;

  if (name && salary > 0) {
    employees.push({ name, salary });
    updateTable();
  }
});

// Update the salary table
function updateTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  employees.forEach((emp, index) => {
    const row = `
      <tr>
        <td>${emp.name}</td>
        <td>₹${emp.salary.toLocaleString()}</td>
      </tr>`;
    tbody.innerHTML += row;
  });

  updateSummary();
}

// Calculate and update summary section
function updateSummary() {
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const income = parseFloat(document.getElementById("income").value) || 0;
  const balance = income - totalSalary;

  document.getElementById("totalEmployees").textContent = employees.length;
  document.getElementById("totalSalary").textContent = totalSalary.toLocaleString();
  document.getElementById("balance").textContent = balance.toLocaleString();
}

// Update summary whenever income changes
document.getElementById("income").addEventListener("input", updateSummary);
