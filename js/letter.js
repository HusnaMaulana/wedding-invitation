export function initLetter() {
  if (typeof jQuery === 'undefined') return;
  const $ = jQuery;
  const $letter = $('#openingLetter');
  if (!$letter.length) return;

  const $html = $('html');
  const $btn = $('#openInvitation');

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  window.scrollTo(0, 0);
  $html.addClass('letter-locked');
  $letter.find('.letter-card').trigger('focus');

  $btn.one('click', function () {
    $html.removeClass('letter-locked');
    $letter.addClass('is-leaving');
    window.scrollTo(0, 0);

    document.dispatchEvent(new Event('letterOpen'));

    setTimeout(function () {
      document.dispatchEvent(new Event('aosStart'));
    }, 400);

    setTimeout(function () {
      $letter.remove();
      if (window.AOS) AOS.refresh();
      $('#home').attr('tabindex', '-1')[0]?.focus({ preventScroll: true });
    }, 850);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLetter);
} else {
  initLetter();
}
