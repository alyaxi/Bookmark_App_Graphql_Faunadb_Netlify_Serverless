const {ApolloServer , gql} = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;
const dotenv = require("dotenv")
dotenv.config();

const typeDefs = gql`
  type Query {
    Bookmark: [bookmark!]
    
  }
  type bookmark {
    id: ID!
    title: String!
    url: String!
  }
  type Mutation {
    addBookmark(title: String!, url: String!): bookmark
    deleteBookmark(id: String!) : bookmark
  }
`



const resolvers = {
  Query: {
   Bookmark: async (root , args, context) => {
     try {

      const client = new faunadb.Client({
        secret: process.env.FAUNA_SERVER_SECRET
      })
      console.log("Connection established");
      const result = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("url"))),
          q.Lambda(x => q.Get(x))
        )
        )
        console.log("data" + result.data);
       
        return result.data.map(d => {
          console.log(d);
          return {
            id: d.ref.id,
            title: d.data.title,
            url: d.data.url
          }
          
        })
     
     } catch (error) {
       console.log(`Error ${error}`);
     }
   }
    },
    Mutation: {
      addBookmark: async(_, {title, url}) => {
       try {
        const client = new faunadb.Client({
          secret: process.env.FAUNA_SERVER_SECRET
        })
        const result = await client.query(
          q.Create(
            q.Collection("Bookmark"),{
              data: {
                title: title,
                url: url
              }
            }
          )
          )
          console.log(result.data);
          return result.data.data
         
       } catch (error) {
         console.log(`Error ${error}`);
       }
      },

    deleteBookmark : async (_, {id}) => {
      console.log("resssssssssssssssssssssssss" + id);
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNA_SERVER_SECRET
        })
        const result = await client.query(
          q.Delete(q.Ref(q.Collection("Bookmark") , id ))
        )
        console.log("result" + result);
      } catch (error) {
        console.log(`Error ${error}`);
      }
      }
    }

  }


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
