const request = require('supertest');
const mongoose = require('mongoose');
const mongoMemoryDb = require('../mongoMemoryDb');
const server = require('../../server');

beforeAll(async () => await mongoMemoryDb.connect());
afterAll(async () => await mongoMemoryDb.close());
afterEach(async () => await mongoMemoryDb.clear());

describe('GET /api/workouts/:id', () => {
    const workout = { 
        title: 'Squats', 
        load: 100, 
        sets: 3, 
        reps: 10 
    };

    it('gets a single workout from id', async () => {
        const { body } = await request(server).post('/api/workouts').send(workout);
    
        const res = await request(server)
            .get('/api/workouts/' + body._id)
            .expect(200);

        expect(res.body).toEqual(expect.objectContaining(workout));
    });

    it('returns a 404 error if id is not a valid type', async () => {
        await request(server).post('/api/workouts').send(workout);
    
        const res = await request(server)
            .get('/api/workouts/1234dfdf')
            .expect(404);

        expect(res.body).toEqual({ error: 'No such workout' });
    });

    it('returns a 404 error if id is not found', async () => {
        const invalidId = new mongoose.Types.ObjectId();
    
        const res = await request(server)
            .get('/api/workouts/' + invalidId)
            .expect(404);

        expect(res.body).toEqual({ error: 'No such workout' });
    });
});