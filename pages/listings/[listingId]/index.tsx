import {NextPageContext} from 'next'

interface Context extends NextPageContext {
  // any modifications to the default context, e.g. query types
}

ListingPage.getInitialProps = async (ctx: Context) => {
  console.log(ctx)
}


export default function ListingPage(props) {
  return (
    <div>ListingPage</div>
  )
}
