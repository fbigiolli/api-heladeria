const request = require('supertest');
const app = require('../index.js'); 
const server = require('../index');

afterAll((done) => {
    server.close(done);
});

describe('Repartidores', () =>{
    describe('RepartidoresGET', ()=>{
        let response;
        let responseWithEdadQuery;
        const edadQuery = 22;
        beforeAll(async() =>{
            response = await request(app).get('/repartidores');
            responseWithEdadQuery = await request(app).get(`/repartidores?edad=${edadQuery}`)
        });

        it('should respond with a 200 status', () => {
            expect(response.statusCode).toEqual(200);
        });

        it('should return an array with objects having nombre, apellido, edad, cuil and _id', ()=>{
            expect(Array.isArray(response.body)).toBe(true);

            response.body.forEach(obj => {
                expect(obj).toHaveProperty('nombre');
                expect(obj).toHaveProperty('apellido');
                expect(obj).toHaveProperty('edad');
                expect(obj).toHaveProperty('cuil');
                expect(obj).toHaveProperty('_id');
            });
        });

        it('Request with Edad query parameter should return an array with objects that match Edad', ()=>{
            responseWithEdadQuery.body.forEach(obj =>{
                expect(obj.edad).toEqual(edadQuery);
            })
        });

        it('Every CUIL should be unique', ()=>{
            const cuilSet = new Set();
            const repartidores = response.body;

            response.body.forEach(obj => {
                cuilSet.add(obj.cuil);
            })

            expect(cuilSet.size).toBe(repartidores.length);
        });
    });

    describe('RepartidoresRepartidorIDGET', ()=>{
        let response;
        let responseInvalidID;
        const repartidorID = '663f97eafc524d0feeb4e5e3';
        beforeAll(async()=>{
            response = await request(app).get(`/repartidores/${repartidorID}`);
            responseInvalidID = await request(app).get('/repartidores/asd123');
        });

        it('should return an object having nombre, apellido, edad, cuil and _id', () => {
            const repartidor = response.body;
            expect(repartidor).toHaveProperty('nombre');
            expect(repartidor).toHaveProperty('apellido');
            expect(repartidor).toHaveProperty('edad');
            expect(repartidor).toHaveProperty('cuil');
            expect(repartidor).toHaveProperty('_id');
        });

        it('should respond with a 404 status if repartidorID is invalid', ()=>{
            expect(responseInvalidID.statusCode).toEqual(404);
        });

        it('Invalid GustoID error message should be: No se conoce un gusto con tal id', async () => {
            expect(responseInvalidID.text).toEqual('No se conoce un repartidor con tal id.');
        });
    });
})
