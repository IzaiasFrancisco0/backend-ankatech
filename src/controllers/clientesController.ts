import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const clienteSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  status: z.enum(['ATIVO', 'INATIVO'], { message: 'Status inválido' }),
});

const clienteParamsSchema = z.object({
  id: z.coerce.number().int().positive({ message: 'ID deve ser número inteiro positivo' }),
});

export const createClient = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = clienteSchema.parse(request.body);

    const newClient = await prisma.cliente.create({ data });

    return reply.code(201).send(newClient);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({ error: error.errors });
    }
    console.error(error);
    return reply.code(500).send({ error: 'Erro interno no servidor' });
  }
};

export const putAtivosByCliente = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const params = clienteParamsSchema.parse(request.params);
    const data = clienteSchema.parse(request.body);

    const updateCliente = await prisma.cliente.update({
      where: { id: params.id },
      data,
    });

    return reply.code(200).send(updateCliente);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({ error: error.errors });
    }
    console.error(error);
    return reply.code(500).send({ error: 'Erro interno no servidor' });
  }
};

export const getClients = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const clientes = await prisma.cliente.findMany();
    return reply.send(clientes);
  } catch (error: any) {
    console.error(error);
    return reply.code(500).send({ error: 'Erro interno no servidor' });
  }
};

export const getClientById = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const params = clienteParamsSchema.parse(request.params); // valida e pega id
    
    const cliente = await prisma.cliente.findUnique({
      where: { id: params.id },
    });

    if (!cliente) {
      return reply.code(404).send({ error: 'Cliente não encontrado' });
    }

    return reply.send(cliente);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({ error: error.errors });
    }
    console.error(error);
    return reply.code(500).send({ error: 'Erro interno no servidor' });
  }
};
