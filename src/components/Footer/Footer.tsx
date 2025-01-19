import styles from './Footer.module.css';
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.Frame}>
                <p className={styles.left}>Made with <span>&#10084;</span> at Factorial in 2022.</p>
                <p className={styles.right}>Credits: Icons from <a href="https://icons8.com/">Icons8</a></p>
            </div>

        </footer>
    );
}
