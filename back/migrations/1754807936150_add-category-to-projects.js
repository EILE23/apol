const up = async (pgm) => {
  pgm.addColumn(
    { schema: "apol_schema", name: "projects" },
    {
      category: { type: "varchar(50)" }, // project | study | record
    }
  );
};

const down = async (pgm) => {
  pgm.dropColumn({ schema: "apol_schema", name: "projects" }, "category");
};

module.exports = { up, down };
