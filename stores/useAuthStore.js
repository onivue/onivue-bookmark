import create from 'zustand'
import shallow from 'zustand/shallow'
import { auth } from '@/lib/firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    deleteUser,
    signOut,
    updatePassword,
    updateProfile,
} from 'firebase/auth'
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

const useAuthStore = create((set, get) => ({
    user: null,
    userData: null,
    loading: true,
    errorMessage: null,
    authListener: () => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const { displayName, email, photoURL, uid } = authUser
                try {
                    const userDocRef = doc(db, `users/${authUser.uid}`)
                    let userData = await getDoc(userDocRef)
                    if (!userData.exists()) {
                        await setDoc(userDocRef, {
                            displayName,
                            uid,
                            photoURL,
                            updatedAt: serverTimestamp(),
                        })
                    } else {
                        await setDoc(userDocRef, {
                            ...userData.data(),
                            displayName,
                            uid,
                            photoURL,
                            updatedAt: serverTimestamp(),
                        })
                    }
                    userData = await getDoc(userDocRef)
                    set({ user: authUser })
                    set({ userData: userData.data() })
                    set({ loading: false })
                } catch (e) {
                    console.log(`Error when creating/updating the user document`, e.message)
                }
            } else {
                set({ user: null })
                set({ userData: null })
                set({ loading: false })
            }
        })
        return unsubscribe
    },
    login: async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            if (err.code === 'auth/wrong-password') {
                set({ errorMessage: 'Please check the Password' })
            }
            if (err.code === 'auth/user-not-found') {
                set({ errorMessage: 'Please check the Email' })
            }
            if (err.code === 'auth/invalid-email') {
                set({ errorMessage: 'Please check the Email' })
            }
        }
    },
    logout: async () => {
        try {
            set({ loading: true })
            await signOut(auth)
            set({ loading: false })
        } catch (err) {
            set({ errorMessage: err.message })
            set({ loading: false })
        }
    },
    isUsernameValid: async (username) => {
        const value = await getDocs(query(collection(db, `users`), where('username', '==', username)))
        if (value.length > 0) {
            return false
        }
        return true
    },
    register: async (email, password, username) => {
        try {
            set({ loading: true })
            await createUserWithEmailAndPassword(auth, email, password)
            const col = collection(db, `users`)
            // await setDoc(doc(col, auth.currentUser.uid), {
            //     // username: username,
            // })
            set({ loading: false })
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                set({ errorMessage: 'Email Already in Use' })
            } else {
                set({ errorMessage: 'Something went wrong' })
            }
            set({ loading: false })
        }
    },
    resetPassword: async (email) => {
        try {
            set({ loading: true })
            await sendPasswordResetEmail(auth, email)
            set({ loading: false })
        } catch (err) {
            set({ errorMessage: err.message })
            set({ loading: false })
        }
    },
    updatePassword: async (newPassword) => {
        try {
            set({ loading: true })
            await updatePassword(auth.currentUser, newPassword)
            set({ loading: false })
        } catch (err) {
            set({ errorMessage: err.message })
            set({ loading: false })
        }
    },
    deleteAccount: async () => {
        try {
            set({ loading: true })
            await deleteUser(auth.currentUser)
            set({ loading: false })
        } catch (err) {
            set({ errorMessage: err.message })
            set({ loading: false })
        }
    },
}))

export default useAuthStore
