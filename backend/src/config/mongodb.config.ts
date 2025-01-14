import { registerAs } from '@nestjs/config';

const alias = 'mongodb';

export const mongodbConfig = registerAs(alias, () => ({
  uri: process.env.MONGODB_URI || 'mongodb+srv://griffith:hawk@cluster0.jmx2t.mongodb.net',
}));

export const mongodbTestConfig = registerAs(alias, () => ({
  uri: process.env.MONGODB_URI_TEST || 'mongodb+srv://griffith:hawk@cluster0.jmx2t.mongodb.net',
}));
