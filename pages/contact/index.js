import { gql } from "@apollo/client";
import { useState } from "react";
import client from "../api/apollo-client";

const ContactUs = ({ forms }) => {
  const { formFields, button, confirmation } = forms.gfForm;
  const gFields = formFields?.edges;

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onChangeValue = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmitHandle = (event) => {
    event.preventDefault();
  };

  console.log(formValue.name);

  return (
    <div className="container mx-auto">
      <div className="w-full md:w-6/12 mx-auto">
        <form onSubmit={onSubmitHandle}>
          {gFields.map((field, index) => {
            const { id, label, placeholder, type, adminLabel } = field?.node;
            return (
              <div className="my-3" key={index}>
                {type !== "TEXTAREA" && (
                  <div className="w-full">
                    <label className="mb-2 block" htmlFor={id}>
                      {label}
                    </label>

                    <input
                      className="w-full border-2 p-2 rounded-lg"
                      id={id}
                      name={adminLabel}
                      type={type.toLowerCase()}
                      placeholder={placeholder}
                      value={formValue.adminLabel}
                      onChange={onChangeValue}
                    />
                  </div>
                )}
                {type === "TEXTAREA" && (
                  <div className="w-full">
                    <label className="mb-2 block" htmlFor={id}>
                      {label}
                    </label>

                    <textarea
                      className="w-full border-2 p-2 rounded-lg"
                      id={id}
                      name={adminLabel}
                      placeholder={placeholder}
                      cols="30"
                      rows="5"
                      onChange={onChangeValue}
                    ></textarea>
                  </div>
                )}
              </div>
            );
          })}
          <button
            className="inline-block bg-black text-white py-3 px-6 mt-5 rounded-lg transition-all duration-300 hover:bg-gray-800"
            type={button?.type.toLowerCase()}
          >
            {button?.text}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

// gql`
// mutation MyMutation {
//   submitGfForm(
//     input: {
//       id: "1"
//       fieldValues: [
//         { id: 1, value: ${formValue.name} }
//         { id: 3, emailValues: { value: ${formValue.email} } }
//         { id: 4, value: ${formValue.message} }
//       ]
//     }
//   ) {
//     clientMutationId
//     resumeUrl
//   }
// }`;

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
                  type
                  label
                  value
                  placeholder
                  adminLabel
                }
                ... on EmailField {
                  id
                  type
                  value
                  label
                  placeholder
                  adminLabel
                }
                ... on TextAreaField {
                  id
                  type
                  value
                  label
                  placeholder
                  adminLabel
                }
              }
            }
          }
          button {
            text
            type
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
