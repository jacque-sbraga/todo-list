import { Trash } from 'phosphor-react';
import styles from './Task.module.css';

type Task = {
    id: string
    description: string,
    isComplete: boolean,
}

type TaskProps = {
    tasks: Task[],
    onDeleteTask: (task:Task) => void,
    onUpdateTask: (task:Task) => void
}

export function Task ({tasks, onDeleteTask, onUpdateTask}:TaskProps) {

    function taskItem (task:Task) {
        return (
            <li 
                key={task.id}
                className={styles.taskItem}
            >
                <div>
                    <label className={styles.check}>
                        <input type='checkbox'
                            checked={task.isComplete} 
                            value={`${task.isComplete}`} 
                            onChange={() => handleUpdateTask(task)}
                        />
                        <span className={styles.checkmark}></span>
                    </label>
                    <p 
                        className={task.isComplete? 
                        styles.taskCompleted 
                        :styles.description
                        }
                    >{task.description}</p>
                </div>
                <button 
                    type='button' onClick={() => handleDeleteTask(task)}>
                    <Trash size={16} weight='bold'/>
                </button>
            </li>
        )
    }

    function handleDeleteTask(task:Task){
        onDeleteTask(task);
    }

    function handleUpdateTask(task:Task){
        onUpdateTask(task);
    }
    
    return (
        <ul>
            {
                tasks.map(taskItem)
            }
        </ul>
    )
}