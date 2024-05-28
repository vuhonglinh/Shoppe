import { useContext } from 'react'
import BoxChat from 'src/components/BoxChat'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import { AppContext } from 'src/contexts/app.context'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  const { isAuthenticated } = useContext(AppContext)
  return (
    <div>
      <Header />
      {children}
      {isAuthenticated && <BoxChat />}
      <Footer />
    </div>
  )
}
