export function initAudioPlayer() {
  const btn = document.getElementById('audioFab');
  if (!btn) return;

  const src = btn.dataset.src || '';
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0.5;

  let playing = false;

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
    });
  }

  const hasLetter = !!document.getElementById('openingLetter');

  if (hasLetter) {
    document.addEventListener('letterOpen', function () {
      tryPlay();
    }, { once: true });
  }
  btn.addEventListener('click', function () {
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      tryPlay();
    }
  });

  audio.addEventListener('pause', function () { setPlaying(false); });
  audio.addEventListener('play',  function () { setPlaying(true);  });
  audio.addEventListener('ended', function () { setPlaying(false); });

  setPlaying(false);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAudioPlayer);
} else {
  initAudioPlayer();
}

