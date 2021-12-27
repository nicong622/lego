import Script from 'next/script';
import React, { useEffect, useState } from 'react';

const config = {
  "imports": {
    "qrcode.react": "https://ga.system.jspm.io/npm:qrcode.react@1.0.1/lib/index.js"
  },
  "scopes": {
    "https://ga.system.jspm.io/": {
      "object-assign": "https://ga.system.jspm.io/npm:object-assign@4.1.1/index.js",
      "prop-types": "https://ga.system.jspm.io/npm:prop-types@15.8.0/index.js",
      "qr.js/lib/ErrorCorrectLevel": "https://ga.system.jspm.io/npm:qr.js@0.0.0/lib/ErrorCorrectLevel.js",
      "qr.js/lib/QRCode": "https://ga.system.jspm.io/npm:qr.js@0.0.0/lib/QRCode.js",
      "react": "https://ga.system.jspm.io/npm:react@17.0.2/index.js"
    }
  }
}

export default function Systemjs() {
  const [El, setEl] = useState<React.ComponentType>()

	async function loadQrcode() {
    const module = await window.System.import('qrcode.react');

    setEl(() => module.default)
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

  return (
    <div>
      { El && <El value="12312" /> }

      <button onClick={loadQrcode}>load</button>

      <Script src='https://cdn.jsdelivr.net/npm/systemjs/dist/system.js' />
    </div>
  )
}