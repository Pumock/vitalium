-- CreateTable
CREATE TABLE "security_logs" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "severity" "SecurityLevel" NOT NULL,
    "userId" TEXT,
    "metadata" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_event_logs" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "userId" TEXT,
    "metadata" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_event_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "security_logs_severity_idx" ON "security_logs"("severity");

-- CreateIndex
CREATE INDEX "security_logs_timestamp_idx" ON "security_logs"("timestamp");

-- CreateIndex
CREATE INDEX "business_event_logs_event_idx" ON "business_event_logs"("event");

-- CreateIndex
CREATE INDEX "business_event_logs_timestamp_idx" ON "business_event_logs"("timestamp");
