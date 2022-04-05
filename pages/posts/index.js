import { gql } from "@apollo/client";
import Link from "next/link";
import client from "../api/apollo-client";

const Posts = ({ posts }) => {
  console.log(posts);
  return (
    <div>
      <h1>All Posts</h1>
      <div className="all-posts">
        {posts.map(({ node }, index) => {
          return (
            <div key={index} className="single-post">
              <Link href={`posts/${node.slug}`}>
                <a>
                  <h2>{node.title}</h2>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getStaticProps = async (context) => {
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
      posts: data?.posts?.edges,
    },
  };
};
export default Posts;
