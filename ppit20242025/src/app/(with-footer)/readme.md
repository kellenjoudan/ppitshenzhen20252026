REGISTRATION FORM PAGE PLAN
===

## DIRECTORY AND JSON FORMAT
```
forms/{formId} { //ACCESSIBLE FOR EVERYONE
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

responses/{responseId} { //ONLY ACCESSIBLE BY ADMIN (REQUIRES LOG IN)
  formId: str,
  answers: {
    [questionId]: str | str[]
  },
  submittedAt: timestamp
}
```


QUESTION JSON FORMAT (to be sent to firestore db)
```
Question = {
  id: str,
  label: str,
  type: "text" | "radio" | "checkbox", //choose 1
  required: bool,
  options?: str[]
}
```

**(!!!) FLOW :
Admin creates → Firestore stores → User fills → Firestore stores → Admin reads**
##

## JOBDESK:
* Michael - Create firestore scheme/structure, create {question, forms, response} JSON format, monitor progress on design and backend, build HTML and help with PostCSS for the design, maintain mobile responsiveness --> accessibility for mobile phones. Additional: create a diagram of the firestore scheme as well as process flow.

* Kellen - Create firebase project (enable firestore), create firebase.js and export it, create functions (form creation, fetch forms, and submit response). Additional: validation on required fields and prevent empty submissions; create designs on loading screens (during suubmission process/form loading process)

* Miquel - Admin form builder (form creation; basically make the formData) --> create form title input, desc. input, add/remove questions (include question types), toggle required, options input (radio/checkbox --> OPTIONAL TO DO), and call createForm(formData) created by kellen. Additional: validate questions before saving (make sure there is no illegal inputs) and display form link after successful creation.

* Aldo - User form renderer/UI --> fetch form from db through formID, display title & desc., display input fields based on their type (use if/else and display according to their type property; e.g. question1.type == "MCQ".....), create indicators for required fields (use * for required), collect answers by calling submit response function created by kellen (post/send answers to db and save them). Additional: Validate required questions; ignore optional ones, send success/error messages

* Jennickel - UI/UX design --> similar to the previous project, create an illustration using figma to give a big picture of the website, determine color palette, typography, button styles, and input styles (looks-wise).


## DEADLINES:
>**===DEVELOPMENT PHASE===**
- 18 Jan => Jennickel UI Design for form layout, admin layout, and components styles (figma)
- 31 Jan => Each members' jobdesk (everything should be set by now); tolerance: design and mobile compatibility not finalized (not part of the main goal)

>**===TESTING & DEPLOYMENT PHASE===**
- 5 Feb => Finish testing for the forms and admin page; note down every improvements that can be made (TEST MOBILE COMPATIBILITY)
- 8 Feb => Finalization of code (ensure everything is written properly and corrrectly + firebase is working smoothly)
- 9 Feb => Deployment


## !!! NAMING CONVENTIONS (keep it the same across files): !!!
- Function names: createForm(formData), getFormById(formId), submitResponse(formId, response)

#
**REPO REFERENCE**: https://github.com/hachln/Investsync_EventHelper

**FIREBASE YOUTUBE TUTORIAL** (below): 
- https://firebase.google.com/codelabs/firebase-nextjs#0
- https://www.youtube.com/watch?v=Zj8z-UaD6fo (Firestore realtime update)
- https://www.youtube.com/watch?v=awd_oYcmrRA (skip to 8:07)