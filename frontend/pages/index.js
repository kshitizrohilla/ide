import Image from 'next/image';
import Link from 'next/link';

import styles from '@/styles/home.module.css';

function Home() {

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <h1>Create in the Cloud</h1>
        <p>Intelligent software development and deployment platform for crafting, collaborating, and launching exceptional software</p>

        <Link href="/dashboard">
          <button className={styles.getStartedBtn}>Get started for free</button>
        </Link>
      </div>

      <Image
        priority={true}
        alt="code-editor"
        className={styles.editorScreenshot}
        src="/editor.png"
        width="1920"
        height="1079" />
    </div>
  );
};

export default Home;