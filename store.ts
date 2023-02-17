import { configureStore } from '@reduxjs/toolkit'
import {
    PERSIST,
    persistReducer,
    persistStore,
    REGISTER,
    REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import todoReducer from './slices/todoSlice'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, todoReducer)

export const store = configureStore({
    reducer: {
        todo: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [REHYDRATE, PERSIST, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {todo: TodoState}
export type AppDispatch = typeof store.dispatch
