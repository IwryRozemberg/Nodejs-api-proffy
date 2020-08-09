import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('whatsapp');
    table.dropColumn('bio');
    table.string('email')
      .alter()
      .notNullable()
      .unique();
  })
}

export async function down(knex: Knex) {
  return knex.schema.alterTable('users', table => {
    table.string('bio').alter();
    table.string('whatsapp', 16).notNullable().alter();
    table.string('email').notNullable().alter();
  });
}