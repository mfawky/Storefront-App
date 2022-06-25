"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("../models/users");
const usersService_1 = require("../services/usersService");
const server_1 = __importDefault(require("../server"));
const usersStore = new users_1.UsersStore();
const request = (0, supertest_1.default)(server_1.default);
let token;
const user = { firstname: 'alice', lastname: 'bob', password: 'pass' };
describe('Test user endpoints', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield usersStore.removeAll();
    }));
    it('tests users to be defined', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(usersStore.insert).toBeDefined();
    }));
    it('test creating a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/users').send(user);
        expect(response.status).toBe(201);
        token = response.body;
    }));
    it('test list all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/users').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveSize(1);
    }));
    it('test list specific user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/users/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(1);
    }));
    it('test edit user', () => __awaiter(void 0, void 0, void 0, function* () {
        const u1 = { firstname: 'alice', lastname: 'bob', password: 'hhh' };
        const response = yield request.put('/users/1').send(u1).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.firstname).toEqual('alice');
        expect(response.body.lastname).toEqual('bob');
        expect(response.body.id).toEqual(1);
    }));
    it('test remove user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/users/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
});
describe('Test user db store', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            firstname: 'alice',
            lastname: 'bob',
            password: 'pass'
        };
        token = yield (0, usersService_1.insertIntoUser1)(user);
        expect(token).toBeTruthy();
    }));
    it('tests list all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield usersStore.listAll();
        expect(result).toHaveSize(1);
    }));
    it('tests list specific user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = 2;
        const result = yield usersStore.listSpecific(userId);
        expect(result.id).toEqual(userId);
    }));
    it('tests edit user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = { firstname: 'alice', lastname: 'bob', password: 'hhh' };
        const result = yield usersStore.edit(user1, 2);
        expect(result.firstname).toEqual('alice');
        expect(result.lastname).toEqual('bob');
        expect(result.id).toEqual(2);
    }));
    it('tests remove user', () => __awaiter(void 0, void 0, void 0, function* () {
        const productId = 2;
        const result = yield usersStore.remove(productId);
        expect(result.id).toEqual(productId);
        const result1 = yield usersStore.listSpecific(productId);
        expect(result1).toBeUndefined();
        const result2 = yield usersStore.listAll();
        expect(result2).toHaveSize(0);
    }));
});
