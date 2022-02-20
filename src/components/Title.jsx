import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'

function Title({ title }) {
  return (
    <Typography variant="h2" gutterBottom component="h1" color="secondary">
      {title}
    </Typography>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Title
