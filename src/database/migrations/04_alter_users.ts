import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.alterTable('users', table => {
    table.string('name', 64).notNullable().alter();
    table.string('email').notNullable().index();
    table.string('hash').notNullable();
    table.string('salt').notNullable();
  })
}

export async function down(knex: Knex) {
  return knex.schema.alterTable('users', table => {
    table.increments('id').primary();
    table.string('name', 64).notNullable().index();
    table.string('bio');
    table.string('avatar').notNullable();
    table.string('whatsapp', 16).notNullable();
  })
}