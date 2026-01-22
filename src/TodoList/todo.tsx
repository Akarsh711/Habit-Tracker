

import type { Task } from '../App';
import './style.css';

interface TodoListProps {
    tasks: Task[];
    deleteTask: (id: string) => void;
    toggleComplete: (id: string) => void;
}

function TodoList({ tasks, deleteTask, toggleComplete }: TodoListProps) {

    return (
        <div className='todo-list-container'>
            {tasks.map((task) => (
                <div key={task.id} className='list-item'>
                    <label style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        <input type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(task.id)} />
                        {task.text}
                    </label>
                    <div
                        className='cancel-button'
                        onClick={() => deleteTask(task.id)}
                    >
                        X
                    </div>
                </div>
            ))}

        </div>
    )
}

export default TodoList



