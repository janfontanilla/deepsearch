import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import playListRoutes from './routes/playlist.routes.js'
import spotifyRoutes from './routes/spotify.routes.js'
import songRoutes from './routes/song.routes.js'
import filterRoutes from './routes/filter.routes.js'

const app = express()

app.get('/', (req, res) => {
    res.status(200).send(Template()) 
    })
    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes)
app.use('/', authRoutes)
// DeepSearch
app.use('/', playListRoutes)
app.use('/', spotifyRoutes)
app.use('/', songRoutes)
app.use('/', filterRoutes)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message}) 
    }else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message}) 
    console.log(err)
    } 
    })

export default app
