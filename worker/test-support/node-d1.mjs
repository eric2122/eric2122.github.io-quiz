export function createNodeD1Adapter(database) {
  return {
    prepare(sql) {
      let parameters = [];

      const statement = {
        bind(...values) {
          parameters = values;
          return statement;
        },
        async first() {
          return database.prepare(sql).get(...parameters) ?? null;
        },
        async all() {
          return { results: database.prepare(sql).all(...parameters) };
        },
        async run() {
          const result = database.prepare(sql).run(...parameters);
          return {
            success: true,
            meta: {
              changes: Number(result.changes),
              last_row_id: Number(result.lastInsertRowid)
            }
          };
        }
      };

      return statement;
    }
  };
}
