import { ClipboardText } from 'phosphor-react';
import styles from './TodoEmpty.module.css';
import Clipboard from '../assets/Clipboard.svg';

export function TodoEmpty(){
    return (
        <div className={styles.todoEmpty}>
            <img src={Clipboard} alt="Você ainda não tem tarefas"/>
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
    )
}