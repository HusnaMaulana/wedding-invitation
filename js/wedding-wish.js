export const DEFAULT_WISHES = [
  {
    name: 'Rian & Maya',
    message: 'Selamat menempuh hidup baru Hani & Andi! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.'
  },
  {
    name: 'Budi Santoso',
    message: 'Happy Wedding Hani & Andi! Wishing you both a lifetime of love and happiness together.'
  },
  {
    name: 'Dimas Pratama',
    message: 'Congratulations on your wedding day! Wishing you the very best for your new journey together.'
  },
  {
    name: 'Dina Lestari',
    message: "Barakallahu lakuma wa baraka 'alaika wa jama'a bainakuma fii khaiir.. Selamat berbahagia!"
  },
  {
    name: 'Siti & Keluarga',
    message: 'Selamat yaa! Semoga cinta kalian senantiasa bersemi dan selalu dilimpahi keberkahan dan kebahagiaan.'
  }
];

export function initWeddingWish(initialWishes = DEFAULT_WISHES) {
  const form = document.getElementById('wishForm');
  if (!form) return;

  const nameInput = document.getElementById('wishName');
  const messageInput = document.getElementById('wishMessage');
  const fileInput = document.getElementById('wishFiles');
  const dropzone = document.getElementById('wishDropzone');
  const dropText = document.getElementById('wishDropzoneText');
  const sendBtn = document.getElementById('wishSend');
  const statusEl = document.getElementById('wishStatus');
  const list = document.getElementById('wishList');
  const moreBtn = document.getElementById('wishMore');
  const moreLabel = document.getElementById('wishMoreLabel');

  const DEFAULT_DROP_TEXT = dropText ? dropText.textContent : '';
  const MAX_FILES = 5;
  const MAX_SIZE_MB = 25;

  function setStatus(text, isError) {
    if (!statusEl) return;
    statusEl.textContent = text || '';
    statusEl.classList.toggle('is-error', !!isError);
  }

  function resetFiles() {
    if (fileInput) fileInput.value = '';
    if (dropText) dropText.textContent = DEFAULT_DROP_TEXT;
    if (dropzone) dropzone.classList.remove('has-files');
  }

  function checkFiles() {
    if (!fileInput) return true;
    const files = fileInput.files;
    if (!files || !files.length) { resetFiles(); return true; }

    if (files.length > MAX_FILES) {
      setStatus('You can upload up to ' + MAX_FILES + ' files.', true);
      resetFiles();
      return false;
    }
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const okType = /^(image|video)\//.test(f.type);
      if (!okType || f.size > MAX_SIZE_MB * 1024 * 1024) {
        setStatus('Only photos or videos up to ' + MAX_SIZE_MB + ' MB are allowed.', true);
        resetFiles();
        return false;
      }
    }
    if (dropText) {
      dropText.textContent = files.length === 1 ? files[0].name : files.length + ' files selected';
    }
    if (dropzone) dropzone.classList.add('has-files');
    setStatus('');
    return true;
  }

  if (fileInput) fileInput.addEventListener('change', checkFiles);

  if (dropzone) {
    ['dragenter', 'dragover'].forEach(function (type) {
      dropzone.addEventListener(type, function (e) {
        e.preventDefault();
        dropzone.classList.add('is-dragover');
      });
    });
    ['dragleave', 'drop'].forEach(function (type) {
      dropzone.addEventListener(type, function () {
        dropzone.classList.remove('is-dragover');
      });
    });
    dropzone.addEventListener('drop', function (e) {
      e.preventDefault();
      if (e.dataTransfer && e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        checkFiles();
      }
    });
  }

  function sendWish(data) {
    return new Promise(function (resolve) {
      setTimeout(resolve, 600);
    });
  }

  function addWishToList(name, message, prepend = true) {
    if (!list) return;
    const li = document.createElement('li');
    li.className = 'wedding-wish-item py-1';
    li.setAttribute('data-aos', 'fade-up');

    const n = document.createElement('strong');
    n.className = 'd-block font-weight-normal';
    n.textContent = name;

    const p = document.createElement('p');
    p.className = 'mb-0 text-break';
    p.textContent = message;

    li.appendChild(n);
    li.appendChild(p);

    if (prepend && list.firstChild) {
      list.insertBefore(li, list.firstChild);
    } else {
      list.appendChild(li);
    }
  }

  if (list && list.children.length === 0 && Array.isArray(initialWishes)) {
    initialWishes.forEach(function (item) {
      addWishToList(item.name, item.message, false);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput ? nameInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name) { setStatus('Please enter your name.', true); nameInput?.focus(); return; }
    if (!message) { setStatus('Please write your wish.', true); messageInput?.focus(); return; }
    if (!checkFiles()) return;

    if (sendBtn) sendBtn.disabled = true;
    setStatus('Sending...');

    sendWish(new FormData(form))
      .then(function () {
        addWishToList(name, message, true);
        form.reset();
        resetFiles();
        setStatus('Thank you! Your wish has been sent.');
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      })
      .catch(function () {
        setStatus('Sorry, something went wrong. Please try again.', true);
      })
      .then(function () {
        if (sendBtn) sendBtn.disabled = false;
      });
  });

  let staggerTimeouts = [];

  if (moreBtn && list && moreLabel) {
    moreBtn.addEventListener('click', function () {
      staggerTimeouts.forEach(clearTimeout);
      staggerTimeouts = [];

      const isExpanding = !list.classList.contains('is-expanded');

      if (isExpanding) {
        const extraItems = Array.from(list.querySelectorAll('.wedding-wish-item')).slice(1);

        extraItems.forEach(function (item) {
          item.classList.remove('aos-animate');
        });

        list.classList.add('is-expanded');
        moreBtn.setAttribute('aria-expanded', 'true');
        moreLabel.textContent = 'Show less';

        extraItems.forEach(function (item) {
          void item.offsetHeight;
        });

        extraItems.forEach(function (item, index) {
          const tid = setTimeout(function () {
            item.classList.add('aos-animate');
          }, (index + 1) * 200);
          staggerTimeouts.push(tid);
        });
      } else {
        list.classList.remove('is-expanded');
        moreBtn.setAttribute('aria-expanded', 'false');
        moreLabel.textContent = 'See all messages';
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initWeddingWish());
} else {
  initWeddingWish();
}
