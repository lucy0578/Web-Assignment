document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const leaderboardElement = document.getElementById('leaderboard');
    let currentQuestion = 0;  // record the number of answers
    let score = 0;  // record user's score
    let timeLeft = 20000;  // set the time for each question to 20 seconds
    let timer;  // set timer
    let totalTime = 0;  // initialize the total time to 0s
    let userName = '';  // set user name

    // the questions of quiz and its multiple choices, explanations and answers
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

    // load question when user starts or moves to next question
    function loadQuestion() {
        // get the current question from questions by index
        const q = questions[currentQuestion];

        // assign HTML content to quizContainer
        // set question to <h3> and show
        // set multiple choices to <p> and show
        // caculate the rest time and show
        quizContainer.innerHTML = `
            <div class="question">
                <h3>${q.question}</h3>
            </div>
            ${q.choices.map((choice, i) => `
                <div>
                    <button class="choice" data-index="${i}">${choice.text}</button>
                </div>
            `).join('')}
            <div id="time-display">Time to answer: ${Math.ceil(timeLeft / 1000)} s</div>
        `;

        // move to next question when user click the button of multiple choice
        document.querySelectorAll('.choice').forEach(button => {
            button.addEventListener('click', handleChoice);
        });

        timeLeft = 20000; // reset timeLeft

        clearInterval(timer); // clean odd timer

        // set interval to caculate the rest time
        timer = setInterval(function(){
            const timeDisplay = document.getElementById('time-display');

            // move to time out page when timeLeft turns to 0
            if(timeLeft <= 0){
                handleTimeout(); 
                clearInterval(timer);
            } else {
                // show the rest time before timeLeft decreases to 0
                timeDisplay.innerHTML = 'Time to answer: ' + Math.ceil(timeLeft / 1000) + ' s';
            }
            timeLeft -= 10;  // timeLeft subtracts 0.01s every time the function repeats
        },10);
    }

    // when no time out
    function handleChoice(event) {
        // when answered a question, calculate the time taken so far
        totalTime += (20000 - timeLeft) / 1000;

        const choiceIndex = parseInt(event.target.getAttribute('data-index'));  // get user choice index
        const choice = questions[currentQuestion].choices[choiceIndex];  // get user choice from index
        const correct = choice.correct;  // get the result of user choice
        const correctChoice = questions[currentQuestion].choices.find(choice => choice.correct);  // get the correct choice
        const explanation = questions[currentQuestion].explanation;  // get the explanation

        // if user's answer is correct
        if (correct) {
            quizContainer.innerHTML = `
                <div class="question">
                    <h3>Your answer is correct!</h3>
                    <p>Answer: ${correctChoice.text}</p>
                    <p>Explanation: ${explanation}</p>
                </div>
            `;
            score++;
        } else {
            // if user's answer is incorrect
            quizContainer.innerHTML = `
                <div class="question">
                    <h3>Your answer is incorrect!</h3>
                    <p>Answer: ${correctChoice.text}</p>
                    <p>Explanation: ${explanation}</p>
                </div>
            `;
        }

        // if the current question isn't the finnal question
        if (currentQuestion < questions.length - 1) {
            // add "next button" button
            quizContainer.innerHTML += `<button id="next_question">Next Question</button>`;

            // click the button to move to next question
            document.getElementById('next_question').addEventListener('click', () => {
                currentQuestion++;
                loadQuestion();
            });
        } else {
            // if it is the finnal question
            // add "view score" button
            quizContainer.innerHTML += `<button id="view-score">View Score</button>`;

            // move to score page
            document.getElementById('view-score').addEventListener('click', () => {
                showFinalScore();
            });
        }
    }

    // if it is time out
    function handleTimeout() {
        // calculate the time taken so far
        totalTime += 20000 / 1000;

        const correctChoice = questions[currentQuestion].choices.find(choice => choice.correct);
        const explanation = questions[currentQuestion].explanation;

        quizContainer.innerHTML = `
            <div class="question">
                <h3>Time's up!</h3>
                <p>The correct answer is: ${correctChoice.text}</p>
                <p>Explanation: ${explanation}</p>
            </div>
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

    // move to score page and show finnal score and leaderboard
    function showFinalScore() {
        if (totalTime >= 200) {
            // if the user timed out to answer all questions
            totalTime = 'Timeout';
        } else {
            // keep two decimals
            totalTime = totalTime.toFixed(2);
        }

        const userScore = {
            username: userName,
            score: score,
            totalTime: totalTime
        };

        // create leader board and show
        fetch('/leaderboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userScore)
        })
        .then(response => response.json())
        .then(data => {
            let leaderboard = data.leaderboard;

            // sort the leaderboard array in descending order of grades
            leaderboard.sort((a, b) => b.score - a.score);

            // generate the HTML for the table
            let leaderboardHTML = `
                <h3>Leaderboard</h3>
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Total Time (seconds)</th>
                    </tr>
            `;

            // iterate through the leaderboard array, generating each row of data
            leaderboard.forEach((entry, index) => {
                leaderboardHTML += `
                    <tr>
                        <td>${entry.username}</td>
                        <td>${entry.score}</td>
                        <td>${entry.totalTime}</td>
                    </tr>
                `;
            });

            // end the table's HTML
            leaderboardHTML += `</table>`;

            // show the detail about user's score and user can try again the quiz
            const finalScoreHTML = `
                <h3>You completed all the questions!</h3>
                <p>You got ${score} right out of ${questions.length}.</p>
                <p>Total time used: ${totalTime} seconds</p>
                ${leaderboardHTML}
                <button id="try-again">Try Again</button>
            `;

            quizContainer.innerHTML = finalScoreHTML;

            // move to quiz initial page
            document.getElementById('try-again').addEventListener('click', () => {
                quizContainer.innerHTML = `
                    <h3>Welcome to the quiz! Give your name</h3>
                    <input type="text" id="username" placeholder="Enter your name">
                    <button id="start">Start</button>
                `;
                document.getElementById('start').addEventListener('click', startQuiz);
            });
        })
        // avoid throw error
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
        currentQuestion = 0; // reset the amount of question
        score = 0; // reset score
        timeLeft = 20000; // reset time left
        totalTime = 0; // reset totle time
        userName = document.getElementById('username').value;
        if (userName.trim() !== '') {
            quizContainer.innerHTML = `<p>Welcome to the quiz, ${userName}! Let's start!</p>`;
            setTimeout(loadQuestion, 3000);
        } else {
            alert('Please enter your name!');
        }
    }

    // start quiz
    document.getElementById('start').addEventListener('click', startQuiz);

});
