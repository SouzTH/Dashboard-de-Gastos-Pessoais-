/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(
    "usuario",
    (table) => (
      table.increments("id").unsigned(),
      table.string("nome").notNullable,
      table.string("email").notNullable().unique(),
      table.string("senha").notNullable(),
      table.string("foto").nullable()
    )
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("usuario");
};
