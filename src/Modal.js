import React from 'react'
import ReactDom from 'react-dom'
import imgc from './icons8-close-96.png'


const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button className='btn' style={{ marginLeft: "97%", marginTop: "-35px" }} onClick={onClose}> <img src ={imgc} style={{height:"50px" , width:"50px" }} alt='' ></img></button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}