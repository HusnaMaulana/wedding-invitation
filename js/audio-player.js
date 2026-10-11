/**
 * Floating Audio Player
 * A circular FAB button (bottom-right) to play / pause background music.
 *
 * Auto-plays when the opening letter is dismissed (listens for the
 * custom 'letterOpen' event dispatched by letter.js).
 */

export function initAudioPlayer() {
  const btn = document.getElementById('audioFab');
  if (!btn) return;

  /* ── Audio setup ─────────────────────────────────────────── */
  const src = btn.dataset.src || '';
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0.5;

  let playing = false;

  /* ── State helpers ───────────────────────────────────────── */
  function setPlaying(state) {
    playing = state;
    btn.classList.toggle('is-playing', playing);
    btn.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
    btn.setAttribute('aria-pressed', String(playing));
  }

  function tryPlay() {
    audio.play().then(function () {
      setPlaying(true);
    }).catch(function () {
      // Autoplay blocked — user must interact manually
    });
  }

  /* ── Auto-play when letter is opened ────────────────────── */
  const hasLetter = !!document.getElementById('openingLetter');

  if (hasLetter) {
    // Wait for the letter-open signal
    document.addEventListener('letterOpen', function () {
      tryPlay();
    }, { once: true });
  }
  // If no letter on page, do NOT auto-play (rely on manual FAB click only)

  /* ── Toggle on click ─────────────────────────────────────── */
  btn.addEventListener('click', function () {
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      tryPlay();
    }
  });

  /* ── Sync when audio is paused/played externally ─────────── */
  audio.addEventListener('pause', function () { setPlaying(false); });
  audio.addEventListener('play',  function () { setPlaying(true);  });
  audio.addEventListener('ended', function () { setPlaying(false); });

  /* Initial aria state */
  setPlaying(false);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAudioPlayer);
} else {
  initAudioPlayer();
}

