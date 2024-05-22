const request = require('supertest');
const app = require('../index.js'); 
const server = require('../index');

afterAll((done) => {
    server.close(done);
});

describe('Potes', ()=>{

    // REEMPLAZAR CON UN BEFOREALL Y AFTERALL UNA VEZ HAYA SIDO TESTEADO PEDIDOSERVICE
    const idPedidoTest = "664d2406a3fc88a31bd5ea63";
    const validPeso500Pote = {
        "peso": "500",
        "gustos": [
          "cdc"
        ]
      };

    const poteWithPeso1000And4ValidGusto ={
        "peso": "1000",
        "gustos": [
            "cdc",
            "ddl",
            "cam",
            "mar"
        ]
    }

    const poteWithPeso1000And5ValidGusto ={
        "peso": "1000",
        "gustos": [
            "cdc",
            "ddl",
            "cam",
            "mar",
            "ml"
        ]
    }

    const poteWithUnavailableGusto = {
    "peso": "500",
    "gustos": [
        "cdc",
        "fiatuno"
    ]
    };

    const poteWithPeso500And4ValidGusto ={
        "peso": "500",
        "gustos": [
            "cdc",
            "ddl",
            "cam",
            "mar"
        ]
    }


    const poteWithRepeatedGusto = {
        "peso": "500",
        "gustos": [
            "cdc",
            "cdc"
        ]
    };

    const poteWithoutGustos = {
        "peso": "500",
        "gustos": []
    }

    describe('PedidosPedidoIDPotesGET', ()=>{
        let idPoteTest;

        beforeAll(async()=>{
            const potePOSTRequest = await request(app).post(`/pedidos/${idPedidoTest}/potes`).send(validPeso500Pote);
            expect(potePOSTRequest.status).toBe(201);
            idPoteTest = potePOSTRequest.body._id;
        });

        afterAll(async () =>{
            const poteDELETERequest = await request(app).delete(`/pedidos/${idPedidoTest}/potes/${idPoteTest}`)
            expect(poteDELETERequest.status).toBe(204);
        });

        describe('Valid Requests', ()=>{
            let responseValidID;
            beforeAll(async () => {
                responseValidID = await request(app).get(`/pedidos/${idPedidoTest}/potes`);
            });
            
            it('should respond with 200 status', ()=>{
                expect(responseValidID.status).toBe(200);
            });

            it('should return an array with objects having _id, peso and array of gustos', ()=>{
                expect(Array.isArray(responseValidID.body)).toBe(true);
                responseValidID.body.forEach(obj =>{
                    expect(obj).toHaveProperty('_id');
                    expect(obj).toHaveProperty('peso');
                    expect(obj).toHaveProperty('gustos');
                    expect(Array.isArray(obj.gustos)).toBe(true)
                })
            });

        });

        describe('Invalid Requests', ()=>{
            let responseInvalidID;
            beforeAll(async () => {
                responseInvalidID = await request(app).get('/pedidos/kjshad789123/potes');
            });

            it('should respond with 404 status if PedidoID isnt valid', ()=>{
                expect(responseInvalidID.status).toBe(404);
            });

            it('Invalid PedidoID error message should be: No se conoce un pedido con tal id.', ()=>{
                expect(responseInvalidID.text).toBe('No se conoce un pedido con tal id.')
            });

        });
    });

    describe('PedidosPedidoIDPotesPoteIDDELETE', ()=>{
        let idPotePeso500Test;
        let potePeso500DELETERequest;
        let potePeso500ResponseBody;
        beforeAll(async()=>{
            validPotePeso500POST = await request(app).post(`/pedidos/${idPedidoTest}/potes`).send(validPeso500Pote);
            idPotePeso500Test = validPotePeso500POST.body._id;
            potePeso500ResponseBody = validPotePeso500POST.body;
            potePeso500DELETERequest = await request(app).delete(`/pedidos/${idPedidoTest}/potes/${idPotePeso500Test}`);
        });
        
        describe('Valid Requests', ()=>{
            let deletedPoteGETRequest;
            beforeAll(async()=>{
                deletedPoteGETRequest = await request(app).get(`/pedidos/${idPedidoTest}/potes/`);
            });

            it('should respond with 201 status if request body is valid', ()=>{
                expect(potePeso500DELETERequest.status).toBe(204);
            });

            it('should respond an array without the deleted Pote after doing GET at pedidosPedidoIDPotes', ()=>{
                const existingPote = deletedPoteGETRequest.body.includes(potePeso500ResponseBody);
                expect(existingPote).toBe(false);
            });
        });

        describe('Invalid Requests', ()=>{
            it('should respond with 404 if RepartidorID isnt valid', async ()=>{
                const response = await request(app).delete(`/pedidos/8a7s6dmnb/potes/${idPotePeso500Test}`);
                expect(response.status).toBe(404);
            });

            it('should respond with 404 if PoteID isnt valid', async ()=>{
                const response = await request(app).delete(`/pedidos/${idPedidoTest}/potes/kjhasdt67812`);
                expect(response.status).toBe(404);
            });
        });
    });

    describe('PedidosPedidoIDPotesPOST', ()=>{
        
        describe('Valid Requests', ()=>{
            let idPotePeso500Test;
            let validPotePeso500POST;
            let idPotePeso1000Test;
            let validPotePeso1000POST;
            
            beforeAll(async()=>{
                validPotePeso500POST = await request(app).post(`/pedidos/${idPedidoTest}/potes`).send(validPeso500Pote);
                idPotePeso500Test = validPotePeso500POST.body._id;

                validPotePeso1000POST = await request(app).post(`/pedidos/${idPedidoTest}/potes`).send(poteWithPeso1000And4ValidGusto);
                idPotePeso1000Test = validPotePeso1000POST.body._id;
            });
    
            afterAll(async () =>{
                const potePeso500DELETERequest = await request(app).delete(`/pedidos/${idPedidoTest}/potes/${idPotePeso500Test}`)
                expect(potePeso500DELETERequest.status).toBe(204);

                const potePeso1000DELETERequest = await request(app).delete(`/pedidos/${idPedidoTest}/potes/${idPotePeso1000Test}`)
                expect(potePeso1000DELETERequest.status).toBe(204);
            });

            it('should respond with 201 status if pote with peso 500 has between 1 and 3 available Gusto', ()=>{
                expect(validPotePeso500POST.status).toBe(201);
            });

            it('should respond with 201 status if pote with peso 1000 has between 1 and 4 available Gusto', ()=>{
                expect(validPotePeso1000POST.status).toBe(201);
            });

            it('should have _id attribute in response body', ()=>{
                expect(validPotePeso500POST.body).toHaveProperty('_id');
            });
        });

        describe('Invalid Requests', ()=>{
            const testMissingField = async (field) => {
                const { [field]: _, ...bodySinCampo } = validPeso500Pote;
                const response = await request(app).post(`/pedidos/${idPedidoTest}/potes`).send(bodySinCampo);
                expect(response.status).toBe(400);
            };
            
            it('should respond with 400 status if peso is missing', async()=>{
                await testMissingField('peso');
            });

            it('should respond with 400 status if gustos is missing', async()=>{
                await testMissingField('gustos');
            });

            it('should respond with 400 if gusto isnt available', async()=>{
                const response = await request(app).post(`/pedidos/${idPedidoTest}/potes`).send(poteWithUnavailableGusto);
                expect(response.status).toBe(400);
            });

            it('should respond with 400 if peso is 250 or 500 and it has more than 3 Gusto', async ()=>{
                const response = await request(app).post(`/pedidos/${idPedidoTest}/potes`).send(poteWithPeso500And4ValidGusto);
                expect(response.status).toBe(400);
            });

            it('should respond with 400 if peso is 1000 and it has more than 4 Gusto', async ()=>{
                const response = await request(app).post(`/pedidos/${idPedidoTest}/potes`).send(poteWithPeso1000And5ValidGusto);
                expect(response.status).toBe(400);
            });

            it('should respond with 400 if request body has repeated Gusto', async ()=>{
                const response = await request(app).post(`/pedidos/${idPedidoTest}/potes`).send(poteWithRepeatedGusto);
                expect(response.status).toBe(400);
            });

            it('should respond with 400 if request body gustos array is empty', async ()=>{
                const response = await request(app).post(`/pedidos/${idPedidoTest}/potes`).send(poteWithoutGustos);
                expect(response.status).toBe(400);
            });

            it('should respond with 404 if pedidoID isnt valid', async ()=>{
                const response = await request(app).post('/pedidos/kjhasdkghj12/potes').send(poteWithPeso1000And4ValidGusto);
                expect(response.status).toBe(404);
            });

        });
    });
});
