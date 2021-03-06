const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
// Test Fixture

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Test GET /launches', () => {
        // defines each test case
        // First argument is name of test, second arguement is callback with test functions
        test('It should respond with 200 success', async () => {
            const response = await request(app)
            // requires an app object, same one from app.js
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
            // Assertion, we expect a value to be ...
            // USE IF NOT USING SUPER TEST LIBRARY OTHERWISE CAN CHAIN EXPECT ON TO THE GET
            // expect(response.statusCode).toBe(200);
        });
    })

    describe('Test POST /launch', () => {

        const completeLaunchData = {
            mission: "USS Enterprise",
            rocket: "1701-D",
            target: "Kepler-62 f",
            launchDate: "January 4 2028"
        };

        const launchDataWithoutDate = {
            mission: "USS Enterprise",
            rocket: "1701-D",
            target: "Kepler-62 f",
            launchDate: "January 4 2028"
        };

        const launchDataWithInvalidDate = {
            mission: "USS Enterprise",
            rocket: "1701-D",
            target: "Kepler-62 f",
            launchDate: "asdf"
        };

        test('It should respond with 200 sucess', () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);

            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate);
            expect(responseDate).toBe(requestDate);
            // When checking body use JEST
            expect(response.body).toMatchObject(launchDataWithoutDate)
        });
        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body.toStrictEqual({
                error: 'Missing required launch property'
            }))
        });
        test('It should catch invalid dates', () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body.toStrictEqual({
                error: 'Invalid launch date'
            }))
        });
    })
});