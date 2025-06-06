import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const alocacaoSchema = z.object({
    clienteId: z.number().int().positive(),
    ativoId: z.number().int().positive(),
    quantidade: z.number().int().positive().optional().default(1),
});

const alocacaoParamsSchema = z.object({
  clienteId: z.coerce.number().int().positive(),
});


export const createAlocacao = async (request: FastifyRequest, reply: FastifyReply) => {
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

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return reply.code(400).send({ error: error.errors });
        }
        return reply.code(500).send({ error: 'Erro interno do servidor' });
    }
};

export const getAlocacaoByCliente = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const params = alocacaoParamsSchema.parse(request.params);
        const clienteId = params.clienteId;

        const alocacoes = await prisma.alocacao.findMany({
            where: { clienteId },
            include: { ativo: true },
        });

        return reply.code(200).send(alocacoes);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.code(400).send({ error: error.errors });
        }
        return reply.code(500).send({ error: 'Erro interno no servidor' });
    }
};
