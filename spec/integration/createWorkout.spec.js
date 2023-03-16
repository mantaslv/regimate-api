const request = require('supertest');
const mongoMemoryDb = require('../mongoMemoryDb');
const server = require('../../server');

beforeAll(async () => await mongoMemoryDb.connect());
afterAll(async () => await mongoMemoryDb.close());
afterEach(async () => await mongoMemoryDb.clear());

describe('POST /api/workouts', () => {
    it('creates a new workout', async () => {
        const res = await request(server)
            .post('/api/workouts')
            .send({ title: 'Squats', load: 100, sets: 3, reps: 10 })
            .expect(201);
        
        expect(res.body).toMatchObject({
            title: 'Squats',
            load: 100,
            sets: 3,
            reps: 10
        });
    });

    it('returns a 400 error if required fields are missing', async () => {
        const res = await request(server)
            .post('/api/workouts')
            .send({ title: 'Squats', load: 100, reps: 10 })
            .expect(400);
    
        expect(res.body).toMatchObject({
            error: expect.any(String)
        });
    });
});