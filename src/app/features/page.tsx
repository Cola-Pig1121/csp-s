import styles from '../styles/FeaturedEpisodes.module.css';
import RollingGallery from '../../components/RollingGallery/RollingGallery';

export default function FeaturesPage() {
    return (
        <div className={`${styles.featuredEpisodes} min-h-screen w-full flex flex-col items-center justify-center overflow-hidden`}>
            <div className={styles.featuredEpisodesParent}>
                <img className={styles.groupChild} alt="" src="../Intersect.svg" />
                <div className={styles.featuredEpisodes1}>Featured Episodes</div>
            </div>
            <div className={styles.groupParent}>
                <RollingGallery autoplay={true} pauseOnHover={true} />
            </div>
        </div>
    );
}