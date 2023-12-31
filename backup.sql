PGDMP                     
    {            postgres    14.9    14.9 0    !           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            "           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            #           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            $           1262    13754    postgres    DATABASE     h   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE postgres;
                postgres    false            %           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3364                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            &           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            �            1259    16394    product    TABLE     �   CREATE TABLE public.product (
    id integer NOT NULL,
    name text NOT NULL,
    price numeric(8,2) NOT NULL,
    "productTypeId" integer NOT NULL
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    16469    productType    TABLE     W   CREATE TABLE public."productType" (
    id integer NOT NULL,
    name text NOT NULL
);
 !   DROP TABLE public."productType";
       public         heap    postgres    false            �            1259    16468    productType_id_seq    SEQUENCE     �   CREATE SEQUENCE public."productType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."productType_id_seq";
       public          postgres    false    220            '           0    0    productType_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."productType_id_seq" OWNED BY public."productType".id;
          public          postgres    false    219            �            1259    16440    sale    TABLE     �   CREATE TABLE public.sale (
    id integer NOT NULL,
    "totalSale" numeric(8,2) NOT NULL,
    "totalTax" numeric(8,2) NOT NULL
);
    DROP TABLE public.sale;
       public         heap    postgres    false            �            1259    16447 
   saleDetail    TABLE       CREATE TABLE public."saleDetail" (
    id integer NOT NULL,
    price numeric(8,2) NOT NULL,
    many integer NOT NULL,
    "valueTax" numeric(8,2) NOT NULL,
    "valueTotal" numeric(8,2) NOT NULL,
    "productName" text NOT NULL,
    "saleId" integer NOT NULL
);
     DROP TABLE public."saleDetail";
       public         heap    postgres    false            �            1259    16446    saleDetail_id_seq    SEQUENCE     �   CREATE SEQUENCE public."saleDetail_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."saleDetail_id_seq";
       public          postgres    false    218            (           0    0    saleDetail_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."saleDetail_id_seq" OWNED BY public."saleDetail".id;
          public          postgres    false    217            �            1259    16439    sale_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.sale_id_seq;
       public          postgres    false    216            )           0    0    sale_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.sale_id_seq OWNED BY public.sale.id;
          public          postgres    false    215            �            1259    16414    tax    TABLE     s   CREATE TABLE public.tax (
    id integer NOT NULL,
    name text NOT NULL,
    percentage numeric(5,2) NOT NULL
);
    DROP TABLE public.tax;
       public         heap    postgres    false            �            1259    16423    taxProductType    TABLE     �   CREATE TABLE public."taxProductType" (
    id integer NOT NULL,
    "taxId" integer NOT NULL,
    "productTypeId" integer NOT NULL
);
 $   DROP TABLE public."taxProductType";
       public         heap    postgres    false            �            1259    16422    taxProductType_id_seq    SEQUENCE     �   CREATE SEQUENCE public."taxProductType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."taxProductType_id_seq";
       public          postgres    false    214            *           0    0    taxProductType_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."taxProductType_id_seq" OWNED BY public."taxProductType".id;
          public          postgres    false    213            �            1259    16413 
   tax_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tax_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.tax_id_seq;
       public          postgres    false    212            +           0    0 
   tax_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.tax_id_seq OWNED BY public.tax.id;
          public          postgres    false    211            y           2604    16472    productType id    DEFAULT     t   ALTER TABLE ONLY public."productType" ALTER COLUMN id SET DEFAULT nextval('public."productType_id_seq"'::regclass);
 ?   ALTER TABLE public."productType" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            w           2604    16443    sale id    DEFAULT     b   ALTER TABLE ONLY public.sale ALTER COLUMN id SET DEFAULT nextval('public.sale_id_seq'::regclass);
 6   ALTER TABLE public.sale ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            x           2604    16450    saleDetail id    DEFAULT     r   ALTER TABLE ONLY public."saleDetail" ALTER COLUMN id SET DEFAULT nextval('public."saleDetail_id_seq"'::regclass);
 >   ALTER TABLE public."saleDetail" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            u           2604    16417    tax id    DEFAULT     `   ALTER TABLE ONLY public.tax ALTER COLUMN id SET DEFAULT nextval('public.tax_id_seq'::regclass);
 5   ALTER TABLE public.tax ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            v           2604    16426    taxProductType id    DEFAULT     z   ALTER TABLE ONLY public."taxProductType" ALTER COLUMN id SET DEFAULT nextval('public."taxProductType_id_seq"'::regclass);
 B   ALTER TABLE public."taxProductType" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214                      0    16394    product 
   TABLE DATA           C   COPY public.product (id, name, price, "productTypeId") FROM stdin;
    public          postgres    false    210    2                 0    16469    productType 
   TABLE DATA           1   COPY public."productType" (id, name) FROM stdin;
    public          postgres    false    220   U2                 0    16440    sale 
   TABLE DATA           ;   COPY public.sale (id, "totalSale", "totalTax") FROM stdin;
    public          postgres    false    216   �2                 0    16447 
   saleDetail 
   TABLE DATA           j   COPY public."saleDetail" (id, price, many, "valueTax", "valueTotal", "productName", "saleId") FROM stdin;
    public          postgres    false    218   �2                 0    16414    tax 
   TABLE DATA           3   COPY public.tax (id, name, percentage) FROM stdin;
    public          postgres    false    212   f3                 0    16423    taxProductType 
   TABLE DATA           H   COPY public."taxProductType" (id, "taxId", "productTypeId") FROM stdin;
    public          postgres    false    214   �3       ,           0    0    productType_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."productType_id_seq"', 6, true);
          public          postgres    false    219            -           0    0    saleDetail_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."saleDetail_id_seq"', 18, true);
          public          postgres    false    217            .           0    0    sale_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.sale_id_seq', 36, true);
          public          postgres    false    215            /           0    0    taxProductType_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."taxProductType_id_seq"', 3, true);
          public          postgres    false    213            0           0    0 
   tax_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.tax_id_seq', 17, true);
          public          postgres    false    211            �           2606    16476    productType productType_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."productType"
    ADD CONSTRAINT "productType_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."productType" DROP CONSTRAINT "productType_pkey";
       public            postgres    false    220            |           2606    16400    product product_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    210            �           2606    16452    saleDetail saleDetail_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."saleDetail"
    ADD CONSTRAINT "saleDetail_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."saleDetail" DROP CONSTRAINT "saleDetail_pkey";
       public            postgres    false    218            �           2606    16445    sale sale_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.sale
    ADD CONSTRAINT sale_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.sale DROP CONSTRAINT sale_pkey;
       public            postgres    false    216            �           2606    16428 "   taxProductType taxProductType_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."taxProductType"
    ADD CONSTRAINT "taxProductType_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."taxProductType" DROP CONSTRAINT "taxProductType_pkey";
       public            postgres    false    214            ~           2606    16421    tax tax_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.tax
    ADD CONSTRAINT tax_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.tax DROP CONSTRAINT tax_pkey;
       public            postgres    false    212            z           1259    16482    fki_productTypeId    INDEX     R   CREATE INDEX "fki_productTypeId" ON public.product USING btree ("productTypeId");
 '   DROP INDEX public."fki_productTypeId";
       public            postgres    false    210            �           2606    16429    taxProductType fk_tax    FK CONSTRAINT     t   ALTER TABLE ONLY public."taxProductType"
    ADD CONSTRAINT fk_tax FOREIGN KEY ("taxId") REFERENCES public.tax(id);
 A   ALTER TABLE ONLY public."taxProductType" DROP CONSTRAINT fk_tax;
       public          postgres    false    214    212    3198            �           2606    16477    product productTypeId    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT "productTypeId" FOREIGN KEY ("productTypeId") REFERENCES public."productType"(id) NOT VALID;
 A   ALTER TABLE ONLY public.product DROP CONSTRAINT "productTypeId";
       public          postgres    false    210    220    3206               %   x�3����HTHIU�M-N�44�30�4����� w��         A   x�3�t�I-)�O��=���$39�˄�917QG!7�8Q!U!)1/#�ˌ3�(3��45%�+F��� B��         2   x�%��  ��Q��i3�_�F_�ٌ�%Q��A��Gؗ��d��	� ��z         n   x�m�1
�0�99EOPk�7��(N.�A��X7�$�?�LD���wH9.i�"��CSs)�>��8�!�vWؕ�m�YQ���k4K2G��GA�+t����8[D| �<!�         !   x�3����4�35�2��t��4�c���� K��            x�3�4�4�2�4�4�2�͸b���� !��     