const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to serve static files (like your HTML file)
app.use(express.static(path.join(__dirname)));

// Middleware to parse URL-encoded data (for POST requests)
app.use(express.urlencoded({ extended: true }));

// GET method handler
app.get('/submit-get', (req, res) => {
    // Data is in req.query for GET requests
    const name = req.query.name;
    const branch = req.query.branch;
    const semester = req.query.semester;

    // Display the information with specified formatting
    const htmlResponse = ` <h2>Student Information (GET)</h2>
        <p>Name: <b>${name}</b></p>
        <p>Branch: <u>${branch}</u></p>
        <p>Semester: ${semester}</p>
        <br> <a href="/">Go Back</a>`;
    res.send(htmlResponse);
});

// POST method handler
app.post('/submit-post', (req, res) => {
    // Data is in req.body for POST requests
    const name = req.body.name;
    const branch = req.body.branch;
    const semester = req.body.semester;

    // Display the information with specified formatting
    const htmlResponse = `
        <h2>Student Information (POST)</h2>
        <p>Name: <b>${name}</b></p>
        <p>Branch: <u>${branch}</u></p>
        <p>Semester: ${semester}</p>
        <br>
        <a href="/">Go Back</a>
    `;
    res.send(htmlResponse);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    console.log('Open your browser and navigate to http://localhost:3000/index.html');
});
