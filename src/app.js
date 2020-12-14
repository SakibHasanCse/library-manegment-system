

import bodyparser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import helmet from 'helmet'
import morgan from 'morgan'
import passport from 'passport'
import xss from 'xss-clean'
import { errorhandle, setCorrelationId } from './middlewares/appMid'
import { conPassport } from './middlewares/auth'
import bookRouter from './router/book'
import authRouter from './router/user'
const swagger = require('swagger-ui-express')
const app = express()

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: './config/config.env' })
    app.use(morgan('dev'))
}


app.use(fileUpload())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cors())
app.use(helmet())
app.use(xss())

app.use(passport.initialize())
conPassport(passport)

app.use(setCorrelationId)

app.use(authRouter)
app.use(bookRouter)
const swaggerDocument = require('./swagger.json')
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument))
app.use(errorhandle)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Page Not Found'
    })
})


export default app
