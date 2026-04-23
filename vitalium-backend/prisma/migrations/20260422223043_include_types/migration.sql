/*
  Warnings:

  - You are about to drop the `api_usage_statistics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `application_logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "application_logs" DROP CONSTRAINT "application_logs_userId_fkey";

-- DropForeignKey
ALTER TABLE "business_event_logs" DROP CONSTRAINT "business_event_logs_userId_fkey";

-- DropForeignKey
ALTER TABLE "security_logs" DROP CONSTRAINT "security_logs_userId_fkey";

-- DropTable
DROP TABLE "api_usage_statistics";

-- DropTable
DROP TABLE "application_logs";
