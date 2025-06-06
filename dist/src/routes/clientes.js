"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = clienteRoutes;
const clientesController_1 = require("../controllers/clientesController");
async function clienteRoutes(fastify) {
    fastify.post('/clientes', clientesController_1.createClient);
    fastify.get('/clientes', clientesController_1.getClients);
    fastify.get('/clientes/:id', clientesController_1.getClientById);
    fastify.put('/clientes/:id', clientesController_1.putAtivosByCliente);
}
