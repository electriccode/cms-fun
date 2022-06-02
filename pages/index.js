import Link from "next/link";

export default function IndexPage(props) {
  // props argument will receive data returned from getServerSideProps
  return (
    <div>
      {/* // print the hello object passed from getServerSideProps */}
      {props.hello}
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { hello: "World" } // will be passed to the page component as props
  };
}
