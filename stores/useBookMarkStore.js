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

const useBookMarkStore = create((set, get) => ({
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
        const unsubscribe = onSnapshot(
            // query(collection(db, 'onivue-bookmarks/uid/bookmarks'))
            query(
                collection(db, `onivue-bookmarks/uid/bookmarks`),
                // ...(payload.filterCategory && where('category', 'array-contains', '7qUbAfNBlYRhRqUmnfzy')),
                // where('category', 'array-contains', '7qUbAfNBlYRhRqUmnfzy'),

                // where('owner', '==', payload.userId),

                // orderBy('title', 'asc'),
            ),
            (snapshot) => {
                const documents = []
                snapshot.forEach((doc) => documents.push({ id: doc.id, ...doc.data() }))
                set({ bookMarks: documents })
            },
        )

        return () => {
            unsubscribe()
        }
    },
    //!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    setBookMark: async (
        payload = {
            type: '',
            data: {},
            // userId: '',
            docId: '',
        },
    ) => {
        const col = collection(db, `onivue-bookmarks/uid/bookmarks`)
        if (payload.type === 'create') {
            payload.data.dateAdded = serverTimestamp()
            await addDoc(col, payload.data)
        }
        if (payload.type === 'update') {
            await setDoc(doc(col, payload.docId), payload.data, { merge: true })
        }
        if (payload.type === 'delete') {
            await deleteDoc(doc(col, payload.docId))
        }
    },
    //!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    categories: [],
    //!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    getCategories: (
        payload = {
            userId: '',
        },
    ) => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'onivue-bookmarks/uid/categories')),
            (snapshot) => {
                const documents = []
                snapshot.forEach((doc) => documents.push({ id: doc.id, ...doc.data() }))
                const sortedDocuments = documents.sort((a, b) => (a.title > b.title ? 1 : -1))
                set({ categories: sortedDocuments })
            },
        )

        return () => {
            unsubscribe()
        }
    },
    //!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    setCategory: async (
        payload = {
            type: '',
            data: {},
            // userId: '',
            docId: '',
        },
    ) => {
        const col = collection(db, `onivue-bookmarks/uid/categories`)
        if (payload.type === 'create') {
            payload.data.dateAdded = serverTimestamp()
            await addDoc(col, payload.data)
        }
        if (payload.type === 'update') {
            await setDoc(doc(col, payload.docId), payload.data, { merge: true })
        }
        if (payload.type === 'delete') {
            await deleteDoc(doc(col, payload.docId))
        }
    },
}))

export default useBookMarkStore
