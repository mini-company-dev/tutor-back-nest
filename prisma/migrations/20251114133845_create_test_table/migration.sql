-- CreateTable
CREATE TABLE "grammar_test" (
    "id" UUID NOT NULL,
    "problem" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "grammar_test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "grammar_test_id" UUID NOT NULL,

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id")
);
