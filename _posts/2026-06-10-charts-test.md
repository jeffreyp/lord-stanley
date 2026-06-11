---
layout: post
title: "Charts and Diagrams Test"
categories: misc
charts: true
mermaid: true
---

This post tests Chart.js and Mermaid.js integration.

## Bar Chart (Chart.js)

Monthly website visitors over the first half of the year:

<canvas id="visitors-chart" style="max-width: 600px; margin-bottom: 2rem;"></canvas>
<script>
new Chart(document.getElementById('visitors-chart'), {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Visitors',
      data: [1200, 1900, 1500, 2400, 2100, 2800],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } }
  }
});
</script>

## Line Chart (Chart.js)

Average page load time (ms) over the same period:

<canvas id="perf-chart" style="max-width: 600px; margin-bottom: 2rem;"></canvas>
<script>
new Chart(document.getElementById('perf-chart'), {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Load time (ms)',
      data: [820, 790, 750, 710, 680, 640],
      tension: 0.3,
      fill: true
    }]
  },
  options: { responsive: true }
});
</script>

## Flowchart (Mermaid)

A simple deployment pipeline:

<div class="mermaid">
flowchart LR
  A([Push]) --> B[CI Tests]
  B --> C{Pass?}
  C -- Yes --> D[Build]
  D --> E[Deploy Preview]
  E --> F{Approved?}
  F -- Yes --> G([Production])
  F -- No --> H([Reject])
  C -- No --> I([Fail])
</div>

## Sequence Diagram (Mermaid)

Authentication flow:

<div class="mermaid">
sequenceDiagram
  actor User
  participant App
  participant Auth
  participant DB

  User->>App: Login request
  App->>Auth: Validate credentials
  Auth->>DB: Lookup user
  DB-->>Auth: User record
  Auth-->>App: JWT token
  App-->>User: Authenticated
</div>
