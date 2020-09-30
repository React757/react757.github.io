import React, { Component } from 'react'
import { BrowserRouter as NavLink } from 'react-router-dom'
import Countries from '../components/Countries'
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
      //warunek jest po to, żeby fetch się zmieniał jeśli została wybrana opcja all to niech nie dodaje region, tylko opcje, żeby wyszło
      //https://restcountries.eu/rest/v2/all, a jeśli została wybrana jakakolwiek inna opcja to niech doda region i wybrana opcje, żeby
      //wyszło https://restcountries.eu/rest/v2/region/europe
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
            filtered: '', //wyczysc tablice filtered, jesli jest ona pusta to wyswietla sie wszystkie opcje z danej kategorii (wiaze sie z inputem, czyli jesli wybiore jakas opcje to wyzeruj tablice filtered i wartosc z input)
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

  //Toggle, jesli uzytkownik kliknie na Filter By Region to niech filter activ zmieni sie na true, jesli kliknie ponownie to na false
  handleFilterRegion = () => {
    this.setState({
      filterActive: !this.state.filterActive,
    })
  }

  //sluzy do zamkniecia dropdown listy zwiazanej z filtrowaniej jesli jest ona otwarta i uzytkownik kliknie w obszar diva homa
  handleCloseGlobalFilterRegion = () => {
    if (this.state.filterActive === true) {
      this.setState({
        filterActive: false,
      })
    }
  }

  //Pobranie wartosci kliknietej opcji w dropdown list, ustawienie stanu, jesli opcja zostanie wybrana to filterActive bedzie ustawiony na false w celu zamkniecia dropDown listy, regionChoosed zostaje ustawiony na true, w celu uzycia warunku, ktory zastapi Filter By Region wybrana opcja
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
                  : 'Filter by Region'}
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
        {/* Warunek 1 jeśli dane jeszcze się nie załadowały, to niech wyświetli się napis Loading */}
        {/* Warunek 2 jeśli tablica pofiltrowana jest pusta (bo nic nie ma w inpucie, bądź została wybrana jakaś opcja z droplisty) to wyświetl tablicę countries (czyli bezpośrednio z api), jeśli filtered nie jest puste to wyświetl kraje pofiltrowane */}
        {this.state.isLoaded ? (
          <Countries
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
