const request = require('supertest');
const app = require('../index.js'); 
const server = require('../index');

afterAll((done) => {
    server.close(done);
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
                // TODO: DELETE para poder hacer el post
                // await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyValidAuto);
                // await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyValidMoto);
                // await request(app).post(`/repartidores/${idRepartidorTest}/vehiculos`).send(bodyValidBici);

                validResponse = await request(app).get(`/repartidores/${idRepartidorTest}/vehiculos`);
            });

            afterAll(async () => {
                // Obtener todos los vehículos del repartidor
                const response = await request(app).get(`/repartidores/${idRepartidorTest}/vehiculos`);
                const vehiculos = response.body;
            
                // Eliminar cada vehículo
                await Promise.all(vehiculos.map(async vehiculo => {
                    await request(app).delete(`/repartidores/${idRepartidorTest}/vehiculos/${vehiculo._id}`);
                }));
            });

            it('should respond with 200 status if repartidorID is valid', ()=>{
                expect(validResponse.status).toBe(200);
            });

            it('should return an array with objects having _id, tipoDeVehiculo, and patente or rodado', ()=>{
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
});