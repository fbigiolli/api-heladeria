from pydantic import BaseModel

class Gusto(BaseModel):
    id_gusto:int
    nombre: str