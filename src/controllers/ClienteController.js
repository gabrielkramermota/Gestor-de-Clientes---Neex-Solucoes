const prisma = require('../utils/prisma')

class ClienteController {
  async createCliente(data) {
    const { nome, email, telefone, plano, valor, vencimento, status } = data;
    const clienteCriado = await prisma.cliente.create({
      data: {
        nome,
        email,
        telefone,
        plano,
        valor: parseFloat(valor),
        vencimento: new Date(vencimento),
        status: status || "pendente" // define como pendente se status estiver vazio
      }
    });

    // Verificar se o status é "7 dias" e se o cliente passou de 7 dias
    if (status === "7dias") {
      const dataCriacao = new Date(clienteCriado.createdAt); // Data de criação do cliente
      const dataLimite = new Date(dataCriacao);
      dataLimite.setDate(dataLimite.getDate() + 7); // Adiciona 7 dias à data de criação

      const hoje = new Date();

      if (hoje > dataLimite) {
        // Se já passaram 7 dias, atualiza o status para "inativo"
        await this.updateCliente(clienteCriado.id, { status: "inativo" });
      }
    }

    return clienteCriado;
  }

  async getClientes() {
    return await prisma.cliente.findMany();
  }

  async updateCliente(id, data) {
    try {
      // Atualiza o cliente no banco de dados com o novo status
      const clienteAtualizado = await prisma.cliente.update({
        where: { id: id },
        data: {
          status: data.status // Aqui atualizamos o status
        }
      });
      return clienteAtualizado;
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      throw new Error("Erro ao atualizar cliente");
    }
  }

  async deleteCliente(id) {
    return await prisma.cliente.delete({
      where: { id }
    });
  }
}

module.exports = new ClienteController();
