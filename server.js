const express = require('express');
const cors = require('cors');
const session = require('express-session');

const path = require('path');
const app = express();
const http = require('http').createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: 'Yuval Beit On',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, 'build')));
} else {
	const corsOptions = {
		origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
		credentials: true,
	};
	app.use(cors(corsOptions));
}

const messageRoutes = require('./api/message/message.routes');

app.use('/api/message', messageRoutes);

app.get('/**', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3030;
http.listen(port, () => {
	console.log(`the server running in port ${port}`);
});
