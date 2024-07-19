import logo from "./logo.svg";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query GetTodosWithUsers {
    getTodos {
      title
      userId
      user {
        name
        email
        username
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;

  console.log(data);
  return (
    <div className="App">
      <p>hello</p>
    </div>
  );
}

export default App;
