const languageSelect = document.getElementById('language-select');
const startQuizButton = document.getElementById('start-quiz-button');
const quizContainer = document.querySelector('.quiz-container');
const questionTextElement = document.getElementById('question-text');
const optionElements = document.querySelectorAll('.option');
const feedbackTextElement = document.getElementById('feedback-text');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;

// Dummy questions and answers for each language
const languageQuestions = {
    english: [
        {
            question: "In C, what is the result of sizeof(int) on a typical 32-bit system?",
            options: ["2 bytes", "4 bytes", "8 bytes"],
            correctAnswer: "4 bytes"
        },
        {
            question: "Which C++ access modifier specifies that members are accessible from other classes?",
            options: ["public", "private", " protected"],
            correctAnswer: "private"
        },
        {
            question: " Which keyword is used to declare a constant variable in Java?",
            options: ["constant", "final", "static"],
            correctAnswer: "final"
        },
        {
            question: "What is the result of 5 / 2 in Java?",
            options: [" 2.5", "2", "2.0"],
            correctAnswer: "2"
        },
        {
            question: "What is the result of typeof null in JavaScript?",
            options: ["number", "null", "object"],
            correctAnswer: "object"
        },
        {
            question: " In PHP, which superglobal array is used to collect form data after submitting an HTML form with the post method?",
            options: ["$_GET", "$_REQUEST", " $_POST"],
            correctAnswer: " $_POST"
        },
        {
            question: " Which PHP function is used to open a file for reading?",
            options: ["fopen()", "readfile()", "file_get_contents()"],
            correctAnswer: "fopen()"
        },
       {
            question: " Which keyword is used to declare a variable in JavaScript that cannot be reassigned?",
             options: ["const", "let", "var"],
            correctAnswer: "const"
        },
        {
            question: "What is the purpose of the addEventListener method in JavaScript?",
            options: ["To create an element", "To attach an event handler function to an element", "To remove an element"],
            correctAnswer: "To attach an event handler function to an element"
        },
        {
            question: " Which JavaScript function is used to round a number down to the nearest integer?",
            options: ["Block scope", "Function scope", "Global scope"],
            correctAnswer: "Function scope"
        },
        
        // Add more questions in English here
    ],
    hindi: [
        {
            question: " एक पारंपरिक 32-बिट सिस्टम पर 'int' का 'sizeof' का परिणाम क्या होता है?",
            options: ["2 bytes", "4 bytes", "8 bytes"],
            correctAnswer: "4 bytes"
        },
    
        {
            question: "c++ में कौनसी ऍक्सेस मॉडिफायर घोषित करती है कि सदस्य अन्य कक्षों से पहुँचे जा सकते हैं?",
            options: ["public", "private", " protected"],
            correctAnswer: "public"
        },

        {
            question: " जावा में किस कीवर्ड का उपयोग एक स्थिर चर को घोषित करने के लिए किया जाता है?",
            options: ["constant", "final", "static"],
            correctAnswer: "final"
        },
        {
            question: "जावा में 5 / 2 का परिणाम क्या होता है?",
            options: [" 2.5", "2", "2.0"],
            correctAnswer: "2"
        },
        {
            question: "PHP में, कौनसे सुपरग्लोबल एरे का उपयोग एक HTML फॉर्म को post मेथड के साथ सबमिट करने के बाद डेटा जमा करने के लिए किया जाता है?",
            options: ["$_GET", "$_REQUEST", " $_POST"],
            correctAnswer: " $_POST"
        },
        {
            question: " PHP में, किस फ़ंक्शन का उपयोग एक फ़ाइल को पढ़ने के लिए किया जाता है?",
            options: ["fopen()", "readfile()", "file_get_contents()"],
            correctAnswer: "fopen()"
        },
        {
            question: "में एक वेरिएबल की घोषणा करने के लिए कौनसा कीवर्ड उपयोग किया जाता है जिसे पुनर्प्रापित नहीं किया जा सकता है?",
             options: ["const", "let", "var"],
            correctAnswer: "const"
        },
        {
            question: "JavaScript में addEventListener मेथड का उद्देश्य क्या है?",
            options: ["To create an element", "To attach an event handler function to an element", "To remove an element"],
            correctAnswer: "To attach an event handler function to an element"
        },
        {
            question: "कौनसा JavaScript फ़ंक्शन एक संख्या को निकटतम पूर्णांक के लिए नीचे गिराने के लिए उपयोग किया जाता है?",
            options: ["Block scope", "Function scope", "Global scope"],
            correctAnswer: "Function scope"
        },
        // Add more questions in Spanish here
    ],
    // Add more languages and questions as needed
};

startQuizButton.addEventListener('click', () => {
    const selectedLanguage = languageSelect.value;
    if (selectedLanguage in languageQuestions) {
        // Start the quiz with the selected language
        startQuiz(selectedLanguage);
    } else {
        alert('Please select a valid language.');
    }
});

function startQuiz(language) {
    // Hide language selection and show the quiz container
    document.querySelector('.language-selection').style.display = 'none';
    quizContainer.style.display = 'block';

    // Fetch questions for the selected language
    const questions = languageQuestions[language];

    function displayQuestion(questionIndex) {
        const question = questions[questionIndex];
        questionTextElement.textContent = question.question;

        optionElements.forEach((optionElement, index) => {
            optionElement.textContent = question.options[index];
            optionElement.addEventListener('click', () => checkAnswer(index, question.correctAnswer));
        });

        feedbackTextElement.textContent = '';
        nextButton.style.display = 'none';
    }

    function checkAnswer(selectedIndex, correctAnswer) {
        const selectedOptionText = optionElements[selectedIndex].textContent;
        
        if (selectedOptionText === correctAnswer) {
            feedbackTextElement.textContent = 'Correct!';
        } else {
            feedbackTextElement.textContent = 'Incorrect. Try again.';
        }
        
        nextButton.style.display = 'block';
    }
    

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            // Quiz finished
            questionTextElement.textContent = 'Quiz finished!  Thank you for your response!!';
            optionElements.forEach((optionElement) => {
                optionElement.style.display = 'none';
            });
            feedbackTextElement.textContent = '';
            nextButton.style.display = 'none';
        }
    });
    

    // Initial question display
    displayQuestion(currentQuestionIndex);
}