import React from 'react';
import Footer from '../Footer/Footer';
import styles from './Structure.module.css';
interface StructureProps {
    children: React.ReactNode;
}

export default function Structure({ children }: StructureProps) {
    return (
        <div className={styles.structure}>
            <header className={styles.title}>
                <h1>Simple To Do List</h1>
                <p>Today is awesome day. The weather is awesome, you are awesome too!</p>
            </header>
            <main>{children}</main>
            <Footer />
        </div>
    );
}
