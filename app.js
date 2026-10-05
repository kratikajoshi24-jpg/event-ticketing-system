const form = document.querySelector("#registrationForm");
const message = document.querySelector("#message");
const ticket = document.querySelector("#ticket");

async function loadEvent() {
  const res = await fetch("/api/event");
  const event = await res.json();
  document.querySelector("#eventName").textContent = event.name;
  document.querySelector("#eventMeta").textContent = `${event.date} • ${event.time} • ${event.venue}`;
  document.querySelector("#seats").textContent = `${event.seatsLeft} seats remaining`;
}
loadEvent();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  message.className = "message";
  message.textContent = "Creating your signed ticket…";

  const body = {
    name: document.querySelector("#name").value.trim(),
    email: document.querySelector("#email").value.trim(),
    phone: document.querySelector("#phone").value.trim()
  };

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed.");

    message.className = "message success";
    message.textContent = `Registered! Ticket ID: ${data.ticketId}.`;
    document.querySelector("#ticketText").textContent =
      `A ticket was generated for ${body.name}. Email mode: ${data.emailStatus.mode}.`;
    document.querySelector("#qr").src = data.qrDataUrl;
    ticket.classList.remove("hidden");
    form.reset();
    loadEvent();
  } catch (err) {
    message.className = "message error";
    message.textContent = err.message;
  }
});
