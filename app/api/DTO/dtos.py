from pydantic import BaseModel,Field  #Paquete del api que permite crear un modelo base del DTO
from datetime import date  #Paquete para fechas y horas.

#Los DTO son clases que establecen el modelo de transferencia de datos.

class UsuarioDTOPeticion(BaseModel): #Petición para guardar los datos en la BD
    nombres: str
    fechaNacimiento:str
    ubicacion: str
    metaAhorro: float
    contrasena: str
    class config:
        orm_mode = True

class UsuarioDTORespuesta(BaseModel): #Petición para traer los datos de la BD
    id: int
    nombres: str
    metaAhorro: float
    contrasena: str
    class config:
        orm_mode = True

class GastoDTOPeticion(BaseModel):  # Petición para guardar un gasto en la BD
    descripcion: str
    categoria: str
    valor: float
    fecha: date
    id_usuario: int  # Referencia al ID del usuario
    class Config:
        orm_mode = True

class GastoDTORespuesta(BaseModel):  # Respuesta para traer los datos de un gasto
    id: int
    descripcion: str
    categoria: str
    valor: float
    fecha: date
    id_usuario: int  # Referencia al ID del usuario
    class Config:
        orm_mode = True

class CategoriaDTOPeticion(BaseModel):  # Petición para guardar una categoría en la BD
    nombre: str
    descripcion: str
    valor: float
    fecha: date
    class Config:
        orm_mode = True

class CategoriaDTORespuesta(BaseModel):  # Respuesta para traer los datos de una categoría
    id: int
    nombre: str
    descripcion: str
    valor: float
    fecha: date
    class Config:
        orm_mode = True

class IngresoDTOPeticion(BaseModel):  # Petición para guardar un ingreso en la BD
    descripcion: str
    valor: float
    fecha: date
    class Config:
        orm_mode = True

class IngresoDTORespuesta(BaseModel):  # Respuesta para traer los datos de un ingreso
    id: int
    descripcion: str
    valor: float
    fecha: date
    class Config:
        orm_mode = True
        
