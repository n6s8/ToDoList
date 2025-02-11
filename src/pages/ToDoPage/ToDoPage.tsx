import styles from './ToDoPage.module.css';
import { useNavigate } from 'react-router-dom';
import Plus from '../../assets/plus.png';
import Points from '../../assets/Points.png';
import { useState, useEffect } from 'react';
import Rubbish from '../../assets/rubbish.png';

export default function ToDoPage() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState<string[]>(() => {
        const Tasks = localStorage.getItem('tasks');
        return Tasks ? JSON.parse(Tasks) : ["Football", "Match", "Mail"];
    });

    const [checkedStatus, setCheckedStates] = useState<boolean[]>(() => {
        const CheckedStatus = localStorage.getItem('checkedStatus');
        return CheckedStatus ? JSON.parse(CheckedStatus) : tasks.map(() => false);
    });

    useEffect(() => {
        const Tasks = localStorage.getItem('tasks');
        if (Tasks) {
            setTasks(JSON.parse(Tasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('checkedStatus', JSON.stringify(checkedStatus));
    }, [tasks, checkedStatus]);

    const [newTodo, setNewTodo] = useState<string>('');

    const addTask = () => {
        if (newTodo.trim() === "") return;
        setTasks((prevTasks: string[]) => [...prevTasks, newTodo]);
        setCheckedStates((prevStatus: boolean[]) => [...prevStatus, false]);
        setNewTodo('');
        setVisibility(null);
    };

    const ClickCheckbox = (index: number) => {
        const StatusVerify = [...checkedStatus];
        StatusVerify[index] = !StatusVerify[index];

        if (StatusVerify[index]) {
            const doneTasks = localStorage.getItem('done');
            const NewDoneTasks: string[] = doneTasks ? JSON.parse(doneTasks) : [];
            NewDoneTasks.push(tasks[index]);
            localStorage.setItem('done', JSON.stringify(NewDoneTasks));

            const updatedTasks = tasks.filter((_, i: number) => i !== index);
            const CheckedStatusAfterRemoval = StatusVerify.filter((_, i: number) => i !== index);

            setTasks(updatedTasks);
            setCheckedStates(CheckedStatusAfterRemoval);
        } else {
            setCheckedStates(StatusVerify);
        }
    };

    const [isPressed, setIsPressed] = useState<boolean>(false);

    function ShowMe() {
        setIsPressed(prevIsPressed => !prevIsPressed);
    }

    const [visibility, setVisibility] = useState<number | null>(null);

    const Window = (index: number) => {
        setVisibility(visibility === index ? null : index);
    };

    const moveToTrash = (index: number) => {
        const taskToTrash = tasks[index];
        const updatedTasks = tasks.filter((_, i: number) => i !== index);

        const trash = localStorage.getItem('trash');
        const updatedTrash: string[] = trash ? JSON.parse(trash) : [];
        updatedTrash.push(taskToTrash);
        localStorage.setItem('trash', JSON.stringify(updatedTrash));

        setTasks(updatedTasks);
        setCheckedStates((prevStates: boolean[]) => prevStates.filter((_, i: number) => i !== index));

        setVisibility(null);
    };

    return (
        <div className={styles.Todo}>
            <div className={styles.action}>
                <nav className={styles.nav}>
                    <button className={styles.special} onClick={() => navigate('/todo')}>To Do</button>
                    <button className={styles.usual} onClick={() => navigate('/done')}>Done</button>
                    <button className={styles.usual} onClick={() => navigate('/trash')}>Trash</button>
                </nav>

                <div className={styles.details}>
                    {isPressed && (
                        <div className={styles.adding}>
                            <p className={styles.add}>Add New To Do</p>
                            <input
                                placeholder="Your text"
                                type="text"
                                className={styles.input}
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                            />
                            <button className={styles.BtnAdd} onClick={addTask}>Add</button>
                        </div>
                    )}
                    <button className={styles.plus} onClick={ShowMe}>
                        <img src={Plus} className={styles.plus} alt="plus"/>
                    </button>
                </div>
            </div>

            <div className={styles.List}>
                <div className={styles.Block}>
                    <h2 className={styles.Text}>To Do</h2>
                    <div className={styles.Divider}></div>
                </div>

                {tasks.map((task: string, index: number) => (
                    <div key={index} className={checkedStatus[index] ? styles.SelectRed : styles.main}>
                        <div className={styles.Select}>
                            <button className={styles.Box1} onClick={() => Window(index)}>
                                <img src={Points} alt="Points" className={styles.Points} />
                            </button>
                            <div className={styles.Box}>
                                <input
                                    type="checkbox"
                                    className={styles.CheckBox}
                                    checked={checkedStatus[index]}
                                    onChange={() => ClickCheckbox(index)}
                                />
                            </div>
                        </div>

                        <input type="text" value={task} className={styles.taskInput} readOnly />

                        {visibility === index && (
                            <div className={styles.DropdownMenu} onClick={() => moveToTrash(index)}>
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
