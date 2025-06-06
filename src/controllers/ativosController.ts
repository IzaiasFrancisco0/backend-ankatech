// controllers/ativosController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAtivos = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const ativos = await prisma.ativo.findMany();
    return reply.code(200).send(ativos);
  } catch (error) {
    return reply.code(500).send({ error: 'Erro ao buscar ativos' });
  }
};
