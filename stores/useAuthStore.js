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

const authStore = create((set, get) => ({
    user: null,
    userData: null,
    loading: true,
    errorMessage: null,
    authListener: () => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const userDocRef = doc(db, `users/${authUser.uid}`)
                let userData = await getDoc(userDocRef)
                if (!userData.exists()) {
                    try {
                        const { displayName, email, photoURL, uid } = authUser
                        await setDoc(userDocRef, {
                            displayName,
                            email,
                            uid,
                            photoURL,
                            updatedAt: serverTimestamp(),
                        })
                    } catch (e) {
                        console.log(`Error when creating the user document`, e.message)
                    }
                }
                userData = await getDoc(userDocRef)
                set({ user: authUser })
                set({ userData: userData.data() })
                set({ loading: false })
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

const useAuthStore = () => {
    return authStore(
        (store) => ({
            user: store.user,
            userData: store.userData,
            loading: store.loading,
            errorMessage: store.errorMessage,
            authListener: store.authListener,
            login: store.login,
            logout: store.logout,
            register: store.register,
            resetPassword: store.resetPassword,
            updatePassword: store.updatePassword,
            deleteAccount: store.deleteAccount,
            publicRoutes: store.publicRoutes,
            authRoutes: store.authRoutes,
        }),
        shallow,
    )
}

export default useAuthStore
