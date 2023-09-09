import axios from 'axios'
import React, { useState } from 'react'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import InputColor from 'react-input-color'
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

  let submit = async () => {
    let c = color.hex.slice(1)
    let bg = bgColor.hex.slice(1)
    try {
      const qrCodeUrl = await axios.post(
        `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          data,
        )}&size=${width}x${height}&format=${format}&color=${c}&bgcolor=${bg}`,
      )

      setQr(qrCodeUrl.config.url)

      console.log(qr)
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
            <select id="format" onChange={(e) => setFormat(e.target.value)}>
              {option.map((value, id) => (
                <option key={id} value={value.val}>
                  {value.val}
                </option>
              ))}
            </select>

            <label for="qr-color">QR Code Color:</label>
            <InputColor
              initialValue="#f2f3f7ff"
              onChange={setColor}
              placement="right"
            />

            <label for="bg-color">Background Color:</label>
            <InputColor
              id="color-box"
              initialValue="#070708ff"
              onChange={setBgColor}
              placement="right"
            />

            <div className="buttons">
              <button id="generate" onClick={submit}>
                Generate QR Code
              </button>
              <button id="download" onClick={downloadImage}>
                download
              </button>
            </div>
          </div>

          <div id="qr-code">
            <img src={qr} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Form
