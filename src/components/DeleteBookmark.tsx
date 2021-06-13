import React from 'react'
import {gql, useMutation} from "@apollo/client"
import { Button } from '@material-ui/core';
import Swal from "sweetalert2";

const DELETE_BOOKMARK = gql`
    mutation deleteBookmark($id: String!){
        deleteBookmark(id: $id){
            id
        }
    }
`

export default function DeleteBookmark({id, GET_BOOKMARK}) {
    const [deleteBookmark] = useMutation(DELETE_BOOKMARK)

    const deletBtn = async () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f50057",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
            deleteBookmark({
                variables: {
                    id: id
                },
                refetchQueries: [{query: GET_BOOKMARK}]
                
            })
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    
    
        console.log("client id" + id);
        
     
    }
    return (
        <div>
            <Button size="small" variant="contained" color="secondary" onClick={deletBtn}>Delete</Button>
        </div>
    )
}
