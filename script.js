const MAX_SEATS = 5;
const MAX_WAITING = 5;

let confirmed = [];   // linked list
let waiting = [];     // queue
let nextSeat = 1;

// BOOK TICKET
function bookTicket() {
  const id = pid.value;
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  if (!id || !name || !age) {
    alert("Please enter all details");
    return;
  }

  if (confirmed.length < MAX_SEATS) {
    confirmed.push({ id, name, age, seat: nextSeat++ });
  } 
  else if (waiting.length < MAX_WAITING) {
    waiting.push({ id, name, age });
  } 
  else {
    alert("No seats and waiting list full");
  }

  render();
}

// CANCEL TICKET
function cancelTicket() {
  const id = pid.value;
  const index = confirmed.findIndex(p => p.id == id);

  if (index === -1) {
    alert("Passenger not found");
    return;
  }

  const freedSeat = confirmed[index].seat;
  confirmed.splice(index, 1);

  if (waiting.length > 0) {
    const w = waiting.shift();
    confirmed.push({ ...w, seat: freedSeat });
  }

  render();
}

// DISPLAY DATA
function render() {
  const c = document.getElementById("confirmed");
  const w = document.getElementById("waiting");

  c.innerHTML = "<tr><th>ID</th><th>Name</th><th>Age</th><th>Seat</th></tr>";
  w.innerHTML = "<tr><th>ID</th><th>Name</th><th>Age</th></tr>";

  confirmed.forEach(p => {
    c.innerHTML += `<tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${p.seat}</td>
    </tr>`;
  });

  waiting.forEach(p => {
    w.innerHTML += `<tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.age}</td>
    </tr>`;
  });
}
