import { useState } from 'react';
import 'react-calendar-heatmap/dist/styles.css';
import './style.css';

function TodoListForm({ addTask }: { addTask: (text: string) => void }) {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (text.trim()) {
            addTask(text);
            setText('');
        }
    };

    return (
        <>
            <div className='form-container'>
                <div className='form'>
                    <input
                        type="text"
                        placeholder="Add a Habit"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button onClick={handleSubmit}>+</button>
                </div>
            </div>
        </>
    )
}

export default TodoListForm
