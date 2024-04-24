from pydantic import BaseModel

class Gusto(BaseModel):
    id_gusto:int
    nombre: str

class Pedido(BaseModel):
    id_pedido: int
    direccion_de_envio: str

class MedioDePago(BaseModel):
    medio: str

class Pote(BaseModel):
    id_pote: int
    peso: str
    gustos: list[Gusto]