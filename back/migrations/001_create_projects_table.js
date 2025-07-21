const up = async (pgm) => {
  await pgm.createSchema("apol_schema", { ifNotExists: true });

  await pgm.db.query(`
    CREATE TABLE IF NOT EXISTS "apol_schema"."projects" (
      id SERIAL PRIMARY KEY,
      "title" VARCHAR(255) NOT NULL,
      "summary" TEXT,
      "contentPath" TEXT,
      "tags" TEXT[],
      "thumbnail" VARCHAR(255),
      "duration" TEXT,
      "createdAt" TIMESTAMP DEFAULT now(),
      "updatedAt" TIMESTAMP DEFAULT now()
    );
  `);
};

const down = async (pgm) => {
  await pgm.dropTable({ schema: "apol_schema", name: "projects" });
  await pgm.dropSchema("apol_schema");
};

module.exports = { up, down };
