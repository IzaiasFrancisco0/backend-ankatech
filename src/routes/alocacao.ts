import {FastifyInstance} from 'fastify';
import { createAlocacao, getAlocacaoByCliente} from '../controllers/alocacoesController';

export default async function alocacaoRoute (fastify: FastifyInstance) {
  fastify.post('/alocacoes', createAlocacao);
  fastify.get('/clientes/:clienteId/alocacoes', getAlocacaoByCliente);
}

