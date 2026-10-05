let scanner;

const result = document.querySelector("#result");
const keyInput = document.querySelector("#key");

function showResult(data, ok) {
  result.className = `result ${ok ? "ok" : "bad"}`;
  result.innerHTML = `<strong>${data.status || "RESULT"}</strong><br>${data.message || ""}` +
    (data.checkedInAt ? `<br><small>${new Date(data.checkedInAt).toLocaleString()}</small>` : "");
}

async function verify(token) {
  const key = keyInput.value.trim();
  if (!key) return showResult({status:"ERROR", message:"Enter the organizer key first."}, false);

  try {
    const res = await fetch("/api/checkin", {
      method: "POST",
      headers: {"Content-Type":"application/json", "x-organizer-key": key},
      body: JSON.stringify({token})
    });
    const data = await res.json();
    showResult(data, data.status === "CHECKED-IN");
    loadStats();
  } catch {
    showResult({status:"ERROR", message:"Could not reach the server."}, false);
  }
}

document.querySelector("#manualBtn").addEventListener("click", () => {
  verify(document.querySelector("#manual").value.trim());
});

document.querySelector("#start").addEventListener("click", async () => {
  if (!keyInput.value.trim()) {
    showResult({status:"ERROR", message:"Enter the organizer key first."}, false);
    return;
  }

  if (scanner) await scanner.clear().catch(() => {});
  scanner = new Html5Qrcode("reader");

  try {
    await scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      async decodedText => {
        await scanner.stop().catch(() => {});
        await verify(decodedText);
      },
      () => {}
    );
  } catch (err) {
    showResult({status:"CAMERA ERROR", message:"Camera could not start. Use the manual token field instead."}, false);
  }
});

async function loadStats() {
  const key = keyInput.value.trim();
  if (!key) return;
  const res = await fetch("/api/stats", {headers: {"x-organizer-key": key}});
  if (!res.ok) return;
  const data = await res.json();
  document.querySelector("#registered").textContent = data.registered;
  document.querySelector("#checked").textContent = data.checkedIn;
  document.querySelector("#remaining").textContent = data.remaining;
}
setInterval(loadStats, 5000);
