import t from"react";import e from"classnames";!function(t,e){void 0===e&&(e={});var o=e.insertAt;if(t&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===o&&n.firstChild?n.insertBefore(i,n.firstChild):n.appendChild(i),i.styleSheet?i.styleSheet.cssText=t:i.appendChild(document.createTextNode(t))}}('.button{position:relative;background-color:#4caf50;border:none;font-size:28px;color:#fff;padding:20px;width:200px;text-align:center;-webkit-transition-duration:.4s;transition-duration:.4s;text-decoration:none;overflow:hidden;cursor:pointer;box-shadow:0 8px 16px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)}.button:after{content:"";background:#f1f1f1;display:block;position:absolute;padding-top:300%;padding-left:350%;margin-left:-20px!important;margin-top:-120%;opacity:0;transition:all .8s}.button:active:after{padding:0;margin:0;opacity:1;transition:0s}');const o=({onClick:o,disabled:n,className:i,text:a})=>t.createElement("button",{type:"button",className:e("button",i),onClick:o,disabled:n},a);export{o as Button};