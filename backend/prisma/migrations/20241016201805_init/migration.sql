-- CreateTable
CREATE TABLE "Fatura" (
    "id" SERIAL NOT NULL,
    "numero_cliente" TEXT NOT NULL,
    "mes_referencia" TIMESTAMP(3) NOT NULL,
    "energia_eletrica_kwh" DOUBLE PRECISION NOT NULL,
    "energia_eletrica_valor" DOUBLE PRECISION NOT NULL,
    "energia_sceee_kwh" DOUBLE PRECISION NOT NULL,
    "energia_sceee_valor" DOUBLE PRECISION NOT NULL,
    "energia_compensada_kwh" DOUBLE PRECISION NOT NULL,
    "energia_compensada_valor" DOUBLE PRECISION NOT NULL,
    "contribu_ilum_publica_valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id")
);
