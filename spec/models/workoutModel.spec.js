const mongoose = require('mongoose');
const mongoMemoryDb = require('../mongoMemoryDb');
const Workout = require('../../models/workoutModel');
const MockDate = require('mockdate');

describe('Workout model', () => {
    beforeAll(async () => await mongoMemoryDb.connect());
    afterAll(async () => await mongoMemoryDb.close());
    afterEach(async () => await mongoMemoryDb.clear());

    describe('should be invalid if fields are missing', () => {
        it('title', async () => {
            const workout = new Workout({
                sets: 3,
                reps: 10,
                load: 100
            });
            await expect(workout.save()).rejects.toThrow();
        });

        it('sets', async () => {
            const workout = new Workout({
                title: 'Bench Press',
                reps: 10,
                load: 100
            });
            await expect(workout.save()).rejects.toThrow();
        });

        it('reps', async () => {
            const workout = new Workout({
                title: 'Bench Press',
                sets: 3,
                load: 100
            });
            await expect(workout.save()).rejects.toThrow();
        });

        it('load', async () => {
            const workout = new Workout({
                title: 'Bench Press',
                sets: 3,
                reps: 10
            });
            await expect(workout.save()).rejects.toThrow();
        });
    });

    describe('should be invalid if fields are of the wrong type', () => {
        it('title not a string', async () => {
            const workout = new Workout({
                title: 123,
                sets: 3,
                reps: 10,
                load: 100
            });

            try {
                await workout.save();
            } catch (error) {
                expect(error.message).toContain('Title must be a string');
                expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            };
        });
    
        it('sets not a number', async () => {
            const workout = new Workout({
                title: 'Bench Press',
                sets: 'not a number',
                reps: 10,
                load: 100
            });
            await expect(workout.save()).rejects.toThrow();
        });
    
        it('reps is not a number', async () => {
            const workout = new Workout({
                title: 'Bench Press',
                sets: 3,
                reps: 'not a number',
                load: 100
            });
            await expect(workout.save()).rejects.toThrow();
        });
    
        it('load is not a number', async () => {
            const workout = new Workout({
                title: 'Bench Press',
                sets: 3,
                reps: 10,
                load: 'not a number'
            });
            await expect(workout.save()).rejects.toThrow();
        });    
    });

    it('should create a new workout', async () => {
        MockDate.set('2022-01-01');
        const workout = new Workout({
            title: 'Bench Press',
            sets: 3,
            reps: 10,
            load: 100
        });
        const savedWorkout = await workout.save();
        expect(savedWorkout._id).toBeDefined();
        expect(savedWorkout.title).toBe('Bench Press');
        expect(savedWorkout.sets).toBe(3);
        expect(savedWorkout.reps).toBe(10);
        expect(savedWorkout.load).toBe(100);
        expect(savedWorkout.createdAt).toEqual(new Date('2022-01-01'));
        MockDate.reset();
    });
});