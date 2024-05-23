const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

let leaderboard = [];

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/leaderboard', (req, res) => {
    const { username, score, totalTime } = req.body; 
    leaderboard.push({ username, score, totalTime }); 
    leaderboard.sort((a, b) => b.score - a.score || a.totalTime - b.totalTime);
    if (leaderboard.length > 10) leaderboard.pop();
    res.json({ leaderboard });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
