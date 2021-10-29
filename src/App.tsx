import './App.css';
import LoginGithub from 'react-login-github';
import { useState } from 'react';
import Search from './Search/Search';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { Provider } from 'react-redux';
import store from './Redux/Store';



const App = () => {

  const [auth, setAuth] = useState<string>("")
  const [token, setToken] = useState("")

  // const link = from([
  //   // errorLink,
  //   new HttpLink({uri: "https://api.github.com/graphql"} )
  // ])
  const client = new ApolloClient({
    cache: new InMemoryCache,
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `bearer ${token}`
    }
  })
  console.log(token)

  const onFailure = (response: any) => console.error(response);

  const postRequest = (val: any) => {

    console.log(val)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(val)
    };
    fetch('https://9uj0ihoex6.execute-api.eu-west-1.amazonaws.com/dev/auth', requestOptions)
      .then(response => response.json())
      .then(data => setToken(data.data.access_token));

  }

  console.log(token)
  const onSuccess = (response: any) => {
    console.log(response);
    setAuth(response)
    postRequest(response)
  }
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div className="App">
          {auth === "" ?
            <div className="main">
              <div className="main_div">
                <div>
                  <div className="d_search"><img alt="" src="logo.jpg" /><b >Diga Search</b></div>
                  <LoginGithub clientId="4f262cc9e20d3043da02"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    className="login_button"
                     />
                </div>
              </div>
            </div>
            :
            <div>
              <Search />
            </div>
          }
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
