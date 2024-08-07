import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/api';

const app = express();

app.use(helmet());
app.use(express.json());

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',');
app.use(
  cors({
    origin: function (origin, callback) {
      // allow calls with no origin like curl/postman
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed by backend'));
      }
    },
    credentials: true
  })
);

app.use(morgan('dev'));

// routes
app.use('/api', routes);

// health check
app.get('/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// basic error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;