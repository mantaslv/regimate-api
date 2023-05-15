const mongoose = require('mongoose');
const mongoMemoryDb = require('../mongoMemoryDB');
const Exercise = require('../../models/exerciseModel');
const MockDate = require('mockdate');

describe('Exercise model', () => {
  beforeAll(async () => await mongoMemoryDb.connect());
  afterAll(async () => await mongoMemoryDb.close());
  afterEach(async () => await mongoMemoryDb.clear());

  describe('should be invalid if fields are missing', () => {
    it('title', async () => {
      const exercise = new Exercise({
        sets: 3,
        reps: 10,
        load: 100,
      });
      await expect(exercise.save()).rejects.toThrow();
    });

    it('sets', async () => {
      const exercise = new Exercise({
        title: 'Bench Press',
        reps: 10,
        load: 100,
      });
      await expect(exercise.save()).rejects.toThrow();
    });

    it('reps', async () => {
      const exercise = new Exercise({
        title: 'Bench Press',
        sets: 3,
        load: 100,
      });
      await expect(exercise.save()).rejects.toThrow();
    });

    it('load', async () => {
      const exercise = new Exercise({
        title: 'Bench Press',
        sets: 3,
        reps: 10,
      });
      await expect(exercise.save()).rejects.toThrow();
    });
  });

  describe('should be invalid if fields are of the wrong type', () => {
    it('title not a string', async () => {
      const exercise = new Exercise({
        title: 123,
        sets: 3,
        reps: 10,
        load: 100,
      });

      try {
        await exercise.save();
        throw new Error('Expected exercise.save() to throw an error.');
      } catch (error) {
        expect(error.message).toContain('Title must be a string');
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      }
    });

    it('sets not a number', async () => {
      const exercise = new Exercise({
        title: 'Bench Press',
        sets: 'not a number',
        reps: 10,
        load: 100,
      });
      await expect(exercise.save()).rejects.toThrow();
    });

    it('reps is not a number', async () => {
      const exercise = new Exercise({
        title: 'Bench Press',
        sets: 3,
        reps: 'not a number',
        load: 100,
      });
      await expect(exercise.save()).rejects.toThrow();
    });

    it('load is not a number', async () => {
      const exercise = new Exercise({
        title: 'Bench Press',
        sets: 3,
        reps: 10,
        load: 'not a number',
      });
      await expect(exercise.save()).rejects.toThrow();
    });
  });

  it('should create a new exercise', async () => {
    MockDate.set('2022-01-01');
    const exercise = new Exercise({
      title: 'Bench Press',
      sets: 3,
      reps: 10,
      load: 100,
    });
    const savedExercise = await exercise.save();
    expect(savedExercise._id).toBeDefined();
    expect(savedExercise.title).toBe('Bench Press');
    expect(savedExercise.sets).toBe(3);
    expect(savedExercise.reps).toBe(10);
    expect(savedExercise.load).toBe(100);
    expect(savedExercise.createdAt).toEqual(new Date('2022-01-01'));
    MockDate.reset();
  });
});
