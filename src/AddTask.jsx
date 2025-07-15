import { useState, useEffect } from 'react';
import styles from './AddTask.module.css';

export default function AddTask({ onSave, onCancel, editingTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    onSave({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
  };

  return (
    <div className={styles.addTaskBg}>
      <div className={styles.addTaskContainer}>
        <h3 className={styles.addTaskTitle}>{editingTask ? 'Edit Task' : 'Add Task'}</h3>
        <form className={styles.addTaskForm} onSubmit={handleSubmit}>
          <label htmlFor="title" className={styles.addTaskLabelTitle}>Title</label>
          <input
            id="title"
            type="text"
            className={styles.addTaskInput}
            placeholder="Task Title (required)"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          <label htmlFor="description" className={styles.addTaskLabelDescription}>Description</label>
          <textarea
            id="description"
            className={styles.addTaskInput}
            placeholder="Task Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
          />
          <div className={styles.addTaskActions}>
            <button
              type="submit"
              className={styles.addBtn}
              disabled={!title.trim()}
            >
              {editingTask ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 