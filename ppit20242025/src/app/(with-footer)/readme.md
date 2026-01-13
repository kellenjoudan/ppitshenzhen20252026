REGISTRATION FORM PAGE PLAN

DIRECTORY
forms/{formId} {
  title: str,
  description: str,
  questions: [
    {
      id: str,               // uuid
      label: str,            // question text
      type: "text" | "radio" | "checkbox", //choose 1
      required: bool,
      options?: str[]        // only for radio/checkbox
    }
  ],
  isActive: bool,
  createdBy: str,
  createdAt: timestamp
}

responses/{responseId} {
  formId: str,
  answers: {
    [questionId]: str | str[]
  },
  submittedAt: timestamp
}

QUESTION JSON
Question = {
  id: str,
  label: str,
  type: "text" | "radio" | "checkbox", //choose 1
  required: bool,
  options?: str[]
}


JOBDESK:
Michael - Create firestore scheme/structure, create {question, forms, response} JSON format, monitor progress on design and backend, build HTML and help with PostCSS for the design, maintain mobile responsiveness --> accessibility for mobile phones. Additional: create a diagram of the firestore scheme as well as process flow.

Kellen - Create firebase project (enable firestore), create firebase.js and export it, create functions (form creation, fetch forms, and submit response). Additional: validation on required fields and prevent empty submissions; create designs on loading screens (during suubmission process/form loading process)

Miquel - Admin form builder (form creation; basically make the formData) --> create form title input, desc. input, add/remove questions (include question types), toggle required, options input (radio/checkbox --> OPTIONAL TO DO), and call createForm(formData) created by kellen. Additional: validate questions before saving (make sure there is no illegal inputs) and display form link after successful creation.

Aldo - User form renderer/UI --> fetch form from db through formID, display title & desc., display input fields based on their type (use if/else and display according to their type property; e.g. question1.type == "MCQ".....), create indicators for required fields (use * for required), collect answers by calling submit response function created by kellen (post/send answers to db and save them). Additional: Validate required questions; ignore optional ones, send success/error messages

Jennickel - UI/UX design --> similar to the previous project, create an illustration using figma to give a big picture of the website, determine color palette, typography, button styles, and input styles (looks-wise).


REF: https://github.com/hachln/Investsync_EventHelper