import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://postgres:springautumn223@localhost:5432/medical'
  },
  verbose: true,
  strict:true
});
