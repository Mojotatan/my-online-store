import {useState} from 'react';
import Fuse from 'fuse.js';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';

import products from '@data/products.json';

import styles from '@styles/Home.module.scss'

export default function Home() {
  const [query, setQuery] = useState()

  let activeProducts = products

  function handleOnSearch(e) {
    setQuery(e.target.value)
  }

  const options = {
    keys: ['title', 'allegiance']
  }
  const fuse = new Fuse(products, options)

  if (query) activeProducts = fuse.search(query).map(result => ({...result.item})) // map is b/c fuse by default returns nested obj

  return (
    <Layout>
      <Head>
        <title>The Morgue Shop</title>
        <meta name="description" content="Your favorite trading cards delivered!" />
      </Head>

      <Container>
        <h1 className="sr-only">The Morgue Shop</h1>

        <div className={styles.discover}>
          <div className={styles.search}>
            <h2>Search</h2>
            <form>
              <input onChange={handleOnSearch} type="search" />
            </form>
          </div>
        </div>

        <h2 className="sr-only">Available Cards</h2>
        <ul className={styles.products}>
          {activeProducts.length > 0 ?
            activeProducts.map(product => {
              return (
                <li key={product.id}>
                  <Link href={`/products/${product.id}`}>
                    <a>
                      <div className={styles.productImage}>
                        <Image width="864" height="1200" src={product.image} alt={product.title} />
                      </div>
                      <h3 className={styles.productTitle}>
                        { product.title }
                      </h3>
                      <p className={styles.price}>
                        ${ product.price }
                      </p>
                    </a>
                  </Link>
                  <p>
                    <Button className="snipcart-add-item"
                      data-item-id={product.id}
                      data-item-price={product.price}
                      data-item-url={`/products/${product.id}`}
                      data-item-image={product.image}
                      data-item-name={product.title}>
                      Add to cart
                    </Button>
                  </p>
                </li>
              )
            })
            :
            <div>No results rip</div>
          }
        </ul>
      </Container>
    </Layout>
  )
}