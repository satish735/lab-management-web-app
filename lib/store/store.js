import { configureStore } from '@reduxjs/toolkit'
import testReducer from '@/lib/store/features/test/testSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            test: testReducer
        },
    })
}