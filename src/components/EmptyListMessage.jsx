import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { styled } from '@mui/system'

const MyComponent = styled('div')({
  padding: 8,
  borderRadius: 4,
})

function EmptyListMessage({ id }) {
  return (
    <MyComponent>
      <Typography variant="h5" gutterBottom component="span" color="primary">
        No coins found with the name: {id}
      </Typography>
    </MyComponent>
  )
}

EmptyListMessage.propTypes = {
  id: PropTypes.string.isRequired,
}

export default EmptyListMessage
