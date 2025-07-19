import styles from '../styles/AboutUs.module.css';

export default function AboutPage() {
    return (
        <div className={`${styles.div} min-h-screen w-full flex flex-col items-center justify-center overflow-hidden`}>
            <img className={styles.child} alt="" src="../AboutUs/Head.svg" />

            <div className={styles.aboutUsContainer}>
                <img className={styles.groupChild} alt="" src="../Intersect.svg" />
                <div className={styles.aboutUs}>About Us</div>
            </div>

            <div className={styles.theHumanVooooiceContainer}>
                <p>
                    The <span className={styles.humanVooooice}>Human Vooooice</span> Amid the Tide of Technology
                </p>
            </div>

            <div className={styles.weAreAContainer}>
                <p>We are a group of young people who believe in the future.</p>
                <p>We build bridges between artificial intelligence, entrepreneurship, and the human spirit.</p>
                <p>Through in-depth one-on-one interviews,</p>
                <p>we document the true thoughts and lonely journeys of China’s AI entrepreneurs.</p>
            </div>
        </div>
    );
}