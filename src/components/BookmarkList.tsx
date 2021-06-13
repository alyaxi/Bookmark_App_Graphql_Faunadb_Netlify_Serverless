import React from "react"
import { useQuery } from "@apollo/client"
import DeleteBookmark from "./DeleteBookmark"
import { Spinner } from "react-bootstrap"
import { makeStyles } from "@material-ui/core/styles"
import {Card, CardActionArea, CardActions, CardContent, Button, Typography } from "@material-ui/core"
import "./Bookmark.css"
// import Link from "@material-ui/core/Link"
import { Link } from "gatsby"
const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    marginTop: "20px",
  },
  media: {
    height: 140,
  },
})

export default function BookmarkList({ GET_BOOKMARK }) {
  const { error, loading, data } = useQuery(GET_BOOKMARK)
  console.log("client" + data)

  const classes = useStyles()

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {" "}
        <Spinner animation="border" variant="danger" />
      </div>
    )

  if (error) return <div>{error}</div>

  return (
    <div className="container-list">
      {data.Bookmark.map((d, id) => {
          const id1 = id + 1
        return (
          <div key={d.id + 1}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                   <span>{id1} : </span> {d.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                      {d.url}
          </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                  <Link target="_blank" to={d.url} style={{color:"white", textDecoration:"none"}}>
                  <Button                  
                  variant="contained"
                  color="secondary"
                  style={{fontSize:"11px"}}
                  
                >
                  Open Bookmark
                </Button>
                  </Link>
               
                <DeleteBookmark id={d.id} GET_BOOKMARK={GET_BOOKMARK} />
              </CardActions>
            </Card>
            <ul></ul>
          </div>
        )
      })}
    </div>
  )
}
