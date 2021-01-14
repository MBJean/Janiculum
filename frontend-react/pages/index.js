import client from 'graphql/client';
import QUERIES from 'graphql/queries';
import LayoutBase from "components/Layout/LayoutBase";
import Head from 'next/head'

export default function Home() {

  async function testCall() {
    try {
      const query = QUERIES.LEMMA_SEARCH;
      const variables = { searchQuery: 'acervus' };
      const response = await client.query({ query, variables });
      console.log(response);
    } catch(error) {
      console.log(error);
    } finally {
      console.log('done');
    }
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutBase>
        <main>
          <div className="layout__body">
            <h1>Janiculum: <br/> A Latin Learning Application</h1>
            <p>Welcome to Janiculum! This website is a digital playground for its creator to explore new web technologies, with the ultimate goal of aiding the student of Latin in their language learning journey.</p>
            <button onClick={testCall}>Click me!</button>
          </div>
        </main>
      </LayoutBase>
    </div>
  )
}
