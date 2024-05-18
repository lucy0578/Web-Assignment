document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const questions = [
        {
            question: "1. What is web technology?",
            choices: [
                { text: "a) A collection of tools and techniques used to create and deliver content on the World Wide Web", correct: true },
                { text: "b) A type of software that enables users to access and interact with information on the internet", correct: false },
                { text: "c) A network of interconnected computers that share information and services", correct: false },
                { text: "d) A system for storing and retrieving information on the internet", correct: false }
            ],
            explanation: "Explanation: Web technology is a term that encompasses the tools, techniques, and standards used to create and deliver content on the World Wide Web. This includes markup languages like HTML and CSS, scripting languages like JavaScript, client-side technologies like HTML5 and CSS3, server-side technologies like PHP and Java, databases, networking protocols, and more."
        },
        {
            question: "2. Which HTML tag is used to create a hyperlink?",
            choices: [
                { text: "a) &lt;link&gt", correct: false },
                { text: "b) &lt;href&gt", correct: false },
                { text: "c) &lt;a&gt", correct: true },
                { text: "d) &lt;hyperlink&gt", correct: false }
            ],
            explanation: "Explanation: The HTML tag <a> is used to create a hyperlink, which is a link to another web page or resource. The <a> tag has two main attributes: href and target. The href attribute specifies the URL of the linked resource, while the target attribute specifies whether the link should open in a new browser window or tab."
        },
        {
            question: "3. Which of the following is not a web component element?",
            choices: [
                { text: "a) &lt;shadow&gt", correct: false },
                { text: "b) &lt;menu&gt", correct: true },
                { text: "c) &lt;content&gt", correct: false },
                { text: "d) &lt;element&gt", correct: false }
            ],
            explanation: "Explanation: There are web components in HTML related technology which makes it possible to essentially create and use custom elements as if it were regular HTML. You can also create custom versions of standard HTML elements. Some of the elements are &lt;shadow&gt;, &lt;content&gt;, &lt;element&gt;, &lt;template&gt;, &lt;slot&gt;."
        },
        {
            question: "4. Which of the following programming languages is commonly used for server-side scripting in web development?",
            choices: [
                { text: "a) HTML", correct: false },
                { text: "b) CSS", correct: false },
                { text: "c) JavaScript", correct: false },
                { text: "d) PHP", correct: true }
            ],
            explanation: "Explanation: HTML, CSS, and JavaScript play crucial roles in front-end development, focusing on the visual aspects of web pages, while PHP serves as the primary language for server-side scripting. It manages backend tasks such as database interactions, processing user input, and generating dynamic content."
        },
        {
            question: "5. Which of the following is used to read a HTML page and render it?",
            choices: [
                { text: "a) Web server", correct: false },
                { text: "b) Web matrix", correct: false },
                { text: "c) Web browser", correct: true },
                { text: "d) None of the mentioned", correct: false }
            ],
            explanation: "Explanation: A web browser (commonly referred to as a browser) is a software application for retrieving, presenting and traversing information resources on the World Wide Web."
        },
        {
            question: "6. Which of the following is a popular front-end framework for building user interfaces in JavaScript?",
            choices: [
                { text: "a) Django", correct: false },
                { text: "b) Angular", correct: true },
                { text: "c) Flask", correct: false },
                { text: "d) Node.js", correct: false }
            ],
            explanation: "Explanation: Angular is a widely used front-end framework specifically designed for creating dynamic and interactive user interfaces in JavaScript."
        },
        {
            question: "7. What application can one create even before the introduction of HTML5?",
            choices: [
                { text: "a) Forms", correct: true },
                { text: "b) Browser based games", correct: false },
                { text: "c) Web applications", correct: false },
                { text: "d) Mobile application", correct: false }
            ],
            explanation: "Explanation: With the help of HTML5 and JavaScript it became possible to create excellent mobile applications, browser based games, web applications and many more other applications. Forms were already introduced before HTML5."
        },
        {
            question: "8. Which of the following is not associated with web socket communication?",
            choices: [
                { text: "a) https", correct: false },
                { text: "b) wss", correct: false },
                { text: "c) http", correct: true },
                { text: "d) ws", correct: false }
            ],
            explanation: "Explanation: For opening WebSocket we call WebSocket constructor. The syntax is 'var conn=new WebSocket('ws://rtyyghj.websocket.org/echo',['brush', 'xmpp']);' using secure HTTP connections use https: ,ws: is the new URL scheme for connecting WebSockets. There is wss: also."
        },
        {
            question: "9. Why are Images often used on the webpage?",
            choices: [
                { text: "a) To create graphical buttons or links to other pages", correct: true },
                { text: "b) To help the webpage load efficientl;", correct: false },
                { text: "c) Webpage cannot run/be displayed without at least one image", correct: false },
                { text: "d) Because webpage doesn’t support pure text", correct: false }
            ],
            explanation: "Explanation: Images are also used for better presentation of webpage. Any image can be turned into a link. Rather than putting text between the opening < a > tag and the closing < /a > tag, you simply place an image inside these tags."
        },
        {
            question: "10. What is DOM?",
            choices: [
                { text: "a) Application programming interface", correct: false },
                { text: "b) Hierarchy of objects in ASP.NET", correct: false },
                { text: "c) Convention for representing and interacting with objects in html documents", correct: true },
                { text: "d) None of the mentioned", correct: false }
            ],
            explanation: "Explanation: The Document Object Model (DOM) is a cross-platform and language-independent convention for representing and interacting with objects in HTML, XHTML, and XML documents."
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function loadQuestion() {
        const q = questions[currentQuestion];
        quizContainer.innerHTML = `
            <h3>${q.question}</h3>
            ${q.choices.map((choice, i) => `
                <div>
                    <button class="choice" data-index="${i}">${choice.text}</button>
                </div>
            `).join('')}
        `;
        document.querySelectorAll('.choice').forEach(button => {
            button.addEventListener('click', handleChoice);
        });
    }


    function handleChoice(event) {
        const choiceIndex = parseInt(event.target.getAttribute('data-index'));
        const choice = questions[currentQuestion].choices[choiceIndex];
        const correct = choice.correct;
        const explanation = questions[currentQuestion].explanation;

        if (correct) {
            quizContainer.innerHTML = `
                <p>Your answer is correct!</p>
                <p>Answer: ${choice.text}</p>
                <p>Explanation: ${explanation}</p>
            `;
            score++;
        } else {
            quizContainer.innerHTML = `
                <p>Your answer is incorrect!</p>
                <p>Answer: ${choice.text}</p>
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


    function showFinalScore() {
        quizContainer.innerHTML = `
            <h3>Your score: ${score}/${questions.length}</h3>
        `;

        document.getElementById('view-score').addEventListener('click', () => {
            alert(`Your final score is: ${score}/${questions.length}`);
        });
    }

    loadQuestion();
});
