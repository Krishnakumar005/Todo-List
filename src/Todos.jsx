import styles from './Todos.module.css'

export const Todos = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className={styles.todosBg}>
      <div className={styles.todosContainer}>
        <div className={styles.sectionTitle}>My Tasks</div>
        <ul className={styles.todosList}>
          {tasks.map(task => (
            <li
              key={task.id}
              className={styles.todoItem + (task.completed ? ' ' + styles.completed : '')}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                className={styles.todoCheckbox}
                aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
              />
              <div className={styles.todoContent}>
                <span className={styles.todoTitle}>{task.title}</span>
                {task.description && (
                  <span className={styles.todoDescription}>{task.description}</span>
                )}
              </div>
              <div className={styles.todoActions}>
                <button
                  onClick={() => onEdit(task)}
                  className={styles.iconBtn}
                  aria-label={`Edit task ${task.title}`}
                  title="Edit"
                >
                  {/* Modern Pencil SVG */}
                  <svg className={styles.editIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className={styles.iconBtn}
                  aria-label={`Remove task ${task.title}`}
                  title="Delete"
                >
                  {/* Modern Trash SVG */}
                  <svg className={styles.deleteIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
        {tasks.length === 0 && (
          <div className={styles.todosEmpty}>No ToDo yet. Add your First Task!</div>
        )}
      </div>
    </div>
  )
}