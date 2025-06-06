// src/routes/ativos.ts
import { FastifyInstance } from 'fastify';
import { getAtivos } from '../controllers/ativosController';

export default async function ativosRoutes(fastify: FastifyInstance) {
  fastify.get('/ativos', getAtivos);
};




