/**
 * Represents a complete row from the 'users' table in the database.
 */
export interface IDBUsers {
    // --- Required/NOT NULL Fields ---

    // id: uuid NOT NULL DEFAULT uuid_generate_v4(),
    // UUIDs are typically represented as strings in TypeScript/JavaScript.
    id: string;

    // created_at: timestamp with time zone NOT NULL DEFAULT now(),
    // Timestamps from Postgres are usually returned as Date objects or ISO strings.
    created_at: Date | string;

    // credits_balance: integer DEFAULT 0,
    // Although it has a default, it is NOT NULL in the table definition.
    credits_balance: number;

    // --- Optional/Nullable Fields ---

    // email: text UNIQUE, (implied NOT NULL if used as unique constraint, but can be NULL if it has no NOT NULL explicit constraint)
    // Assuming a `UNIQUE` constraint doesn't automatically mean `NOT NULL` in all contexts, 
    // but it's common practice to make it NOT NULL if it's a primary login. 
    // We'll mark it as potentially nullable based on the SQL provided.
    email: string | null;

    // name: text,
    name: string | null;

    // wallet_address: text,
    wallet_address: string | null;
}