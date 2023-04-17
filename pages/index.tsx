import ClientOnly from '../components/layout/clientonly'
import EmptyState from '../components/empty'
import Container from '../components/layout/container'
import ListingCard from '../components/listings/card'
import { ListingProps } from '../components/types/next-auth'


Home.getInitialProps = async () => {
  const listing:ListingProps[] = [
    {
      id: "1",
      category: "Beach",
      locationValue: "AO",
      location: {
          "value": "AO",
          "label": "Angola",
          "flag": "🇦🇴",
          "lating": [
              -12.5,
              18.5
          ],
          "region": "Africa"
      },
      guestCount: 2,
      roomCount: 2,
      bathroomCount: 1,
      imageSrc: "/screenshot.webp",
      price: 1000,
      title: "test",
      description: "afafl;af;af afla;fel;af;af"
    }
  ]
  return { listing: listing }
}


export default function Home ({ listing }:{listing: ListingProps[]}) {
  if(listing.length < 1) {
    return <ClientOnly><EmptyState showReset/>1</ClientOnly>
  }
  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {listing.map(item => <ListingCard data={item} key={item.id} />)}
        </div>
      </Container>
    </ClientOnly>
  )
}

