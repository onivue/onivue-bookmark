import create from 'zustand'
import { db } from '@/lib/firebase'
import {
    collection,
    query,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc,
    setDoc,
    getDocs,
    getDoc,
    arrayUnion,
    arrayRemove,
    serverTimestamp,
    where,
    orderBy,
} from 'firebase/firestore'

const useKanbanStore = create((set, get) => ({
    loading: true,
    errorMessage: null,
    setLoading: (payload) => set({ loading: payload }),
    //!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    bookMarks: [],
    //!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    getBookMarks: (
        payload = {
            userId: '',
        },
    ) => {
        const unsubscribe = onSnapshot(query(collection(db, `bookmarks/uid`)), (snapshot) => {
            const documents = []
            snapshot.forEach((doc) => documents.push({ id: doc.id, ...doc.data() }))
            set({ bookMarks: documents })
        })

        return () => {
            unsubscribe()
        }
    },
}))
