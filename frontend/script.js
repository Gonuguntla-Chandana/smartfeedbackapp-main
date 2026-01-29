let chart;

// Get user info from localStorage
const user = JSON.parse(localStorage.getItem("user"));

async function send() {
  const msg = document.getElementById("msg").value;
  if (!msg) return alert("Enter some feedback");

  // Send username and user_id along with message
  const res = await fetch("http://localhost:5000/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: msg,
      user_id: user?.user_id || null,
      username: user?.username || "Guest"
    })
  });

  const data = await res.json();
  document.getElementById("out").innerText = "Sentiment: " + data.sentiment;

  document.getElementById("msg").value = ""; // clear textarea
}

async function loadChart() {
  const res = await fetch("http://localhost:5000/api/summary");
  const data = await res.json();

  const ctx = document.getElementById("chart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Positive", "Negative", "Neutral"],
      datasets: [{
        data: [data.Positive, data.Negative, data.Neutral],
        backgroundColor: ["green", "red", "gray"]
      }]
    }
  });
}

// Load chart on page load
loadChart();
