// Array of questions and answers
const quizData = [
    {
      question: " How many rings are on the Olympic flag?",
      options: ["None", "4", "5", "7"],
      answer: 2
    },
    {
      question: "How did Spider-Man get his powers?",
      options: ["Bitten by a radioactive spider", "Born with them", "Military experiment gone awry", "Woke up with them after a strange dream"],
      answer: 0
    },
    {
      question: "In darts, what's the most points you can score with a single throw?",
      options: ["20", "30", "50", "60"],
      answer: 3
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
  