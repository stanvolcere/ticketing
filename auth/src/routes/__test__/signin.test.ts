import request from "supertest";
import { app } from '../../app';

it.skip("it fails when email that doesn't axist is supplied", async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "password"
        }).expect(400);
});

it.skip("it fails when incorrect password is provided supplied", async (done) => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        }).expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "pppppassword"
        })
        .expect(400);

});

it("sets cookie after signin", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        }).expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "password"
        }).expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
});