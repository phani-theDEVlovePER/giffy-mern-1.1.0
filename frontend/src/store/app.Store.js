import { create } from "zustand"
import axios from "axios"
import toast from "react-hot-toast"

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api"
// const API_URL = "http://localhost:5000/api/auth"

axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, { email, password, name })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error SigningUp", isLoading: false })
            throw error
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
            toast.success("Login successful..🥰")
        } catch (error) {
            toast.error("check your internet and user credentials")
            set({ error: error?.response?.data?.message || "Error Logging In", isLoading: false })
            throw error
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/auth/logout`)
            set({ user: null, isAuthenticated: false, isLoading: false, error: null })
            toast.success("Logout successful..😕")
        } catch (error) {
            set({ error: error.response.data.message || "Error Logging Out", isLoading: false })
            toast.error("check your internet and try again")
            throw error
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/auth/verify-email`, { code })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
            return response.data
        } catch (error) {
            set({ error: error.response.data.message || "Error Verifying Email", isLoading: false })
            throw error
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null })
        try {
            const response = await axios.get(`${API_URL}/auth/check-auth`)
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false })
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false })
            // console.log("Error in checkAuth:", error);
            throw error
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/auth/forgot-password`, { email })
            set({ message: response.data.message, isLoading: false, error: null })
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || "Error Sending Reset Password Email", isLoading: false })
            throw error
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password })
            set({ message: response.data.message, isLoading: false, error: null })
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || "Error Resetting Password" })
            throw error
        }
    },

}))

export const useAiStore = create((set) => ({
    data: null,
    isLoading: false,
    error: null,

    heart: async (PROMPT) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/heart`, { PROMPT })
            set({ data: response.data, isLoading: false })
        } catch (error) {
            toast.error("check your internet and try again")
            set({ error: error.response.data.message || "Error Fetching Prompt", isLoading: false })
            throw error
        }
    }
}))