require('dotenv').config({ path: __dirname + '/./../.env' })
const path = require('path'),
	express = require('express'),
	handlebars = require('express-handlebars'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	route = require('./routes'),
	db = require('./config/db'),
	helpers = require('./helpers'),
	port = +process.env.PORT,
	SSL_KEY = process.env.SSL_PRIVKEY,
	SSL_CHAIN = process.env.SSL_FULLCHAIN,
	SSL_PEM = process.env.SSL_CHAIN,
	cors = require('cors'),
	app = express()

db.connet()

let server = require('http').Server(app)
global.appRoot = path.resolve(__dirname)
global.tokenList = []
global.accessTokenLife = process.env.TOKEN_LIFE
global.accessTokenSecret = process.env.SECRET
global.refreshTokenLife = process.env.REFRESH_TOKEN_LIFE
global.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(
	bodyParser.urlencoded({
		extended: false,
		limit: '100gb',
	})
)
app.use(bodyParser.json())
app.engine(
	'hbs',
	handlebars({
		extname: 'hbs',
		helpers,
	})
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

if (process.env.MODE === 'production') {
	// --------------SSL--------------
	const fs = require('fs')
	const helmet = require('helmet')
	const option = {
		key: fs.readFileSync(SSL_KEY.toString()),
		cert: fs.readFileSync(SSL_CHAIN.toString()),
		// ca: fs.readFileSync(SSL_PEM.toString()),
		requestCert: false,
		rejectUnauthorized: false,
	}
	server = require('https').createServer(option, app)
	server.listen(port, () => {
		console.log(`App running at http://localhost:${port}`)
	})
} else {
	server.listen(port, () => {
		console.log(`App development at http://localhost:${port}`)
	})
}

app.use(cors())
route(app)
