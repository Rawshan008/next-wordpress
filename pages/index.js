import { gql } from "@apollo/client";
import client from "./api/apollo-client";
export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <h1>Home Page</h1>
      {posts.map(({ node }, index) => {
        return (
          <div key={index}>
            <h2>{node?.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: node?.excerpt }}></div>
          </div>
        );
      })}
    </div>
  );
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Posts {
        posts {
          edges {
            node {
              title
              slug
              excerpt
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      posts: data.posts.edges,
    },
  };
};
