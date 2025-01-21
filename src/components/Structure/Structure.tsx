import Footer from '../Footer/Footer';
import styles from './Structure.module.css';
import {Outlet} from "react-router-dom";
export default function Structure() {
    return (
        <div className={styles.structure}>
            <header className={styles.title}>
                <h1>Simple To Do List</h1>
                <p>Today is awesome day. The weather is awesome, you are awesome too!</p>
            </header>
            <main>
                <Outlet/>
            </main>
            <Footer />
        </div>
    );
}
