import styles from "../components/Structure/Structure.module.css";
import Footer from "../components/Footer/Footer.tsx";
import { useEffect, useState} from "react";

enum Filter{
    All="all",
    Done="done",
    Active="active"
}

export const Todolist = () => {
    const [tasks,setTasks] = useState(
        [
            {id:1, name: "Football", done: false},
            {id:2, name: "Match", done: false},
            {id:3, name: "Mail", done: false},
        ]
    )
    const [filter, setFilter] = useState<Filter>(Filter.All)
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const filterTasks = (filter:Filter) =>{
        switch (filter){
            case Filter.All:
                setFilteredTasks(tasks)
                break
            case Filter.Done:
                setFilteredTasks(tasks.filter(task=>task.done))
                break
            case Filter.Active:
                setFilteredTasks(tasks.filter(task=>!task.done))
                break
        }
    }

    const changeTaskStatus = (id:number) =>{
        const newTasks = tasks.map(task=>{
            if(task.id === id){
                return {...task, done: !task.done}
            }
            return task
        })
        setTasks(newTasks)
    }

    useEffect(() => {
        filterTasks(filter)
    }, [tasks,filter]);
    return (
        <div className={styles.structure}>
            <header className={styles.title}>
                <h1>Simple To Do List</h1>
                <p>Today is awesome day. The weather is awesome, you are awesome too!</p>
            </header>
            <main>
                <div className={styles.Todo}>
                    <div className={styles.action}>
                        <nav className={styles.nav}>
                            <button className={styles.special} onClick={()=>setFilter(Filter.Active)}>To Do</button>
                            <button className={styles.usual} onClick={() =>setFilter(Filter.Done)}>Done</button>
                        </nav>
                    </div>

                    <div className={styles.List}>
                        <div className={styles.Block}>
                            <h2 className={styles.Text}>{filter}</h2>
                            <div className={styles.Divider}></div>
                        </div>

                        {filteredTasks.map((task)=>{
                            return (
                                <div style={{display:"flex"}}>
                                    <input type="checkbox" checked={task.done} onChange={()=>{changeTaskStatus(task.id)}}/>
                                    <p>{task.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

