!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){e.exports={Router:({base:e="",routes:t=[]}={})=>({__proto__:new Proxy({},{get:(r,n,o)=>(r,...s)=>t.push([n.toUpperCase(),RegExp(`^${(e+r).replace(/(\/?)\*/g,"($1.*)?").replace(/\/$/,"").replace(/:(\w+)(\?)?(\.)?/g,"$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/,"\\.")}/*$`),s])&&o}),routes:t,async handle(e,...r){let n,o,s=new URL(e.url);for(var[a,i,u]of(e.query=Object.fromEntries(s.searchParams),t))if((a===e.method||"ALL"===a)&&(o=s.pathname.match(i)))for(var l of(e.params=o.groups,u))if(void 0!==(n=await l(e.proxy||e,...r)))return n}})}},function(e,t,r){"use strict";r.r(t);var n,o=r(0),s=new Uint8Array(16);function a(){if(!n&&!(n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(s)}var i=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var u=function(e){return"string"==typeof e&&i.test(e)},l=[],c=0;c<256;++c)l.push((c+256).toString(16).substr(1));var p=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=(l[e[t+0]]+l[e[t+1]]+l[e[t+2]]+l[e[t+3]]+"-"+l[e[t+4]]+l[e[t+5]]+"-"+l[e[t+6]]+l[e[t+7]]+"-"+l[e[t+8]]+l[e[t+9]]+"-"+l[e[t+10]]+l[e[t+11]]+l[e[t+12]]+l[e[t+13]]+l[e[t+14]]+l[e[t+15]]).toLowerCase();if(!u(r))throw TypeError("Stringified UUID is invalid");return r};var d=function(e,t,r){var n=(e=e||{}).random||(e.rng||a)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){r=r||0;for(var o=0;o<16;++o)t[r+o]=n[o];return t}return p(n)};const f=Object(o.Router)(),y="https://civic-fool-put-heights.trycloudflare.com",g=e=>new Response(JSON.stringify(e),{headers:{"Content-Type":"application/json"},status:503}),h=e=>{const t=new Response(e,{headers:{"Content-Type":"application/json"}});return t.headers.set("Access-Control-Allow-Origin","*"),t.headers.set("Access-Control-Allow-Methods","GET,HEAD,POST,PUT,OPTIONS,DELETE"),t.headers.append("Vary","Origin"),t};f.get("/posts",async()=>{const e=await POSTS.list(),t=[];if(e&&e.keys)for(const r in e.keys){const n=await POSTS.get(e.keys[r].name,{type:"json"});n&&t.push({...n,id:e.keys[r].name})}return h(JSON.stringify(t))}),f.get("/posts/:id",async({params:e})=>{const{id:t}=e,r=await POSTS.get(t);return r?h(r):g({message:"No data available for the ID: "+t})}),f.post("/posts",async e=>{let t="";if("application/json"===e.headers.get("Content-Type")&&(t=await e.json()),!t)return g({message:"Post cannot be empty, pass username, content, title to create a post"});const r=h(JSON.stringify(t)),n=e.headers.get("Cookie");let o=n&&n.split("=")[1],s="";if(o)try{if(await fetch(y+"/verify",{headers:{Cookie:"token="+o}}).then(e=>e.text())!=t.username)throw console.log("Invalid User"),Error("Invalid User");s=o,console.log("User Verified"),await POSTS.put(d(),JSON.stringify(t))}catch(e){return g({message:"Invalid user"})}else s=await fetch(`${y}/auth/${t.username}`).then(e=>e.text()),await POSTS.put(d(),JSON.stringify(t)),console.log("New User posted");const a=new Date;return a.setHours(a.getHours()+24),r.headers.set("Set-Cookie",`token=${s}; Path=/posts; Expires=${a.toUTCString()};`),r}),f.put("/posts/:id",async e=>{let t={};const{id:r}=e.params;"application/json"===e.headers.get("Content-Type")&&(t=await e.json());const n=await POSTS.get(r,{type:"json"});return n?(await POSTS.put(r,JSON.stringify({...n,...t})),h("Updated Sucessfully")):g({message:"No data available for the ID: "+r})}),f.delete("/posts/:id",async({params:e})=>{const{id:t}=e;return await POSTS.delete(t),h("Deleted Sucessfully")}),f.all("*",e=>{const t=new URL(e.url);return Response.redirect(t+"/posts",301)});addEventListener("fetch",e=>{"OPTIONS"===e.request.method?e.respondWith((e=>{let t=e.headers;if(null!==t.get("Origin")&&null!==t.get("Access-Control-Request-Method")&&null!==t.get("Access-Control-Request-Headers")){let t={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,HEAD,POST,PUT,DELETE,OPTIONS","Access-Control-Max-Age":"86400","Access-Control-Allow-Headers":e.headers.get("Access-Control-Request-Headers")};return new Response(null,{headers:t})}return new Response(null,{headers:{Allow:"GET,HEAD,POST,PUT,DELETE,OPTIONS"}})})(e.request)):e.respondWith(f.handle(e.request))})}]);