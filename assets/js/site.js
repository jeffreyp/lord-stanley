// Keep footnote links unique when a page lists several posts' excerpts.
(function () {
  var sections = document.querySelectorAll('.footnotes');
  if (sections.length <= 1) return;
  sections.forEach(function (section, idx) {
    var container = section.closest('li, article') || document.body;
    var pfx = 'post' + idx;
    section.querySelectorAll('[id^="fn:"]').forEach(function (el) {
      el.id = pfx + '-' + el.id;
    });
    section.querySelectorAll('a[href^="#fnref:"]').forEach(function (el) {
      el.setAttribute('href', '#' + pfx + '-' + el.getAttribute('href').slice(1));
    });
    container.querySelectorAll('[id^="fnref:"]').forEach(function (el) {
      el.id = pfx + '-' + el.id;
    });
    container.querySelectorAll('a[href^="#fn:"]').forEach(function (el) {
      el.setAttribute('href', '#' + pfx + '-' + el.getAttribute('href').slice(1));
    });
  });
})();

// Sidebar calendar.
(function () {
  var el = document.getElementById('sidebar-calendar-widget');
  if (!el) return;

  var postDates = (el.getAttribute('data-post-dates') || '').split(',').filter(Boolean);
  var baseurl = el.getAttribute('data-baseurl') || '';
  var pageDate = el.getAttribute('data-page-date') || '';

  // Build lookup: { "YYYY-MM": { day: true } }
  var postDateSet = {};
  postDates.forEach(function (d) {
    var parts = d.split('-');
    var key = parts[0] + '-' + parts[1];
    if (!postDateSet[key]) postDateSet[key] = {};
    postDateSet[key][parseInt(parts[2], 10)] = true;
  });

  var currentYear, currentMonth;
  if (pageDate && pageDate.length === 10) {
    var pd = pageDate.split('-');
    currentYear = parseInt(pd[0], 10);
    currentMonth = parseInt(pd[1], 10) - 1;
  } else {
    var now = new Date();
    currentYear = now.getFullYear();
    currentMonth = now.getMonth();
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function render(year, month) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
    var dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    var key = year + '-' + pad(month + 1);
    var daysWithPosts = postDateSet[key] || {};
    var firstDow = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    var html = '<div class="cal-nav">'
      + '<button type="button" data-cal-nav="-1" aria-label="Previous month">‹</button>'
      + '<span class="cal-month-title">' + monthNames[month] + ' ' + year + '</span>'
      + '<button type="button" data-cal-nav="1" aria-label="Next month">›</button>'
      + '</div>'
      + '<table class="cal-table"><thead><tr>';
    dayNames.forEach(function (d) { html += '<th scope="col">' + d + '</th>'; });
    html += '</tr></thead><tbody><tr>';

    for (var i = 0; i < firstDow; i++) html += '<td></td>';
    var col = firstDow;
    for (var day = 1; day <= daysInMonth; day++) {
      if (daysWithPosts[day]) {
        var href = baseurl + '/' + year + '/' + pad(month + 1) + '/' + pad(day) + '/';
        html += '<td><a href="' + href + '">' + day + '</a></td>';
      } else {
        html += '<td>' + day + '</td>';
      }
      col++;
      if (col % 7 === 0 && day < daysInMonth) html += '</tr><tr>';
    }
    while (col % 7 !== 0) { html += '<td></td>'; col++; }
    html += '</tr></tbody></table>';

    el.innerHTML = html;
  }

  el.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cal-nav]');
    if (!btn) return;
    var delta = parseInt(btn.getAttribute('data-cal-nav'), 10);
    currentMonth += delta;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    render(currentYear, currentMonth);
    el.querySelector('[data-cal-nav="' + delta + '"]').focus();
  });

  render(currentYear, currentMonth);
})();
