/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transacao", (table) => {
    table.increments("id").unsigned(),
      table.double("valor").notNullable.unsigned();
    table.string("tipo_de_transacao").notNullable();
    table.date("data_entrega").defaultTo(knex.fn.now());
    table.string("descricao").nullable();
    table.string("categoria").notNullable();
    table.string("conta").notNullable();
    table
      .integer("id_do_grupo")
      .unsigned()
      .references("id")
      .inTable("grupo")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("transacao");
};
