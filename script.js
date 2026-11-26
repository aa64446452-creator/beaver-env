/* 비버환경 사이트 스크립트 */
(function () {
  'use strict';

  // 연도 자동 표시
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // 스크롤 등장 효과
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // 전후 비교 슬라이더
  document.querySelectorAll('.ba').forEach(function (box) {
    var range = box.querySelector('input[type=range]');
    var set = function () { box.style.setProperty('--p', range.value + '%'); };
    range.addEventListener('input', set);
    set();
  });

  // 문자 견적 문의
  var PHONE = '01022712818';
  var form = document.getElementById('smsForm');
  if (form) {
    var preview = document.getElementById('preview');
    var pvText = document.getElementById('pvText');
    var copyBtn = document.getElementById('copyBtn');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var area = document.getElementById('fArea').value.trim();
      var type = document.getElementById('fType').value;
      var msg = document.getElementById('fMsg').value.trim();
      var text = '[비버환경 견적 문의]\n'
        + (area ? '지역: ' + area + '\n' : '')
        + '작업: ' + type + '\n'
        + (msg ? '내용: ' + msg + '\n' : '')
        + '(현장 사진을 함께 보내드립니다)';
      pvText.value = text;
      preview.hidden = false;
      // 모바일에서는 문자 앱 열기 (iOS/안드로이드 공통 형식)
      window.location.href = 'sms:' + PHONE + '?&body=' + encodeURIComponent(text);
    });

    copyBtn.addEventListener('click', function () {
      var done = function () { copyBtn.textContent = '복사됨!'; setTimeout(function () { copyBtn.textContent = '내용 복사'; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pvText.value).then(done, function () { pvText.select(); document.execCommand('copy'); done(); });
      } else { pvText.select(); document.execCommand('copy'); done(); }
    });
  }
})();
