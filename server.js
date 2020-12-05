import app from './src/app'
import { DBCON } from './config/dbCon'
const mongourl = process.env.MONGODBURL
import { errorLogger } from './src/middlewares/logger'
const PORT = process.env.PORT 


app.listen(PORT, () => {
    console.log(`server is runniung on ${PORT}`)

    DBCON(mongourl)
    if (process.env.PROCESSNAME != 'TEST')
        app.use(errorLogger(mongourl))


})


