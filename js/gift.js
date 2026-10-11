export function initGift() {
  if (typeof jQuery === 'undefined') return;
  const $ = jQuery;
  const $status = $('#giftStatus');
  let resetTimer;

  function fallbackCopy(text) {
    const $tmp = $('<textarea readonly>')
      .val(text)
      .css({ position: 'fixed', top: 0, left: 0, opacity: 0 })
      .appendTo('body');
    $tmp[0].select();
    $tmp[0].setSelectionRange(0, text.length);
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    $tmp.remove();
    return ok ? $.Deferred().resolve().promise() : $.Deferred().reject().promise();
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      const d = $.Deferred();
      navigator.clipboard.writeText(text).then(d.resolve, function () {
        fallbackCopy(text).then(d.resolve, d.reject);
      });
      return d.promise();
    }
    return fallbackCopy(text);
  }

  $(document).on('click', '.gift-copy', function () {
    const $btn = $(this);
    const number = $.trim($($btn.data('copy')).text()).replace(/\s+/g, '');
    if (!number) return;

    if (!$btn.data('label')) $btn.data('label', $btn.text());

    copyText(number)
      .done(function () {
        $btn.text('Copied').addClass('is-copied');
      })
      .always(function () {
        clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          $btn.text($btn.data('label')).removeClass('is-copied');
          $status.text('');
        }, 2000);
      });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGift);
} else {
  initGift();
}
