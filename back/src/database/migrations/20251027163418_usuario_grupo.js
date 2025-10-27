/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(
    "usuario_grupo",
    (table) => (
      table.increments("id").unsigned(),
      table
        .integer("id_do_usuario")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("usuario")
        .onDelete("CASCADE"),
      table
        .integer("id_do_grupo")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("grupo")
        .onDelete("CASCADE"),
      table.primary(["id_do_usuario", "id_do_grupo"])
    )
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("usuario_grupo");
};
