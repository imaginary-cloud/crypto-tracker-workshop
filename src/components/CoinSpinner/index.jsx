import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import './index.css'
import messages from './messages.json'

/**
 * Displays a coin and a loading label
 * Can be used to be included on a parent component or be called as fullscreen to block everything while loading
 * @param {boolean} fullscreen - The component fills the viewport
 * @returns
 */
function CoinSpinner({ fullscreen }) {
  const [messageIndex, setImageIndex] = useState(
    Math.floor(Math.random() * messages.messages.length),
  )
  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * messages.messages.length)
    setImageIndex(index)
  }, [])

  useEffect(() => {
    const intervalID = setInterval(shuffle, 1200)
    return () => clearInterval(intervalID)
  }, [shuffle])

  return (
    <div className={`coin-container${fullscreen ? ' fullscreen' : ''}`}>
      <div className="coin"></div>
      <h1 className="coin-title">Loading...</h1>
      {fullscreen ? (
        <h2 className="coin-subtitle">{messages.messages[messageIndex]}</h2>
      ) : null}
    </div>
  )
}

CoinSpinner.propTypes = {
  fullscreen: PropTypes.bool,
}

export default CoinSpinner
