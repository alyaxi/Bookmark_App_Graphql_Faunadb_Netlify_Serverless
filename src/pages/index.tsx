import * as React from "react"
import Bookmark from "../components/Bookmark"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../components/Bookmark.css"
import logo from "../assets/bookmark.png"

const IndexPage = () => (
 <div className="main-container">
   <h1 className="heading"><img src={logo} style={{width: "50px"}}  className="img-fluid img-thumbnail" alt="let" />My Bookmark Application</h1>
   
   <Bookmark />
 </div>
)

export default IndexPage
