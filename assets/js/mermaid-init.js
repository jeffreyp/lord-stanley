// Match diagrams to the active skin, including skins that follow the OS preference.
(function () {
  var skin = document.documentElement.getAttribute('data-theme');
  var adaptive = skin === 'auto' || skin === 'solarized';
  var dark = skin === 'dark' || skin === 'solarized-dark' ||
    (adaptive && window.matchMedia('(prefers-color-scheme: dark)').matches);
  mermaid.initialize({ startOnLoad: true, theme: dark ? 'dark' : 'default' });
})();
