from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

# Llamado a la base para crear tablas
Base = declarative_base()

# DEFINICIÓN DE LAS TABLAS DE MI MODELO

# Tabla Usuario
class Usuario(Base):
    __tablename__ = 'usuarios'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombres = Column(String(50))
    fechaNacimiento = Column(Date)
    ubicacion = Column(String(100))
    metaAhorro = Column(Float)
    contrasena = Column(String(50))

    # Relación con las tablas Gasto, Ingreso y Categoria
    gastos = relationship("Gasto", back_populates="usuario", cascade="all, delete-orphan")
    ingresos = relationship("Ingreso", back_populates="usuario", cascade="all, delete-orphan")
    categorias = relationship("Categoria", back_populates="usuario", cascade="all, delete-orphan")

# Tabla Gasto
class Gasto(Base):
    __tablename__ = 'gastos'
    id = Column(Integer, primary_key=True, autoincrement=True)
    descripcion = Column(String(200))
    categoria = Column(String(50))
    valor = Column(Float)
    fecha = Column(Date)
    id_usuario = Column(Integer, ForeignKey('usuarios.id'))

    # Relación con Usuario
    usuario = relationship("Usuario", back_populates="gastos")

# Tabla Categoria
class Categoria(Base):
    __tablename__ = 'categorias'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(50))
    descripcion = Column(String(200))
    valor = Column(Float)
    fecha = Column(Date)
    id_usuario = Column(Integer, ForeignKey('usuarios.id'))

    # Relación con Usuario
    usuario = relationship("Usuario", back_populates="categorias")

# Tabla Ingreso
class Ingreso(Base):
    __tablename__ = 'ingresos'
    id = Column(Integer, primary_key=True, autoincrement=True)
    descripcion = Column(String(50))
    valor = Column(Float)
    fecha = Column(Date)
    id_usuario = Column(Integer, ForeignKey('usuarios.id'))

    # Relación con Usuario
    usuario = relationship("Usuario", back_populates="ingresos")
