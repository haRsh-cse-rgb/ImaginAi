import React from 'react'

import { Watch } from  'react-loader-spinner'

const Loader = () => {
  return (
    <Watch
  height="80"
  width="80"
  radius="48"
  color="#6469ff"
  ariaLabel="watch-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>
  )
}

export default Loader
