import React, { useEffect, useState } from 'react'
import api from '../services/api'

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/tasks')
                setTasks(response.data)
                setLoading(false)
            } catch (error) {
                setError(error.response?.data?.message || "Failed to load tasks")
                setLoading(false)
            }
        }
        fetchTasks()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">📝 My Tasks</h2>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        if (!newTask.trim()) return

                        try {
                            const response = await api.post('/tasks', { title: newTask })
                            setTasks([response.data, ...tasks])
                            setNewTask('')
                        } catch (error) {
                            setError(error.response?.data?.message || "Failed to add task")
                        }
                    }}
                    className="flex gap-2 mb-6"
                >
                    <input
                        type="text"
                        value={newTask}
                        placeholder="Enter a task"
                        onChange={(e) => setNewTask(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Add
                    </button>
                </form>

                {loading && <p className="text-gray-500">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {tasks.length > 0 ? (
                    <ul className="space-y-3">
                        {tasks.map((task) => (
                            <li
                                key={task._id}
                                className="flex justify-between items-center bg-gray-50 p-3 rounded-md border"
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`text-lg  ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}>
                                        {task.title}
                                    </span>
                                    <span>{task.completed ? '✅' : '❌'}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={async () => {
                                            try {
                                                const updated = await api.put(`/tasks/${task._id}`, {
                                                    completed: !task.completed
                                                })
                                                setTasks((prev) =>
                                                    prev.map((t) =>
                                                        t._id === task._id
                                                            ? { ...t, completed: updated.data.completed }
                                                            : t
                                                    )
                                                )
                                            } catch (err) {
                                                setError(err.response?.data?.message || 'Failed to update task')
                                            }
                                        }}
                                        className="text-sm bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                                    >
                                        {task.completed ? 'Undo' : 'Done'}
                                    </button>
                                    <button
                                        onClick={async () => {
                                            try {
                                                await api.delete(`/tasks/${task._id}`)
                                                setTasks(tasks.filter((t) => t._id !== task._id))
                                            } catch (error) {
                                                setError(error.response?.data?.message || "Failed to delete task")
                                            }
                                        }}
                                        className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p className="text-center text-gray-500">No tasks found.</p>
                )}
            </div>
        </div>
    )
}

export default Dashboard
