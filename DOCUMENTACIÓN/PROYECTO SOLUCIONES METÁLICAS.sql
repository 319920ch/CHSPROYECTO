-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.area
(
    id_area serial NOT NULL,
    nombre_area character varying(255) COLLATE pg_catalog."default" NOT NULL,
    descripcion_area character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT area_pkey PRIMARY KEY (id_area)
);

CREATE TABLE IF NOT EXISTS public.asignacion
(
    id_contrato integer NOT NULL,
    id_area integer NOT NULL,
    id_empleado integer NOT NULL,
    CONSTRAINT asignacion_pkey PRIMARY KEY (id_contrato, id_area, id_empleado)
);

CREATE TABLE IF NOT EXISTS public.contrato
(
    id_contrato serial NOT NULL,
    cliente character varying(100) COLLATE pg_catalog."default" NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    presupuesto numeric(10, 2) NOT NULL,
    id_estado integer NOT NULL,
    CONSTRAINT contrato_pkey PRIMARY KEY (id_contrato)
);

CREATE TABLE IF NOT EXISTS public.desempeno
(
    id_desempeno serial NOT NULL,
    "puntuacion_desempeño" character varying(25) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT desempeno_pkey PRIMARY KEY (id_desempeno)
);

CREATE TABLE IF NOT EXISTS public.empleado
(
    id_empleado serial NOT NULL,
    nombres character varying(255) COLLATE pg_catalog."default" NOT NULL,
    apellidos character varying(255) COLLATE pg_catalog."default" NOT NULL,
    cedula character varying(10) COLLATE pg_catalog."default" NOT NULL,
    tiempo_exp_general integer NOT NULL,
    numero_contacto character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT empleado_pkey PRIMARY KEY (id_empleado)
);

CREATE TABLE IF NOT EXISTS public.estado
(
    id_estado serial NOT NULL,
    estado character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT estado_pkey PRIMARY KEY (id_estado)
);

CREATE TABLE IF NOT EXISTS public.estadoarea
(
    id_contrato integer NOT NULL,
    id_area integer NOT NULL,
    id_estado integer NOT NULL,
    id_proyecto integer NOT NULL,
    CONSTRAINT estadoarea_pkey PRIMARY KEY (id_contrato, id_area, id_estado, id_proyecto)
);

CREATE TABLE IF NOT EXISTS public.evaluacion
(
    id_desempeno integer NOT NULL,
    id_area integer NOT NULL,
    id_empleado integer NOT NULL,
    CONSTRAINT evaluacion_pkey PRIMARY KEY (id_desempeno, id_area, id_empleado)
);

CREATE TABLE IF NOT EXISTS public.presupuesto
(
    id_contrato integer NOT NULL,
    id_area integer NOT NULL,
    id_proyecto integer NOT NULL,
    monto numeric(10, 2) NOT NULL,
    CONSTRAINT presupuesto_pkey PRIMARY KEY (id_contrato, id_area, id_proyecto)
);

CREATE TABLE IF NOT EXISTS public.producto
(
    id_producto serial NOT NULL,
    nombre_producto character varying(100) COLLATE pg_catalog."default" NOT NULL,
    descripcion_producto character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT producto_pkey PRIMARY KEY (id_producto)
);

CREATE TABLE IF NOT EXISTS public.proyecto
(
    id_proyecto serial NOT NULL,
    id_contrato integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad_producto integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    id_estado integer NOT NULL,
    CONSTRAINT proyecto_pkey PRIMARY KEY (id_proyecto)
);

CREATE TABLE IF NOT EXISTS public.recomendacion
(
    id_contrato integer NOT NULL,
    id_proyecto integer NOT NULL,
    id_area integer NOT NULL,
    recomendacion_num_e integer NOT NULL,
    cantidad_asignada integer NOT NULL,
    CONSTRAINT recomendacion_pkey PRIMARY KEY (id_contrato, id_proyecto, id_area)
);

CREATE TABLE IF NOT EXISTS public.reglas
(
    id_reglas serial NOT NULL,
    nombre character varying(255) COLLATE pg_catalog."default" NOT NULL,
    valor integer,
    CONSTRAINT reglas_pkey PRIMARY KEY (id_reglas)
);

CREATE TABLE IF NOT EXISTS public.rol
(
    id_rol serial NOT NULL,
    nombre_rol character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT rol_pkey PRIMARY KEY (id_rol)
);

CREATE TABLE IF NOT EXISTS public.usuario
(
    nombre character varying(200) COLLATE pg_catalog."default" NOT NULL,
    correo_electronico character varying(255) COLLATE pg_catalog."default" NOT NULL,
    contrasena character varying(255) COLLATE pg_catalog."default" NOT NULL,
    id_rol integer NOT NULL,
    CONSTRAINT usuario_pkey PRIMARY KEY (nombre)
);

ALTER TABLE IF EXISTS public.asignacion
    ADD CONSTRAINT asignacion_id_area_fkey FOREIGN KEY (id_area)
    REFERENCES public.area (id_area) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.asignacion
    ADD CONSTRAINT asignacion_id_contrato_fkey FOREIGN KEY (id_contrato)
    REFERENCES public.contrato (id_contrato) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.asignacion
    ADD CONSTRAINT asignacion_id_empleado_fkey FOREIGN KEY (id_empleado)
    REFERENCES public.empleado (id_empleado) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.contrato
    ADD CONSTRAINT contrato_id_estado_fkey FOREIGN KEY (id_estado)
    REFERENCES public.estado (id_estado) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.estadoarea
    ADD CONSTRAINT estadoarea_id_area_fkey FOREIGN KEY (id_area)
    REFERENCES public.area (id_area) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.estadoarea
    ADD CONSTRAINT estadoarea_id_contrato_fkey FOREIGN KEY (id_contrato)
    REFERENCES public.contrato (id_contrato) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.estadoarea
    ADD CONSTRAINT estadoarea_id_estado_fkey FOREIGN KEY (id_estado)
    REFERENCES public.estado (id_estado) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.estadoarea
    ADD CONSTRAINT estadoarea_id_proyecto_fkey FOREIGN KEY (id_proyecto)
    REFERENCES public.proyecto (id_proyecto) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.evaluacion
    ADD CONSTRAINT evaluacion_id_area_fkey FOREIGN KEY (id_area)
    REFERENCES public.area (id_area) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.evaluacion
    ADD CONSTRAINT evaluacion_id_empleado_fkey FOREIGN KEY (id_empleado)
    REFERENCES public.empleado (id_empleado) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.evaluacion
    ADD CONSTRAINT evaluacion_id_desempeno_fkey FOREIGN KEY (id_desempeno)
    REFERENCES public.desempeno (id_desempeno) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.presupuesto
    ADD CONSTRAINT presupuesto_id_area_fkey FOREIGN KEY (id_area)
    REFERENCES public.area (id_area) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.presupuesto
    ADD CONSTRAINT presupuesto_id_contrato_fkey FOREIGN KEY (id_contrato)
    REFERENCES public.contrato (id_contrato) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.presupuesto
    ADD CONSTRAINT presupuesto_id_proyecto_fkey FOREIGN KEY (id_proyecto)
    REFERENCES public.proyecto (id_proyecto) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.proyecto
    ADD CONSTRAINT proyecto_id_contrato_fkey FOREIGN KEY (id_contrato)
    REFERENCES public.contrato (id_contrato) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.proyecto
    ADD CONSTRAINT proyecto_id_estado_fkey FOREIGN KEY (id_estado)
    REFERENCES public.estado (id_estado) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.proyecto
    ADD CONSTRAINT proyecto_id_producto_fkey FOREIGN KEY (id_producto)
    REFERENCES public.producto (id_producto) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.recomendacion
    ADD CONSTRAINT recomendacion_id_area_fkey FOREIGN KEY (id_area)
    REFERENCES public.area (id_area) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.recomendacion
    ADD CONSTRAINT recomendacion_id_contrato_fkey FOREIGN KEY (id_contrato)
    REFERENCES public.contrato (id_contrato) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.recomendacion
    ADD CONSTRAINT recomendacion_id_proyecto_fkey FOREIGN KEY (id_proyecto)
    REFERENCES public.proyecto (id_proyecto) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.usuario
    ADD CONSTRAINT usuario_id_rol_fkey FOREIGN KEY (id_rol)
    REFERENCES public.rol (id_rol) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

END;