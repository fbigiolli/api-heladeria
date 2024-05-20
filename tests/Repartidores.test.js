const request = require('supertest');
const app = require('../index.js'); 
const server = require('../index');

afterAll((done) => {
    server.close(done);
});

describe('Repartidores', () =>{
    const bodyValidRepartidor = {
        "nombre": "Juan",
        "apellido": "Lopez",
        "cuil": 20371548962,
        "edad": 30
    };

    const bodyValidRepartidor2 = {
        "nombre": "Marcos",
        "apellido": "Lopez",
        "cuil": 20370988962,
        "edad": 30
    }

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


        describe('Valid Requests', () => { 
            beforeAll(async()=>{
                response = await request(app).get(`/repartidores/${repartidorID}`);
            });
            
            it('should return an object having nombre, apellido, edad, cuil and _id', () => {
                const repartidor = response.body;
                expect(repartidor).toHaveProperty('nombre');
                expect(repartidor).toHaveProperty('apellido');
                expect(repartidor).toHaveProperty('edad');
                expect(repartidor).toHaveProperty('cuil');
                expect(repartidor).toHaveProperty('_id');
            });
        });

        describe('Invalid Requests', () => {
            beforeAll(async()=>{
                responseInvalidID = await request(app).get('/repartidores/asd123');
            });

            it('should respond with a 404 status if repartidorID is invalid', ()=>{
                expect(responseInvalidID.statusCode).toEqual(404);
            });
    
            it('Invalid RepartidorID error message should be: No se conoce un repartidor con tal id.', async () => {
                expect(responseInvalidID.text).toEqual('No se conoce un repartidor con tal id.');
            });
        });
    });

    describe('RepartidoresPOST', ()=>{
        const testMissingField = async (field) => {
            const { [field]: _, ...bodySinCampo } = bodyValidRepartidor;
            const response = await request(app).post('/repartidores').send(bodySinCampo);
            expect(response.status).toBe(400);
        };
    
        describe('Invalid Requests', ()=>{
            it('should respond with 400 status if nombre is missing', async()=>{
                await testMissingField('nombre');
            });
    
            it('should respond with 400 status if apellido is missing', async()=>{
                await testMissingField('apellido');
            });
            
            it('should respond with 400 status if CUIL is missing', async()=>{
                await testMissingField('cuil');
            });
    
            it('should respond with 400 status if edad is missing', async()=>{
                await testMissingField('edad');
            });
    
            it('should respond with 400 status if CUIL isnt valid', async()=>{
                let bodyRepartidorInvalidCUIL = { ...bodyValidRepartidor };
                bodyRepartidorInvalidCUIL.cuil = 12345;
                const response = await request(app).post('/repartidores').send(bodyRepartidorInvalidCUIL);
                expect(response.status).toBe(400);
            });
    
            it('should respond with 400 status if CUIL is already registered', async()=>{
                const registerResponse = await request(app).post('/repartidores').send(bodyValidRepartidor);
                expect(registerResponse.status).toBe(201);
                const invalidRegisterResponse = await request(app).post('/repartidores').send(bodyValidRepartidor);
                expect(invalidRegisterResponse.status).toBe(400);
                await request(app).delete(`/repartidores/${registerResponse.body._id}`);
            });
        });

        describe('Valid Requests', ()=>{
            let validResponse;
            beforeAll(async()=>{
                validResponse = await request(app).post('/repartidores').send(bodyValidRepartidor);
            });

            afterAll(async () => {
                if (validResponse.body && validResponse.body._id) {
                    await request(app).delete(`/repartidores/${validResponse.body._id}`);
                }   
            });

            it('should respond with 201 status if request body is valid', async ()=>{
                expect(validResponse.status).toBe(201);
            });

            it('should have _id attribute in response body', ()=>{
                expect(validResponse.body).toHaveProperty('_id');
            });
        });
    });

    describe('RepartidoresRepartidorIDPUT', ()=>{

        const testMissingFieldPUT = async (field, repartidorID) => {
            const { [field]: _, ...bodySinCampo } = bodyValidRepartidor;
            const response = await request(app).put(`/repartidores/${repartidorID}`).send(bodySinCampo);
            expect(response.status).toBe(400);
        };
        
        let repartidorID;
        
        beforeAll(async()=>{
            response = await request(app).post('/repartidores').send(bodyValidRepartidor);
            repartidorID = response.body._id;
        });

        afterAll(async()=>{
            await request(app).delete(`/repartidores/${repartidorID}`);
        });

        describe('Invalid Requests', ()=>{
            it('should respond with 404 status if repartidorID isnt valid', async()=>{
                const response = await request(app).put('/repartidores/9867asdhbj').send(bodyValidRepartidor);
                expect(response.status).toBe(404);
            })

            it('should respond with 400 status if nombre is missing', async()=>{
                await testMissingFieldPUT('nombre', repartidorID);
            });
    
            it('should respond with 400 status if apellido is missing', async()=>{
                await testMissingFieldPUT('apellido', repartidorID);
            });
            
            it('should respond with 400 status if CUIL is missing', async()=>{
                await testMissingFieldPUT('cuil', repartidorID);
            });
    
            it('should respond with 400 status if edad is missing', async()=>{
                await testMissingFieldPUT('edad', repartidorID);
            });

            it('should respond with 400 status if CUIL isnt valid', async()=>{
                let bodyRepartidorInvalidCUIL = { ...bodyValidRepartidor };
                bodyRepartidorInvalidCUIL.cuil = 12345;
                const response = await request(app).put(`/repartidores/${repartidorID}`).send(bodyRepartidorInvalidCUIL);
                expect(response.status).toBe(400);
            });

            it('should respond with 400 status if CUIL is already registered', async()=>{

                const registerResponse = await request(app).post('/repartidores').send(bodyValidRepartidor2);
                expect(registerResponse.status).toBe(201);

                let bodyRepartidorInvalidCUIL = { ...bodyValidRepartidor };
                bodyRepartidorInvalidCUIL.cuil = bodyValidRepartidor2.cuil;

                const response = await request(app).put(`/repartidores/${repartidorID}`).send(bodyRepartidorInvalidCUIL);
                expect(response.status).toBe(400);
                await request(app).delete(`/repartidores/${registerResponse.body._id}`);
            });
        })
        
    });
})
