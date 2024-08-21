import { Helmet } from "react-helmet";

import React from 'react'

function Meta(props) {
  return (
    <div>
       <Helmet>
        <meta charSet="utf-8" />
        <title>Cotton-Hub/ {props.title}</title>
      </Helmet>
    </div>
  )
}

export default Meta
