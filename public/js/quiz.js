document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const leaderboardElement = document.getElementById('leaderboard');
    let currentQuestion = 0;
    let score = 0;
    let timeLeft = 20000;
    let timer;
    let totalTime = 0;
    let userName = '';

    const questions = [
        {
            question: "1. What is web technology?",
            choices: [
                { text: "a) A collection of tools and techniques used to create and deliver content on the World Wide Web", correct: true },
                { text: "b) A type of software that enables users to access and interact with information on the internet", correct: false },
                { text: "c) A network of interconnected computers that share information and services", correct: false },
                { text: "d) A system for storing and retrieving information on the internet", correct: false }
            ],
            explanation: "Web technology is a term that encompasses the tools, techniques, and standards used to create and deliver content on the World Wide Web. This includes markup languages like HTML and CSS, scripting languages like JavaScript, client-side technologies like HTML5 and CSS3, server-side technologies like PHP and Java, databases, networking protocols, and more."
        },
        {
            question: "2. Which HTML tag is used to create a hyperlink?",
            choices: [
                { text: "a) &lt;link&gt", correct: false },
                { text: "b) &lt;href&gt", correct: false },
                { text: "c) &lt;a&gt", correct: true },
                { text: "d) &lt;hyperlink&gt", correct: false }
            ],
            explanation: "The HTML tag <a> is used to create a hyperlink, which is a link to another web page or resource. The <a> tag has two main attributes: href and target. The href attribute specifies the URL of the linked resource, while the target attribute specifies whether the link should open in a new browser window or tab."
        },
        {
            question: "3. Which of the following is not a web component element?",
            choices: [
                { text: "a) &lt;shadow&gt", correct: false },
                { text: "b) &lt;menu&gt", correct: true },
                { text: "c) &lt;content&gt", correct: false },
                { text: "d) &lt;element&gt", correct: false }
            ],
            explanation: "There are web components in HTML related technology which makes it possible to essentially create and use custom elements as if it were regular HTML. You can also create custom versions of standard HTML elements. Some of the elements are &lt;shadow&gt;, &lt;content&gt;, &lt;element&gt;, &lt;template&gt;, &lt;slot&gt;."
        },
        {
            question: "4. Which of the following programming languages is commonly used for server-side scripting in web development?",
            choices: [
                { text: "a) HTML", correct: false },
                { text: "b) CSS", correct: false },
                { text: "c) JavaScript", correct: false },
                { text: "d) PHP", correct: true }
            ],
            explanation: "HTML, CSS, and JavaScript play crucial roles in front-end development, focusing on the visual aspects of web pages, while PHP serves as the primary language for server-side scripting. It manages backend tasks such as database interactions, processing user input, and generating dynamic content."
        },
        {
            question: "5. Which of the following is used to read a HTML page and render it?",
            choices: [
                { text: "a) Web server", correct: false },
                { text: "b) Web matrix", correct: false },
                { text: "c) Web browser", correct: true },
                { text: "d) None of the mentioned", correct: false }
            ],
            explanation: "A web browser (commonly referred to as a browser) is a software application for retrieving, presenting and traversing information resources on the World Wide Web."
        },
        {
            question: "6. Which of the following is a popular front-end framework for building user interfaces in JavaScript?",
            choices: [
                { text: "a) Django", correct: false },
                { text: "b) Angular", correct: true },
                { text: "c) Flask", correct: false },
                { text: "d) Node.js", correct: false }
            ],
            explanation: "Angular is a widely used front-end framework specifically designed for creating dynamic and interactive user interfaces in JavaScript."
        },
        {
            question: "7. What application can one create even before the introduction of HTML5?",
            choices: [
                { text: "a) Forms", correct: true },
                { text: "b) Browser based games", correct: false },
                { text: "c) Web applications", correct: false },
                { text: "d) Mobile application", correct: false }
            ],
            explanation: "With the help of HTML5 and JavaScript it became possible to create excellent mobile applications, browser based games, web applications and many more other applications. Forms were already introduced before HTML5."
        },
        {
            question: "8. Which of the following is not associated with web socket communication?",
            choices: [
                { text: "a) https", correct: false },
                { text: "b) wss", correct: false },
                { text: "c) http", correct: true },
                { text: "d) ws", correct: false }
            ],
            explanation: "For opening WebSocket we call WebSocket constructor. The syntax is 'var conn=new WebSocket('ws://rtyyghj.websocket.org/echo',['brush', 'xmpp']);' using secure HTTP connections use https: ,ws: is the new URL scheme for connecting WebSockets. There is wss: also."
        },
        {
            question: "9. Why are Images often used on the webpage?",
            choices: [
                { text: "a) To create graphical buttons or links to other pages", correct: true },
                { text: "b) To help the webpage load efficiently", correct: false },
                { text: "c) Webpage cannot run/be displayed without at least one image", correct: false },
                { text: "d) Because webpage doesn't support pure text", correct: false }
            ],
            explanation: "Images are also used for better presentation of webpage. Any image can be turned into a link. Rather than putting text between the opening < a > tag and the closing < /a > tag, you simply place an image inside these tags."
        },
        {
            question: "10. What is DOM?",
            choices: [
                { text: "a) Application programming interface", correct: false },
                { text: "b) Hierarchy of objects in ASP.NET", correct: false },
                { text: "c) Convention for representing and interacting with objects in html documents", correct: true },
                { text: "d) None of the mentioned", correct: false }
            ],
            explanation: "The Document Object Model (DOM) is a cross-platform and language-independent convention for representing and interacting with objects in HTML, XHTML, and XML documents."
        }
    ];

    function handleChoice(event) {
        totalTime += (20000 - timeLeft) / 1000;

        const choiceIndex = parseInt(event.target.getAttribute('data-index'));
        const choice = questions[currentQuestion].choices[choiceIndex];
        const correct = choice.correct;
        const correctChoice = questions[currentQuestion].choices.find(choice => choice.correct);
        const explanation = questions[currentQuestion].explanation;

        if (correct) {
            quizContainer.innerHTML = `
                <h3>Your answer is correct!</h3>
                <p>Answer: ${correctChoice.text}</p>
                <p>Explanation: ${explanation}</p>
            `;
            score++;
        } else {
            quizContainer.innerHTML = `
                <h3>Your answer is incorrect!</h3>
                <p>Answer: ${correctChoice.text}</p>
                <p>Explanation: ${explanation}</p>
            `;
        }
        if (currentQuestion < questions.length - 1) {
            quizContainer.innerHTML += `<button id="next_question">Next Question</button>`;
            document.getElementById('next_question').addEventListener('click', () => {
                currentQuestion++;
                loadQuestion();
            });
        } else {
            quizContainer.innerHTML += `<button id="view-score">View Score</button>`;
            document.getElementById('view-score').addEventListener('click', () => {
                showFinalScore();
            });
        }
    }

    function handleTimeout() {
        totalTime += 20000 / 1000;

        const correctChoice = questions[currentQuestion].choices.find(choice => choice.correct);
        const explanation = questions[currentQuestion].explanation;

        quizContainer.innerHTML = `
            <h3>Time's up!</h3>
            <p>The correct answer is: ${correctChoice.text}</p>
            <p>Explanation: ${explanation}</p
                    `;

        if (currentQuestion < questions.length - 1) {
            quizContainer.innerHTML += `<button id="next_question">Next Question</button>`;
            document.getElementById('next_question').addEventListener('click', () => {
                currentQuestion++;
                loadQuestion();
            });
        } else {
            showFinalScore();
        }
    }

    function loadQuestion() {
        const q = questions[currentQuestion];
        quizContainer.innerHTML = `
            <h3>${q.question}</h3>
            ${q.choices.map((choice, i) => `
                <div>
                    <button class="choice" data-index="${i}">${choice.text}</button>
                </div>
            `).join('')}
            <div id="time-display">Time to answer: ${Math.ceil(timeLeft / 1000)} seconds</div>
        `;

        document.querySelectorAll('.choice').forEach(button => {
            button.addEventListener('click', handleChoice);
        });

        timeLeft = 20000; // 重置倒计时器

        clearInterval(timer); // 清除旧的定时器

        timer = setInterval(function(){
            const timeDisplay = document.getElementById('time-display');
            if(timeLeft <= 0){
                handleTimeout(); // 时间耗尽时调用超时处理函数
                clearInterval(timer);
            } else {
                timeDisplay.innerHTML = 'Time to answer: ' + Math.ceil(timeLeft / 1000) + ' s';
            }
            timeLeft -= 10;
        },10);
    }


    function showFinalScore() {
        const userScore = {
            username: userName,
            score: score,
            totalTime: totalTime
        };

        fetch('/leaderboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userScore)
        })
        .then(response => response.json())
        .then(data => {
            const leaderboard = data.leaderboard;
            const leaderboardHTML = leaderboard.map((entry, index) => `
                <p>${index + 1}. ${entry.username}: ${entry.score} correct answers (${entry.totalTime} seconds)</p>
            `).join('');
            
            const finalScoreHTML = `
                <h3>You completed all the questions!</h3>
                <h3>You got ${score} right out of ${questions.length}.</h3>
                <p>Total time used: ${(totalTime).toFixed(2)} seconds</p>
                <h3>Leaderboard:</h3>
                ${leaderboardHTML}
            `;

            quizContainer.innerHTML = finalScoreHTML;
        })
        .catch(error => {
            console.error('Error fetching leaderboard:', error);
            const finalScoreHTML = `
                <h3>You completed all the questions!</h3>
                <h3>You got ${score} right out of ${questions.length}.</h3>
                <p>Total time used: ${totalTime.toFixed(2)} seconds</p>
                <p>Failed to load leaderboard. Please try again later.</p>
            `;
            quizContainer.innerHTML = finalScoreHTML;
        });
    }


    function startQuiz() {
        userName = document.getElementById('username').value;
        if (userName.trim() !== '') {
            quizContainer.innerHTML = `<p>Welcome to the quiz, ${userName}! Let's start!</p>`;
            setTimeout(loadQuestion, 3000);
        } else {
            alert('Please enter your name!');
        }
    }

    document.getElementById('start').addEventListener('click', startQuiz);

});
