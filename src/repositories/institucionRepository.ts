import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../config/firebase';
import { Institucion } from '../models/Institucion';

const COLECCION = 'instituciones';

export async function buscarInstitucionPorNombre(
  nombre: string,
): Promise<Institucion | null> {
  const q = query(collection(db, COLECCION), where('nombre', '==', nombre));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];

  return {
    id: doc.id,
    nombre: doc.data().nombre as string,
  };
}

export async function guardarInstitucion(nombre: string): Promise<Institucion> {
  const docRef = await addDoc(collection(db, COLECCION), { nombre });

  return {
    id: docRef.id,
    nombre,
  };
}
