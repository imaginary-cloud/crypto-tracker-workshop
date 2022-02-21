import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'

function Title({ title, secondary = false }) {
  return (
    <Typography
      variant={secondary ? 'h4' : 'h2'}
      gutterBottom
      component={secondary ? 'h3' : 'h1'}
      color="secondary"
    >
      {title}
    </Typography>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
}

export default Title
