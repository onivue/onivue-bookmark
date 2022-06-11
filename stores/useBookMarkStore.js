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
    filterCategory: [],
    setFilterCategory: (payload) => {
        if (!payload.length) return set({ filterCategory: [] })
        const actualFilterCategory = get().filterCategory
        if (actualFilterCategory.includes(payload)) {
            return set({ filterCategory: [...actualFilterCategory.filter((fi) => fi !== payload)] })
        }

        return set({ filterCategory: [...actualFilterCategory, payload] })
    },
    //!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    getBookMarks: (
        payload = {
            userId: '',
        },
    ) => {
        const unsubscribe = onSnapshot(
            // query(collection(db, 'onivue-bookmark/uid/bookmarks'))
            get().filterCategory.length > 0
                ? query(
                      collection(db, `onivue-bookmark/${payload.userId}/bookmarks`),
                      where('category', 'array-contains-any', get().filterCategory),
                  )
                : query(collection(db, `onivue-bookmark/${payload.userId}/bookmarks`)),
            (snapshot) => {
                const documents = []
                snapshot.forEach((doc) => documents.push({ id: doc.id, ...doc.data() }))
                console.log(documents)
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
            userId: '',
            docId: '',
        },
    ) => {
        const col = collection(db, `onivue-bookmark/${payload.userId}/bookmarks`)
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
            query(collection(db, `onivue-bookmark/${payload.userId}/categories`)),
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
            userId: '',
            docId: '',
        },
    ) => {
        const col = collection(db, `onivue-bookmark/${payload.userId}/categories`)
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
