from fastapi import APIRouter, HTTPException #Librería para los servicios que necesito en la base de datos (Actualizar, Guardar, etc)
from sqlalchemy.orm import Session #Comunicación con la base de datos.
from typing import List
from fastapi.params import Depends #Utilizar dependencias del api para comunicación interna.
from app.api.DTO.dtos import UsuarioDTOPeticion, UsuarioDTORespuesta
from app.api.models.tablasSQL import Usuario
from app.api.DTO.dtos import GastoDTOPeticion, GastoDTORespuesta  # Asegúrate de definir estos DTOs
from app.api.models.tablasSQL import Gasto
from app.api.DTO.dtos import CategoriaDTOPeticion, CategoriaDTORespuesta  # Asegúrate de definir estos DTOs
from app.api.models.tablasSQL import Categoria
from app.api.DTO.dtos import IngresoDTOPeticion, IngresoDTORespuesta  # Asegúrate de definir estos DTOs
from app.api.models.tablasSQL import Ingreso
from app.database.configuration import SessionLocal,engine


rutas = APIRouter()

def conectarConBD():
    try:
        basedatos = SessionLocal()
        yield basedatos #Activar la base de datos
           
    except Exception as error:
        basedatos.rollback()
        raise error
    finally:
        basedatos.close()


#CONSTRUYEBDO NUESTROS SERVICIOS

#Cada servicio (operacion o transaccion en BD) debe programarse como una funcion
@rutas.post("/usuario", response_model=UsuarioDTORespuesta, summary="Registrar un usuario en la base de datos")
def guardarUsuario(datosUsuario:UsuarioDTOPeticion, database:Session=Depends(conectarConBD)):
    try:
        usuario=Usuario(
            nombres=datosUsuario.nombres,
            fechaNacimiento=datosUsuario.fechaNacimiento,
            ubicacion=datosUsuario.ubicacion,
            metaAhorro=datosUsuario.metaAhorro,
            contrasena=datosUsuario.contrasena
        )
        #ordenandole a la base de datos
        database.add(usuario)
        database.commit()
        database.refresh(usuario)
        return usuario
    except Exception as error:
        database.rollback()
        raise HTTPException(status_code=400, detail=f"Tenemos un problema {error}")


@rutas.get("/usuario", response_model=List[UsuarioDTORespuesta], summary="Buscar todos los usuarios en BD")
def buscarUsuarios(database:Session=Depends(conectarConBD)):
    try:
        usuarios=database.query(Usuario).all()
        return usuarios
    except Exception as error:
        database.rollback()
        raise HTTPException(status_code=400, detail=f"No se puede buscar los usuarios {error}")


# Endpoint para guardar un gasto
@rutas.post("/gasto", response_model=GastoDTORespuesta, summary="Registrar un gasto en la base de datos")
def guardarGasto(datosGasto: GastoDTOPeticion, database: Session = Depends(conectarConBD)):
    try:
        gasto = Gasto(
            descripcion=datosGasto.descripcion,
            categoria=datosGasto.categoria,
            valor=datosGasto.valor,
            fecha=datosGasto.fecha,
            id_usuario=datosGasto.id_usuario
        )
        database.add(gasto)
        database.commit()
        database.refresh(gasto)
        return gasto
    except Exception as error:
        database.rollback()
        raise HTTPException(status_code=400, detail=f"Tenemos un problema {error}")

# Endpoint para buscar todos los gastos
@rutas.get("/gasto", response_model=List[GastoDTORespuesta], summary="Buscar todos los gastos en BD")
def buscarGastos(database: Session = Depends(conectarConBD)):
    try:
        gastos = database.query(Gasto).all()
        return gastos
    except Exception as error:
        database.rollback()
        raise HTTPException(status_code=400, detail=f"No se puede buscar los gastos {error}")
    
# Endpoint para guardar una categoría
@rutas.post("/categoria", response_model=CategoriaDTORespuesta, summary="Registrar una categoría en la base de datos")
def guardarCategoria(datosCategoria: CategoriaDTOPeticion, database: Session = Depends(conectarConBD)):
    try:
        categoria = Categoria(
            nombre=datosCategoria.nombre,
            descripcion=datosCategoria.descripcion,
            valor=datosCategoria.valor,
            fecha=datosCategoria.fecha
        )
        database.add(categoria)
        database.commit()
        database.refresh(categoria)
        return categoria
    except Exception as error:
        database.rollback()
        raise HTTPException(status_code=400, detail=f"Tenemos un problema {error}")

# Endpoint para buscar todas las categorías
@rutas.get("/categoria", response_model=List[CategoriaDTORespuesta], summary="Buscar todas las categorías en BD")
def buscarCategorias(database: Session = Depends(conectarConBD)):
    try:
        categorias = database.query(Categoria).all()
        return categorias
    except Exception as error:
        database.rollback()
        raise HTTPException(status_code=400, detail=f"No se puede buscar las categorías {error}")
    

# Endpoint para guardar un ingreso
@rutas.post("/ingreso", response_model=IngresoDTORespuesta, summary="Registrar un ingreso en la base de datos")
def guardarIngreso(datosIngreso: IngresoDTOPeticion, database: Session = Depends(conectarConBD)):
    try:
        ingreso = Ingreso(
            descripcion=datosIngreso.descripcion,
            valor=datosIngreso.valor,
            fecha=datosIngreso.fecha
        )
        database.add(ingreso)
        database.commit()
        database.refresh(ingreso)
        return ingreso
    except Exception as error:
        database.rollback()
        raise HTTPException(status_code=400, detail=f"Tenemos un problema {error}")

# Endpoint para buscar todos los ingresos
@rutas.get("/ingreso", response_model=List[IngresoDTORespuesta], summary="Buscar todos los ingresos en BD")
def buscarIngresos(database: Session = Depends(conectarConBD)):
    try:
        ingresos = database.query(Ingreso).all()
        return ingresos
    except Exception as error:
        database.rollback()
        raise HTTPException(status_code=400, detail=f"No se puede buscar los ingresos {error}")
    
