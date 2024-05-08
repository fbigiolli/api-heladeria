from pydantic import BaseModel

class Pedido(BaseModel):
    id_pedido: int
    direccion_de_envio: str