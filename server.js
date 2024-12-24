const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const postmark = require('postmark');
require('dotenv').config();

const app = express();
app.use(cors());  // Adiciona CORS a todas as rotas
app.use(bodyParser.json());

const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);

app.post('/send-email', (req, res) => {
    const { message } = req.body;
    client.sendEmail({
        "From": process.env.FROM_EMAIL,
        "To": "contact@flashguyscleaning.com",
        "Subject": "New message from FAQ",
        "TextBody": message
    }, function(error, result) {
        if (error) {
            console.error("Unable to send via postmark: " + error.message);
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: "Email sent successfully" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
