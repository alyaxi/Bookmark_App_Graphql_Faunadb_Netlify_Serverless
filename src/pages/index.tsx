import * as React from "react"
import Bookmark from "../components/Bookmark"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../components/Bookmark.css"

const IndexPage = () => (
 <div className="main-container">
   <h1 className="heading">My Bookmark Application</h1>
   <Bookmark />
 </div>
)

export default IndexPage
