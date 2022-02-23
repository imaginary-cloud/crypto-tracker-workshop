
[github-url]: https://abc.de

# Crypto Tracker

Crypto Tracker is a fancy web application built with React to follow the price and assorted metrics of a given set of crypto currencies.
This application provides the following functionalities:

* Search for crypto currencies;
* Display the price, volume and remaining metrics for a chosen coin;
* Allow users to follow crypto currencies;
* Offer a dashboard to consult the price and associated metrics for all followed crypto currencies.


# Table of contents

* [Setup](#setup) - General instructions to install Node v16;
* [Bootstrapping](#bootstrapping) - Instructions to get the application running on your machine;
* [Building our application](#building-our-application) - Moving into the codebase and hacking our way into an application;
* [Next steps](#next-steps) - Suggestions of further challenges to enhance our tracker.



# Setup
Make sure you have Node v16 installed and ready to go, either download it directly from its [download page](https://nodejs.org/en/download/), or through [`nvm`](https://github.com/nvm-sh/nvm#installing-and-updating), which we recommend for both Linux and macOS.

Follow the next set of instructions to complete your setup with `nvm`.

## NVM
### Install Node v16:
```bash
nvm install 16.14.0
```

### Select Node v16
```bash
nvm use 16.14.0
```

### Validate that Node v16 is installed and available
```bash
node --version
> v16.14.0
```




# Bootstrapping

## Clone this repo
```bash
git clone  https://github.com/imaginary-cloud/crypto-tracker-workshop.git crypto-tracker
```

```bash
cd crypto-tracker
```

## Install all dependencies
```bash
npm install
```

## Start the application
```
npm run start
```

The application will be launched and will become accessible on [http://localhost:3000](http:/localhost:3000).

Explore the project and provided components found on the [component folder](./src/components/).
Please play, import some component into the [App](./src//App.jsx) component, see what happens and have some fun with it.

# Building our application


## Search integration

Searching for a crypto currency will be the root feature that will power this application.
As you can observe on [SearchInput](./src/components/SearchInput.jsx), which provides an base component to start implementing our search.

Relying upon Coinpaprika's api, implement the applications search capabilities, taking advantage of its [search endpoint](https://api.coinpaprika.com/#tag/Tools/paths/~1search/get).

* Example of the search 'bit' - https://api.coinpaprika.com/v1/search/?limit=6&c=currencies&q=bit

For this exercise we will focus on a minimalist approach relying exclusively upon basic React constructs:

* [useState](https://reactjs.org/docs/hooks-state.html) - React's hook to monitor a value, like a number, string or object, as well as a base construct to update the value. Handy when storing a value provided by the user;
* [useEffect](https://reactjs.org/docs/hooks-effect.html) - React's hook to interact with the component's lifecycle and place a subscription over a set of values, to trigger the hook upon changes. Helpful when additional data needs to be fetched after receiving a new input.
* [Request](./src/api/utils/request.js) - A general purpose wrapper for [Axios](https://github.com/axios/axios) with minimal configuration for everything related with performing request to a remote api.


<details>
  <summary>How do I juggle useState, useEffect and Request all together??</summary>

  ```javascript
  import React, { useState, useEffect } from 'react'
  import Typography from '@mui/material/Typography'

  import Request from '../api/utils/request'

  function CryptoCard({ id }) {
    const [data, setData] = useState([])
    const [error, setError] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      async function fetchData() {
        setIsLoading(true)

        try {
          if (id) {
            const searchResponse = await Request.get({
              url: '/search',
              params: {
                q: coin,
                limit: 6,
                c: 'currencies',
              },
            })
            setData(searchResponse.data.currencies)
          }
        } catch (e) {
          setError(e)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }, [id])

    return (
      <div>
        <Typography variant="h5">{data?.name}</Typography>
        <Typography color="secondary" variant="p" component="p">
          {data?.quotes?.USD?.price}$
        </Typography>
      </div>
    )
  }
  ```
</details>


## Fetching coin information

Lest take a closer look at the [CryptoCard](./src/components/CryptoCard.jsx) aimed towards rendering the cryptocurrency's details for a given coinId.

Instead of reapplying the previous approach with useState and useEffect, we will take advantage of [React Query](https://react-query.tanstack.com/) and the [useQuery](https://react-query.tanstack.com/reference/useQuery) hook, which already abstracts all the logic of the previous step to manage the errors and provide an indication that the application is loading.
Rely on useQuery hook to fetch the coin's ticker.

Coinpaprika's documentation to fetch a coin's ticker by id:
* https://api.coinpaprika.com/#operation/getTickersById

Example for Bitcoin:
* https://api.coinpaprika.com/v1/tickers/btc-bitcoin



<details>
  <summary>How do I use react-query?</summary>

  ```javascript
  import React from 'react'
  import Typography from '@mui/material/Typography'
  import { useQuery } from 'react-query'

  function CryptoCard({ id }) {
    const { data, error, isLoading } = useQuery(['ticker', id], () =>
      Request.get({ url: `/tickers/${id}` }),
    )

    return (
      <div>
        <Typography variant="h5">{data?.name}</Typography>
        <Typography color="secondary" variant="p" component="p">
          {data?.quotes?.USD?.price}$
        </Typography>
      </div>
    )
  }
  ```
</details>


<details>
  <summary>How do isolate the useQuery for further reutilization?</summary>

  Move logic for the useQuery into a dedicated hook, useCoin.

  ```javascript
  import React from 'react'
  import Typography from '@mui/material/Typography'
  import { useQuery } from 'react-query'

  const useCoin = (coinId) => useQuery(
    ['ticker', coinId],
    () => Request.get({ url: `/tickers/${coinId}` }),
  )

  function CryptoCard({ id }) {
    const { data, error, isLoading } = useCoin(id)

    return (
      <div>
        <Typography variant="h5">{data?.name}</Typography>
        <Typography color="secondary" variant="p" component="p">
          {data?.quotes?.USD?.price}$
        </Typography>
      </div>
    )
  }
  ```
</details>

## Decoupling data fetching from data rendering

Lets take a look at our component [CryptoCard](./src/components/CryptoCard.jsx), which has two major responsibilities, fetch data about the provided cryptocurrency and render its details. This approach is quite lackluster since it hinders its ability to reuse the component over the application and we will most likely have to repeat the code to fetch market's data, which we would like to avoid because **duplication is evil**.

Lets break this responsibilities apart and create a component that is only capable of fetching coin's details and another capable of rendering the coin's market data.

The second component is a slim version of our current component without the logic associated with fetching the coin's ticker.
The first component, which we will refer as a Resource Provider will be an higher-order component (hoc), capable of fetching the coin's data and provide it to its children.


<details>
  <summary>How does the second component get any data?</summary>


  An higher-order component is a pattern often used to control and shape the rendering of the provided children without requiring any knowledge or binding with the underlying child components.

  ```javascript
  import React from 'react'
  import Typography from '@mui/material/Typography'
  import { useQuery } from 'react-query'

  const useCoin = (coinId) => useQuery(
    ['ticker', coinId],
    () => Request.get({ url: `/tickers/${coinId}` }),
  )

  function ResourceProvider({url, coinId, children}) {
    const {data , isLoading, error} = useQuery(
      ['ticker', coinId],
      // () => Request.get({ url: `/tickers/${coinId}` }),
      () => Request.get({ url }),
    )

    return children({data, isLoading, error})

  }

  function CryptoCard({ id }) {
    const { data, error, isLoading } = useCoin(id)

    return (
      <ResourceProvider coinId={id} url={`/tickers/${id}`}>
        {({data, isLoading, error}) => (
          <div>
            <Typography variant="h5">{data?.name}</Typography>
            <Typography color="secondary" variant="p" component="p">
              {data?.quotes?.USD?.price}$
            </Typography>
          </div>
        )}
      </ResourceProvider>
    )
  }
  ```
</details>


# Next steps

Explore the useQuery's documentation and focus upon the configuration the hook can receive to tailor its behavior to our application.

<details>
  <summary>How do I provide additional configuration to useQuery?</summary>

  useQuery can receive a third parameter with options refining its behavior to better suite the nature of the interaction between the application and an api.
  A comprehensive list of can be found [here](https://react-query.tanstack.com/reference/useQuery)


  ```javascript
  import React from 'react'
  import Typography from '@mui/material/Typography'
  import { useQuery } from 'react-query'

  function CryptoCard({ id }) {
    const { data, error, isLoading } = useQuery(
      ['ticker', id],
      () => Request.get({ url: `/tickers/${id}` }),
      {
       refetchInterval: 30000, // refetch every 30 seconds
       retry: false,
      }
    )

    return (
      <div>
        <Typography variant="h5">{data?.name}</Typography>
        <Typography color="secondary" variant="p" component="p">
          {data?.quotes?.USD?.price}$
        </Typography>
      </div>
    )
  }
  ```

</details>
