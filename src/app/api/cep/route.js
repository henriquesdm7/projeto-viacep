import { PrismaClient } from "@prisma/client";

export async function GET(req) {
    const cep = req.nextUrl.searchParams.get('cep');
    if (!cep) return Response.json({ error: "CEP inválido" });

    const prisma = new PrismaClient();
    const dbResponse = await prisma.cepQuery.findUnique({
        where: {
            cep: cep
        }
    });

    if (dbResponse) {
        await prisma.$disconnect();

        return Response.json({
            data: {
                origin: "db",
                ...dbResponse
            }
        });
    }

    const apiResponse = await fetch('https://viacep.com.br/ws/' + cep + '/json/');

    if (!apiResponse.ok) {
        await prisma.$disconnect();
        return Response.json({ error: "CEP inválido" })
    };

    const data = await apiResponse.json();

    if (data.erro) {
        await prisma.$disconnect();
        return Response.json({ error: "CEP inválido" })
    }

    await prisma.cepQuery.create({
        data: {
            cep: cep,
            logradouro: data.logradouro,
            complemento: data.complemento,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf,
            ibge: data.ibge,
            gia: data.gia,
            ddd: data.ddd,
            siafi: data.siafi
        }
    });

    await prisma.$disconnect();
    return Response.json({
        data: {
            origin: "api",
            ...data
        }
    });
}