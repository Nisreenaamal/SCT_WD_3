const quizData = [
  {
    type: 'single',
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
    answer: 'Hyper Text Markup Language'
  },
  {
    type: 'multi',
    question: 'Which of the following are programming languages?',
    options: ['HTML', 'Python', 'CSS', 'JavaScript'],
    answer: ['Python', 'JavaScript']
  },
  {
    type: 'fill',
    question: 'Fill in the blank: CSS stands for ______ Style Sheets.',
    answer: 'Cascading'
  },
  {
    type: 'single',
    question: "Which is used for Connect To Database?" ,
    options: ['JS', 'HTML', 'PHP'],
    answer: 'PHP'
  },
  {
    type: 'multi',
    question: 'Which of these are valid CSS properties?',
    options: ['color', 'padding', 'fontsize', 'background-color'],
    answer: ['color', 'padding', 'background-color']
  },
  {
    type: 'fill',
    question: 'Fill in the blank: The ______ property in CSS is used to change the text color.',
    answer: 'color'
  },
  {
    type: 'single',
    question: 'JavaScript is a _____ side programming language.',
    options: ['Client', 'Server', 'Both'],
    answer: 'Both'
  },
  {
    type: 'fill',
    question: 'HTML elements are represented by ______.',
    answer: 'tags'
  }
];

let shuffledQuiz = quizData.sort(() => Math.random() - 0.5);
let currentIndex = 0;
let score = 0;
let answersSummary = [];

document.getElementById('start-btn').addEventListener('click', () => {
  document.getElementById('start-page').classList.add('hidden');
  document.getElementById('quiz-wrapper').classList.remove('hidden');
  loadQuestion();
});

function loadQuestion() {
  const currentQ = shuffledQuiz[currentIndex];
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const fillInput = document.getElementById('fill-answer');

  questionEl.textContent = currentQ.question;
  optionsEl.innerHTML = '';
  fillInput.style.display = 'none';
  fillInput.value = '';

  if (currentQ.type === 'single') {
    currentQ.options.forEach(opt => {
      const label = document.createElement('label');
      label.innerHTML = `<input type="radio" name="option" value="${opt}"> ${opt}`;
      optionsEl.appendChild(label);
    });
  } else if (currentQ.type === 'multi') {
    currentQ.options.forEach(opt => {
      const label = document.createElement('label');
      label.innerHTML = `<input type="checkbox" name="option" value="${opt}"> ${opt}`;
      optionsEl.appendChild(label);
    });
  } else if (currentQ.type === 'fill') {
    fillInput.style.display = 'block';
  }
}

function nextQuestion() {
  const currentQ = shuffledQuiz[currentIndex];
  let userAnswer;

  if (currentQ.type === 'single') {
    const selected = document.querySelector('input[name="option"]:checked');
    userAnswer = selected ? selected.value : null;
  } else if (currentQ.type === 'multi') {
    const selected = document.querySelectorAll('input[name="option"]:checked');
    userAnswer = Array.from(selected).map(input => input.value);
  } else if (currentQ.type === 'fill') {
    userAnswer = document.getElementById('fill-answer').value.trim();
  }

  let correct = false;
  if (currentQ.type === 'multi') {
    correct = Array.isArray(userAnswer) &&
              userAnswer.length === currentQ.answer.length &&
              userAnswer.every(ans => currentQ.answer.includes(ans));
  } else {
    correct = userAnswer === currentQ.answer;
  }

  if (correct) score++;

  answersSummary.push({
    question: currentQ.question,
    userAnswer: userAnswer,
    correctAnswer: currentQ.answer,
    correct
  });

  currentIndex++;
  if (currentIndex < shuffledQuiz.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const quizBox = document.getElementById('quiz-container');
  const resultBox = document.getElementById('result');

  quizBox.classList.add('hidden');
  resultBox.classList.remove('hidden');

  resultBox.innerHTML = `<h2>Quiz Completed 🎉</h2><p>Your Score: ${score}/${shuffledQuiz.length}</p><ul>` +
    answersSummary.map(ans => `
      <li>
        <strong>${ans.question}</strong><br/>
        Your Answer: ${Array.isArray(ans.userAnswer) ? ans.userAnswer.join(', ') : ans.userAnswer}<br/>
        Correct Answer: ${Array.isArray(ans.correctAnswer) ? ans.correctAnswer.join(', ') : ans.correctAnswer}<br/>
        <span style="color: ${ans.correct ? 'green' : 'red'}">${ans.correct ? 'Correct ✔️' : 'Wrong ❌'}</span>
      </li>
    `).join('') +
    '</ul>';
}
