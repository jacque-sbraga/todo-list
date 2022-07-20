import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react";
import styles from './Todo.module.css';
import { v4 as uuidv4 } from 'uuid';
import { TodoEmpty } from "./TodoEmpty";
import { Task } from "./Task";

type Task = {
    id: string
    description: string,
    isComplete: boolean,
}

export function Todo(){
    const [newTaskText, setNewTask] = useState('');
    const [tasks, setTasks] = useState<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]'))
    let totalTasks = tasks.length;
    let totalTasksCompleted = tasks.filter(task => task.isComplete).length;


    useEffect(() => {
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity('');
        setNewTask(event.target.value);
    }

    function hanldeNewTaskInvalid(event: InvalidEvent<HTMLInputElement>){
        event.target.setCustomValidity('Este campo é obrigatório');
    }

    function handleCreateNewTask(event: FormEvent){ 
        event.preventDefault();
        const newTask = {
            id: uuidv4(),
            description: newTaskText,
            isComplete: false
        }
        setTasks(state => {
            return [...state, newTask]
        });
        
        setNewTask('');
    }

    function deleteTask (taskToDelete:Task){
        const tasksWithoutDeletedOne = tasks.filter((task) => task.id !== taskToDelete.id);
        setTasks(tasksWithoutDeletedOne);
    }

    function updateTask(taskToUpdate:Task){
        const updatedTasks = tasks.map(task => {
            if(task.id === taskToUpdate.id) {
                return {
                    ...task,
                    isComplete: !task.isComplete
                }
            }
            return task;
        })

        setTasks(updatedTasks);
    }

    function listTodo(){
        if(tasks.length === 0) {
            return <TodoEmpty />
        }

        return <Task 
                    tasks={tasks} 
                    onDeleteTask={deleteTask}
                    onUpdateTask={updateTask}
                />
    }
    return (
        <div>
            <form  
                action="" 
                onSubmit={handleCreateNewTask}
                className={styles.form}>
                    <input 
                        required
                        type='text' 
                        placeholder='Adicione uma nova tarefa'
                        aria-label='Adicione uma nova tarefa'
                        value={newTaskText}
                        onChange={handleNewTaskChange}
                        onInvalid={hanldeNewTaskInvalid}
                    />

                    <button type='submit'>
                        Criar <PlusCircle size={16} weight="bold" />
                    </button>
            </form>
            <section className={styles.tasks}>
                <div className={styles.info}>
                    <p className={styles.total}>Tarefas criadas <span>{totalTasks}</span></p>
                    <p className={styles.completed}>
                        Concluídas 
                        <span>{`${totalTasksCompleted} de ${totalTasks}`}</span>
                    </p>
                </div>
                <div>
                    {
                        listTodo()
                    }
                </div>
            </section>
        </div>
    )
}
