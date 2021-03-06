const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        await mongoose.connect(process.env.mongoUri), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        app.listen(PORT, () => console.log(`app is now started on port ${PORT}`));
    } catch (error) {
        console.log('Server Error', error.message);
        process.exit(1);
    }
}

start();

