import axios from 'axios'
import React, { useState } from 'react'
import InputColor from 'react-input-color'
import { ChromePicker } from 'react-color'
function Form() {
  const [data, setdata] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [format, setFormat] = useState('')
  const [color, setColor] = useState('')
  const [bgColor, setBgColor] = useState('')
  const [qr, setQr] = useState('')
  const option = [
    { id: 1, val: 'JPG' },
    { id: 2, val: 'SVG' },
    { id: 3, val: 'PNG' },
  ]

  let submit = () => {
    try {
      if (data !== '' && width !== 0 && height != 0) {
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          data,
        )}&size=${width}x${height}&format=${format}&color=${color}&bgcolor=${bgColor}`

        setQr(qrCodeUrl)

        console.log(qr)
      } else {
        alert('Please fill all data')
      }
    } catch (err) {
      console.log(err)
    }
  }

  //download function
  const downloadImage = () => {
    const imageUrl = qr
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'qr-code.PNG'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      })
  }
  return (
    <>
      <div class="form">
        <div className="row">
          <h1>QR Code Generator</h1>
          <div className="col">
            <label for="data">Data:</label>
            <input
              type="text"
              id="data"
              placeholder="Enter data"
              onChange={(e) => setdata(e.target.value)}
            />

            <label for="width">Width (px):</label>
            <input
              type="number"
              id="width"
              placeholder="Width"
              onChange={(e) => setWidth(e.target.value)}
            />

            <label for="height">Height (px):</label>
            <input
              type="number"
              id="height"
              placeholder="Height"
              onChange={(e) => setHeight(e.target.value)}
            />

            <label for="format">QR Image Format:</label>
            <select
              id="format"
              value={'JPG'}
              onChange={(e) => setFormat(e.target.value)}
            >
              {option.map((value, id) => (
                <option key={id}>{value.val}</option>
              ))}
            </select>

            <label for="qr-color">QR Code Color:</label>
            <input
              type="color"
              onChange={(e) => {
                setColor(e.target.value.substring(1))
              }}
              placement="right"
            />

            <label for="bg-color">Background Color:</label>
            <input
              type="color"
              onChange={(e) => {
                setBgColor(e.target.value.substring(1))
              }}
              placement="right"
            />

            <div className="buttons">
              <button id="generate" onClick={submit}>
                Generate QR Code
              </button>
              {qr ? (
                <button id="download" onClick={downloadImage}>
                  download
                </button>
              ) : (
                ''
              )}
            </div>
          </div>

          <div id="qr-code">{qr && <img src={qr} alt="qrcode" />}</div>
        </div>
      </div>
    </>
  )
}

export default Form
