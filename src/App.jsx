import { useState } from 'react'
import { Todos } from './Todos.jsx'
import AddTask from './AddTask.jsx'
import styles from './App.module.css'

const initialTodos = [
  {
    id: 1,
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, and fruits',
    completed: false
  },
  {
    id: 2,
    title: 'Finish React project',
    description: 'Complete the UI and connect to backend',
    completed: false
  },
  {
    id: 3,
    title: 'Read a book',
    description: 'Read at least 30 pages of a new book',
    completed: true
  },
  {
    id: 4,
    title: 'Workout',
    description: '30 minutes of cardio and strength training',
    completed: false
  },
  {
    id: 5,
    title: 'Call Mom',
    description: 'Check in and see how she is doing',
    completed: false
  }
]

function App() {
  const [tasks, setTasks] = useState(initialTodos)
  const [page, setPage] = useState('home') // 'home' or 'addTask'
  const [editingTask, setEditingTask] = useState(null)

  // Add new task
  const handleAddTask = ({ title, description }) => {
    setTasks([...tasks, { id: Date.now(), title, description, completed: false }])
    setPage('home')
  }

  // Edit existing task
  const handleEditTask = ({ title, description }) => {
    setTasks(tasks.map(task =>
      task.id === editingTask.id ? { ...task, title, description } : task
    ))
    setEditingTask(null)
    setPage('home')
  }

  // Delete task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Toggle completed
  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // Start editing
  const handleStartEdit = (task) => {
    setEditingTask(task)
    setPage('addTask')
  }

  // Cancel add/edit
  const handleCancel = () => {
    setEditingTask(null)
    setPage('home')
  }

  // Go to add page
  const handleGoToAdd = () => {
    setEditingTask(null)
    setPage('addTask')
  }

  return (
    <div className={styles.appBg}>
      {/* Nav Bar */}
      <nav className={styles.navBar}>
        <div className={styles.navOuter}>
          <span className={styles.brand}>
          
            TODOMASTER
          </span>
          <div className={styles.navLinks}>
            <button
              onClick={() => { setPage('home'); setEditingTask(null); }}
              className={page === 'home' ? styles.activeNavBtn : styles.navBtn}
            >
              Home
            </button>
            <button
              onClick={handleGoToAdd}
              className={page === 'addTask' ? styles.activeNavBtn : styles.navBtn}
            >
              Add Task
            </button>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      {page === 'home' ? (
        <Todos
          tasks={tasks}
          onEdit={handleStartEdit}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      ) : (
        <AddTask
          onSave={editingTask ? handleEditTask : handleAddTask}
          onCancel={handleCancel}
          editingTask={editingTask}
        />
      )}
    </div>
  )
}

export default App
