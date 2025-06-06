"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = alocacaoRoute;
const alocacoesController_1 = require("../controllers/alocacoesController");
async function alocacaoRoute(fastify) {
    fastify.post('/alocacoes', alocacoesController_1.createAlocacao);
    fastify.get('/clientes/:clienteId/alocacoes', alocacoesController_1.getAlocacaoByCliente);
}
