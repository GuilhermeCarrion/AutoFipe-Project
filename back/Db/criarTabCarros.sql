CREATE DATABASE test;
use test;

CREATE TABLE catalogo_veiculos (
	id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(150) NOT NULL,
    ano VARCHAR(50) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    codigo VARCHAR(20) NOT NULL,
    disponibilidade VARCHAR(20) NOT NULL
);