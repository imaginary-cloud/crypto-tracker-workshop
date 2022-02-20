import React from 'react'
import { Typography } from '@mui/material'
import { styled } from '@mui/system'
import colors from '../assets/colors'

const MyComponent = styled('div')({
  color: colors.error,
  padding: 8,
  borderRadius: 4,
})

function ErrorMessage() {
  return (
    <MyComponent>
      <Typography variant="h5" gutterBottom component="span">
        No coin found with that name
      </Typography>
    </MyComponent>
  )
}

export default ErrorMessage
