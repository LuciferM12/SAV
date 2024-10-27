CREATE TABLE IF NOT EXISTS imagenes (
  id SERIAL NOT NULL PRIMARY KEY,
  data BYTEA NOT NULL,
  mimetype VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
  id_us SERIAL NOT NULL PRIMARY KEY,
  fnombre VARCHAR(30) NOT NULL,
  snombre VARCHAR(30),
  apellidop VARCHAR(30) NOT NULL,
  apellidom VARCHAR(30),
  edad SMALLINT,
  telefono VARCHAR(15),
  usuario VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
  id_rol SERIAL NOT NULL PRIMARY KEY,
  descripcion VARCHAR(30) NOT NULL,
  estado BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS productos (
  id_prod SERIAL NOT NULL PRIMARY KEY,
  nomprod VARCHAR(30) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  descripcion VARCHAR(500) NOT NULL,
  id_categoria INTEGER NOT NULL,
  id_imagen INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS productosprincipales (
  id_prin SERIAL NOT NULL PRIMARY KEY,
  id_prod INTEGER NOT NULL,
  estado BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias (
  id_cat SERIAL NOT NULL PRIMARY KEY,
  descripcion VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS negocio (
  id_negocio SERIAL NOT NULL PRIMARY KEY,
  tipo VARCHAR(30) NOT NULL,
  descripcion VARCHAR(500) NOT NULL,
  nosotros VARCHAR(1000) NOT NULL,
  telefono VARCHAR(15) NOT NULL,
  ubicacion VARCHAR(255) NOT NULL,
  paypal VARCHAR(255),
  logo INTEGER NOT NULL,
  imagenP INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS reservas (
  id_reser SERIAL NOT NULL PRIMARY KEY,
  fecha DATE NOT NULL,
  servicio VARCHAR(100),
  id_us INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS ventas (
  id_vent SERIAL NOT NULL PRIMARY KEY,
  id_us INTEGER NOT NULL,
  id_empleado INTEGER NOT NULL,
  fecha DATE NOT NULL,
  total DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS detallexventa (
  id_det SERIAL NOT NULL PRIMARY KEY,
  id_prod INTEGER NOT NULL,
  cant INTEGER NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  id_vent INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS opiniones (
  id_op SERIAL NOT NULL PRIMARY KEY,
  descripcion VARCHAR(255),
  calif SMALLINT NOT NULL,
  id_us INTEGER NOT NULL
);

-- Claves Foráneas y restricciones de integridad referencial
ALTER TABLE ventas ADD CONSTRAINT ventas_id_us_fk FOREIGN KEY (id_us) REFERENCES usuarios (id_us) ON DELETE CASCADE;
ALTER TABLE ventas ADD CONSTRAINT ventas_id_empleado_fk FOREIGN KEY (id_empleado) REFERENCES usuarios (id_us);
ALTER TABLE detallexventa ADD CONSTRAINT detallexventa_id_vent_fk FOREIGN KEY (id_vent) REFERENCES ventas (id_vent);
ALTER TABLE detallexventa ADD CONSTRAINT detallexventa_id_prod_fk FOREIGN KEY (id_prod) REFERENCES productos (id_prod);
ALTER TABLE usuarios ADD CONSTRAINT usuarios_rol_fk FOREIGN KEY (rol) REFERENCES roles (id_rol);
ALTER TABLE reservas ADD CONSTRAINT reservas_id_us_fk FOREIGN KEY (id_us) REFERENCES usuarios (id_us) ON DELETE CASCADE;
ALTER TABLE opiniones ADD CONSTRAINT opiniones_id_us_fk FOREIGN KEY (id_us) REFERENCES usuarios (id_us) ON DELETE CASCADE;
ALTER TABLE productos ADD CONSTRAINT productos_id_categoria_fk FOREIGN KEY (id_categoria) REFERENCES categorias (id_cat);
ALTER TABLE productos ADD CONSTRAINT productos_id_imagen_fk FOREIGN KEY (id_imagen) REFERENCES imagenes (id);
ALTER TABLE negocio ADD CONSTRAINT negocio_logo_fk FOREIGN KEY (logo) REFERENCES imagenes (id);
ALTER TABLE negocio ADD CONSTRAINT negocio_imagenP_fk FOREIGN KEY (imagenP) REFERENCES imagenes (id);
ALTER TABLE productosprincipales ADD CONSTRAINT productosprincipales_id_prod_fk FOREIGN KEY (id_prod) REFERENCES productos (id_prod);
