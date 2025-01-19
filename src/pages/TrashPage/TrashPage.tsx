import { useNavigate } from 'react-router-dom';
import Plus from '../../assets/plus.png';
import styles from './TrashPage.module.css';
import { useState } from "react";
import Points from "../../assets/Points.png";
import RubbishIcon from "../../assets/rubbish.png";
import ToDoIcon from "../../assets/ToDo.png";

export default function TrashPage() {
    const navigate = useNavigate();
    const [isPressed, setIsPressed] = useState(false);
    const [newTask, setNewTask] = useState('');

    const [trashs, setTrash] = useState(() => {
        const savedTasks = localStorage.getItem('trash');
        return savedTasks ? JSON.parse(savedTasks) : ["Mu", "Chealse", "Man City"];
    });

    const UpdateLocalStorage = () => {
        if (newTask.trim() === "") return;
        const oldTasks = localStorage.getItem('tasks');
        const newTasks = oldTasks ? JSON.parse(oldTasks) : [];
        newTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setNewTask('');
    };

    function ShowMe() {
        setIsPressed(prevIsPressed => !prevIsPressed);
    }

    const [visibility, setVisibility] = useState(null);

    const Window = (index) => {
        if (visibility === index) {
            setVisibility(null);
        } else {
            setVisibility(index);
        }
    };

    const deleteForever = (index) => {
        const newTrash = trashs.filter((_, i) => i !== index);
        setTrash(newTrash);
        localStorage.setItem('trash', JSON.stringify(newTrash));

        setVisibility(null);
    };

    const moveBackToTodo = (index) => {
        const addingTask = trashs[index];
        const newTrash = trashs.filter((_, i) => i !== index);

        const oldTasks = localStorage.getItem('tasks');
        const newTasks = oldTasks ? JSON.parse(oldTasks) : [];
        newTasks.push(addingTask);
        localStorage.setItem('tasks', JSON.stringify(newTasks));

        setTrash(newTrash);
        localStorage.setItem('trash', JSON.stringify(newTrash));

        setVisibility(null);
    };

    return (
        <div className="trash-list">
            <div className={styles.action}>
                <nav className={styles.nav}>
                    <button className={styles.usual} onClick={() => navigate('/todo')}>To Do</button>
                    <button className={styles.usual} onClick={() => navigate('/done')}>Done</button>
                    <button className={styles.special} onClick={() => navigate('/trash')}>Trash</button>
                </nav>

                <div className={styles.details}>
                    {isPressed && (
                        <div className={styles.adding}>
                            <p className={styles.add}>Add New To Do</p>
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
                        </div>
                    )}
                    <button className={styles.plus} onClick={ShowMe}>
                        <img src={Plus} className={styles.plus} alt="plus"/>
                    </button>
                </div>
            </div>

            <div className={styles.List}>
                <div className={styles.Block}>
                    <h2 className={styles.Text}>Trash</h2>
                    <div className={styles.Divider}></div>
                </div>

                {trashs.map((task, index) => (
                    <div
                        key={index}
                        className={styles.main}
                    >
                        <div className={styles.Select}>
                            <button
                                className={styles.Box1}
                                onClick={() => Window(index)}
                            >
                                <img src={Points} alt="Points" className={styles.Points} />
                            </button>
                            {visibility === index && (
                                <div className={styles.DropdownMenu}>
                                         <p className={styles.WindowBlock} onClick={() => deleteForever(index)}>
                                            <img src={RubbishIcon} alt="Rubbish Icon" className={styles.RubbishIcon}/>
                                            <span className={styles.TextStyle}>Delete Forever</span>
                                        </p>

                                        <p className={styles.WindowBlock} onClick={() => moveBackToTodo(index)}>
                                            <img src={ToDoIcon} alt="ToDo Icon" className={styles.ToDoIcon}/>
                                            <span className={styles.TextStyle}>Move Back To To Do</span>
                                        </p>

                                </div>
                            )}
                        </div>

                        <input
                            type="text"
                            value={task}
                            className={styles.taskInput}
                        />
                    </div>
                ))}

            </div>
        </div>
    );
}
