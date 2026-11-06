// Google Analytics 4. The measurement ID comes from this script tag's data-ga-id attribute.
(function () {
  var optedOut = navigator.globalPrivacyControl === true ||
    window.doNotTrack === '1' || navigator.doNotTrack === '1' ||
    navigator.doNotTrack === 'yes' || navigator.msDoNotTrack === '1';
  if (optedOut) return;

  var id = document.currentScript.getAttribute('data-ga-id');
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id);
})();
