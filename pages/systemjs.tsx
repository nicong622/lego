import Script from 'next/script';
import React, { useEffect, useState } from 'react';

// 配置模块来源
let commonImportMap = {
  "imports": {
    "classnames": "https://ga.system.jspm.io/npm:classnames@2.3.1/index.js",
    "object-assign": "https://ga.system.jspm.io/npm:object-assign@4.1.1/index.js",
    "react": "https://ga.system.jspm.io/npm:react@17.0.2/index.js"
  },
  "scopes": {}
}
const qrcodeImportMap = {
  "imports": {
    "qrcode.react": "https://ga.system.jspm.io/npm:qrcode.react@1.0.1/lib/index.js",
  },
  "scopes": {
    "https://ga.system.jspm.io/": {
      "prop-types": "https://ga.system.jspm.io/npm:prop-types@15.8.0/index.js",
      "qr.js/lib/ErrorCorrectLevel": "https://ga.system.jspm.io/npm:qr.js@0.0.0/lib/ErrorCorrectLevel.js",
      "qr.js/lib/QRCode": "https://ga.system.jspm.io/npm:qr.js@0.0.0/lib/QRCode.js"
    }
  }
}
const buttonImportMap = {
  "imports": {
    "IButton": "./bricks/button/index.sy.js"
  },
  "scopes": {
    "./bricks/": {
    }
  }
}

interface CompType {
  El: React.ComponentType,
  props: object,
  id: string
}

function sleep(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  })
}

export default function Systemjs() {
  const [components, setComponents] = useState<CompType[]>([])

	async function loadQrcode() {
    importMap(qrcodeImportMap)
    await window.System.prepareImport(1)

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
    importMap(buttonImportMap)
    await window.System.prepareImport(1)

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

  function importMap(config: object) {
    const el = document.createElement('script');
    el.type = "systemjs-importmap"
    el.innerText = JSON.stringify(config);
    document.body.appendChild(el)
  }

  useEffect(() => {
    if (process.browser) {
      importMap(commonImportMap)
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