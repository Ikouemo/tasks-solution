const STORAGE_KEY = "task2-ticket-board-v1"; // Umbenennen "task6" zum "task2"

const defaultTickets = [
  {
    id: "T-100",
    title: "Broken barrier in Zone B",
    priority: "high",
    status: "todo",
  },
  {
    id: "T-101",
    title: "Refund request for duplicate charge",
    priority: "medium",
    status: "todo",
  },
  {
    id: "T-102",
    title: "Camera stream lagging",
    priority: "high",
    status: "inprogress",
  },
  {
    id: "T-103",
    title: "Update signage in entrance",
    priority: "low",
    status: "done",
  },
];

let tickets = loadTickets();
let draggedTicketId = null;

function loadTickets() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [...defaultTickets];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...defaultTickets];
  } catch (_err) {
    return [...defaultTickets];
  }
}

function saveTickets() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

function render() {
  const todoCol = document.getElementById("col-todo");
  const inprogressCol = document.getElementById("col-inprogress");
  const doneCol = document.getElementById("col-done");

  todoCol.innerHTML = "";
  inprogressCol.innerHTML = "";
  doneCol.innerHTML = "";

  tickets.forEach((ticket) => {
    const el = document.createElement("article");
    el.className = "ticket";
    el.draggable = true;
    el.dataset.ticketId = ticket.id;
    el.innerHTML = `
      <strong>${ticket.id}</strong>
      <div>${ticket.title}</div>
      <small>Priority: ${ticket.priority}</small>
    `;

    // Ticket starts being dragged
    el.addEventListener("dragstart", () => {
      draggedTicketId = ticket.id; // Store the Id of the dragged ticket
      el.classList.add("dragging"); // Add CSS class for visual feedback
    });

    // Ticket is dropped or canceled
    el.addEventListener("dragend", () => {
      draggedTicketId = null; // Clear the dragged ticket reference
      el.classList.remove("dragging"); // Remove the visual highlight
    });

    if (ticket.status === "todo") todoCol.appendChild(el);
    else if (ticket.status === "inprogress") inprogressCol.appendChild(el);
    else doneCol.appendChild(el);
  });

  updateCounts();
}

function updateCounts() {
  document.getElementById("count-todo").textContent = String(
    tickets.filter((t) => t.status === "todo").length,
  );
  document.getElementById("count-inprogress").textContent = String(
    tickets.filter((t) => t.status === "inprogress").length,
  );
  document.getElementById("count-done").textContent = String(
    tickets.filter((t) => t.status === "done").length,
  );
}

function setupDropzones() {
  const zones = document.querySelectorAll(".dropzone");
  zones.forEach((zone) => {
    const status = zone.id.replace("col-", "");

    // Ticket is dragged over a drop zone
    zone.addEventListener("dragover", (e) => {
      e.preventDefault(); // Prevents default browser behavior
      zone.classList.add("drag-over"); // Add a visual indicator that this column can receive the ticket
    });

    // A dragged ticket leaves a drop zone without dropping
    zone.addEventListener("dragleave", () => {
      zone.classList.remove("drag-over"); // Remove the hover/drag-over visual feedback
    });

    // A dragged ticket is dropped into a drop zone
    zone.addEventListener("drop", () => {
      zone.classList.remove("drag-over"); // Remove the drag-over visual feedback

      // Check if no ticket is being dragged, do nothing
      if (!draggedTicketId) return;

      // Find the ticket object in the array using its ID
      const ticket = tickets.find((t) => t.id === draggedTicketId);
      if (!ticket) return; // Check if not exist, do nothing

      // Update the ticket's status to match this drop zone
      ticket.status = status;

      // Persist the updated tickets to localStorage
      saveTickets();

      // Re-render the board so the ticket moves visually
      render();
    });
  });
}

setupDropzones();
render();
