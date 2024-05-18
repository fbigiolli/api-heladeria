const request = require('supertest');
const app = require('../index.js'); // Asegúrate de que la ruta al archivo principal de tu app es correcta
const server = require('../index');

afterAll((done) => {
    server.close(done);
});

describe('Gustos', () => {

    describe('GustosGET', () => {
        let response;
        beforeAll(async () => {
            response = await request(app).get('/gustos');
        });

        it('should respond with a 200 status', () => {
            expect(response.statusCode).toEqual(200);
        });

        it('Response Body returns an array with objects having id, tipo, and nombre attributes', () => {
            // Verifica que el cuerpo de la respuesta sea un array
            expect(Array.isArray(response.body)).toBe(true);
        
            // Verifica que cada objeto en el array tenga los atributos id, tipo y nombre
            response.body.forEach(obj => {
                expect(obj).toHaveProperty('id');
                expect(obj).toHaveProperty('tipo');
                expect(obj).toHaveProperty('nombre');
            });
        });        
    });
    
    describe('GustosGustoIDGET', () =>{
        let responseValidID;
        let responseInvalidID;
        beforeAll(async () => {
            responseValidID = await request(app).get('/gustos/cdc');
            responseInvalidID = await request(app).get('/gustos/khjasd78');
        });

        it('should respond with a 200 status', () => {
            expect(responseValidID.statusCode).toEqual(200);
        });

        it('Existing GustoID returns Response Body with object that represents crema del cielo', async () => {
            expect(responseValidID.body).toEqual({
                id: 'cdc',
                tipo: 'cremas',
                nombre: 'crema del cielo'
            });
        });

        it('Invalid GustoID should respond with a 404 status', async () => {
            expect(responseInvalidID.statusCode).toEqual(404);
        });

        
        it('Invalid GustoID error message should be: No se conoce un gusto con tal id', async () => {
            expect(responseInvalidID.text).toEqual('No se conoce un gusto con tal id');
        });
        
    })
});
