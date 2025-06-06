"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAtivos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAtivos = async (request, reply) => {
    try {
        const ativos = await prisma.ativo.findMany();
        return reply.code(200).send(ativos);
    }
    catch (error) {
        return reply.code(500).send({ error: 'Erro ao buscar ativos' });
    }
};
exports.getAtivos = getAtivos;
