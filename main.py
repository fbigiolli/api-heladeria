from fastapi import FastAPI

app = FastAPI()


@app.get("/gustos")
async def getGustos():
    return {"message": "Hello World"}

@app.post("/pedidos")
async def postPedido():
    pass

@app.get("/pedidos/{idPedido}")
async def getPedidoById(idPedido):
    pass

@app.put("/pedidos/{idPedido}")
async def modificarPedido(idPedido):
    pass

@app.post("/pedidos/{idPedido}/pagar")
async def iniciarProcesoDePagoEnPedido(idPedido):
    pass

@app.get("/pedidos/{idPedido}/intentos-de-pago/{idIntentoDePago}")
async def getDatosDelIntentoDePago(idPedido, idIntentoDePago):
    pass

@app.get("/pedidos/{idPedido}/potes")
async def getPotesDelPedido(idPedido):
    pass

@app.post("/pedidos/{idPedido}/potes")
async def agregarPoteAlPedido(idPedido):
    pass

@app.post("/pedidos/{idPedido}/potes/{idPote}")
async def getUnPoteDelPedido(idPedido, idPote):
    pass

@app.delete("/pedidos/{idPedido}/potes/{idPote}")
async def deleteUnPoteDelPedido(idPedido, idPote):
    pass
