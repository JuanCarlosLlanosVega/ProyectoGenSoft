import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '../config/firebase';

export async function subirArchivoExcel(
  nombreArchivo: string,
  contenido: Buffer,
): Promise<string> {
  const referencia = ref(storage, `excels/${nombreArchivo}`);
  await uploadBytes(referencia, contenido);
  return getDownloadURL(referencia);
}
