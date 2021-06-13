import React from "react"
import { gql,useMutation } from "@apollo/client"
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField} from "@material-ui/core";
import { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Swal from "sweetalert2";

const ADD_BOOKMARK = gql`
  mutation addBookmark($title: String!, $url: String!) {
    addBookmark(title: $title, url: $url) {
      id
      title
      url
    }
  }
`
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
    TextField: {
      margin: theme.spacing(1),
    }
  }),
);


export default function AddBookmark({GET_BOOKMARK}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");


  const classes = useStyles()
  // let urlField;
  const [addBookmark] = useMutation(ADD_BOOKMARK)

  const handleSubmit = (e) => {
    console.log(e.title);
    console.log(e.url);
    //  e.preventDefault()
    addBookmark({
     variables: {
         title: e.title,
         url: e.url
     },
     refetchQueries: [{query: GET_BOOKMARK}]
 })
    e.title = ""
     e.url = ""

     const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title: "Task has been saved",
    })
}

const formSchema = Yup.object().shape({
  title: Yup.string()
  .min(2, "Too Short")
  .max(60, "Too Long")
  .required("Required"),
  url: Yup.string()
  .min(2, "Too Short")
  .required("Required")
})

const innerRefUrl = ({node}) => {
  setUrl(node)
}
const innerRefTitle = ({node}) => {
  setTitle(node)
}
  return(
       <div className="container-form" >
         <Formik initialValues={{
           title: title,
           url: url,
         }}
         validationSchema={formSchema}
         onSubmit={handleSubmit}
         >
           {(formik: any) => (
             <Form onSubmit={formik.handleSubmit}>
              
               <Field className={classes.TextField} color='secondary' name="title" type="title" as={TextField} variant="outlined"
                label="add title"
                autoComplete="off"
                fullWidth
                ref={innerRefTitle}
                />
                <ErrorMessage
                  name="title"
                  render={(msg: string) => (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {msg}
                    </span>
                  )}
                />
                <br />
                <Field className={classes.TextField} name="url" type="url" color='secondary' as={TextField} variant="outlined"
                label="add url"
                autoComplete="off"
                fullWidth
                ref={innerRefUrl}
                />
                <ErrorMessage
                  name="url"
                  render={(msg: string) => (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {msg}
                    </span>
                  )}
                />
                <br />
                <Button className={classes.TextField} color="secondary" variant="contained" type="submit" fullWidth >Add Bookmark</Button>
                
             </Form>
           )}

         </Formik>
       </div>
       )
}
