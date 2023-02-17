import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addTodo,
    CreateTodo,
    deleteTodo,
    resetTextField,
    TodoState,
    updateTodo,
} from '../slices/todoSlice'

export const TODO = () => {
    const todoTask = useSelector(CreateTodo)
    const dispatch = useDispatch()
    const [add, setAdd] = useState<string | null>('')
    const [edit, setEdit] = useState<string>('')
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editingId, setEditingId] = useState<number | null>(null)

    const [todoList, setTodoList] = useState<TodoState[]>(todoTask)

    const handleEdit = (id: number) => {
        setEditingId(id)
        setTodoList(
            todoList.map((item) =>
                item.id === id ? { ...item, isEditing: true } : item
            )
        )
        const task = todoList.find((item) => item.id === id)?.value
        if (task) setEdit(task)
    }
    const handleSave = (id: number) => {
        if (edit.trim() !== '') {
            setTodoList(
                todoList.map((item) =>
                    item.id === editingId
                        ? { ...item, isEditing: false, value: edit }
                        : item
                )
            )
            dispatch(
                updateTodo({
                    id: editingId,
                    value: edit,
                    isEditing: false,
                })
            )
            setEdit('')
            setEditingId(null)
        } else {
            alert('Cannot save empty todo')
        }
    }

    useEffect(() => {
        setTodoList(todoTask)
    }, [todoTask])

    return (
        <>
            <Typography sx={{ textAlign: 'center', p: 3 }} variant="h3">
                To-Do App
            </Typography>
            <Grid container textAlign={'center'} sx={{ mt: 3 }}>
                <Grid item xs={6} sm={6}>
                    <TextField
                        label="Add a to-do"
                        value={add}
                        variant="standard"
                        onChange={(e) => {
                            setAdd(e.target.value)
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={6} mt={2}>
                    <Button
                        onClick={() => {
                            dispatch(
                                addTodo({
                                    isEditing: false,
                                    id: Date.now(),
                                    value: String(add),
                                })
                            )
                            dispatch(resetTextField())
                            setAdd('')
                        }}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={10} sm={10} p={3} mt={4}>
                {todoList.map((task: TodoState) => (
                    <Card
                        key={task.id}
                        style={{ maxWidth: '290', marginTop: '1rem' }}
                    >
                        <CardContent>
                            {task.isEditing && task.id === editingId ? (
                                <TextField
                                    variant="standard"
                                    value={edit}
                                    onChange={(e: any) => {
                                        setEdit(e.target.value)
                                    }}
                                ></TextField>
                            ) : (
                                <Typography variant="body1">
                                    {task.value}
                                </Typography>
                            )}
                        </CardContent>
                        <CardActions>
                            <IconButton
                                onClick={() =>
                                    dispatch(
                                        deleteTodo({
                                            isEditing: false,
                                            id: task.id,
                                            value: '',
                                        })
                                    )
                                }
                            >
                                <DeleteIcon color="secondary" />
                            </IconButton>
                            {task.id !== editingId ? (
                                <IconButton onClick={() => handleEdit(task.id)}>
                                    <EditIcon color="secondary" />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => handleSave(task.id)}>
                                    <SaveIcon color="secondary" />
                                </IconButton>
                            )}
                        </CardActions>
                    </Card>
                ))}
            </Grid>
        </>
    )
}
