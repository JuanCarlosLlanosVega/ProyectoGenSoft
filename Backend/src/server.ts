import app from './app';

const PORT = 3000;

app.listen(PORT, () => {
  console.warn(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});