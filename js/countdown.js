export function initCountdown(initialValues = { days: 7, hours: 8, minutes: 40, seconds: 30 }) {
  const timer = document.getElementById("countdownTimer");
  if (!timer) return;

  const days = Number(timer.dataset.initialDays ?? initialValues.days ?? 7);
  const hours = Number(timer.dataset.initialHours ?? initialValues.hours ?? 8);
  const minutes = Number(timer.dataset.initialMinutes ?? initialValues.minutes ?? 40);
  const seconds = Number(timer.dataset.initialSeconds ?? initialValues.seconds ?? 30);

  const initialMs =
    (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000;

  const target = Date.now() + initialMs;

  const els = {
    days: timer.querySelector('[data-unit="days"]'),
    hours: timer.querySelector('[data-unit="hours"]'),
    minutes: timer.querySelector('[data-unit="minutes"]'),
    seconds: timer.querySelector('[data-unit="seconds"]'),
  };
  const pad = (n) => String(n).padStart(2, "0");

  let timerId = null;

  function tick() {
    const diff = Math.max(0, target - Date.now());
    if (els.days) els.days.textContent = pad(Math.floor(diff / 86400000));
    if (els.hours) els.hours.textContent = pad(Math.floor(diff / 3600000) % 24);
    if (els.minutes) els.minutes.textContent = pad(Math.floor(diff / 60000) % 60);
    if (els.seconds) els.seconds.textContent = pad(Math.floor(diff / 1000) % 60);

    if (diff === 0 && timerId) {
      clearInterval(timerId);
    }
  }

  timerId = setInterval(tick, 1000);
  tick();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initCountdown());
} else {
  initCountdown();
}
