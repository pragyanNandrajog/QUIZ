const quizData = [
    {
      question: 'which of the following was the oldest planet in our soloar system?',
      options: ['mercury', 'jupiter', 'earth', 'neptune'],
      answer: 'jupiter',
    },
    {
      question: 'What is the coldest planet in our solar system?',
      options: ['Mars', 'Saturn', 'Jupiter', 'uranus'],
      answer: 'uranus',
    },
    {
      question: 'which of the following contury is the most populated country in the world?',
      options: ['india', 'nauru', 'south korea', 'Vatican City'],
      answer: 'india',
    },
    {
      question: 'What is the tallest statue in the world?',
      options: ['statue of unity', 'statue of liberty', 'the motherland calls', 'statue of mahatma gandhi'],
      answer: 'statue of unity',
    },
    {
      question: 'Who is the shortest person on Earth?',
      options: [
        'Afshin Ghaderzadeh ',
        'pragyananda',
        'magnus',
        ' akshay kumar',
      ],
      answer: 'Afshin Ghaderzadeh ',
    },
    {
      question: 'Which of the following is the 2nd easist language in the world',
      options: ['korean', 'spanish', 'hindi', 'norwegian'],
      answer: 'spanish',
    },
    {
      question: 'full form of gpu',
      options: [
        'graphics processing unit',
        'gaming projecting universal',
        'graphics projecting unit',
        'gram per unit',
      ],
      answer: 'graphics processing unit',
    },
    {
      question: 'Which planet has red spots in it?',
      options: ['Neptune and Uranus', 'Neptune ', 'venus and Uranus,', 'jupiter'],
      answer: 'jupiter'
    },
    {
      question: 'What is the largest species of tiger?',
      options: [
        'white tiger',
        'bangoli tiger',
        ' whale tiger',
        'amur tiger',
      ],
      answer: 'amur tiger',
    },
    {
      question: 'Which animal is known as the King of the air?',
      options: ['eagle', 'kingfisher', 'vulter', 'falcons'],
      answer: 'eagle',
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