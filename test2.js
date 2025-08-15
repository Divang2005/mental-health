  const questions = [
    {
      q: "Do you prefer making decisions with logic or emotions?",
      a: "Logic and analysis",
      b: "Emotions and empathy"
    },
    {
      q: "Do you often second-guess your choices?",
      a: "Rarely",
      b: "Frequently"
    },
    {
      q: "When faced with a tough situation, do you...",
      a: "Look for practical solutions",
      b: "Reflect deeply before acting"
    },
    {
      q: "Are you more guided by facts or values?",
      a: "Facts",
      b: "Personal values"
    },
    {
      q: "Do you follow routines or improvise often?",
      a: "Stick to routine",
      b: "Prefer flexibility"
    },
    {
      q: "Do you enjoy solving abstract problems?",
      a: "Yes",
      b: "No"
    },
    {
      q: "Are you more of a realist or idealist?",
      a: "Realist",
      b: "Idealist"
    },
    {
      q: "Do you trust your intuition?",
      a: "Often",
      b: "Rarely"
    },
    {
      q: "Do you prefer learning through...",
      a: "Hands-on experience",
      b: "Reading and observing"
    },
    {
      q: "Do you think deeply before speaking?",
      a: "Always",
      b: "Not usually"
    },
    {
      q: "Do you recognize your emotions easily?",
      a: "Yes",
      b: "No"
    },
    {
      q: "When upset, do you prefer...",
      a: "Talking to someone",
      b: "Being alone"
    },
    {
      q: "Do you bounce back quickly from stress?",
      a: "Usually",
      b: "It takes time"
    },
    {
      q: "Are you affected by others' moods?",
      a: "Very much",
      b: "Not often"
    },
    {
      q: "Can you express feelings easily?",
      a: "Yes",
      b: "No"
    },
    {
      q: "Do you enjoy large gatherings?",
      a: "Yes",
      b: "No"
    },
    {
      q: "Do you make new friends easily?",
      a: "Yes",
      b: "No"
    },
    {
      q: "Are you comfortable speaking in public?",
      a: "Yes",
      b: "No"
    },
    {
      q: "Do you prefer...",
      a: "Group activities",
      b: "Solo activities"
    },
    {
      q: "Are you more...",
      a: "Outgoing and talkative",
      b: "Reserved and thoughtful"
    },
    {
      q: "Do you enjoy exploring new ideas?",
      a: "Always",
      b: "Prefer familiar things"
    },
    {
      q: "Do you like trying new things?",
      a: "Yes",
      b: "No"
    },
    {
      q: "Do you enjoy artistic activities?",
      a: "Yes",
      b: "No"
    },
    {
      q: "Are you open to changing your opinions?",
      a: "Yes",
      b: "Rarely"
    },
    {
      q: "Are you a daydreamer?",
      a: "Yes",
      b: "No"
    },
    {
      q: "Do you finish tasks before deadlines?",
      a: "Always",
      b: "Sometimes struggle"
    },
    {
      q: "Are you well-organized?",
      a: "Very much",
      b: "Not really"
    },
    {
      q: "Do you plan your day ahead?",
      a: "Yes",
      b: "No"
    },
    {
      q: "Do you prefer following rules?",
      a: "Yes",
      b: "I challenge them"
    },
    {
      q: "Do you keep your promises?",
      a: "Always",
      b: "Not always"
    }
  ];

  const form = document.getElementById('personality-form');
  const resultDiv = document.getElementById('result');

  // Generate form
  questions.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
      <p><strong>${index + 1}. ${item.q}</strong></p>
      <label><input type="radio" name="q${index + 1}" value="1" required> ${item.a}</label>
      <label><input type="radio" name="q${index + 1}" value="0"> ${item.b}</label>
    `;
    form.appendChild(div);
  });

  // Add submit button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Submit Answers';
  submitBtn.className = 'start-btn';
  form.appendChild(submitBtn);

  // Handle form submit
  form.addEventListener('submit', async function (e) {
  e.preventDefault();
  let score = 0;

  for (let i = 1; i <= questions.length; i++) {
    const answer = form[`q${i}`].value;
    score += parseInt(answer);
  }

  let personality = "";
  if (score <= 10) {
    personality = "🧠 Reflective Thinker — calm, logical, and introspective.";
  } else if (score <= 20) {
    personality = "🔍 Balanced Explorer — adaptable, thoughtful, and open-minded.";
  } else {
    personality = "🌟 Expressive Idealist — creative, social, and emotionally aware.";
  }

  // Send to backend
  try {
    await fetch("/api/save-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score,
        personality,
        timestamp: new Date().toISOString()
      })
    });
  } catch (err) {
    console.error("Failed to send result:", err);
  }

  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <h3>Your Personality Result:</h3>
    <p>${personality}</p>
    <div style="margin-top: 1.5rem;">
      <a href="main2.html" class="start-btn" style="margin-right: 1rem;">🏠 Back to Home</a>
      <button onclick="location.reload()" class="start-btn">🔁 Retake Test</button>
    </div>
  `;
  form.style.display = 'none';
});
