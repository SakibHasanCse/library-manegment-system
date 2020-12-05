import User from '../../model/user'
import bcrypt from 'bcrypt';
const user  =[
    {
        "_id": "5fc9ed0a7aa75c2ffc3291c7",
        "role": "librarian",
        "name": "Librarian",
        "email": "librarian@gmail.com",
        "password": "$2b$12$VdyGB.bsRQlFK.tHAu2ZruhT5jY.U6HF45vKE8FFzMdQLRdJvyL9m",
        "createdAt": "2020-12-04T08:02:18.764Z",
        "updatedAt": "2020-12-04T08:02:18.764Z",
        "__v": 0
    },
    {
        "_id": "5fcb304a72510213dce8fa05",
        "role": "student",
        "email": "sakib@gmail.com",
        "name": "sakib",
        "password": "$2b$12$aRJ/m98vGWEMZe4dARekq.wD20GBeJh8tfTmZwZRWByG.Xq1k7e..",
        "createdAt": "2020-12-05T07:01:30.591Z",
        "updatedAt": "2020-12-05T07:01:30.591Z",
        "__v": 0
    },
    {
        "_id": "5fcb757b9b9da9125c1da847",
        "role": "student",
        "email": "saki2b@gmail.com",
        "name": "sakib",
        "password": "$2b$12$BACIGaFlseoXlHlZGVx5e.3eHnzTkMmiWvFkOJtqBR4Y2yZ20hYXy",
        "createdAt": "2020-12-05T11:56:43.102Z",
        "updatedAt": "2020-12-05T11:56:43.102Z",
        "__v": 0
    }

]

export const usersRagister = async (users, role, req, res) => {
   
    const password = await bcrypt.hash(users.password, 12)
    const newUser = new User({
        ...users,
        password,
        role
    })
     user.push(newUser)
    return res.status(201).json({
            success: true,
            message: 'User Registration successfully'
        })
 

}
