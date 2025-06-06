"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const clientes_1 = __importDefault(require("./src/routes/clientes"));
const ativos_1 = __importDefault(require("./src/routes/ativos"));
const alocacao_1 = __importDefault(require("./src/routes/alocacao"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fastify = (0, fastify_1.default)({
    logger: true,
});
const start = async () => {
    try {
        await fastify.register(cors_1.default, {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        });
        fastify.register(clientes_1.default);
        fastify.register(ativos_1.default);
        fastify.register(alocacao_1.default);
        const port = Number(process.env.PORT) || 5000;
        const host = process.env.HOST || '127.0.0.1';
        await fastify.listen({ port, host });
        console.log('Servidor rodando!!');
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
