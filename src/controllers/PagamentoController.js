const prisma = require("../utils/prisma");
class PagamentoController {
  async createPagamento(data) {
    const { clienteId, valor } = data;
    return await prisma.pagamento.create({
      data: {
        valor: parseFloat(valor),
        data: new Date(),
        clienteId
      }
    });
  }

  async getPagamentos(clienteId) {
    return await prisma.pagamento.findMany({
      where: { clienteId }
    });
  }
}

module.exports = new PagamentoController();
