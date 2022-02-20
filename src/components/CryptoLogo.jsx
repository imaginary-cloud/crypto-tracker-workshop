import React, { useEffect, useState } from 'react'

function CryptoLogo(prop) {
  const { symbol, ...otherProps } = prop

  const [iconModule, setIconModule] = useState(null)

  useEffect(() => {
    /* Use dynamic import to get corresponding icon as a module */
    const logoName = symbol.toLowerCase()
    import(`../../node_modules/cryptocurrency-icons/svg/black/${logoName}.svg`)
      .then((module) => {
        setIconModule(module)
      })
      .catch(() => {})
  }, [symbol])

  const renderIcon = () => {
    if (!iconModule) return null

    const Component = iconModule.ReactComponent

    return <Component {...otherProps} />
  }

  return <>{renderIcon()}</>
}
export default CryptoLogo
