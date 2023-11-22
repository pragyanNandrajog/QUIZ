const quizData = [
    {
      question: 'who won gold medal in javelin throw?',
      options: ['neeraj chopra', 'PV sindhu', 'mary kom', 'Caeleb DRESSEL'],
      answer: 'neeraj chopra',
    },
    {
      question: 'What is the hottest planet in our solar system?',
      options: ['Mars', 'Saturn', 'Jupiter', 'venus'],
      answer: 'venus',
    },
    {
      question: 'which of the following contury is the smallest country in the world?',
      options: ['india', 'nauru', 'south korea', 'Vatican City'],
      answer: 'Vatican City',
    },
    {
      question: 'What is the tallest mountain under water in the world?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Mauna kea'],
      answer: 'Mauna kea',
    },
    {
      question: 'Who is the tallest person on Earth?',
      options: [
        'Sultan Kösen ',
        'pragyananda',
        'magnus',
        ' akshay kumar',
      ],
      answer: 'Sultan Kösen ',
    },
    {
      question: 'Which of the following is the easist language in the world',
      options: ['korean', 'japanese', 'hindi', 'norwegian'],
      answer: 'norwegian',
    },
    {
      question: 'full form of cpu',
      options: [
        'Central processing unit',
        'Central power unit',
        'Computer processing unit',
        'Central processing univers',
      ],
      answer: 'Central processing unit',
    },
    {
      question: 'Which planet rains diamond?',
      options: ['Neptune and Uranus,', 'Neptune and jupiter,', 'venus and Uranus,', 'Uranus and mars'],
      answer: 'Neptune and Uranus,',
    },
    {
      question: 'What is the largest species of whale?',
      options: [
        'blue whale',
        'finback',
        'right whale',
        'orca',
      ],
      answer: 'blue whale',
    },
    {
      question: 'Which animal is known as the King of the water?',
      options: ['killer whale', 'kingfisher', 'goldfish', 'whale shark'],
      answer: 'killer whale',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();