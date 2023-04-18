
import ClientOnly from '../components/layout/clientonly'
import EmptyState from '../components/empty'
import Container from '../components/layout/container'
import ListingCard from '../components/listings/card'
import getCurrentUser from '../components/actions/getCurrentUser'
import getListings, { IListingsParams } from '../components/actions/getListing'
import { SafeListing } from '../components/types/next-auth'




const Home = async (searchParams: IListingsParams) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  if(listings.length < 1) {
    return <ClientOnly><EmptyState showReset/>1</ClientOnly>
  }
  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {listings.map((item:SafeListing) => <ListingCard data={item} key={item.id} currentUser={currentUser} />)}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home