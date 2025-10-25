let employees = [];
let financeData = JSON.parse(localStorage.getItem("financeData")) || {};
let currentMonth = "";

const monthSelect = document.getElementById("monthSelect");
const incomeInput = document.getElementById("income");

function populateMonths() {
  monthSelect.innerHTML = "";
  Object.keys(financeData).forEach(month => {
    const opt = document.createElement("option");
    opt.value = month;
    opt.textContent = month;
    monthSelect.appendChild(opt);
  });
}

function newMonth() {
  const month = prompt("Enter month name (e.g., October-2025):");
  if (month && !financeData[month]) {
    financeData[month] = { income: 0, employees: [] };
    currentMonth = month;
    populateMonths();
    monthSelect.value = month;
    employees = [];
    incomeInput.value = "";
    updateTable();
    updateSummary();
  }
}

function addEmployee() {
  const name = prompt("Enter employee name:");
  const salary = parseFloat(prompt("Enter salary (₹):")) || 0;
  if (name && salary > 0) {
    employees.push({ name, salary });
    updateTable();
  }
}

function deleteEmployee(index) {
  employees.splice(index, 1);
  updateTable();
}

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

function updateSummary() {
  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
  const income = parseFloat(incomeInput.value) || 0;
  const balance = income - totalSalary;

  document.getElementById("totalEmployees").textContent = employees.length;
  document.getElementById("totalSalary").textContent = totalSalary.toLocaleString();
  document.getElementById("balance").textContent = balance.toLocaleString();

  updateChart(income, totalSalary, balance);
}

function saveMonth() {
  if (!currentMonth) return alert("Select or create a month first!");
  financeData[currentMonth] = {
    income: parseFloat(incomeInput.value) || 0,
    employees: employees
  };
  localStorage.setItem("financeData", JSON.stringify(financeData));
  alert("✅ Data saved for " + currentMonth);
}

function loadMonth(month) {
  currentMonth = month;
  if (!financeData[month]) return;
  incomeInput.value = financeData[month].income || "";
  employees = financeData[month].employees || [];
  updateTable();
}

let chart;
function updateChart(income, salary, balance) {
  const ctx = document.getElementById("financeChart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Income", "Salary Expense", "Balance"],
      datasets: [{
        label: "Amount (₹)",
        data: [income, salary, balance],
        backgroundColor: ["#007bff", "#dc3545", "#28a745"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

document.getElementById("addEmployee").addEventListener("click", addEmployee);
document.getElementById("saveMonth").addEventListener("click", saveMonth);
document.getElementById("newMonthBtn").addEventListener("click", newMonth);
incomeInput.addEventListener("input", updateSummary);
monthSelect.addEventListener("change", e => loadMonth(e.target.value));

populateMonths();
