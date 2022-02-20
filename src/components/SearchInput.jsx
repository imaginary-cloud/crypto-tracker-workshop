import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, InputAdornment } from '@mui/material'
import { styled } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import colors from '../assets/colors'

// style - margin, color
const StyledInput = styled('div')({
  color: colors.white,
  ' & input': {
    color: colors.white,
    fontSize: '24px',
  },
})

function SearchInput({ setCoin }) {
  const [value, setValue] = useState('')
  const keyPress = useCallback((e) => {
    if (e.keyCode === 13) {
      setCoin(e?.target?.value)
      console.log(e?.target?.value)
    }
  }, [])
  return (
    <StyledInput>
      <TextField
        id="input-with-icon-textfield"
        fullWidth
        variant="outlined"
        color="primary"
        size="medium"
        focused
        value={value}
        onChange={(e) => setValue(e?.target?.value)}
        placeholder="Select a coin"
        onKeyDown={keyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="start"
              onClick={() => setCoin(value)}
              style={{ cursor: 'pointer' }}
            >
              <SearchIcon color="secondary" />
            </InputAdornment>
          ),
        }}
      />
    </StyledInput>
  )
}

SearchInput.propTypes = {
  setCoin: PropTypes.func.isRequired,
}

export default SearchInput
