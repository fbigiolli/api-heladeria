const request = require('supertest');
const app = require('../index.js'); 
const server = require('../index');
const { client, dbConnection, dbDisconnect } = require('../db/dbConnection.js');
const { ObjectId } = require('mongodb');


beforeAll(async () => {
   await dbConnection(); 
});

afterAll(async () => {
    await server.close();
    await dbDisconnect();
});

describe('Pago', () => {
    const validBodyPedido = {
        "direccion_entrega": "string"
    };

    const validBodyPago = {"tipoDePago":"DatosDePagoTarjeta",
        "numerosTarjeta":"1234567812345678",
        "vencimientoTarjetaMes": 4,
        "vencimientoTarjetaAnio": 2026,
    };

    const validBodyPagoBilleteraVirtual = {
    "tipoDePago":"DatosDePagoBilleteraVirtual",
    "alias":"1234567812345678"
    };

    const invalidNumerosTarjetaPago = {"tipoDePago":"DatosDePagoTarjeta",
        "numerosTarjeta":"12345678145678",
        "vencimientoTarjetaMes": 4,
        "vencimientoTarjetaAnio": 2026,
    };

    const expiredTarjetaPago = {"tipoDePago":"DatosDePagoTarjeta",
    "numerosTarjeta":"12345678145678",
    "vencimientoTarjetaMes": 4,
    "vencimientoTarjetaAnio": 2020,
    };

    const mesOutOfRangeTarjetaPago = {"tipoDePago":"DatosDePagoTarjeta",
    "numerosTarjeta":"12345678145678",
    "vencimientoTarjetaMes": 4,
    "vencimientoTarjetaAnio": 2020,
    };

    
    let pedidoTest;
    let pedidoID;
    let pedido2ID;
    beforeAll(async () => {
        pedidoTest = await request(app).post('/pedidos').send(validBodyPedido);
        expect(pedidoTest.status).toBe(201);
        pedidoID = pedidoTest.body._id;

        pedido2Test = await request(app).post('/pedidos').send(validBodyPedido);
        expect(pedido2Test.status).toBe(201);
        pedido2ID = pedido2Test.body._id;
    });

    afterAll(async() =>{
        const objectId = new ObjectId(pedidoID);
        const deletedDocument = await client.db('Via-Apilia').collection('Pedidos').findOneAndDelete({_id: objectId});
        expect(deletedDocument).not.toBe(undefined);

        const objectId2 = new ObjectId(pedido2ID);
        const deletedDocument2 = await client.db('Via-Apilia').collection('Pedidos').findOneAndDelete({_id: objectId2});
        expect(deletedDocument2).not.toBe(undefined);
    });

    describe('PedidosPedidoIDPagoGET', () => {
        describe('Valid Requests', () => {
            describe('Pendiente de pago', () => {
                it('should respond with 200 status if pedidoID is valid', async () => {
                    const response = await request(app).get(`/pedidos/${pedidoID}/pago`);
                    expect(response.status).toBe(200);
                });
    
                it('should return a body containing status : pendiente de pago', async () => {
                    const response = await request(app).get(`/pedidos/${pedidoID}/pago`);
                    expect(response.body).toHaveProperty('status');
                    expect(response.body.status).toBe("pendiente de pago");
                });
            });

            describe('Pago en proceso', () => {
                let pagoTest;
                beforeAll(async () => {
                    pagoTest = await request(app).post(`/pedidos/${pedidoID}/pagar`).send(validBodyPago);
                    expect(pagoTest.status).toBe(202);
                });
        
                afterAll(async() =>{
                    const deletedDocument = await client.db('Via-Apilia').collection('Pagos').findOneAndDelete({idPedidoAsociado: pedidoID});
                    expect(deletedDocument).not.toBe(undefined);
                });

                it('should return a body containing status : pago en proceso',async () => {
                    const response = await request(app).get(`/pedidos/${pedidoID}/pago`);
                    expect(response.body).toHaveProperty('status');
                    expect(response.body.status).toBe("pago en proceso");
                });
            });
        });

        describe('Invalid Requests', () => {
            it('should respond with 404 status if pedidoID isnt valid', async () => {
                const response = await request(app).get('/pedidos/987f6dsa/pago');
                expect(response.status).toBe(404);
            });
        });
    });

    describe('PedidosPedidoIDPost', () => {
        describe('Valid Requests', () => {
            let validRequestTarjeta;
            let validRequestAlias;
            beforeAll(async () => {
                validRequestTarjeta = await request(app).post(`/pedidos/${pedidoID}/pagar`).send(validBodyPago);
                validRequestAlias = await request(app).post(`/pedidos/${pedido2ID}/pagar`).send(validBodyPagoBilleteraVirtual);
            });

            afterAll(async () => {
                const deletedDocument = await client.db('Via-Apilia').collection('Pagos').findOneAndDelete({idPedidoAsociado: pedidoID});
                expect(deletedDocument).not.toBe(undefined);
                const deletedDocumentBilleteraVirtual = await client.db('Via-Apilia').collection('Pagos').findOneAndDelete({idPedidoAsociado: pedidoID});
                expect(deletedDocumentBilleteraVirtual).not.toBe(undefined);
            });

            it('should respond with 202 status if pedidoID and request body for tarjeta are valid', async () => {
                expect(validRequestTarjeta.status).toBe(202);
            });

            it('should respond with 202 status if pedidoID and request body for billetera virtual are valid', async () => {
                expect(validRequestAlias.status).toBe(202);
            });

            it('should respond with status : pago en proceso after doing a GET at pedidos/pedidoID/pago', async () => {
                const response = await request(app).get(`/pedidos/${pedidoID}/pago`);
                expect(response.body.status).toBe("pago en proceso");
            });
        });

        describe('Invalid Requests', () => {
            it('should respond with 404 status if pedidoID isnt valid', async () => {
                const response = await request(app).post(`/pedidos/98s67adf/pagar`).send(validBodyPago);
                expect(response.status).toBe(404);
            });

            it('should respond with 400 status if numeroDeTarjeta isnt valid', async () => {
                const response = await request(app).post(`/pedidos/${pedidoID}/pagar`).send(invalidNumerosTarjetaPago);
                expect(response.status).toBe(400);
            });

            it('should respond with 400 status if tarjeta is expired', async () => {
                const response = await request(app).post(`/pedidos/${pedidoID}/pagar`).send(expiredTarjetaPago);
                expect(response.status).toBe(400);
            });

            it('should respond with 400 status if tarjeta is expired', async () => {
                const response = await request(app).post(`/pedidos/${pedidoID}/pagar`).send(mesOutOfRangeTarjetaPago);
                expect(response.status).toBe(400);
            });
        });
    });
});