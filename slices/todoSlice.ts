import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface TodoState {
    isEditing: boolean
    id: number
    value: string
}

const CreateTask: TodoState[] = []

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        CreateTask,
        textField: '',
    },
    reducers: {
        addTodo: (state, action: PayloadAction<TodoState>) => {
            if (action.payload.value.trim() !== '') {
                state.CreateTask.unshift({
                    isEditing: action.payload.isEditing,
                    id: Date.now(),
                    value: action.payload.value,
                })
            } else {
                alert('Cannot add an empty todo')
            }
        },

        deleteTodo: (state, action: PayloadAction<TodoState>) => {
            const todosToRemove = state.CreateTask.filter(
                (todo) => todo.id === action.payload.id
            )
            if (todosToRemove.length > 0) {
                state.CreateTask = state.CreateTask.filter(
                    (todo) => !todosToRemove.includes(todo)
                )
            } else {
                alert('Todo not found')
            }
        },

        updateTodo: (state, action: PayloadAction<TodoState>) => {
            const index = state.CreateTask.findIndex(
                (todo) => todo.id === action.payload.id
            )
            if (index !== -1) {
                state.CreateTask[index].value = action.payload.value
                state.CreateTask[index].isEditing = false
            } else {
                alert('Todo not found')
            }
        },

        resetTextField: (state) => {
            state.textField = ''
        },
    },
})

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, updateTodo, resetTextField } =
    todoSlice.actions
export const CreateTodo = (state: RootState) => state.todo.CreateTask
export default todoSlice.reducer
