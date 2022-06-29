import { createSlice } from '@reduxjs/toolkit'
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        sequence: 0,
        done: true,
        isLoggedIn: false,
        user: {},
        users: []
    },
    reducers: {
        initUsers(state, action) {
            return { ...state, users: action.payload, sequence: action.payload.length + 1 }
        },
        login(state, action) {
            state.done = false;
            if (action.payload?.email !== undefined && action.payload?.password !== undefined) {
                let u = state.users.find((us) => us.email === action.payload.email && us.password === action.payload.password)
                if (u !== undefined) {
                    state.isLoggedIn = true
                    state.user = u
                    localStorage.setItem('auth', JSON.stringify(u))
                }
                else alert('Incorrect email or password')
            }
            state.done = true;
        },
        register(state, action) {
            let u = action.payload;
            const user = {
                id: state.sequence,
                fullName: u.fullName,
                email: u.email,
                password: u.password,
                roleId: 2,
            }
            localStorage.setItem('auth', JSON.stringify(user))
            return {
                users: [...state.users, user],
                user: user,
                sequence: state.sequence + 1,
                isLoggedIn: true,
                done: true
            }
        },
        logout(state) {
            state.done = false;
            state.isLoggedIn = false
            state.user = null
            localStorage.clear()
            state.done = true;
        },
    }
})

export const authActions = authSlice.actions
export default authSlice