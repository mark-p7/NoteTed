import admin from '../firebase/nodeApp'

export const getNoteData = async (id) => {
  const db = admin.firestore()
  const noteCollection = db.collection('notes')
  const noteDoc = await noteCollection.doc(id.noteid).get()
  if (!noteDoc.exists) {
    return null
  }

  return noteDoc.data()
}
