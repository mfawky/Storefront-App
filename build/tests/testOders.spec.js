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
const orders_1 = require("../models/orders");
const server_1 = __importDefault(require("../server"));
const usersService_1 = require("../services/usersService");
// create a request object
const request = (0, supertest_1.default)(server_1.default);
const orderStore = new orders_1.OrdersStore();
let token;
const order = { status: 'new', userId: 1 };
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        firstname: 'alice',
        lastname: 'bob',
        password: 'pass'
    };
    token = yield (0, usersService_1.insertIntoUser1)(user);
    expect(token).toBeTruthy();
}));
describe('Test orders endpoints', () => {
    it('test list all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/orders')
            .send(order)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
        expect(response.body.id).toEqual(1);
        expect(response.body.status).toEqual('new');
    }));
    it('test list all orders without token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orders');
        expect(response.status).toBe(401);
    }));
    it('test list all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orders').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveSize(1);
    }));
    it('test list specific order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orders/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(1);
    }));
    it('test edit order', () => __awaiter(void 0, void 0, void 0, function* () {
        const order1 = { status: 'old', userId: 1 };
        const response = yield request
            .put('/orders/1')
            .send(order1)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('old');
    }));
    it('test remove order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/orders/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
});
//////////////////////////////////////////////////////////////////////////////////////////////////
describe('Test order db store', () => {
    it('tests insert order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderStore.insert(order);
        expect(result).toBeTruthy();
    }));
    it('tests list all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderStore.listAll();
        expect(result).toHaveSize(1);
    }));
    it('tests list specific order', () => __awaiter(void 0, void 0, void 0, function* () {
        const orderId = 2;
        const result = yield orderStore.listSpecific(orderId);
        expect(result.id).toEqual(orderId);
    }));
    it('tests edit order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderStore.edit('old', 2);
        expect(result.status).toEqual('old');
    }));
    it('tests remove order', () => __awaiter(void 0, void 0, void 0, function* () {
        const orderId = 2;
        const result = yield orderStore.remove(orderId);
        expect(result.id).toEqual(orderId);
        const result1 = yield orderStore.listSpecific(orderId);
        expect(result1).toBeUndefined();
        const result2 = yield orderStore.listAll();
        expect(result2).toHaveSize(0);
    }));
});
