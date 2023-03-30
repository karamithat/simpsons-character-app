import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SimpsonsContext } from "../../context/SimpsonsContext";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  avatar: Yup.string().url().required("Image URL is required"),
  job: Yup.string().required("Job is required"),
  description: Yup.string().required("Description is required"),
});

const initialValues = {
  name: "",
  avatar: "",
  job: "",
  description: "",
};

const AddCharacterPage = () => {
  const { characters, addNewCharacter } = useContext(SimpsonsContext);
  const handleSubmit = (values) => {
    const newCharacter = {
      ...values,
      id: ((characters.length + 1) * 100).toString(),
    };
    addNewCharacter(newCharacter);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Add Character</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid }) => (
          <Form   
          data-testid="add-character-form"
          className="w-full max-w-lg bg-white rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
                  (errors.name && touched.name ? " border-red-500" : "")
                }
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="avatar" className="block text-gray-700 font-bold mb-2">
                Image URL
              </label>
              <Field
                type="text"
                id="avatar"
                name="avatar"
                placeholder="Enter image URL"
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
                  (errors.avatar && touched.avatar ? " border-red-500" : "")
                }
              />
              <ErrorMessage
                name="avatar"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="job" className="block text-gray-700 font-bold mb-2">Job</label>
              <Field
                type="text"
                id="job"
                name="job"
                placeholder="Enter job"
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
                  (errors.job && touched.job ? " border-red-500" : "")
                }
              />
              <ErrorMessage
                name="job"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <Field
                as="textarea"
                type="text"
                id="description"
                name="description"
                placeholder="Enter description"
                rows="5"
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none" +
                  (errors.description && touched.description
                    ? " border-red-500"
                    : "")
                }
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={!isValid}
                className={
                  "bg-primary hover:bg-secondary text-white text-lg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " +
                  (!isValid ? "cursor-not-allowed opacity-50" : "")
                }
              >
                Add Character
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCharacterPage;
