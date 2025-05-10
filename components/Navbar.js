import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>
          Home
        </Link>
        <Link href="/admin" className={`nav-link ${router.pathname === '/admin' ? 'active' : ''}`}>
          Admin
        </Link>
      </div>
    </nav>
  )
}