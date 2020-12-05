import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { defaultlibrarian } from '../src/middlewares/appMid';
import User from '../src/model/user';


export const DBCON = (mongourl) => {
    mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true,})
        .then(async () => {
            const users = await User.find()
            if (users.length == 0 || users.length == null) {
                let user = defaultlibrarian
                const password = await bcrypt.hash(user.password, 12)
                const newuser = new User({
                    ...user,
                    password
                })
                await newuser.save()
            }
        }
        )
        .catch((err) => console.log(err.message));

    mongoose.set('useFindAndModify', false)
}

