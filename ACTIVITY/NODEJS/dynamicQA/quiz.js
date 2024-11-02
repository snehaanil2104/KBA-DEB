// Array of questions and answers
const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Madrid"],
      answer: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: 1
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: 1
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let answers = Array(quizData.length).fill(null);
  let timer;
  const timeLimit = 10; // seconds
  let timeLeft = timeLimit;
  
  function loadQuestion() {
    clearInterval(timer);
    timeLeft = timeLimit;
    startTimer();
  
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    questionEl.innerText = quizData[currentQuestion].question;
    
    optionsEl.innerHTML = '';
    quizData[currentQuestion].options.forEach((option, index) => {
      optionsEl.innerHTML += `
        <label>
          <input type="radio" name="option" value="${index}" ${answers[currentQuestion] === index ? 'checked' : ''}>
          ${option}
        </label>`;
    });
  }
  
  function startTimer() {
    const timerEl = document.getElementById('timer');
    timerEl.innerText = `Time left: ${timeLeft}s`;
    
    timer = setInterval(() => {
      timeLeft--;
      timerEl.innerText = `Time left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        nextQuestion();
      }
    }, 1000);
  }
  
  function saveAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    answers[currentQuestion] = selectedOption ? parseInt(selectedOption.value) : null;
  }
  
  function previousQuestion() {
    saveAnswer();
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  }
  
  function nextQuestion() {
    saveAnswer();
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
    }
  }
  
  function submitQuiz() {
    saveAnswer();
    clearInterval(timer);
  
    score = answers.reduce((acc, answer, index) => {
      return answer === quizData[index].answer ? acc + 1 : acc;
    }, 0);
  
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('score').style.display = 'block';
    document.getElementById('scoreValue').innerText = `${score} / ${quizData.length}`;
  }
  
  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answers = Array(quizData.length).fill(null);
    document.getElementById('score').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
  }
  
  window.onload = loadQuestion;
  