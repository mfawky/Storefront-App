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
const server_1 = __importDefault(require("../server"));
const products_1 = require("../models/products");
const usersService_1 = require("../services/usersService");
const request = (0, supertest_1.default)(server_1.default);
let token;
const product = { name: 'watch', price: 33 };
const pStore = new products_1.ProductsStore();
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        firstname: 'alice',
        lastname: 'bob',
        password: 'pass'
    };
    token = yield (0, usersService_1.insertIntoUser1)(newUser);
    expect(token).toBeTruthy();
}));
describe('Test product endpoints', () => {
    it('test insert product without token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/products')
            .send(product);
        expect(response.status).toBe(401);
    }));
    it('test insert product', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/products')
            .send(product)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
        expect(response.body.id).toEqual(1);
        expect(response.body.name).toEqual('watch');
        expect(response.body.price).toEqual(33);
    }));
    it('test list all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveSize(1);
    }));
    it('test list specific product', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(1);
    }));
    it('test edit product', () => __awaiter(void 0, void 0, void 0, function* () {
        const p1 = { name: 'watch', price: 35 };
        const response = yield request
            .put('/products/1')
            .send(p1)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual('watch');
        expect(response.body.price).toEqual(35);
    }));
    it('test remove product', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/products/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
});
// ////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Test product db store', () => {
    it('tests insert product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield pStore.insert(product);
        expect(result).toBeTruthy();
    }));
    it('tests list all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield pStore.listAll();
        expect(result).toHaveSize(1);
    }));
    it('tests list specific product', () => __awaiter(void 0, void 0, void 0, function* () {
        const productId = 2;
        const result = yield pStore.listSpecific(productId);
        expect(result.id).toEqual(productId);
    }));
    it('tests edit product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product1 = { name: 'watch', price: 35 };
        const result = yield pStore.edit(product1, 2);
        expect(result.name).toEqual('watch');
    }));
    it('tests remove product', () => __awaiter(void 0, void 0, void 0, function* () {
        const productId = 2;
        const result = yield pStore.remove(productId);
        expect(result.id).toEqual(productId);
        const result1 = yield pStore.listSpecific(productId);
        expect(result1).toBeUndefined();
        const result2 = yield pStore.listAll();
        expect(result2).toHaveSize(0);
    }));
});
