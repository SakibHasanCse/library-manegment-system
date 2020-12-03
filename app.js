

import bodyparser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { errorhandle, setCorrelationId } from './Api/middlewares/appMid'
import { errorLogger } from './Api/middlewares/logger'
import bookRouter from './Api/router/book'
import authRouter from './Api/router/user'
import passport from 'passport'
import {conPassport} from './Api/middlewares/auth'
import { DBCON } from './config/dbCon'

const app = express()

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: './config/config.env' })
    app.use(morgan('dev'))
}


const mongourl = process.env.MONGODBURL

app.use(bodyparser.json({ limit: "30mb", extended: true }))
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use(passport.initialize())
conPassport(passport)

DBCON(mongourl)
app.use(setCorrelationId)


app.use(authRouter)
app.use(bookRouter)


if(process.env.PROCESSNAME !== 'TEST'){
    app.use(errorLogger (mongourl))
}

app.use(errorhandle)

export default app
