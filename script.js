let employees = [];

// Add employee
document.getElementById("addEmployeeBtn").addEventListener("click", () => {
  const name = document.getElementById("empName").value.trim();
  const salary = parseFloat(document.getElementById("empSalary").value);

  if (!name || isNaN(salary) || salary <= 0) {
    alert("Enter a valid name and salary!");
    return;
  }

  employees.push({ name, salary });
  updateTable();

  // Clear inputs
  document.getElementById("empName").value = "";
  document.getElementById("empSalary").value = "";
});

// Update table
function updateTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  employees.forEach((emp, index) => {
    const row = `
      <tr>
        <td>${emp.name}</td>
        <td>₹${emp.salary.toLocaleString()}</td>
        <td><button onclick="deleteEmployee(${index})">🗑️</button></td>
      </tr>`;
    tbody.innerHTML += row;
  });

  updateSummary();
}

// Delete employee
function deleteEmployee(index) {
  employees.splice(index, 1);
  updateTable();
}

// Update summary
function updateSummary() {
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const income = parseFloat(document.getElementById("income").value) || 0;
  const balance = income - totalSalary;

  document.getElementById("totalEmployees").textContent = employees.length;
  document.getElementById("totalSalary").textContent = totalSalary.toLocaleString();
  document.getElementById("balance").textContent = balance.toLocaleString();
}

// Update summary when income changes
document.getElementById("income").addEventListener("input", updateSummary);
