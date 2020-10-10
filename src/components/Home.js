import React, { Component } from 'react'
import { BrowserRouter as NavLink } from 'react-router-dom'
import News from '../components/News'
import '../style/Home.scss'
class Home extends Component {
  state = {
    itemsAll: [],
    isLoaded: false,
    option: 'all',
    optionUpper: '',
    filtered: '',
    filterActive: false,
    regionChoosed: false,
    scroll: false,
  }

  componentDidMount() {
    //Nasłuchiwanie scrolla, który umożliwi powrót na początek strony
    window.addEventListener('scroll', this.scrollCheck, false)

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
          isLoaded: true,
        })
      })
      .catch((error) => console.log(error))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.option !== this.state.option) {
      
      fetch(
        `https://mnrlive.github.io/api/resources.json?${
          this.state.option === 'all' ? '' : 'region/'
        }${this.state.option}`
      )
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
            filtered: '', 
            itemsAll: data.item,
            isLoaded: true,
          })
        })
        .catch((error) => console.log(error))
    }
  }

  //Odmontowanie scrolla
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollCheck, false)
  }

  scrollCheck = () => {
    const beginScroll = window.scrollY < 100
    if (beginScroll === false) {
      this.setState({
        scroll: true,
      })
    } else {
      this.setState({
        scroll: false,
      })
    }
  }


  handleFilterRegion = () => {
    this.setState({
      filterActive: !this.state.filterActive,
    })
  }

  
  handleCloseGlobalFilterRegion = () => {
    if (this.state.filterActive === true) {
      this.setState({
        filterActive: false,
      })
    }
  }

  
  handleChangeRegion = (e) => {
    let value = e.currentTarget.getAttribute('value')
    let valueUpper =
      value.slice(0, 1).toUpperCase() + value.slice(1, value.length)
    this.setState({
      option: value,
      optionUpper: valueUpper,
      regionChoosed: true,
      filterActive: false,
    })
  }

  render() {
    return (
      <div className="home" onClick={this.handleCloseGlobalFilterRegion}>
        <div className="filter">
          <div className="filter__selectPanel">
            <NavLink to="./">
              <span
                onClick={this.handleFilterRegion}
                className={
                  this.state.filterActive
                    ? 'filter__chooseRegion filter__chooseRegion--caretUp'
                    : 'filter__chooseRegion filter__chooseRegion--caretDown'
                }
              >
                {this.state.regionChoosed
                  ? this.state.optionUpper
                  : 'Filter by Category'}
              </span>
              <ul
                className={
                  this.state.filterActive
                    ? 'filter__dropdown visible'
                    : 'filter__dropdown'
                }
              >
                <li
                  className="filter__dropdown-item filter__dropdown-item--all"
                  value="all"
                  onClick={this.handleChangeRegion}
                >
                  All
                </li>
                <li
                  className="filter__dropdown-item filter__dropdown-item--africa"
                  value="World"
                  onClick={this.handleChangeRegion}
                >
                  World
                </li>
                <li
                  className="filter__dropdown-item filter__dropdown-item--americas"
                  value="Business"
                  onClick={this.handleChangeRegion}
                >
                  Business
                </li>
                <li
                  className="filter__dropdown-item filter__dropdown-item--asia"
                  value="Technology"
                  onClick={this.handleChangeRegion}
                >
                  Technology
                </li>
                <li
                  className="filter__dropdown-item filter__dropdown-item--europe"
                  value="Entertainment"
                  onClick={this.handleChangeRegion}
                >
                  Entertainment
                </li>
                <li
                  className="filter__dropdown-item filter__dropdown-item--oceania"
                  value="Sports"
                  onClick={this.handleChangeRegion}
                >
                  Sports
                </li>
                <li
                  className="filter__dropdown-item filter__dropdown-item--oceania"
                  value="Science"
                  onClick={this.handleChangeRegion}
                >
                  Science
                </li>
                <li
                  className="filter__dropdown-item filter__dropdown-item--oceania"
                  value="Health"
                  onClick={this.handleChangeRegion}
                >
                  Health
                </li>
              </ul>
            </NavLink>
          </div>
        </div>
        {}
        {}
        {this.state.isLoaded ? (
          <News
            itemsAll={
              this.state.filtered === ''
                ? this.state.itemsAll
                : this.state.filtered
            }
          />
        ) : (
          <div className="loading">
            <span className="loading__loader"></span>
          </div>
        )}
        <div
          className={this.state.scroll ? 'scroll' : null}
          onClick={() => {
            window.scrollTo(0, 0)
          }}
        >
          <i
            className={
              this.state.scroll ? 'fas fa-arrow-up scroll__arrowUp' : null
            }
          ></i>
        </div>
      </div>
    )
  }
}

export default Home
