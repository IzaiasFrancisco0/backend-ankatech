"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ativosRoutes;
const ativosController_1 = require("../controllers/ativosController");
async function ativosRoutes(fastify) {
    fastify.get('/ativos', ativosController_1.getAtivos);
}
;
