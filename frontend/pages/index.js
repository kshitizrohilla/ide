import styles from '@/styles/Main.module.css';
import Link from 'next/link';

import Image from 'next/image';

function Home() {

  return (
    <div className={styles.parentContainer}>
      <div className={styles.firstMain}>
        <h1>Create in the Cloud</h1>
        <p>Intelligent software development and deployment platform for crafting, collaborating, and launching exceptional software</p>
        <Link href="/dashboard"><button className={styles.mainButtons}>Get started for free</button></Link>
      </div>
        <Image priority={true} alt="code-editor" className={styles.img} src="/editor.png" width="1866" height="1034" />
    </div>
  );
};

export default Home;