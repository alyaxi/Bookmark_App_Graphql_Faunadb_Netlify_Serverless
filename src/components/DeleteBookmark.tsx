import React from 'react'
import {gql, useMutation} from "@apollo/client"
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

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
        console.log("client id" + id);
        
        deleteBookmark({
            variables: {
                id: id
            },
            refetchQueries: [{query: GET_BOOKMARK}]
            
        })
    }
    return (
        <div>
            <Button size="small" variant="contained" color="secondary" onClick={deletBtn}>Delete</Button>
        </div>
    )
}
