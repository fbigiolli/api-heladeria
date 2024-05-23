const request = require('supertest');
const app = require('../index.js'); 
const server = require('../index');
const { client, dbConnection, dbDisconnect } = require('../db/dbConnection.js');
const { ObjectId, deserialize } = require('mongodb');


beforeAll(async() => {
    await dbConnection();
});

afterAll(async () => {
    await server.close();
    await dbDisconnect();
});

describe('Pedidos', ()=>{
    const validBodyPedido = {
        "direccion_entrega": "string"
    };

    const validBodyPedido2 = {
        "direccion_entrega": "av cabildo 281"
    };

    describe('PedidosPedidoIDGet', () => {
        describe('Valid Requests', () => {
            let validResponse;
            let pedidoTest;
            let pedidoID;
            beforeAll(async () => {
                pedidoTest = await request(app).post('/pedidos').send(validBodyPedido);
                expect(pedidoTest.status).toBe(201);
                pedidoID = pedidoTest.body._id;
                validResponse = await request(app).get(`/pedidos/${pedidoID}`);
            });

            afterAll(async() =>{
                const objectId = new ObjectId(pedidoID);
                const deletedDocument = await client.db('Via-Apilia').collection('Pedidos').findOneAndDelete({_id: objectId});
                expect(deletedDocument).not.toBe(undefined);
            });

            it('should respond with 201 status if pedidoID is valid', () => {
                expect(validResponse.status).toBe(200);
            });

            it('should respond an object having _id, direccion_entrega and repartidor attributes', ()=>{
                expect(validResponse.body).toHaveProperty('_id');
                expect(validResponse.body).toHaveProperty('direccion_entrega');
                expect(validResponse.body).toHaveProperty('repartidor');
            });
        });

        describe('Invalid Requests', () => {
            it('should respond with 404 status if pedidoID isnt valid', async () => {
                const response = await request(app).get('/pedidos/klahjbsd123');
                expect(response.status).toBe(404);
            });
        });
    });

    describe('PedidosPOST',()=>{
        describe('Valid Requests',()=>{
            let validResponse;
            let pedidoID;
            beforeAll(async () => {
                validResponse =  await request(app).post('/pedidos').send(validBodyPedido);
                pedidoID = validResponse.body._id;
            });

            afterAll(async() =>{
                const objectId = new ObjectId(pedidoID);
                const deletedDocument = await client.db('Via-Apilia').collection('Pedidos').findOneAndDelete({_id: objectId});
                expect(deletedDocument).not.toBe(undefined);
            });

            it('should respond with 201 status if request body is valid', () => {
                expect(validResponse.status).toBe(201);
            });

            it('should respond an object containing direccion_entrega, _id and repartidor attributes', () => {
                expect(validResponse.body).toHaveProperty('_id');
                expect(validResponse.body).toHaveProperty('direccion_entrega');
                expect(validResponse.body).toHaveProperty('repartidor');
            });

            it('should be possible doing a GET at repartidores/repartidorID with the returned _id', async () => {
                const response = await request(app).get(`/pedidos/${pedidoID}`);
                expect(response.status).toBe(200);
                expect(response.body).toEqual(validResponse.body); 
            })
        });

        describe('Invalid Requests',()=>{
            it('should return 400 status code if direccion_entrega is missing', async () => {
                const response = await request(app).post('/pedidos').send({});
                expect(response.status).toBe(400);
            });
        });
    });

    describe('PedidosPedidoIDPUT',() => {
        let pedidoTest;
        let pedidoID;
        beforeAll(async () => {
            pedidoTest = await request(app).post('/pedidos').send(validBodyPedido);
            expect(pedidoTest.status).toBe(201);
            pedidoID = pedidoTest.body._id;
        });

        afterAll(async() =>{
            const objectId = new ObjectId(pedidoID);
            const deletedDocument = await client.db('Via-Apilia').collection('Pedidos').findOneAndDelete({_id: objectId});
            expect(deletedDocument).not.toBe(undefined);
        });

        describe('Valid Requests', () => {
            let validResponse;
            beforeAll(async () => {
                validResponse = await request(app).put(`/pedidos/${pedidoID}`).send(validBodyPedido2);
            });

            it('should respond with 200 status if pedidoID and body are valid', () => {
                expect(validResponse.status).toBe(200);
            });

            it('should respond with updated direccion_entrega after doing a GET at repartidores/repartidorID ', async () => {
                const response = await request(app).get(`/pedidos/${pedidoID}`);
                expect(response.body.direccion_entrega).toBe(validBodyPedido2.direccion_entrega);
            });
        });

        describe('Invalid Requests', () => {
            it('should respond with 404 status if pedidoID isnt valid', async () => {
                const response = await request(app).put('/pedidos/g678sdfgasfd').send(validBodyPedido);
                expect(response.status).toBe(404);
            });

            it('should respond with 400 status if request body isnt valid', async () => {
                const response = await request(app).put(`/pedidos/${pedidoID}`).send({});
            });
        });
    });

    describe('PedidosPedidoIDRepartidorDELETE', () => {
        let pedidoTest;
        let pedidoID;
        beforeAll(async () => {
            pedidoTest = await request(app).post('/pedidos').send(validBodyPedido);
            expect(pedidoTest.status).toBe(201);
            pedidoID = pedidoTest.body._id;
        });
        
        afterAll(async() =>{
            const objectId = new ObjectId(pedidoID);
            const deletedDocument = await client.db('Via-Apilia').collection('Pedidos').findOneAndDelete({_id: objectId});
            expect(deletedDocument).not.toBe(undefined);
        });

        describe('Valid Requests', () => {
            let validResponse;
            beforeAll(async () => {
                validResponse = await request(app).delete(`/pedidos/${pedidoID}/repartidor`);
            })

            it('should respond with 204 status if pedidoID is valid', () => {
                expect(validResponse.status).toBe(204);
            });

            it('should respond an object with empty repartidor after doing a GET at repartidores/repartidorID', async () => {
                const response = await request(app).get(`/pedidos/${pedidoID}`);
                expect(response.body.repartidor).toStrictEqual({});
            });
        });

        describe('Invalid Requests', () => {
            it('should respond with 404 status if pedidoID isnt valid', async() => {
                const response = await request(app).delete('/pedidos/8sd7ftasasd/repartidor');
                expect(response.status).toBe(404);
            });
        });
    });

    describe('PedidosPedidoIDRepartidorPUT', () => {
        const bodyValidRepartidor = {
            "nombre": "Juan",
            "apellido": "Lopez",
            "cuil": 20371548962,
            "edad": 30
        };
    
        let pedidoTest;
        let pedidoID;
        let repartidorTest;
        let repartidorID;
        let requestBody;

        beforeAll(async () => {
            pedidoTest = await request(app).post('/pedidos').send(validBodyPedido);
            expect(pedidoTest.status).toBe(201);
            pedidoID = pedidoTest.body._id;

            repartidorTest = await request(app).post('/repartidores').send(bodyValidRepartidor);
            expect(repartidorTest.status).toBe(201);
            repartidorID = repartidorTest.body._id;
            requestBody = { "id_repartidor" : repartidorID}
        });
        
        afterAll(async() =>{
            const objectId = new ObjectId(pedidoID);
            const deletedDocument = await client.db('Via-Apilia').collection('Pedidos').findOneAndDelete({_id: objectId});
            expect(deletedDocument).not.toBe(undefined);

            const objectIdRepartidor = new ObjectId(repartidorID);
            const deletedRepartidor = await client.db('Via-Apilia').collection('Repartidores').findOneAndDelete({_id: objectIdRepartidor});
            expect(deletedRepartidor).not.toBe(undefined);
        });

        describe('Valid Requests', () => {
            let validResponse;

            beforeAll(async () => {
                validResponse = await request(app).put(`/pedidos/${pedidoID}/repartidor`).send(requestBody);
            });

            it('should respond with 200 status if pedidoID and repartidorID in req body are valid', async () => {
                expect(validResponse.status).toBe(200);
            });

            it('should respond an object with repartidor having updated repartidorID after doing a GET at repartidores/repartidorID', async () => {
                const response = await request(app).get(`/pedidos/${pedidoID}`);
                expect(response.body.repartidor._id).toBe(repartidorID);
            });
        });

        describe('Invalid Requests', () => {
            it('should respond with 404 status if pedidoID isnt valid', async () => {
                const response = await request(app).put('/pedidos/asdf876tr/repartidor').send(requestBody);
                expect(response.status).toBe(404);
            });

            it('should respond with 400 status if repartidorID isnt valid', async () => {
                const response = await request(app).put(`/pedidos/${pedidoID}/repartidor`).send({"id_repartidor" : "asdfg7895"});
                expect(response.status).toBe(400);
            });

            it('should respond with 400 status if id_repartidor is missing', async () => {
                const response = await request(app).put(`/pedidos/${pedidoID}/repartidor`).send({});
                expect(response.status).toBe(400);
            });
        });
    });
});