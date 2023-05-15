const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoMemoryDb = require('../mongoMemoryDB');
const UserModel = require('../../models/userModel');

describe('User model', () => {
    beforeAll(async () => await mongoMemoryDb.connect());
    afterAll(async () => await mongoMemoryDb.close());
    afterEach(async () => await mongoMemoryDb.clear());

    describe('signup', () => {
        it('should create a new user', async () => {
            const email = 'test@example.com';
            const password = 'P@ssw0rd';
            const user = await UserModel.signup(email, password);

            expect(user).toBeDefined();
            expect(user.email).toBe(email);

            const passwordMatch = await bcrypt.compare(password, user.password);
            expect(passwordMatch).toBe(true);
        });

        it('should throw an error when email or password is missing', async () => {
            await expect(UserModel.signup()).rejects.toThrow('All fields must be filled');
            await expect(UserModel.signup('test@example.com')).rejects.toThrow('All fields must be filled');
            await expect(UserModel.signup(undefined, 'P@ssw0rd')).rejects.toThrow('All fields must be filled');
        });

        it('should throw an error when the email is invalid', async () => {
            const email = 'invalid_email';
            const password = 'P@ssw0rd';
            await expect(UserModel.signup(email, password)).rejects.toThrow('Email is not valid');
        });

        it('should throw an error when the password is not strong enough', async () => {
            const email = 'test@example.com';
            const password = 'weakpassword';
            await expect(UserModel.signup(email, password)).rejects.toThrow('Password not strong enough');
        });

        it('should throw an error when the email is already in use', async () => {
            const email = 'test@example.com';
            const password = 'P@ssw0rd';

            await UserModel.signup(email, password);
            await expect(UserModel.signup(email, 'NewP@ssw0rd')).rejects.toThrow('Email already in use');
        });
    });

    describe('login', () => {
        beforeAll(async () => {
            const email = 'test@example.com';
            const password = 'P@ssw0rd';
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            await UserModel.create({ email, password: hash });
        });

        it('should log in an existing user', async () => {
            const email = 'test@example.com';
            const password = 'P@ssw0rd';
            const user = await UserModel.login(email, password);

            expect(user).toBeDefined();
            expect(user.email).toBe(email);
        });

        it('should throw an error when email or password is missing', async () => {
            await expect(UserModel.login()).rejects.toThrow('All fields must be filled');
            await expect(UserModel.login('test@example.com')).rejects.toThrow('All fields must be filled');
            await expect(UserModel.login(undefined, 'P@ssw0rd')).rejects.toThrow('All fields must be filled');
        });

        it('should throw an error when the email does not exist', async () => {
            const email = 'nonexistent@example.com';
            const password = 'P@ssw0rd';
            await expect(UserModel.login(email, password)).rejects.toThrow('Email does not exist');
        });

        it('should throw an error when the password is incorrect', async () => {
            const email = 'test@example.com';
            const password = 'WrongPassword';
            await expect(UserModel.login(email, password)).rejects.toThrow('Incorrect password');
        });

        it('should throw an error when the password is incorrect', async () => {
            const email = 'test@example.com';
            const correctPassword = 'P@ssw0rd';
            const incorrectPassword = 'WrongPassword';
      
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(correctPassword, salt);
            await UserModel.create({ email, password: hash });
      
            await expect(UserModel.login(email, incorrectPassword)).rejects.toThrow('Incorrect password');
          });
    });
});            