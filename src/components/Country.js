import React from 'react';
import { Link } from 'react-router-dom';
import "../style/Country.scss";

const Country = (props) => {
       
       
    return (
        <div className="country-container">
            <div className="country-container__back">
                <Link to="/" className="navLink">
                    <button className="btn country-container__button-back">Back</button>
                </Link>

            </div>
            <div className="country-details">
                <div className="country-details__flag">
                    <img className={`country-details__flagImg country-details__flagImg--${props.alpha3Code}`} src={props.flag} alt= {props.name} />
                </div>
                <div className="country-details__info">
                    <h1 className="country-details__headingPrimary">{props.name}</h1>
                    <ul className="info-list info-list--partOne">
                        <li className="info-item info-item--nativeName">
                            <h4 className="country-details__headingQuaternary">Native Name:</h4>{props.nativeName}
                        </li>
                       
                        
                    
                               <li className="borders-item" >
            <Link to= {props.borders} className="navLink">
                <button className="btn btn--borders">{props.borders}</button>
            </Link>
                               </li>
                                

                           </ul>         
                   
                    
                </div>
            </div>
        </div>
    );
}

export default Country;
