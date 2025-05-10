import Navbar from './Navbar'
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="layout-container">
        <Navbar />
        <main className="content">{children}</main>
        <footer className="footer">
          © {new Date().getFullYear()} My Blog. All rights reserved.
        </footer>
      </div>
    </>
  )
}