from pydantic import BaseModel

from Models.Gusto import Gusto

class Pote(BaseModel):
    id_pote: int
    peso: str
    gustos: list[Gusto]