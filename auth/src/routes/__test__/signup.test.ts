import request from 'supertest';
import { app } from '../../app';

it('returns a status code os 201 successful', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        }).expect(201);
});

it('returns a 400 error with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "testtest.com",
            password: "password"
        }).expect(400);
});

it('returns a 400 error with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "p"
        }).expect(400);
});

it('returns a 400 error with missing email/password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com"
        }).expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: "password"
        }).expect(400);
});

it.skip('disallows duplicate email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        }).expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        }).expect(400);
});

it("sets cookie after signup", async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        }).expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
});

