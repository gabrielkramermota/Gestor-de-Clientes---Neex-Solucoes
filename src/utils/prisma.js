// prismaClient.js
const { PrismaClient } = require('@prisma/client');

let prisma;

// Cria uma única instância do PrismaClient
if (process.env.NODE_ENV === 'production') {
  // Em produção, crie uma instância única do Prisma Client
  prisma = new PrismaClient();
} else {
  // Em desenvolvimento, evite múltiplas instâncias devido a reinicializações automáticas
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

module.exports = prisma;
