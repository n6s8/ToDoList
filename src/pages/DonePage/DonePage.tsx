import styles from './DonePage.module.css';
import { useNavigate } from 'react-router-dom';
import Plus from '../../assets/plus.png';
import { useState } from "react";
import Points from "../../assets/Points.png";
import Rubbish from "../../assets/Rubbish.png";

export default function DonePage() {
    const navigate = useNavigate();

    const [isPressed, setIsPressed] = useState(false);
    const [newTask, setNewTask] = useState('');

    const [done, setDone] = useState(() => {
        const savedTasks = localStorage.getItem('done');
        return savedTasks ? JSON.parse(savedTasks) : ["Football", "Match", "Mail"];
    });

    const [visibility, setVisibility] = useState(null);

    const Window = (index) => {
        if (visibility === index) {
            setVisibility(null);
        } else {
            setVisibility(index);
        }
    };

    const UpdateLocalStorage = () => {
        if (newTask.trim() === "") return;
        const prevTasks = localStorage.getItem('tasks');
        const newTasks = prevTasks ? JSON.parse(prevTasks) : [];
        newTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setNewTask('');
    };

    const moveToTrash = (index) => {
        const TrashTask = done[index];
        const newDone = done.filter((_, i) => i !== index);

        const trash = localStorage.getItem('trash');
        const newTrash = trash ? JSON.parse(trash) : [];
        newTrash.push(TrashTask);
        localStorage.setItem('trash', JSON.stringify(newTrash));

        setDone(newDone);
        localStorage.setItem('done', JSON.stringify(newDone));

        setVisibility(null);
    };

    const clickCheckbox = (index) => {
        const task = done[index];
        const newDone = done.filter((_, i) => i !== index);

        const toDoList = localStorage.getItem('tasks');
        const newTodo = toDoList ? JSON.parse(toDoList) : [];
        newTodo.push(task);
        localStorage.setItem('tasks', JSON.stringify(newTodo));

        setDone(newDone);
        localStorage.setItem('done', JSON.stringify(newDone));
    };

    function ShowMe() {
        setIsPressed(prevIsPressed => !prevIsPressed);
    }

    return (
        <div className="done-list">
            <div className={styles.action}>
                <nav className={styles.nav}>
                    <button className={styles.usual} onClick={() => navigate('/todo')}>To Do</button>
                    <button className={styles.special} onClick={() => navigate('/done')}>Done</button>
                    <button className={styles.usual} onClick={() => navigate('/trash')}>Trash</button>
                </nav>

                <div className={styles.details}>
                    {isPressed && (<div className={styles.adding}>
                        <p className={styles.add}>
                            Add New To Do
                        </p>
                        <input
                            placeholder="Your text"
                            type="text"
                            className={styles.input}
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <button className={styles.BtnAdd} onClick={UpdateLocalStorage}>
                            Add
                        </button>
                    </div>)}
                    <button className={styles.plus} onClick={ShowMe}>
                        <img src={Plus} className={styles.plus} alt="plus"/>
                    </button>
                </div>
            </div>

            <div className={styles.List}>
                <div className={styles.Block}>
                    <h2 className={styles.Text}>Done</h2>
                    <div className={styles.Divider}></div>
                </div>

                {done.map((task, index) => (
                    <div
                        key={index}
                        className={styles.SelectRed}
                    >
                        <div className={styles.Select}>
                            <button
                                className={styles.Box1}
                                onClick={() => Window(index)}
                            >
                                <img src={Points} alt="Points" className={styles.Points} />
                            </button>
                            <div className={styles.Box}>
                                <input
                                    type="checkbox"
                                    className={styles.CheckBox}
                                    checked={true}
                                    onChange={() => clickCheckbox(index)}
                                />

                            </div>
                        </div>

                        <input
                            type="text"
                            value={task}
                            className={styles.CheckedtaskInput}
                            readOnly
                        />

                        {visibility === index && (
                            <div
                                className={styles.DropdownMenu}
                                onClick={() => moveToTrash(index)}
                            >
                                <p className={styles.DropdownItem}>
                                    <img className={styles.RubbishIcon} src={Rubbish} alt="Rubbish Icon"/>
                                    <span className={styles.TextStyle}>Move to Trash</span>
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
