const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which version of Azure Active Directory includes identity protection?',
        choice1: 'P2',
        choice2: 'Free',
        choice3: 'P1',
        choice4: 'Office 360',
        answer: 1,
    },
    {
        question:
            "What is the Azure AD term: A virtual collection of policy settings and it controls what AD Objects have access to?",
        choice1: "Virtual Machine Policy(VMP)",
        choice2: "Group Policy Object",
        choice3: "Domain Computer",
        choice4: "Directory",
        answer: 2,
    },
    {
        question: "What is the Azure AD term that defines a logical grouping of AD objects on a network?",
        choice1: "Domain Controller",
        choice2: "Directory Service",
        choice3: "Active Directory Domain",
        choice4: "Controller Access",
        answer: 3,
    },
    {
        question: "Which key should remain on your local system and not be shared with others?",
        choice1: "Private Key",
        choice2: "Public Key",
        choice3: "Security Key",
        choice4: "Access Key%",
        answer: 1,
    },
    {
        question: "What are the keys you generate when using SSH Key Pairs?",
        choice1: "Private Key & Public Key",
        choice2: "SSH Key",
        choice3: "Security Key",
        choice4: "Access Key",
        answer: 1,
    }
]

const SCORE_POINTS = 20
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()