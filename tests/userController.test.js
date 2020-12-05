import request from 'supertest'
import app from '../src/app'
jest.mock('../src/service/user')


describe('user suite', () => {
    test('should created new user with 201 status', async () => {
        const user = {
            email: "saki2222db@gmail.com",
            name: "sakib",
            password: "11111111"
        }
        const response = await request(app).post('/ragister').send(user);

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe( true )
    })


})