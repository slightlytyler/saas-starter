--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: post; Type: TABLE; Schema: public; Owner: slightlytyler
--

CREATE TABLE post (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE post OWNER TO slightlytyler;

--
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: slightlytyler
--

CREATE SEQUENCE post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE post_id_seq OWNER TO slightlytyler;

--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: slightlytyler
--

ALTER SEQUENCE post_id_seq OWNED BY post.id;


--
-- Name: post id; Type: DEFAULT; Schema: public; Owner: slightlytyler
--

ALTER TABLE ONLY post ALTER COLUMN id SET DEFAULT nextval('post_id_seq'::regclass);


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: slightlytyler
--

COPY post (id, name) FROM stdin;
1	One
2	Two
3	Three
\.


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: slightlytyler
--

SELECT pg_catalog.setval('post_id_seq', 3, true);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: slightlytyler
--

ALTER TABLE ONLY post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--
