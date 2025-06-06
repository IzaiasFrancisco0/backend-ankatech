"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientById = exports.getClients = exports.putAtivosByCliente = exports.createClient = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const clienteSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, 'Nome é obrigatório'),
    email: zod_1.z.string().email('Email inválido'),
    status: zod_1.z.enum(['ATIVO', 'INATIVO'], { message: 'Status inválido' }),
});
const clienteParamsSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive({ message: 'ID deve ser número inteiro positivo' }),
});
const createClient = async (request, reply) => {
    try {
        const data = clienteSchema.parse(request.body);
        const newClient = await prisma.cliente.create({ data });
        return reply.code(201).send(newClient);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return reply.code(400).send({ error: error.errors });
        }
        console.error(error);
        return reply.code(500).send({ error: 'Erro interno no servidor' });
    }
};
exports.createClient = createClient;
const putAtivosByCliente = async (request, reply) => {
    try {
        const params = clienteParamsSchema.parse(request.params);
        const data = clienteSchema.parse(request.body);
        const updateCliente = await prisma.cliente.update({
            where: { id: params.id },
            data,
        });
        return reply.code(200).send(updateCliente);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return reply.code(400).send({ error: error.errors });
        }
        console.error(error);
        return reply.code(500).send({ error: 'Erro interno no servidor' });
    }
};
exports.putAtivosByCliente = putAtivosByCliente;
const getClients = async (request, reply) => {
    try {
        const clientes = await prisma.cliente.findMany();
        return reply.send(clientes);
    }
    catch (error) {
        console.error(error);
        return reply.code(500).send({ error: 'Erro interno no servidor' });
    }
};
exports.getClients = getClients;
const getClientById = async (request, reply) => {
    try {
        const params = clienteParamsSchema.parse(request.params); // valida e pega id
        const cliente = await prisma.cliente.findUnique({
            where: { id: params.id },
        });
        if (!cliente) {
            return reply.code(404).send({ error: 'Cliente não encontrado' });
        }
        return reply.send(cliente);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return reply.code(400).send({ error: error.errors });
        }
        console.error(error);
        return reply.code(500).send({ error: 'Erro interno no servidor' });
    }
};
exports.getClientById = getClientById;
