import React from 'react'
import {gql} from "@apollo/client"
import AddBookmark from './AddBookmark'
import BookmarkList from './BookmarkList'
import "./Bookmark.css"




export default function Bookmark() {
     
    const GET_BOOKMARK = gql`
    query {
       Bookmark {
           id
           title
           url
       }
    }
   
   `

     
    return (
        <div >
            <div className="container" >
            <AddBookmark GET_BOOKMARK={GET_BOOKMARK}/> 
           </div>
           <div>
           <BookmarkList GET_BOOKMARK={GET_BOOKMARK}/>
           </div>
           
           
        </div>
    )
}
