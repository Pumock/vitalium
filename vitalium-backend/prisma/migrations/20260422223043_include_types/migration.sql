/*
  Warnings:

  - You are about to drop the `api_usage_statistics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `application_logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey (safe — tabelas podem não existir em bancos criados do zero)
DO $$ BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'application_logs') THEN
    ALTER TABLE "application_logs" DROP CONSTRAINT IF EXISTS "application_logs_userId_fkey";
  END IF;
END $$;

DO $$ BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'business_event_logs') THEN
    ALTER TABLE "business_event_logs" DROP CONSTRAINT IF EXISTS "business_event_logs_userId_fkey";
  END IF;
END $$;

DO $$ BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'security_logs') THEN
    ALTER TABLE "security_logs" DROP CONSTRAINT IF EXISTS "security_logs_userId_fkey";
  END IF;
END $$;

-- DropTable
DROP TABLE IF EXISTS "api_usage_statistics";
DROP TABLE IF EXISTS "application_logs";

