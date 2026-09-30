import React from 'react';
import './card.scss';
import Icon from '../../icons/Icon.jsx'

const Card = ({ feature, key }) => {

  return (
    <div className={`features-card`}
      style={
        feature.bgColor == "green" ? {
          background: "#10574626"
        } : {
          background: "#a9563226"
        }
      }
      key={key}>
      <div className={`image-wrapper`}
        style={
          feature.bgColor == "green" ? {
            background: "#10574658"
          } : {
            background: "#a9563250"
          }
        }>
        <img src={feature.image} alt={feature.title} />
      </div>
      <div className="text-wrapper">
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
      <button className={`btn`}
        style={
          feature.bgColor == "green" ? {
            background: "#105746"
          } : {
            background: "#a95632"
          }
        }>{feature.text} <Icon type="arrow" size={19} /></button>
    </div>
  )
}

export default Card