const host = process.env.MONGODB_HOST || '127.0.0.1';
const port = process.env.MONGODB_PORT || 27017;
const database = process.env.MONGODB_DATABASE || 'nestjscore';

export const mongooseConfig = {
  useFactory: () => ({
    uri: `mongodb://${host}:${port}/${database}`,
  }),
};
