import { gql } from "@apollo/client";
import client from "../api/apollo-client";

const SinglePost = ({ posts }) => {
  // console.log(posts);
  return (
    <div>
      <h1>{posts?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: posts.content }}></div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query Posts {
        posts {
          edges {
            node {
              slug
            }
          }
        }
      }
    `,
  });

  const paths = data?.posts?.edges.map((item) => {
    return {
      params: {
        slug: item.node.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const { data } = await client.query({
    query: gql`
      query SinglePost($slug: String) {
        postBy(slug: $slug) {
          title
          content
        }
      }
    `,
    variables: { slug: slug },
  });

  return {
    props: {
      posts: data?.postBy,
    },
  };
};

export default SinglePost;
