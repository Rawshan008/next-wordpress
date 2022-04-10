import { gql } from "@apollo/client";
import client from "../api/apollo-client";

const ContactUs = ({ forms }) => {
  console.log(forms);
  return (
    <div>
      <form action="#">
        <input type="text" />
        <input type="text" />
      </form>
    </div>
  );
};

export default ContactUs;

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query ContactForm {
        gfForm(id: "1", idType: DATABASE_ID) {
          id
          formFields {
            edges {
              node {
                id
                ... on TextField {
                  id
                  label
                  value
                  placeholder
                }
                ... on EmailField {
                  id
                  value
                  label
                  placeholder
                }
                ... on TextAreaField {
                  id
                  value
                  label
                  placeholder
                }
              }
            }
          }
          confirmations {
            message
          }
        }
      }
    `,
  });

  return {
    props: {
      forms: data,
    },
  };
};

// mutation MyMutation {
//   submitGfForm(
//     input: {id: "1", fieldValues: [{id: 1, value: "Rawshan Ali Arshalan"}, {id: 3, emailValues: {value: "rawshanars@ra.co"}}, {id: 4, value: "Hello I am not a Good Man,  How are you??"}]}
//   ) {
//     clientMutationId
//     resumeUrl
//     entry {
//       ... on GfSubmittedEntry {
//         id
//         formFields {
//           edges {
//             node {
//               type
//               ... on TextField {
//                 id
//                 value
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
