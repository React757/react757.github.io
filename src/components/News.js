import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Countries.scss'

const News = (props) => {
  const Newss = props.itemsAll.slice(0).reverse().map((item, index) => (
    <Link to={{ pathname: `/${item.answer}`, state: { item: item.answer } }}>
      <div className="countryCard" key={index}>
        <div className="countryCard__flag">
          <img
            className="countryCard__flagImg"
            src={item.image}
            alt={item.question}
            onError={(e)=>{e.target.onerror = null;
              e.target.src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_News_icon.svg/200px-Google_News_icon.svg.png"}}
          />
        </div>
        <div className="countryCard__description">
          <h1 className="countryCard__primary">{item.question}</h1>
        </div>
      </div>
    </Link>
  ))
  return (
    <>
      <div className="countries-container">{Newss}</div>
    </>
  )
}

export default News
