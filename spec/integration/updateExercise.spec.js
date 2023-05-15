const request = require('supertest');
const mongoose = require('mongoose');
const mongoMemoryDb = require('../mongoMemoryDb');
const server = require('../../server');

beforeAll(async () => await mongoMemoryDb.connect());
afterAll(async () => await mongoMemoryDb.close());
afterEach(async () => await mongoMemoryDb.clear());

describe('UPDATE /api/exercises/:id', () => {
    const exercise = { 
        title: 'Squats', 
        load: 100, 
        sets: 3, 
        reps: 10 
    };

    it('updates a exercise with specified id', async () => {
        const { body } = await request(server).post('/api/exercises').send(exercise);
    
        const res = await request(server)
            .patch('/api/exercises/' + body._id)
            .send({sets: 10})
            .expect(200);

        expect(res.body).toEqual(expect.objectContaining(exercise));

        const resAll = await request(server)
            .get('/api/exercises')

        expect(resAll.body[0].sets).toEqual(10);
    });

    it('returns a 404 error if id is not a valid type', async () => {
        await request(server).post('/api/exercises').send(exercise);
    
        const res = await request(server)
            .patch('/api/exercises/1234dfdf')
            .send({sets: 10})
            .expect(404);

        expect(res.body).toEqual({ error: 'No such exercise' });
    });

    it('returns a 404 error if id is not found', async () => {
        const invalidId = new mongoose.Types.ObjectId();
    
        const res = await request(server)
            .patch('/api/exercises/' + invalidId)
            .send({sets: 10})
            .expect(404);

        expect(res.body).toEqual({ error: 'No such exercise' });
    });
});