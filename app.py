from fastapi import FastAPI
from Models.Pedido import Pedido
from Models.MedioDePago import MedioDePago
from Models.Pote import Pote

app = FastAPI()


@app.get("/gustos")
async def getGustos(tipoDeGusto: str | None = None):
    return {"message": "Hello World"}

@app.post("/pedidos")
async def postPedido(pedido: Pedido):
    pass

@app.get("/pedidos/{idPedido}")
async def getPedidoById(idPedido):
    pass

@app.put("/pedidos/{idPedido}")
async def modificarPedido(idPedido, pedido: Pedido):
    pass

@app.post("/pedidos/{idPedido}/pagar")
async def iniciarProcesoDePagoEnPedido(idPedido, medioDePago: MedioDePago):
    pass

@app.get("/pedidos/{idPedido}/intentos-de-pago/{idIntentoDePago}")
async def getDatosDelIntentoDePago(idPedido, idIntentoDePago):
    pass

@app.get("/pedidos/{idPedido}/potes")
async def getPotesDelPedido(idPedido):
    pass

@app.post("/pedidos/{idPedido}/potes")
async def agregarPoteAlPedido(idPedido, pote: Pote):
    pass

@app.post("/pedidos/{idPedido}/potes/{idPote}")
async def getUnPoteDelPedido(idPedido, idPote):
    pass

@app.delete("/pedidos/{idPedido}/potes/{idPote}")
async def deleteUnPoteDelPedido(idPedido, idPote):
    pass
