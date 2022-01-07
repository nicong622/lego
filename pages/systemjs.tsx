import Script from 'next/script';
import React, { useEffect, useState } from 'react';

const config = {
  "imports": {
    "classnames": "https://ga.system.jspm.io/npm:classnames@2.3.1/index.js",
    "qrcode.react": "https://ga.system.jspm.io/npm:qrcode.react@1.0.1/lib/index.js",
    "IButton": "./bricks/button/index.sy.js"
  },
  "scopes": {
    "https://ga.system.jspm.io/": {
      "object-assign": "https://ga.system.jspm.io/npm:object-assign@4.1.1/index.js",
      "prop-types": "https://ga.system.jspm.io/npm:prop-types@15.8.0/index.js",
      "qr.js/lib/ErrorCorrectLevel": "https://ga.system.jspm.io/npm:qr.js@0.0.0/lib/ErrorCorrectLevel.js",
      "qr.js/lib/QRCode": "https://ga.system.jspm.io/npm:qr.js@0.0.0/lib/QRCode.js",
      "react": "https://ga.system.jspm.io/npm:react@17.0.2/index.js"
    },
    "./bricks/": {
      "react": "https://ga.system.jspm.io/npm:react@17.0.2/index.js"
    }
  }
}

interface CompType {
  El: React.ComponentType,
  props: object,
  id: string
}

export default function Systemjs() {
  const [components, setComponents] = useState<CompType[]>([])

	async function loadQrcode() {
    const module = await window.System.import('qrcode.react');

    setComponents([
      ...components,
      {
        El: module.default,
        props: { value: 'https://baidu.com' },
        id: `${Date.now()}`
      }
    ])
	}

  async function loadBtn() {
    const module = await window.System.import('IButton');

    setComponents([
      ...components,
      {
        El: module.Button,
        props: { text: 'Im a button' },
        id: `${Date.now()}`
      }
    ])
  }

  function importMap() {
    const el = document.createElement('script');
    el.type = "systemjs-importmap"
    el.innerText = JSON.stringify(config);
    document.body.appendChild(el)
  }

  useEffect(() => {
    if (process.browser) {
      importMap()
    }
  }, [])

  function renderComp() {
    return components.map(({ El, props, id }) => <div key={id} ><El {...props} /></div>)
  }

  return (
    <div>
      <div>
        <button className='border px-4 rounded mr-4' onClick={loadQrcode}>添加二维码</button>
        <button className='border px-4 rounded' onClick={loadBtn}>添加按钮</button>
      </div>

      { renderComp() }

      <Script src='https://cdn.jsdelivr.net/npm/systemjs/dist/system.js' />
    </div>
  )
}