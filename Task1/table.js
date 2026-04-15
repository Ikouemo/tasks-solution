const rows = [
  {
    name: "Lena Fischer",
    department: "Operations",
    role: "Supervisor",
    startDate: "2022-01-17",
    monthlyFee: 120,
  },
  {
    name: "Jonas Klein",
    department: "Finance",
    role: "Analyst",
    startDate: "2021-11-03",
    monthlyFee: 90,
  },
  {
    name: "Marta Yilmaz",
    department: "IT",
    role: "Developer",
    startDate: "2023-07-10",
    monthlyFee: 130,
  },
  {
    name: "Ben Weber",
    department: "Operations",
    role: "Coordinator",
    startDate: "2020-04-21",
    monthlyFee: 80,
  },
  {
    name: "Nina Roth",
    department: "HR",
    role: "Recruiter",
    startDate: "2022-09-01",
    monthlyFee: 95,
  },
  {
    name: "Paul Richter",
    department: "Finance",
    role: "Controller",
    startDate: "2020-04-21",
    monthlyFee: 110,
  },
  {
    name: "Sara Novak",
    department: "IT",
    role: "QA Engineer",
    startDate: "2021-02-14",
    monthlyFee: 100,
  },
];

const table = document.getElementById("employeeTable");
const tbody = document.getElementById("employeeTableBody");
const headers = Array.from(table.querySelectorAll("th"));

const state = {
  activeKey: null,
  direction: "asc",
};

function render(data) {
  tbody.innerHTML = data
    .map(
      (item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.department}</td>
        <td>${item.role}</td>
        <td>${item.startDate}</td>
        <td>${item.monthlyFee}</td>
      </tr>
    `,
    )
    .join("");
}

function compareValues(a, b, type) {
  if (type === "number") return a - b;
  if (type === "date") return new Date(a).getTime() - new Date(b).getTime();
  return String(a).localeCompare(String(b));
}

function setHeaderIndicators() {
  headers.forEach((th) => {
    const baseLabel = th.textContent.replace(" ▲", "").replace(" ▼", "");
    const key = th.dataset.key;

    if (key === state.activeKey) {
      th.textContent = `${baseLabel} ${state.direction === "asc" ? "▲" : "▼"}`;
    } else {
      th.textContent = baseLabel;
    }
  });
}

function sortBy(key, type) {
  // Toggle direction
  if (state.activeKey === key) {
    state.direction = state.direction === "asc" ? "desc" : "asc";
  } else {
    state.activeKey = key;
    state.direction = "asc";
  }

  // Stable sort: attach original index
  const indexed = rows.map((item, index) => ({ ...item, _index: index }));
  indexed.sort((a, b) => {
    const result = compareValues(a[key], b[key], type);

    if (result === 0) {
      return a._index - b._index; // Preserve original order (stable sort)
    }

    return state.direction === "asc" ? result : -result;
  });

  // Remove helper index
  const sortedData = indexed.map(({ _index, ...rest }) => rest);

  // Render the table again
  render(sortedData);

  // Update the header
  setHeaderIndicators();
}

headers.forEach((th) => {
  const isSortable = th.dataset.sortable === "true";
  if (!isSortable) return;

  th.style.cursor = "pointer";
  th.addEventListener("click", () => {
    sortBy(th.dataset.key, th.dataset.type);
  });
});

render(rows);
