/*
  Warnings:

  - You are about to drop the column `clienteId` on the `Ativo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Ativo` DROP FOREIGN KEY `Ativo_clienteId_fkey`;

-- DropIndex
DROP INDEX `Ativo_clienteId_fkey` ON `Ativo`;

-- AlterTable
ALTER TABLE `Ativo` DROP COLUMN `clienteId`;

-- CreateTable
CREATE TABLE `Alocacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `ativoId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alocacao` ADD CONSTRAINT `Alocacao_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alocacao` ADD CONSTRAINT `Alocacao_ativoId_fkey` FOREIGN KEY (`ativoId`) REFERENCES `Ativo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
