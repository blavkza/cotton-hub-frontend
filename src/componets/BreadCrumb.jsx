import React from 'react'
import { Link } from 'react-router-dom';


const BreadCrumb = (props) => {
  const {title} = props;
  return (
    <>
    <div className="py-3">
      <div className="container">
        <div className="text-center text-black">
          <p>
            <Link to="/">Home &nbsp;</Link> / {title}
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default BreadCrumb