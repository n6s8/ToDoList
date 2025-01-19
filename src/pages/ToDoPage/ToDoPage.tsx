import styles from './ToDoPage.module.css';
import { useNavigate } from 'react-router-dom';
import Plus from '../../assets/plus.png';
import Points from '../../assets/Points.png';
import { useState, useEffect } from 'react';
import Rubbish from '../../assets/Rubbish.png';


export default function ToDoPage() {
    const navigate = useNavigate();


    const [tasks, setTasks] = useState(() => {
        const Tasks = localStorage.getItem('tasks');
        return Tasks ? JSON.parse(Tasks) : ["Football", "Match", "Mail"];
    });

    const [checkedStatus, setCheckedStates] = useState(() => {
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

    const [newTodo, setNewTodo] = useState('');

    const addTask = () => {
        if (newTodo.trim() === "") return;
        setTasks((prevTasks) => [...prevTasks, newTodo]);
        setCheckedStates((prevStatus) => [...prevStatus, false]);
        setNewTodo('');
        setVisibility(null);
    };


    const ClickCheckbox = (index) => {
        const StatusVerify = [...checkedStatus];
        StatusVerify[index] = !StatusVerify[index];

        if (StatusVerify[index]) {

            const doneTasks = localStorage.getItem('done');
            const NewDoneTasks = doneTasks ? JSON.parse(doneTasks) : [];
            NewDoneTasks.push(tasks[index]);
            localStorage.setItem('done', JSON.stringify(NewDoneTasks));


            const updatedTasks = tasks.filter((_, i) => i !== index);
            const CheckedStatusAfterRemoval = StatusVerify.filter((_, i) => i !== index);

            setTasks(updatedTasks);
            setCheckedStates(CheckedStatusAfterRemoval);
            StatusVerify[index] = !StatusVerify[index]
            const Status = StatusVerify;
            setCheckedStates(Status);
        } else {
            setCheckedStates(StatusVerify);
        }
    };




    const [isPressed, setIsPressed] = useState(false);

    function ShowMe (){
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

    const moveToTrash = (index) => {
        const taskToTrash = tasks[index];
        const updatedTasks = tasks.filter((_, i) => i !== index);

        const trash = localStorage.getItem('trash');
        const updatedTrash = trash ? JSON.parse(trash) : [];
        updatedTrash.push(taskToTrash);
        localStorage.setItem('trash', JSON.stringify(updatedTrash));

        setTasks(updatedTasks);
        setCheckedStates((prevStates) => prevStates.filter((_, i) => i !== index));

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
                    {isPressed && (<div className={styles.adding}>
                        <p className={styles.add}>
                            Add New To Do
                        </p>
                        <input placeholder="Your text" type="text" className={styles.input} value={newTodo}
                               onChange={(e) => setNewTodo(e.target.value)}/>
                        <button className={styles.BtnAdd} onClick={addTask}>
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
                    <h2 className={styles.Text}>To Do</h2>
                    <div className={styles.Divider}></div>
                </div>

                {tasks.map((task, index) => (
                    <div
                        key={index}
                        className={checkedStatus[index] ? styles.SelectRed : styles.main}
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
                                    checked={checkedStatus[index]}
                                    onChange={() => ClickCheckbox(index)}
                                />
                            </div>
                        </div>

                        <input
                            type="text"
                            value={task}
                            className={styles.taskInput}
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
