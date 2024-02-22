import React from 'react'
import './loader.css'

function Loader() {
  return (
    <>
        <div className="black-screen d-flex justify-content-center align-items-center">
        <div className="spinner-border text-danger" role="status">
  <span className="sr-only"></span>
</div>
        </div>
    </>
  )
}

export default Loader