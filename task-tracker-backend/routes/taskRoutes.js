const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const verifyToken = require('../middleware/authMiddleware')
const { default: mongoose } = require('mongoose')

router.post('/', verifyToken, async (req, res) => {
    const { title } = req.body

    if (!title) {
        return res.status(400).json({ message: "Title is required" })
    }

    try {
        const newTask = new Task({
            title,
            user: req.user.userId,
        })

        const savedTask = await newTask.save()
        res.status(201).json(savedTask)
    } catch (error) {
        res.status(500).json({ message: "Server error while creating task" })
    }
})

router.get('/', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId }).sort({ createdAt: -1 })
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching tasks." });
    }
})

router.put('/:id', verifyToken, async (req, res) => {
    const { title, completed } = req.body

    try {
        //find the task by ID
        const task = await Task.findById(req.params.id)

        //Task not found
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        //check if the task belongs to logged-in user
        if (task.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized to update this task" })
        }


        //  Update fields if provided
        if (title !== undefined) task.title = title
        if (completed !== undefined) task.completed = completed

        //save updated task
        const updatedTask = await task.save()
        res.json(updatedTask)

    } catch (error) {
        console.log(error.message);

        res.status(500).json({ message: 'Server error while updating task' });
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    try {

        //validate task id
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid task id" })
        }

        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        //check if task belongs to the user
        if (task.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized to delete this task" })
        }

        await task.deleteOne()
        res.json({ message: "Task deleted successfully" })

    } catch (error) {
        console.error("Delete Error:", error.message);
        res.status(500).json({ message: "Server error while deleting task" });
    }
})

module.exports = router

