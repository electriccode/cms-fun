import Link from "next/link";

export default function IndexPage(props) {
  // props argument will receive data returned from getServerSideProps
  return (
    <div>
      {/* Print page title read from Contentful */}
      <h1>{props.data.data.pageCollection.items[0].title}</h1>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  const graphqlQuery = `query {
    pageCollection {
      items {
        title
      }
    }
  }`.replace(/\n/g, " "); // Create a one liner query replacing all new lines with space

  // Make the API call
  const response = await fetch(
    "https://graphql.contentful.com/content/v1/spaces/" + process.env.SPACE_ID,
    {
      headers: {
        authorization: "Bearer " + process.env.TOKEN,
        "content-type": "application/json"
      },
      body: '{"query":"' + graphqlQuery + '","variables":null}',
      method: "POST"
    }
  );

  // Convert the Response object into JSON
  const data = await response.json();

  // Convert the JSON to string
  const dataString = JSON.stringify(data);
  return {
    props: {
      hello: dataString,
      data
    } // will be passed to the page component as props
  };
}
