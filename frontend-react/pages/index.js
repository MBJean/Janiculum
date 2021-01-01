import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="layout__body">
          <h1>Janiculum: <br/> A Latin Learning Application</h1>
          <p>Welcome to Janiculum! This website is a digital playground for its creator to explore new web technologies, with the ultimate goal of aiding the student of Latin in their language learning journey.</p>
          <h2>Feature proposals</h2>
          <p>Access the current state of the proposed features by clicking on the <strong><span className="hide">Toggle</span> Toolkit</strong> button above.</p>
          <br/>
          <ul>
            <li className="card card--green cursor--pointer">
            {/* TODO: make clicky */}
              <h3>Latin dictionary</h3>
              <p>Search <i>Lewis & Short's Latin Dictionary</i>.</p>
              <span className="status">Completed</span>
            </li>
            <li className="card card--purple">
              <h3>Vocabulary lists</h3>
              <p>Create and share custom vocabulary lists composed of entries from <i>Lewis & Short's Latin Dictionary</i>.</p>
              <span className="status">Coming soon</span>
            </li>
            <li className="card card--purple">
              <h3>Notes</h3>
              <p>Create notes keyed to vocabulary and Latin texts.</p>
              <span className="status">Coming soon</span>
            </li>
          </ul>
        </div>
      </main>

      <footer className="layout__footer">
        <p className="p--small"><i>A Latin Dictionary Founded on Andrews' edition of Freund's Latin dictionary revised, enlarged, and in great part rewritten by Charlton T. Lewis, Ph.D. and Charles Short, LL.D.</i> provided under a CC BY-SA license by Perseus Digital Library, <a href="http://www.perseus.tufts.edu" target="_blank">http://www.perseus.tufts.edu</a>, with funding from The National Endowment for the Humanities.
    Data accessed from <a href="https://github.com/PerseusDL/lexica/" target="_blank">https://github.com/PerseusDL/lexica/</a> on March, 17, 2020.</p>
        <p>English-to-Latin stem dataset derived from the works of <a href="https://github.com/lukehollis" target="_blank">Luke Hollis</a>, <a href="https://github.com/dsanson" target="_blank">David Sanson</a>, and ultimately <a href="http://archives.nd.edu/words.html" target="_blank">Whitaker's Words</a> by Colonel William Whitaker.</p>
      </footer>

      <style jsx>{`
        footer {
          padding-bottom: $spacer-2;
          padding-top: $spacer-2;
        }
        p {
          font-size: $font-size-5;
        }
      `}
      </style>

      <style jsx>{`
        .card {
          position: relative;
        }
        .status {
          color: $color-primary-1-1;
          font-size: $font-size-5;
          position: absolute;
          right: 0.25rem;
          top: 0.25rem;
        }
      `}
      </style>
    </div>
  )
}
