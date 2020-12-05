

import bodyparser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { errorhandle, setCorrelationId } from './middlewares/appMid'
import bookRouter from './router/book'
import authRouter from './router/user'
import passport from 'passport'
import { conPassport } from './middlewares/auth'
import helmet from 'helmet'
import dotenv from 'dotenv'
import morgan from 'morgan'
import xss from 'xss-clean'
import fileUpload from 'express-fileupload'
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
app.use(errorhandle)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Page Not Found'
    })
})


export default app
