// Coaching Library sidebar — RAG-powered Q&A

// Toggle library sidebar visibility
function toggleLibrary() {
  const sidebar = document.getElementById('library-sidebar');
  sidebar.classList.toggle('hidden');
  if (!sidebar.classList.contains('hidden')) {
    document.getElementById('library-input').focus();
  }
}

// Send a question to the coaching library API
async function askLibrary() {
  const input = document.getElementById('library-input');
  const results = document.getElementById('library-results');
  const question = input.value.trim();
  if (!question) return;

  results.innerHTML = '<div class="spinner"></div><p style="color:#6B7FA0;margin-top:12px">Searching the coaching library...</p>';

  try {
    const data = await fetchLibraryAnswer(question);
    if (data.answer) {
      let html = '<div style="font-size:14px;line-height:1.7">' + data.answer.replace(/\n/g, '<br>') + '</div>';
      if (data.sources && data.sources.length) {
        html += '<div class="answer-sources">Sources: ' + data.sources.filter(Boolean).join(', ') + '</div>';
      }
      results.innerHTML = html;
    } else {
      results.innerHTML = '<p class="err">Could not get an answer.</p>';
    }
  } catch (e) {
    results.innerHTML = '<p class="err">Error: ' + e.message + '</p>';
  }
}

// Allow pressing Enter to submit library question
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('library-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') askLibrary();
    });
  }
});
