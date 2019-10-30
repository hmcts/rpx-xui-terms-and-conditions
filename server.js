const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Terms and Conditions service is running');
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
