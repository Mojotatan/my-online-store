import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* snipcart preconnects for performance */}
          <link rel="preconnect" href="https://app.snipcart.com" />
          <link rel="preconnect" href="https://cdn.snipcart.com" />
          {/* default snipcart styles */}
          <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* load snipcart */}
          <script async src="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js"></script>
          <div hidden id="snipcart"
            data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY}
            data-config-modal-style="side"
          ></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument