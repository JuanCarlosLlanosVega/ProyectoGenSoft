import { addDoc, collection } from 'firebase/firestore';

import { db } from '../config/firebase';
import { Docente } from '../models/Docente';

const COLECCION = 'docentes';

export async function guardarDocente(docente: Docente): Promise<Docente> {
  await addDoc(collection(db, COLECCION), docente);
  return docente;
}
