const request = require('supertest');
const app = require('../index.js');
const server = require('../index');

afterAll((done) => {
    server.close(done);
});

describe('Gustos', () => {
    describe('GustosGET', () => {
        let response;
        let responseWithTipoQuery;
        const tipoQuery = 'cremas';
        beforeAll(async () => {
            response = await request(app).get('/gustos');
            responseWithTipoQuery = await request(app).get(`/gustos?tipo=${tipoQuery}`)
        });

        it('should respond with a 200 status', () => {
            expect(response.statusCode).toEqual(200);
        });

        it('should return an array with objects having id, tipo, and nombre attributes', () => {
            // Verifica que el cuerpo de la respuesta sea un array
            expect(Array.isArray(response.body)).toBe(true);
        
            // Verifica que cada objeto en el array tenga los atributos id, tipo y nombre
            response.body.forEach(obj => {
                expect(obj).toHaveProperty('id');
                expect(obj).toHaveProperty('tipo');
                expect(obj).toHaveProperty('nombre');
            });
        });       
        
        it('Request with Tipo query parameter should return an array with objects that match Tipo', ()=>{
            responseWithTipoQuery.body.forEach(obj =>{
                expect(obj.tipo).toEqual('cremas');
            })
        });
    });
    
    describe('GustosGustoIDGET', () =>{
        describe('Valid Requests', () =>{
            let responseValidID;
            beforeAll(async () => {
                responseValidID = await request(app).get('/gustos/cdc');
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
        });

        describe('Invalid Requests', ()=>{
            let responseInvalidID;
            beforeAll(async () => {
                responseInvalidID = await request(app).get('/gustos/khjasd78');
            });
            it('Invalid GustoID should respond with a 404 status', async () => {
                expect(responseInvalidID.statusCode).toEqual(404);
            });
            
            it('Invalid GustoID error message should be: No se conoce un gusto con tal id', async () => {
                expect(responseInvalidID.text).toEqual('No se conoce un gusto con tal id');
            });
            
        });

    })
});
