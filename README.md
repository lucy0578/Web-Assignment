# Coursework Assignment

## Instructions

First, navigate to the AboutMyself folder:
    ```bash
    cd AboutMyself
    ```
    
Second, start local server:
    ```bash
    npm start
    ```

On this stage, the local server should be running, you can click **Box URL** button on the top of Codio menu bar or type **https://lionclassic-hairowner-8080.codio-box.uk/** into your browser to access the website.

**Note: You can download code from GitHub [here](https://github.com/lucy0578/Web-Assignment.git).**


## Introduction
This project is a website comprising three pages, Introduction page, About page and an interactive quiz application page. The first two pages provide a brief introduction of myself while the latter one offers a quiz about basic web knowledge that help users better understanding the web.

## Design Overview
### Pages
1. **Home (Introduction page)**
    This page provides a brief introduction to myself, created by the `index.html` file. It includes information about my mixed feelings regarding English, as I have recently prepared for the CET-6 exam and experienced frustration.

2. **About Myself** 
    Created by `about.html`, this page contains more detailed information about my experiences, interests, and favorite animations.

3. **Quiz** 
    The quiz page is created using `quiz.html` and powered by `quiz.js`, giving an interactive quiz application where users can answer multiple choice questions and test their knowledge of web.

    **All pages are decorated by `styles.css` file.**

### Navigation
The website includes a sidebar at the left of each page, allowing clients to go to their oriented page easily.

### Interactive Quiz

The quiz application dynamically loads questions and allows users to select answers. 

First, you can see the login page which asks you to enter your name otherwise it will throw a warning. As you click **`Start`** button, you will enter the welcome page, which will stay for three seconds before being automatically redirected to the quiz page.

In the quiz page, there are ten multiple-choices questions, users are asked to answer each question within 20s or it will time out. After each question, website will turn to the answer page which will show the result, correct answer and explanation. You can click the **`Next Question`** button to move to the following question.

When users finish the test, it will turn to the score page, showing your score, total time you spent on it and a leader board of the users with most correct answer and least time.

If you are unsatisfied with your score, you can click **`Try Again`** button to return the login page to try again.


## Structure

* **Server Side**
    Initializes an instance of the Express application and sets the port number for the server to listen on.
    ```
    const app = express();
    const PORT = process.env.PORT || 8080;
    ```

    Configurate JSON parsing and route to public file.
    ```
    app.use(bodyParser.json());
    app.use(express.static('public'));
    ```

    Endpoint for retrieving quiz questions.
    ```
    app.get('/questions', (req, res) => {
        res.json(questions);
    });
    ```

    Endpoint for handling leaderboard updates.
    ```
    app.post('/leaderboard', (req, res) => {
        const { username, score, totalTime } = req.body;
        leaderboard.push({ username, score, totalTime });
        leaderboard.sort((a, b) => b.score - a.score || a.totalTime - b.totalTime);
        leaderboard = leaderboard.slice(0, 10);
        res.json({ leaderboard });
    });
    ```

    Start the server.
    ```
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    ```

* **Client Side**
    Event listeners and other initialization code.
    ```
    document.addEventListener('DOMContentLoaded', () => {
        // functions and event
    });
    ```


## Challenges Faced
* **Styling**
    To achieving a appealing design with every component preforming their functions properly was challenging. I had to debug parameters in CSS file over and over again to address this.

* **Client-Server Communication**
    Implementing real-time communication between the client and server for the quiz application was hard for me. At first, I have no idea why the leaderboard didn't show in web page and later I found I had to create a variable to clarify it. 
    
    Additionally, I found that the name of totleTime between js file and server.js were different, which led to no performance when server was running. Fortunately, all problems were solved correctly.



## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this website to deal in the website without restriction.

## Conclusion

Overall, this project demonstrated the use of HTML, CSS and JavaScript to create a interactive and dynamic website. By overcoming various challenges, I hope my website can give you a nice expression.

## Reference
* CSDN
* Stack Overflow
* Picture author: wlop, Kyoto Animation
