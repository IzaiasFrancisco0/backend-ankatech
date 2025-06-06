import Fastify from 'fastify';
import cors from '@fastify/cors';
import clienteRoutes from './src/routes/clientes';
import ativosRoutes from './src/routes/ativos';
import alocacaoRoute from './src/routes/alocacao';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

const start = async () => {
  try {
    await fastify.register(cors, {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],    
      credentials: true,
    });

    fastify.register(clienteRoutes);
    fastify.register(ativosRoutes);
    fastify.register(alocacaoRoute);

    const port = Number(process.env.PORT) || 5000;
    const host = process.env.HOST || '127.0.0.1';

    await fastify.listen({ port, host });
    console.log('Servidor rodando!!');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
