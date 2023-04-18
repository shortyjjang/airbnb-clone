import ClientOnly from '../components/layout/clientonly'
import EmptyState from '../components/empty'
import Container from '../components/layout/container'
import ListingCard from '../components/listings/card'
import { SafeListing, SafeUser } from '../components/types/next-auth'
import getCurrentUser from '../components/actions/getCurrentUser'


Home.getInitialProps = async () => {
  const currentUser:SafeUser | null = await getCurrentUser() 
  return { listing: [], currentUser: currentUser }
}

interface HomeProps {
  listing: SafeListing[]
  currentUser: SafeUser | null
}

export default function Home ({ listing, currentUser }:HomeProps) {
  if(listing.length < 1) {
    return <ClientOnly><EmptyState showReset/>1</ClientOnly>
  }
  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {listing.map(item => <ListingCard data={item} key={item.id} currentUser={currentUser} />)}
        </div>
      </Container>
    </ClientOnly>
  )
}

