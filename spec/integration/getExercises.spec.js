const request = require('supertest');
const mongoMemoryDb = require('../mongoMemoryDb');
const server = require('../../server');

beforeAll(async () => await mongoMemoryDb.connect());
afterAll(async () => await mongoMemoryDb.close());
afterEach(async () => await mongoMemoryDb.clear());

describe('GET /exercises', () => {
    it('gets a list of all exercises in reverse chronological order', async () => {
        await request(server).post('/api/exercises').send({ 
            title: 'Squats', 
            load: 100, 
            sets: 3, 
            reps: 10 
        });
        await request(server).post('/api/exercises').send({ 
            title: 'Bench Press', 
            load: 100, 
            sets: 3, 
            reps: 10 
        });
        await request(server).post('/api/exercises').send({ 
            title: 'Deadlifts', 
            load: 100, 
            sets: 3, 
            reps: 10 
        });

        const res = await request(server)
            .get('/api/exercises')
            .expect(200);
        
        expect(res.body.map(obj => obj.title))
            .toEqual(['Deadlifts', 'Bench Press', 'Squats']);
    });
});