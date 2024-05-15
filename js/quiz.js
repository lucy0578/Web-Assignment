document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const questions = [
        { question: "Guess if I am boy or girl?", choices: ["Boy!!", "Girl~"], answer: "Girl~" },
    ];

    let currentQuestion = 0;
    let score = 0;

    function loadQuestion() {
        if (currentQuestion < questions.length) {
            const q = questions[currentQuestion];
            quizContainer.innerHTML = `
                <h3>${q.question}</h3>
                ${q.choices.map((choice, i) => `<button class="choice" data-choice="${choice}">${choice}</button>`).join('')}
            `;
            document.querySelectorAll('.choice').forEach(button => {
                button.addEventListener('click', handleChoice);
            });
        } else {
            quizContainer.innerHTML = `<h3>Your score: ${score}/${questions.length}</h3>`;
        }
    }

    function handleChoice(event) {
        const choice = event.target.getAttribute('data-choice');
        const correctAnswer = questions[currentQuestion].answer;
        if (choice === correctAnswer) {
            quizContainer.innerHTML = "<p>Correct! Lucy is a lady~</p>";
            score++;
        } else {
            quizContainer.innerHTML = "<p>Sorry, I am a girl.</p>";
        }
        currentQuestion++;
        setTimeout(loadQuestion, 5000);
    }

    loadQuestion();
});
