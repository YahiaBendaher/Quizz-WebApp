const startButton = document.getElementById('start_button')
const nextButton = document.getElementById('next_button')
const questionContainerElement = document.getElementById('question_container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreElement = document.getElementById('right-answers')

let shuffledQuestions, currentQuestionIndex
let quizScore = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    // Masquer la section hero et afficher le quiz
    document.querySelector('.hero').classList.add('hide')
    
    // Initialiser le quiz
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    quizScore = 0
    scoreElement.innerText = quizScore
    
    // Afficher le conteneur de questions
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    // Afficher la question
    questionElement.innerText = question.question
    
    // Créer les boutons de réponse
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        
        // Ajouter des classes pour le style
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        
        // Ajouter un écouteur d'événement
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    // Réinitialiser l'état du body
    clearStatusClass(document.body)
    
    // Masquer le bouton suivant
    nextButton.classList.add('hide')
    
    // Supprimer les anciens boutons de réponse
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct === 'true'
    
    // Appliquer les classes appropriées
    setStatusClass(document.body, correct)
    
    // Marquer toutes les réponses comme correctes ou incorrectes
    Array.from(answerButtonsElement.children).forEach(button => {
        const buttonCorrect = button.dataset.correct === 'true'
        setStatusClass(button, buttonCorrect)
        
        // Désactiver les boutons après la sélection
        button.disabled = true
    })
    
    // Mettre à jour le score si la réponse est correcte
    if (correct) {
        quizScore++
        scoreElement.innerText = quizScore
        
        // Animation pour célébrer une bonne réponse
        scoreElement.classList.add('score-animation')
        setTimeout(() => {
            scoreElement.classList.remove('score-animation')
        }, 1000)
    }
    
    // Afficher le bouton suivant ou redémarrer
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        // proposer de recommencer
        startButton.innerText = "Recommencer"
        startButton.classList.remove('hide')
        
        // Afficher un message de fin
        questionElement.innerText = `Quiz terminé! Votre score final est de ${quizScore}/${shuffledQuestions.length}.`
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Questions du quiz
const questions = [
    {
        question: 'Quel est le framework JavaScript parmi ces options?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Eclipse', correct: false },
        ],
    },
    {
        question: 'Quelle est la capitale du Maroc?',
        answers: [
            { text: 'Tanger', correct: false },
            { text: 'Casablanca', correct: false },
            { text: 'Marrakech', correct: false },
            { text: 'Rabat', correct: true },
        ],
    },
    {
        question: 'Combien font 14×3?',
        answers: [
            { text: '42', correct: true },
            { text: '52', correct: false },
            { text: '32', correct: false },
            { text: '62', correct: false },
        ],
    },
    {
        question: 'Quel est le plus grand océan du monde?',
        answers: [
            { text: 'Océan Atlantique', correct: false },
            { text: 'Océan Indien', correct: false },
            { text: 'Océan Pacifique', correct: true },
            { text: 'Océan Arctique', correct: false },
        ],
    },
    {
        question: 'Qui a peint "La Joconde"?',
        answers: [
            { text: 'Vincent Van Gogh', correct: false },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Léonard de Vinci', correct: true },
            { text: 'Michel-Ange', correct: false },
        ],
    },
]


document.querySelector('.score-display').style.transition = 'transform 0.3s';


const style = document.createElement('style');
style.textContent = `
  @keyframes scoreAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(1.5); color: #2ecc71; }
    100% { transform: scale(1); }
  }
  
  .score-animation {
    animation: scoreAnimation 0.5s ease;
  }
`;

document.head.appendChild(style);