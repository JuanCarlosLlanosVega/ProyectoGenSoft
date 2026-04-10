import cors from 'cors';
import express from 'express';

import institucionRoutes from './routes/institucionRoutes';
import registroRoutes from './routes/registroRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/instituciones', institucionRoutes);
app.use('/api/registro', registroRoutes);

export default app;