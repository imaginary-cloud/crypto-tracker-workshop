import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import Grid from '@mui/material/Grid'
import { StarBorder } from '@mui/icons-material'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import CryptoLogo from './CryptoLogo'

const CryptoCardContainer = styled(Card)({
  position: 'relative',
  width: '100%',
  height: '100%',
  color: 'white',
  background:
    'linear-gradient(130deg, rgba(94,56,81,1) 0%, rgba(4,4,67,1) 0%, rgba(161,81,253,1) 100%)',
  boxShadow: '7px 7px 14px #02021b, -3px -3px 14px #06066b',
})

const CustomCardContent = styled(CardContent)({
  position: 'relative',
  textAlign: 'left',
  zIndex: '99',
})

const CryptoPrice = styled('div')({
  display: 'flex',
})

const CardLogo = styled(CryptoLogo)({
  position: 'absolute',
  top: '30%',
  left: '50%',
  textAlign: 'right',
  zIndex: '0',
  width: '200px',
  height: '200px',
  fill: 'rgba(0,0,0,0.3)',
})

const FavoriteIcon = styled('div')({
  position: 'absolute',
  right: '16px',
  top: '16px',
  cursor: 'pointer',
})

/**
 *
 * @param {string} value - the percentage change of crypto in 24h
 * @returns
 */
function CryptoValueChange({ value }) {
  const ValueChange = styled(Typography)({
    fontSize: '25px',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '1.5rem',
  })

  return value >= 0 ? (
    <ValueChange color="#0f0" variant="body1" component="div">
      {value.toFixed(2)}%<ArrowUpwardIcon fontSize="medium" />
    </ValueChange>
  ) : (
    <ValueChange color="#f00" variant="body1" component="div">
      {value.toFixed(2)}%<ArrowDownwardIcon fontSize="medium" />
    </ValueChange>
  )
}

CryptoValueChange.propTypes = {
  value: PropTypes.number.isRequired,
}

/**
 *
 * @param {string} id - id of the coin
 * @returns React.FunctionComponent<{ id: number | string }>
 */

function CryptoCard({ id, data }) {
  console.log(id)
  console.log(data)

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Box sx={{ m: '1rem', height: '90%' }}>
        <CryptoCardContainer>
          <CustomCardContent>
            <Typography variant="h3">{data?.name}</Typography>
            <Typography variant="h5">{data?.symbol}</Typography>
            <CryptoPrice>
              <Typography
                color="secondary"
                variant="h3"
                style={{ justifyContent: 'flex-start' }}
              >
                {data?.quotes?.USD?.price.toFixed(2)} $
              </Typography>
              <CryptoValueChange
                value={data?.quotes?.USD?.percent_change_24h}
              />
            </CryptoPrice>
            <br />
            <Typography variant="body2">
              <b>Supply:</b> {data?.circulating_supply.toFixed(2)} $
            </Typography>
            <Typography variant="body2">
              <b>Volume last 24H:</b> {data?.quotes?.USD?.volume_24h.toFixed(2)}{' '}
              $
            </Typography>
            <FavoriteIcon>
              <StarBorder color="secondary" fontSize="large" />
            </FavoriteIcon>
          </CustomCardContent>
          <CardLogo symbol={data?.symbol} />
        </CryptoCardContainer>
      </Box>
    </Grid>
  )
}

CryptoCard.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
}

export default CryptoCard
