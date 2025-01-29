const habits = [
  "Sleeping at 9 pm",
  "Waking up at 5 am",
  "Face care",
  "Praying all Namaz",
  "Workout",
  "Meditation",
  "Gain knowledge",
  "Brush teeth",
  "No fap",
  "Drink 3L of Water",
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const habitTable = document.getElementById("habitTable");
const currentMonthYear = document.getElementById("currentMonthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

// Load saved checks from localStorage
let savedChecks = JSON.parse(localStorage.getItem("checks")) || {};

// Render the calendar
function renderCalendar() {
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Clear the table
  habitTable.innerHTML = `
    <thead>
      <tr>
        <th>Habit</th>
        ${Array.from({ length: daysInMonth }, (_, i) => `<th>${i + 1}</th>`).join("")}
      </tr>
    </thead>
    <tbody>
      ${habits.map(habit => `
        <tr>
          <td>${habit}</td>
          ${Array.from({ length: daysInMonth }, (_, i) => {
            const dateKey = `${currentYear}-${currentMonth}-${i + 1}`;
            const isChecked = savedChecks[dateKey] && savedChecks[dateKey][habit] ? "checked" : "";
            return `<td><input type="checkbox" data-date="${dateKey}" data-habit="${habit}" ${isChecked}></td>`;
          }).join("")}
        </tr>
      `).join("")}
    </tbody>
  `;

  // Update month and year display
  currentMonthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Add event listeners to checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener("change", (e) => {
      const dateKey = e.target.getAttribute("data-date");
      const habit = e.target.getAttribute("data-habit");
      if (!savedChecks[dateKey]) savedChecks[dateKey] = {};
      savedChecks[dateKey][habit] = e.target.checked;
      localStorage.setItem("checks", JSON.stringify(savedChecks));
    });
  });
}

// Change month
prevMonthBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

// Initial render
renderCalendar();
