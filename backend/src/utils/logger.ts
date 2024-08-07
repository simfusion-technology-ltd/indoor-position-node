export const log = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== 'test') {
    // keep it simple; swap with pino/winston later
    // eslint-disable-next-line no-console
    console.log('[app]', ...args);
  }
};