"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlocacaoByCliente = exports.createAlocacao = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const alocacaoSchema = zod_1.z.object({
    clienteId: zod_1.z.number().int().positive(),
    ativoId: zod_1.z.number().int().positive(),
    quantidade: zod_1.z.number().int().positive().optional().default(1),
});
const alocacaoParamsSchema = zod_1.z.object({
    clienteId: zod_1.z.coerce.number().int().positive(),
});
const createAlocacao = async (request, reply) => {
    try {
        const data = alocacaoSchema.parse(request.body);
        const cliente = await prisma.cliente.findUnique({ where: { id: data.clienteId } });
        if (!cliente) {
            return reply.code(404).send({ error: 'Cliente não encontrado' });
        }
        const ativo = await prisma.ativo.findUnique({ where: { id: data.ativoId } });
        if (!ativo) {
            return reply.code(404).send({ error: 'Ativo não encontrado' });
        }
        const alocacao = await prisma.alocacao.create({ data, include: { ativo: true } });
        return reply.code(201).send(alocacao);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return reply.code(400).send({ error: error.errors });
        }
        return reply.code(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.createAlocacao = createAlocacao;
const getAlocacaoByCliente = async (request, reply) => {
    try {
        const params = alocacaoParamsSchema.parse(request.params);
        const clienteId = params.clienteId;
        const alocacoes = await prisma.alocacao.findMany({
            where: { clienteId },
            include: { ativo: true },
        });
        return reply.code(200).send(alocacoes);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return reply.code(400).send({ error: error.errors });
        }
        return reply.code(500).send({ error: 'Erro interno no servidor' });
    }
};
exports.getAlocacaoByCliente = getAlocacaoByCliente;
