import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import {useSnipcart} from 'use-snipcart'

import Container from '@components/Container';

import styles from './Header.module.scss';

const Header = () => {
  const {cart = {}} = useSnipcart()
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            <a>yo check out these trading cards</a>
          </Link>
        </p>
        <p className={styles.headerCart}>
          {cart.subtotal &&
            <button className="snipcart-checkout">
              <FaShoppingCart />
              <span>${cart.subtotal}</span>
            </button>
          }
        </p>
      </Container>
    </header>
  )
}

export default Header;