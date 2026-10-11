export function initRSVP() {
  const form = document.getElementById("rsvpForm");
  if (!form) return;

  const WA_NUMBER = "6281234567890";

  const $ = (id) => document.getElementById(id);
  const details = $("rsvpDetails");
  const countAkad = $("countAkad");
  const countResepsi = $("countResepsi");
  const status = $("rsvpStatus");

  const guestInput = $("rsvpGuest");
  const guestFromUrl = new URLSearchParams(location.search).get("to");
  if (guestFromUrl && guestInput) guestInput.value = guestFromUrl;

  const val = (name) =>
    form.querySelector(`input[name="${name}"]:checked`)?.value;

  function refresh() {
    const attending = val("attend") === "Hadir";
    if (details) details.hidden = !attending;

    const ev = val("event");
    if (countAkad) countAkad.hidden = ev === "Resepsi Pernikahan";
    if (countResepsi) countResepsi.hidden = ev === "Akad Nikah";
  }
  form.addEventListener("change", refresh);
  refresh();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = guestInput ? guestInput.value.trim() : "";
    if (status) status.classList.toggle("text-danger", !name);
    if (!name) {
      if (status) status.textContent = "Mohon isi nama Anda terlebih dahulu.";
      guestInput?.focus();
      return;
    }
    let msg;

    if (val("attend") === "Hadir") {
      const ev = val("event");
      const parts = [];
      if (ev !== "Resepsi Pernikahan") {
        const akadEl = $("selAkad");
        const akadVal = akadEl ? akadEl.value : "1";
        parts.push(`Akad Nikah: ${akadVal} orang`);
      }
      if (ev !== "Akad Nikah") {
        const resepsiEl = $("selResepsi");
        const resepsiVal = resepsiEl ? resepsiEl.value : "1";
        parts.push(`Resepsi Pernikahan: ${resepsiVal} orang`);
      }
      msg = `Assalamu'alaikum, saya ${name} mengkonfirmasi HADIR.\nAcara: ${ev}\n${parts.join("\n")}`;
    } else {
      msg = `Assalamu'alaikum, saya ${name} mohon maaf TIDAK DAPAT HADIR. Terima kasih atas undangannya.`;
    }

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener",
    );
    if (status) status.textContent = "Terima kasih, konfirmasi Anda sudah dikirim.";
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRSVP);
} else {
  initRSVP();
}
