import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Countries.scss'

const Countries = (props) => {

    const countries = props.itemsAll.map((item, index) => (
        
        
        <Link to= {{ pathname: `/${item.answer}`,
                  state: {item: item.answer  } }} > 

       
            <div className="countryCard" key={index}>
                <div className="countryCard__flag">
                     <object data= {item.image} type="image/png">
      <img className= "countryCard__flagImg" src="https://as2.ftcdn.net/jpg/02/58/18/55/500_F_258185506_aaXtZySrasoDZ6lCmq8YDrUz21A6Gc7g.jpg" alt= {`${item.question} flag`} />
                     </object>
                </div>
                <div className="countryCard__description">
                    <h1 className="countryCard__primary">{item.question}</h1>
                    
                       
                        
                    
                </div>

            </div>
        </Link>
    ))
    return (
        <>
            <div className='countries-container'>
                {countries}
            </div>
        </>
    );
}

export default Countries;
