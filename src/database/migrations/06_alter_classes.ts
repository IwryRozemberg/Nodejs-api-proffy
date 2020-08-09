import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.alterTable('classes', table => {
    table.string('bio').notNullable();
    table.string('whatsapp', 16).notNullable();
  })
}

export async function down(knex: Knex) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('whatsapp');
    table.dropColumn('bio');
  });
}