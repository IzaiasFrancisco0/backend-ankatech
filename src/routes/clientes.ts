import { FastifyInstance } from 'fastify';
import { createClient, putAtivosByCliente, getClients, getClientById } from '../controllers/clientesController';

export default async function clienteRoutes(fastify: FastifyInstance) {
  fastify.post('/clientes', createClient);
  fastify.get('/clientes', getClients);
  fastify.get('/clientes/:id', getClientById);
  fastify.put('/clientes/:id', putAtivosByCliente);
}

