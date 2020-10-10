import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../components/Header'
import Home from '../components/Home'
import Country from '../components/NewsDetail'
import Footer from '../components/Footer'
import WrongPage from '../components/WrongPage'
import '../style/App.scss'

class App extends Component {
  

  state = {
    itemsAll: [],
  }

  componentDidMount() {
    fetch('https://mnrlive.github.io/api/resources.json')
      .then((response) => {
        if (response.ok) {
          return response
        } else {
          throw Error(response.status)
        }
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          itemsAll: data.item,
        })
      })
      .catch((error) => console.log(error))
  }

  render() {
    const routeItems = this.state.itemsAll.map((item, index) => (
      <Route
        exact
        path={`/${item.answer}`}
        key={index}
        render={() => (
          <main className="main main--country">
            <Country
              itemsAll={this.state.itemsAll}
              flag={item.image}
              name={item.question}
              borders={item.answer}
              alpha3Code={item.answer}
              answer={item.answer}
            />
          </main>
        )} 
      />
    ))
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <>
          <div className="App">
            <div className="container">
              <Header />

              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <main className="main main--home">
                      <Home />{' '}
                    </main>
                  )}
                />
                {routeItems}
                <Route
                  render={() => (
                    <main className="main main--error">
                      <WrongPage />
                    </main>
                  )}
                />
              </Switch>
              <Footer />
            </div>
          </div>
        </>
      </Router>
    )
  }
}

export default App
