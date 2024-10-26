CREATE SEQUENCE IF NOT EXISTS imagenes_id_seq;
CREATE SEQUENCE IF NOT EXISTS usuarios_id_us_seq;
CREATE SEQUENCE IF NOT EXISTS roles_id_rol_seq;
CREATE SEQUENCE IF NOT EXISTS productos_id_prod_seq;
CREATE SEQUENCE IF NOT EXISTS categorias_id_cat_seq;
CREATE SEQUENCE IF NOT EXISTS negocio_id_negocio_seq;
CREATE SEQUENCE IF NOT EXISTS reservas_id_reser_seq;
CREATE SEQUENCE IF NOT EXISTS ventas_id_vent_seq;
CREATE SEQUENCE IF NOT EXISTS detallexventa_id_det_seq;

CREATE TABLE IF NOT EXISTS imagenes (
  id integer NOT NULL PRIMARY KEY DEFAULT nextval('imagenes_id_seq'),
  data bytea NOT NULL,
  mimetype varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
  id_us integer NOT NULL PRIMARY KEY DEFAULT nextval('usuarios_id_us_seq'),
  fnombre varchar NOT NULL,
  snombre varchar NOT NULL,
  apellidop varchar NOT NULL,
  edad smallint,
  telefono varchar,
  usuario varchar NOT NULL,
  password varchar NOT NULL,
  rol integer NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
  id_rol integer NOT NULL PRIMARY KEY DEFAULT nextval('roles_id_rol_seq'),
  descripcion varchar NOT NULL,
  estado boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS productos (
  id_prod integer NOT NULL PRIMARY KEY DEFAULT nextval('productos_id_prod_seq'),
  nomprod varchar NOT NULL,
  precio double precision NOT NULL,
  descripcion varchar NOT NULL,
  id_categoria integer NOT NULL,
  id_imagen integer NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias (
  id_cat integer NOT NULL PRIMARY KEY DEFAULT nextval('categorias_id_cat_seq'),
  descripcion varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS negocio (
  id_negocio serial NOT NULL PRIMARY KEY,
  tipo varchar NOT NULL,
  descripcion varchar NOT NULL,
  nosotros varchar NOT NULL,
  telefono varchar NOT NULL,
  ubicacion varchar NOT NULL,
  paypal varchar,
  logo integer NOT NULL,
  imagenP integer NOT NULL
);

CREATE TABLE IF NOT EXISTS reservas (
  id_reser serial NOT NULL PRIMARY KEY,
  fecha date NOT NULL,
  servicio varchar,
  id_us integer NOT NULL
);

CREATE TABLE IF NOT EXISTS ventas (
  id_vent integer NOT NULL PRIMARY KEY DEFAULT nextval('ventas_id_vent_seq'),
  id_us integer NOT NULL,
  id_empleado integer NOT NULL,
  fecha date NOT NULL,
  total decimal NOT NULL
);

CREATE TABLE IF NOT EXISTS detallexventa (
  id_det serial NOT NULL PRIMARY KEY,
  id_prod integer NOT NULL,
  cant integer NOT NULL,
  subtotal decimal NOT NULL,
  id_vent integer NOT NULL
);

ALTER TABLE roles ADD CONSTRAINT roles_id_rol_fk FOREIGN KEY (rol) REFERENCES usuarios (rol);
ALTER TABLE imagenes ADD CONSTRAINT imagenes_id_fk FOREIGN KEY (id) REFERENCES productos (id_imagen);
ALTER TABLE categorias ADD CONSTRAINT categorias_id_cat_fk FOREIGN KEY (id_cat) REFERENCES productos (id_categoria);
ALTER TABLE imagenes ADD CONSTRAINT imagenes_logo_fk FOREIGN KEY (id) REFERENCES negocio (logo);
ALTER TABLE imagenes ADD CONSTRAINT imagenes_imagenP_fk FOREIGN KEY (id) REFERENCES negocio (imagenP);
ALTER TABLE usuarios ADD CONSTRAINT usuarios_id_us_fk FOREIGN KEY (id_us) REFERENCES reservas (id_us);
ALTER TABLE usuarios ADD CONSTRAINT usuarios_id_us_ventas_fk FOREIGN KEY (id_us) REFERENCES ventas (id_us);
ALTER TABLE usuarios ADD CONSTRAINT usuarios_id_empleado_fk FOREIGN KEY (id_us) REFERENCES ventas (id_empleado);
ALTER TABLE productos ADD CONSTRAINT productos_id_prod_fk FOREIGN KEY (id_prod) REFERENCES detallexventa (id_prod);
ALTER TABLE ventas ADD CONSTRAINT ventas_id_vent_fk FOREIGN KEY (id_vent) REFERENCES detallexventa (id_vent);