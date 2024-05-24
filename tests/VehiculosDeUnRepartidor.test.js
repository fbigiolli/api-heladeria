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

describe('VehiculosDeUnRepartidor', ()=>{
    const bodyValidRepartidor = {
        "nombre": "Juan",
        "apellido": "Lopez",
        "cuil": 20371548962,
        "edad": 30
    };

    const bodyValidAuto = {
        "tipoDeVehiculo":"Auto",
        "patente":"FG266BD"
    };

    const bodyValidMoto = {
        "tipoDeVehiculo":"Moto",
        "patente":"FG266BG"
    };

    const bodyValidBici = {
        "tipoDeVehiculo":"Bicicleta",
        "rodado": 28
    };

    const bodyWithoutTipoDeVehiculo = {
        "patente":"FG266BG"
    };

    const bodyAutoWithoutPatente = {
        "tipoDeVehiculo":"Auto"
    };

    const bodyMotoWithoutPatente = {
        "tipoDeVehiculo":"Moto"
    };

    const bodyBiciWithoutRodado = {
        "tipoDeVehiculo":"Bicicleta"
    };

    const bodyAutoWithInvalidPatente = {
        "tipoDeVehiculo":"Auto",
        "patente":"FG266BAD"
    };

    const bodyBiciWithInvalidRodado = {
        "tipoDeVehiculo":"Bicicleta",
        "rodado":"40"
    };

    const bodyAutoTestDuplicatedPatente = {
        "tipoDeVehiculo":"Auto",
        "patente":"KO266BG"
    };

    const bodyAutoWithDuplicatedPatente = {
        "tipoDeVehiculo":"Auto",
        "patente":"KO266BG"
    };


    let idRepartidorTest;
    beforeAll(async()=>{
        const response = await request(app).post('/repartidores').send(bodyValidRepartidor);
        expect(response.status).toBe(201);
        idRepartidorTest = response.body._id;
    });

    afterAll(async()=>{
        const deleteResponse = await request(app).delete(`/repartidores/${idRepartidorTest}`);
        expect(deleteResponse.status).toBe(204);
    });

    describe('RepartidoresRepartidorIDVehiculosGET', ()=>{
        describe('Valid Requests', ()=>{
            let validResponse;
            beforeAll(async()=>{
                await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyValidAuto);
                await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyValidMoto);
                await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyValidBici);

                validResponse = await request(app).get(`/repartidores/${idRepartidorTest}/vehiculos`);
            });

            afterAll(async () => {
                // Obtener todos los vehículos del repartidor
                const response = await request(app).get(`/repartidores/${idRepartidorTest}/vehiculos`);
                const vehiculos = response.body;
            
                // Eliminar cada vehículo
                const deletePromises = vehiculos.map(async (vehiculo) => {
                    const vehiculoID = vehiculo._id;
                    const objectId = new ObjectId(vehiculoID);
                    const deletedDocument = await client.db('Via-Apilia').collection('VehiculosRepartidores').findOneAndDelete({_id: objectId});
                    expect(deletedDocument).not.toBe(undefined);
                });
                
                await Promise.all(deletePromises);
            });

            it('should respond with 200 status if repartidorID is valid', ()=>{
                expect(validResponse.status).toBe(200);
            });

            it('should return an array with objects having _id, tipoDeVehiculo, and patente or rodado depending on tipoDeVehiculo', ()=>{
                validResponse.body.forEach(vehiculo => {
                    expect(vehiculo).toHaveProperty('_id');
                    expect(vehiculo).toHaveProperty('tipoDeVehiculo');

                    if (vehiculo.tipoDeVehiculo === "Auto" || vehiculo.tipoDeVehiculo === "Moto") {
                        expect(vehiculo).toHaveProperty('patente');
                    }else{
                        expect(vehiculo).toHaveProperty('rodado');
                    }
                });
            });

        });
        
        describe('Invalid Requests', ()=>{
            it('should respond with 404 status if repartidorID isnt valid', async ()=>{
                const response = await request(app).get('/repartidores/asd896712/vehiculos');
                expect(response.status).toBe(404);
            });
        });
    });

    describe('RepartidoresRepartidorIDVehiculosPOST', () => {
        describe('Valid Requests', () => {
            let validResponse;
            beforeAll(async() => {
                validResponse = await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyValidAuto);
            });

            afterAll(async () => {
                const vehiculoID = validResponse.body._id;
                const objectId = new ObjectId(vehiculoID);
                const deletedDocument = await client.db('Via-Apilia').collection('VehiculosRepartidores').findOneAndDelete({_id: objectId});
                expect(deletedDocument).not.toBe(undefined);
            });

            it('should respond with 201 status code if request body and repartidorID are valid', () => {
                expect(validResponse.status).toBe(201);
            });

            it('should respond an array including created Vehiculo after doing a GET at repartidores/repartidorID/vehiculos', async () => {
                const response = await request(app).get(`/repartidores/${idRepartidorTest}/vehiculos`);
                expect(response.body).toContainEqual(validResponse.body);
            });
        });

        describe('Invalid Requests', () => {
            it('should respond with 404 status if repartidorID isnt valid', async () => {
                const response = await request(app).post('/repartidores/df8a97sd/vehiculos').send(bodyValidAuto);
                expect(response.status).toBe(404);
            });

            it('should respond with 400 status if tipoDeVehiculo is missing', async () => {
                const response = await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyWithoutTipoDeVehiculo);
                expect(response.status).toBe(400); 
            });

            it('should respond with 400 status if tipoDeVehiculo is Auto and patente is missing', async () => {
                const response = await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyAutoWithoutPatente);
                expect(response.status).toBe(400); 
            });

            it('should respond with 400 status if tipoDeVehiculo is Moto and patente is missing', async () => {
                const response = await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyMotoWithoutPatente);
                expect(response.status).toBe(400); 
            });

            it('should respond with 400 status if tipoDeVehiculo is Bici and rodado is missing', async () => {
                const response = await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyBiciWithoutRodado);
                expect(response.status).toBe(400); 
            });

            it('should respond with 400 status if tipoDeVehiculo is Auto or Moto and patente isnt valid', async () => {
                const response = await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyAutoWithInvalidPatente);
                expect(response.status).toBe(400); 
            });

            it('should respond with 400 status if tipoDeVehiculo is Bicicleta and rodado isnt valid', async () => {
                const response = await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyBiciWithInvalidRodado);
                expect(response.status).toBe(400); 
            });
        });
    });

    describe('RepartidoresRepartidorIDVehiculosPUT', () => {
        let idVehiculoTest;
        beforeAll(async () => {
            const response = await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyValidAuto);
            idVehiculoTest = response.body._id;
        });

        afterAll(async () => {
            const vehiculoID = idVehiculoTest;
            const objectId = new ObjectId(vehiculoID);
            const deletedDocument = await client.db('Via-Apilia').collection('VehiculosRepartidores').findOneAndDelete({_id: objectId});
            expect(deletedDocument).not.toBe(undefined);
        });

        describe('Valid Requests', () => {
            let validResponse
            beforeAll(async () => {
                validResponse = await request(app).put(`/repartidores/${idRepartidorTest}/vehiculos/${idVehiculoTest}`).send(bodyValidMoto);
            });

            it('should respond with 201 status if repartidorID, vehiculoID, and request body are valid', () => {
                expect(validResponse.status).toBe(201); 
            });

            it('should respond an array including updated Vehiculo after doing a GET at repartidores/repartidorID/vehiculos', async () => {
                const response = await request(app).get(`/repartidores/${idRepartidorTest}/vehiculos`);
                expect(response.body).toContainEqual(validResponse.body);
            });
        });

        describe('Invalid Requests', () => {
            let idVehiculoTestPatenteDuplicada; 
            beforeAll(async () => {
                const response = await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyAutoTestDuplicatedPatente);
                idVehiculoTestPatenteDuplicada = response.body._id;
            });
    
            afterAll(async () => {
                const vehiculoID = idVehiculoTestPatenteDuplicada;
                const objectId = new ObjectId(vehiculoID);
                const deletedDocument = await client.db('Via-Apilia').collection('VehiculosRepartidores').findOneAndDelete({_id: objectId});
                expect(deletedDocument).not.toBe(undefined);
            });

            it('should respond with 404 status if repartidorID isnt valid', async () => {
                const response = await request(app).put(`/repartidores/df8a97sd/vehiculos/${idVehiculoTest}`).send(bodyValidAuto);
                expect(response.status).toBe(404);
            });

            it('should respond with 404 status if repartidorID isnt valid', async () => {
                const response = await request(app).put(`/repartidores/${idRepartidorTest}/vehiculos/908sadf890`).send(bodyValidAuto);
                expect(response.status).toBe(404);
            });

            it('should respond with 400 status if tipoDeVehiculo is missing', async () => {
                const response = await request(app).put(`/repartidores/${idRepartidorTest}/vehiculos/${idVehiculoTest}`).send(bodyWithoutTipoDeVehiculo);
                expect(response.status).toBe(400); 
            });

            it('should respond with 400 status if tipoDeVehiculo is Auto and patente is missing', async () => {
                const response = await request(app).put(`/repartidores/${idRepartidorTest}/vehiculos/${idVehiculoTest}`).send(bodyAutoWithoutPatente);
                expect(response.status).toBe(400); 
            });

            it('should respond with 400 status if tipoDeVehiculo is Moto and patente is missing', async () => {
                const response = await request(app).put(`/repartidores/${idRepartidorTest}/vehiculos/${idVehiculoTest}`).send(bodyMotoWithoutPatente);
                expect(response.status).toBe(400); 
            });

            it('should respond with 400 status if tipoDeVehiculo is Bici and rodado is missing', async () => {
                const response = await request(app).put(`/repartidores/${idRepartidorTest}/vehiculos/${idVehiculoTest}`).send(bodyBiciWithoutRodado);
                expect(response.status).toBe(400); 
            });

            it('should respond with 400 status if tipoDeVehiculo is Auto or Moto and patente isnt valid', async () => {
                const response = await request(app).put(`/repartidores/${idRepartidorTest}/vehiculos/${idVehiculoTest}`).send(bodyAutoWithInvalidPatente);
                expect(response.status).toBe(400); 
            });

            it('should respond with 400 status if tipoDeVehiculo is Bicicleta and rodado isnt valid', async () => {
                const response = await request(app).put(`/repartidores/${idRepartidorTest}/vehiculos/${idVehiculoTest}`).send(bodyBiciWithInvalidRodado);
                expect(response.status).toBe(400); 
            });

            it('should respond with 400 status if tipoDeVehiculo is Auto or Moto and patente is already registered', async () => {
                const response = await request(app).put(`/repartidores/${idRepartidorTest}/vehiculos/${idVehiculoTest}`).send(bodyAutoWithDuplicatedPatente);
                expect(response.status).toBe(400); 
            });
        });
    });
});