import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { styled } from '@mui/system'
import colors from '../assets/colors'

const MyComponent = styled('div')({
  color: colors.error,
  padding: 8,
  borderRadius: 4,
})

function ErrorMessage({ id, error }) {
  console.log(error)
  return (
    <MyComponent>
      <Typography variant="h5" gutterBottom component="span">
        No coin found with the name: {id}
      </Typography>
    </MyComponent>
  )
}

ErrorMessage.propTypes = {
  id: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
}

export default ErrorMessage
