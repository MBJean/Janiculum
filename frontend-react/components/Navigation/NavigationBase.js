import Link from 'next/link'
import styles from './NavigationBase.module.scss'

export default function NavigationBase() {

  return (
    <nav className={styles.nav} role="navigation" aria-label="main navigation">
      <Link href="/">
        <a>
          <img
            src="/images/logo.png"
            alt="The Janiculum Logo, depicting the two-headed Roman god Janus"
            className={styles.logo}
          />
        </a>
      </Link>
    </nav>
  );
}
