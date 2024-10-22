CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  data BYTEA NOT NULL,   -- Aquí se almacena el archivo de la imagen
  mimetype VARCHAR(100)  -- Tipo MIME de la imagen, como 'image/png', 'image/jpeg', etc.
);

CREATE TABLE usuarios (
    id_us SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    edad SMALLINT,
    telefono VARCHAR(11),
    usuario VARCHAR(20) NOT NULL,
    password VARCHAR(50) NOT NULL
);

CREATE TABLE productos (
    id_prod SERIAL PRIMARY KEY,    -- ID incremental autoincrementado
    nombre_producto VARCHAR(100) NOT NULL,  -- Nombre del producto
    precio FLOAT NOT NULL,         -- Precio del producto
    descripcion VARCHAR(100) NOT NULL,       -- Descripción del producto
    id_imagen INT,                 -- Clave foránea que referencia a la tabla imagenes
    categoria VARCHAR(20) NOT NULL, 
    tipo VARCHAR (20) NOT NULL,
    CONSTRAINT fk_imagen FOREIGN KEY (id_imagen) REFERENCES images(id) ON DELETE SET NULL
);
