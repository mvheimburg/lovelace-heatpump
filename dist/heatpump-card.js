/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$3=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$2 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$3=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$3,defineProperty:e$2,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$2,getOwnPropertySymbols:o$3,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$2=c$1?c$1.emptyScript:"",p$2=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$2:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$3(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$2(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$2(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$2?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$2=t=>t,s$1=t$1.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o$2,r$1=`<${n}>`,l$1=document,c=()=>l$1.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p$1=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l$1.createTreeWalker(l$1,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m$1:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p$1):void 0!==u[3]&&(c=p$1):c===p$1?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p$1:'"'===u[3]?$:g):c===$||c===g?c=p$1:c===_||c===m$1?c=v:(c=p$1,n=void 0);const x=c===p$1&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$1:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H$1}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l$1).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l$1,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l$1.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$2(t).nextSibling;i$2(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}let H$1 = class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}};class I extends H$1{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H$1{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H$1{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$1 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$1._$litElement$=true,i$1["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$1});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i$1});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},e=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const r=o=>void 0===o.strings,m={},p=(o,t=m)=>o._$AH=t;

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=e(class extends i{constructor(r$1){if(super(r$1),r$1.type!==t.PROPERTY&&r$1.type!==t.ATTRIBUTE&&r$1.type!==t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!r(r$1))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(i,[t$1]){if(t$1===E||t$1===A)return t$1;const o=i.element,l=i.name;if(i.type===t.PROPERTY){if(t$1===o[l])return E}else if(i.type===t.BOOLEAN_ATTRIBUTE){if(!!t$1===o.hasAttribute(l))return E}else if(i.type===t.ATTRIBUTE&&o.getAttribute(l)===t$1+"")return E;return p(i),t$1}});

const colorSchemes = [
    "home-assistant",
    "bright",
    "warm",
    "mint",
    "sky",
    "lavender",
];
const en$2 = {
    label: "Color scheme",
    "home-assistant": "Home Assistant",
    bright: "Bright",
    warm: "Warm",
    mint: "Mint",
    sky: "Sky",
    lavender: "Lavender",
    invalid: "Choose a valid color_scheme: home-assistant, bright, warm, mint, sky or lavender.",
};
const nb$2 = {
    label: "Fargevalg",
    "home-assistant": "Home Assistant",
    bright: "Lys",
    warm: "Varm",
    mint: "Mint",
    sky: "Himmelblå",
    lavender: "Lavendel",
    invalid: "Velg en gyldig color_scheme: home-assistant, bright, warm, mint, sky eller lavender.",
};
function colorSchemeText(hass) {
    const language = (hass?.language || hass?.locale?.language || "en")
        .toLowerCase()
        .replace(/_/g, "-")
        .split("-")[0];
    return ["nb", "no", "nn"].includes(language) ? nb$2 : en$2;
}
function applyColorScheme(host, value, hass) {
    const scheme = value === undefined ? "home-assistant" : value;
    if (typeof scheme !== "string" ||
        !colorSchemes.includes(scheme)) {
        throw new Error(colorSchemeText(hass).invalid);
    }
    if (scheme === "home-assistant")
        host.removeAttribute("data-color-scheme");
    else
        host.setAttribute("data-color-scheme", scheme);
}
function colorSchemeSelector(hass, value, change) {
    const text = colorSchemeText(hass);
    return b `<label
    style="display:flex;flex-direction:column;align-items:stretch;gap:6px;margin:12px 0;"
  >
    ${text.label}
    <select
      name="color_scheme"
      style="font:inherit;min-height:44px;width:100%;padding:8px 10px;border-radius:8px;border:1px solid var(--divider-color, #ccc);background:var(--card-background-color, #fff);color:var(--primary-text-color, #202b36);"
      .value=${l(String(value ?? "home-assistant"))}
      @change=${(event) => {
        event.stopPropagation();
        change(event.target.value);
    }}
    >
      ${colorSchemes.map((scheme) => b `<option value=${scheme} ?selected=${scheme === (value ?? "home-assistant")}>${text[scheme]}</option>`)}
    </select>
  </label>`;
}
/** Local overrides only: removing the attribute restores the dashboard theme. */
const colorSchemeStyles = i$4 `
  :host([data-color-scheme]) {
    color-scheme: light;
    --primary-text-color: #202b36;
    --secondary-text-color: #52606d;
    --disabled-text-color: #626d78;
    --text-primary-color: #fff;
    --success-color: #28723c;
    --warning-color: #8c6100;
    --error-color: #bd2635;
    --orange-color: #ab4b13;
    --info-color: #146a91;
    --primary-color: var(--scheme-accent);
    --accent-color: var(--scheme-accent);
    --card-background-color: var(--scheme-surface);
    --ha-card-background: var(--scheme-surface);
    --primary-background-color: var(--scheme-surface);
    --secondary-background-color: var(--scheme-secondary);
    --divider-color: var(--scheme-border);
    --ha-card-border-color: var(--scheme-border);
    --bubble-main-background-color: var(--scheme-surface);
    --bubble-secondary-background-color: var(--scheme-secondary);
    --bubble-icon-background-color: var(--scheme-secondary);
    --bubble-sub-button-background-color: var(--scheme-secondary);
    --bubble-accent-color: var(--scheme-accent);
    --bubble-border: 1px solid var(--scheme-border);
    --ha-card-box-shadow: 0 2px 8px rgb(32 43 54 / 0.06);
    --bubble-box-shadow: var(--ha-card-box-shadow);
    --input-fill-color: var(--scheme-secondary);
    --input-ink-color: var(--primary-text-color);
    --input-label-ink-color: var(--secondary-text-color);
    --mdc-theme-primary: var(--scheme-accent);
    --mdc-theme-surface: var(--scheme-surface);
    --mdc-theme-on-surface: var(--primary-text-color);
    --mdc-text-field-fill-color: var(--scheme-secondary);
    --mdc-text-field-ink-color: var(--primary-text-color);
  }
  :host([data-color-scheme="bright"]) {
    --scheme-surface: #ffffff;
    --scheme-secondary: #edf3fa;
    --scheme-accent: #2365a5;
    --scheme-border: #ccd9e7;
  }
  :host([data-color-scheme="warm"]) {
    --scheme-surface: #fffaf1;
    --scheme-secondary: #f4ead9;
    --scheme-accent: #885321;
    --scheme-border: #ddd0ba;
  }
  :host([data-color-scheme="mint"]) {
    --scheme-surface: #f2fbf5;
    --scheme-secondary: #dfefe5;
    --scheme-accent: #286c50;
    --scheme-border: #c1d9ca;
  }
  :host([data-color-scheme="sky"]) {
    --scheme-surface: #f1f8ff;
    --scheme-secondary: #dfeefa;
    --scheme-accent: #22638e;
    --scheme-border: #c2d8e9;
  }
  :host([data-color-scheme="lavender"]) {
    --scheme-surface: #faf5ff;
    --scheme-secondary: #ede3f6;
    --scheme-accent: #725095;
    --scheme-border: #d7c8e5;
  }
`;

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=o=>o??A;

const roles = [
    "climate",
    "water",
    "flow",
    "flowTarget",
    "outdoor",
    "pressure",
    "tank",
    "waterTarget",
    "boost",
    "legionella",
    "quickVeto",
    "curve",
    "minFlow",
    "trouble",
    "heatingElectric",
    "heatingHeat",
    "heatingEnvironment",
    "waterElectric",
    "waterHeat",
    "waterEnvironment",
];

function normalizeConfig(config) {
    if (!config || config.type !== "custom:heatpump-card")
        throw new Error("Expected type: custom:heatpump-card");
    for (const [key, values] of Object.entries({
        mode: ["all", "comfort", "water", "efficiency"],
        appearance: ["default", "bubble"],
        cop_window: ["24h", "7d", "30d"],
    })) {
        const value = config[key];
        if (value !== undefined && !values.includes(value))
            throw new Error(`Invalid ${key}`);
    }
    for (const key of [
        "show_efficiency",
        "show_hot_water",
        "allow_curve_edit",
    ])
        if (config[key] !== undefined && typeof config[key] !== "boolean")
            throw new Error(`Invalid ${key}`);
    for (const key of ["entry", "entity", "name"])
        if (config[key] !== undefined &&
            (typeof config[key] !== "string" || !config[key]?.trim()))
            throw new Error(`Invalid ${key}`);
    if (config.entity && !config.entity.startsWith("climate."))
        throw new Error("entity must be a climate entity");
    if (config.cooling_entity !== undefined &&
        (typeof config.cooling_entity !== "string" ||
            !/^(switch|input_boolean)\.\w+$/.test(config.cooling_entity)))
        throw new Error("cooling_entity must be a switch or input_boolean");
    if (config.legionella_interval_days !== undefined &&
        (!Number.isFinite(config.legionella_interval_days) ||
            config.legionella_interval_days <= 0))
        throw new Error("legionella_interval_days must be positive");
    if (config.entities) {
        if (typeof config.entities !== "object" || Array.isArray(config.entities))
            throw new Error("Invalid entities");
        for (const [key, id] of Object.entries(config.entities))
            if (!roles.includes(key) ||
                typeof id !== "string" ||
                !/^\w+\.[\w]+$/.test(id))
                throw new Error(`Invalid role override: ${key}`);
    }
    return {
        mode: "all",
        appearance: "default",
        cop_window: "7d",
        show_efficiency: true,
        show_hot_water: true,
        allow_curve_edit: false,
        legionella_interval_days: 7,
        ...config,
        entities: { ...config.entities },
    };
}

const domain = (e) => e.entity_id.split(".")[0];
const slug = (value) => value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/_+$/, "");
const endings = {
    flow: ["flow_temperature"],
    flowTarget: ["flow_temperature_setpoint"],
    outdoor: ["outdoor_temperature"],
    pressure: ["water_pressure"],
    tank: ["tank_temperature"],
    waterTarget: ["set_point"],
    boost: ["boost_switch", "boost"],
    legionella: [
        "legionella_protection_datetime",
        "legionella_protection_temperature_reached",
    ],
    quickVeto: ["quick_veto_duration"],
    curve: ["heating_curve"],
    minFlow: ["min_flow_temperature_setpoint"],
    trouble: ["trouble_codes", "control_error"],
    heatingElectric: ["consumed_electrical_energy_heating"],
    heatingHeat: ["heat_generated_heating"],
    heatingEnvironment: ["earned_environment_energy_heating"],
    waterElectric: [
        "consumed_electrical_energy_domestic_hot_water",
        "consumed_electrical_energy_hot_water",
    ],
    waterHeat: ["heat_generated_domestic_hot_water", "heat_generated_hot_water"],
    waterEnvironment: [
        "earned_environment_energy_domestic_hot_water",
        "earned_environment_energy_hot_water",
    ],
};
const roleDomain = (role) => role === "climate"
    ? "climate"
    : role === "water"
        ? "water_heater"
        : role === "boost"
            ? "switch"
            : role === "trouble"
                ? "binary_sensor"
                : ["curve", "minFlow", "quickVeto"].includes(role)
                    ? "number"
                    : role === "legionella"
                        ? "datetime"
                        : "sensor";
function score(e, role, states) {
    if (domain(e) !== roleDomain(role))
        return 0;
    if (role === "flowTarget" &&
        [e.unique_id, e.original_name ?? "", e.entity_id].some((id) => slug(id).endsWith("_min_flow_temperature_setpoint")))
        return 0;
    if (role === "climate" || role === "water")
        return 10;
    const tails = endings[role] ?? [];
    if (tails.some((t) => slug(e.unique_id).endsWith("_" + t)))
        return 30;
    if (tails.some((t) => slug(e.original_name ?? "").endsWith("_" + t)))
        return 20;
    if (tails.some((t) => e.entity_id.endsWith("_" + t)))
        return 10;
    const cls = e.device_class ??
        e.original_device_class ??
        states[e.entity_id]?.attributes.device_class;
    if (role === "pressure" && cls === "pressure")
        return 5;
    return 0;
}
const identity = (d) => d?.identifiers?.find(([p]) => p === "mypyllant")?.[1];
const system = (d) => identity(d)?.replace(/_(?:zone_\d+|circuit_\d+|domestic_hot_water_\d+|device_.+|home|system)$/, "");
const numericSort = (a, b) => a.localeCompare(b, undefined, { numeric: true });
function discover(registry, states, config) {
    const result = { roles: {}, ambiguous: [] };
    const devices = new Map(registry.devices.map((d) => [d.id, d]));
    const eligible = registry.entities.filter((e) => e.platform === "mypyllant" &&
        !e.disabled_by &&
        !devices.get(e.device_id ?? "")?.disabled_by);
    const zoneClimate = (e) => domain(e) === "climate" &&
        (/_zone_\d+$/.test(identity(devices.get(e.device_id ?? "")) ?? "") ||
            /_zone_\d+_climate$/.test(e.unique_id));
    const anchor = config.entity
        ? eligible.find((e) => e.entity_id === config.entity && zoneClimate(e))
        : undefined;
    if (config.entity && !anchor)
        return { ...result, error: "invalidAnchor" };
    if (anchor && config.entry && config.entry !== anchor.config_entry_id)
        return { ...result, error: "invalidAnchor" };
    const entries = [
        ...new Set(eligible.map((e) => e.config_entry_id).filter(Boolean)),
    ];
    const entry = config.entry ??
        anchor?.config_entry_id ??
        (entries.length === 1 ? entries[0] : undefined);
    if (!entry)
        return { ...result, error: "chooseEntry" };
    result.entry = entry;
    let candidates = eligible.filter((e) => e.config_entry_id === entry);
    if (!candidates.length)
        return { ...result, error: "noEntities" };
    const climates = candidates
        .filter(zoneClimate)
        .sort((a, b) => numericSort(a.unique_id, b.unique_id));
    const climate = anchor ?? climates[0];
    const deviceFor = (e) => devices.get(e?.device_id ?? "");
    const systemId = system(deviceFor(climate)) ??
        system(deviceFor(candidates
            .slice()
            .sort((a, b) => numericSort(a.unique_id, b.unique_id))[0]));
    if (systemId)
        candidates = candidates.filter((e) => !system(deviceFor(e)) || system(deviceFor(e)) === systemId);
    const circuitAttribute = climate
        ? states[climate.entity_id]?.attributes.associated_circuit_index
        : undefined;
    const circuitFromName = (deviceFor(climate)?.name ??
        climate?.original_name ??
        climate?.entity_id ??
        "").match(/circuit[ _](\d+)/i)?.[1];
    const circuitIndex = typeof circuitAttribute === "number"
        ? String(circuitAttribute)
        : circuitFromName;
    const circuits = registry.devices
        .filter((d) => system(d) === systemId && /_circuit_\d+$/.test(identity(d) ?? ""))
        .sort((a, b) => numericSort(identity(a) ?? "", identity(b) ?? ""));
    const circuit = circuitIndex !== undefined
        ? circuits.find((d) => identity(d)?.endsWith("_circuit_" + circuitIndex))
        : circuits[0];
    const water = candidates
        .filter((e) => domain(e) === "water_heater")
        .sort((a, b) => numericSort(a.unique_id, b.unique_id))[0];
    const waterDevice = water?.device_id ??
        registry.devices
            .filter((d) => system(d) === systemId &&
            /_domestic_hot_water_\d+$/.test(identity(d) ?? ""))
            .sort((a, b) => numericSort(identity(a) ?? "", identity(b) ?? ""))[0]?.id;
    const energyRoles = roles.filter((r) => /^(heating|water)(Electric|Heat|Environment)$/.test(r));
    let energyDevices = [
        ...new Set(candidates
            .filter((e) => energyRoles.some((r) => score(e, r, states) > 0))
            .map((e) => e.device_id)),
    ];
    const pumps = energyDevices.filter((id) => /flexo|aro|verso|heat.?pump/i.test(devices.get(id ?? "")?.model ?? ""));
    if (pumps.length === 1)
        energyDevices = pumps;
    for (const role of roles) {
        const override = config.entities?.[role];
        if (override) {
            const chosen = candidates.find((e) => e.entity_id === override && domain(e) === roleDomain(role));
            if (chosen)
                result.roles[role] = chosen;
            else
                result.ambiguous.push(role);
            continue;
        }
        let pool = candidates;
        if (role === "climate")
            pool = climate ? [climate] : [];
        if (role === "quickVeto")
            pool = pool.filter((e) => e.device_id === climate?.device_id);
        if (["flow", "flowTarget", "curve", "minFlow"].includes(role))
            pool = pool.filter((e) => circuit && e.device_id === circuit.id);
        if (["water", "tank", "waterTarget", "boost", "legionella"].includes(role))
            pool = pool.filter((e) => waterDevice && e.device_id === waterDevice);
        if (energyRoles.includes(role)) {
            if (energyDevices.length > 1) {
                result.ambiguous.push(role);
                continue;
            }
            pool = pool.filter((e) => e.device_id === energyDevices[0]);
        }
        const scored = pool
            .map((e) => ({ e, score: score(e, role, states) }))
            .filter((x) => x.score > 0)
            .sort((a, b) => b.score - a.score);
        if (scored.length &&
            (scored.length === 1 ||
                (!energyRoles.includes(role) && scored[0].score > scored[1].score)))
            result.roles[role] = scored[0].e;
        else if (scored.length)
            result.ambiguous.push(role);
    }
    return result;
}

const HOUR = 3600000;
/**
 * An hour's COP point needs at least this much electricity; in standby hours
 * a trickle of input makes the ratio meaningless (e.g. 54). Totals keep them.
 */
const MIN_POINT_KWH = 0.05;
function finite(value) {
    return typeof value === "number" && Number.isFinite(value);
}
// HA statistics timestamps are milliseconds. Never bridge a missing hourly bucket.
function deltas(rows, start, end) {
    const sums = new Map(rows
        .filter((p) => finite(p.start) && finite(p.sum))
        .map((p) => [p.start, p.sum]));
    const output = new Map();
    for (const [time, sum] of sums) {
        const previous = sums.get(time - HOUR);
        if (time >= start &&
            time + HOUR <= end &&
            previous !== undefined &&
            sum >= previous)
            output.set(time, sum - previous);
    }
    return output;
}
function summarize(series, start, end) {
    const electricity = deltas(series.electric, start, end), heat = deltas(series.heat, start, end), environment = deltas(series.environment ?? [], start, end);
    const outdoor = new Map((series.outdoor ?? [])
        .filter((p) => finite(p.mean))
        .map((p) => [p.start, p.mean]));
    const result = { coverage: 0, status: "missing", points: [] };
    let electricTotal = 0, heatTotal = 0, environmentTotal = 0, count = 0, environmentCount = 0;
    for (const [time, electric] of electricity) {
        const generated = heat.get(time);
        if (generated === undefined)
            continue;
        electricTotal += electric;
        heatTotal += generated;
        count++;
        const harvested = environment.get(time);
        if (harvested !== undefined) {
            environmentTotal += harvested;
            environmentCount++;
        }
        const temperature = outdoor.get(time);
        if (temperature !== undefined &&
            electric >= MIN_POINT_KWH &&
            Number.isFinite(generated / electric))
            result.points.push({
                start: time,
                temperature,
                cop: generated / electric,
            });
    }
    if (!count)
        return result;
    result.electric = electricTotal;
    result.heat = heatTotal;
    if (environmentCount === count)
        result.environment = environmentTotal;
    result.coverage = Math.min(1, count / ((end - start) / HOUR));
    result.status =
        electricTotal > 0 ? "ready" : heatTotal > 0 ? "noInput" : "idle";
    if (electricTotal > 0 && Number.isFinite(heatTotal / electricTotal))
        result.cop = heatTotal / electricTotal;
    return result;
}
function windowRange(window, now = Date.now()) {
    const end = Math.floor(now / HOUR) * HOUR;
    return {
        start: end - { "24h": 24, "7d": 168, "30d": 720 }[window] * HOUR,
        end,
    };
}

const cache = new WeakMap();
function invalidate(c) {
    cache.delete(c);
}
const external = (e) => `mypyllant:${e.unique_id}`.toLowerCase().replace(/-/g, "_");
const energyRoles = [
    "heatingElectric",
    "heatingHeat",
    "heatingEnvironment",
    "waterElectric",
    "waterHeat",
    "waterEnvironment",
];
const energyUnit = (m) => m.has_sum &&
    ["Wh", "kWh", "MWh", "GJ", "MJ", "J"].includes(m.statistics_unit_of_measurement ?? m.unit_of_measurement ?? "");
async function fetchEnergy(c, roles, window, now) {
    const range = windowRange(window, now), result = { ...range, sources: {}, ids: {} };
    const requested = energyRoles.flatMap((r) => roles[r] ? [external(roles[r]), roles[r].entity_id] : []);
    if (roles.outdoor)
        requested.push(roles.outdoor.entity_id);
    if (!requested.length)
        return result;
    const metadata = await c.sendMessagePromise({
        type: "recorder/get_statistics_metadata",
        statistic_ids: [...new Set(requested)],
    });
    const valid = metadata.filter((m) => energyUnit(m) ||
        ((m.mean_type === 1 || m.has_mean) &&
            ["°C", "°F", "K"].includes(m.statistics_unit_of_measurement ?? m.unit_of_measurement ?? "")));
    const ids = new Set(valid.map((m) => m.statistic_id));
    if (!ids.size)
        return result;
    const stats = await c.sendMessagePromise({
        type: "recorder/statistics_during_period",
        start_time: new Date(range.start - HOUR).toISOString(),
        end_time: new Date(range.end).toISOString(),
        statistic_ids: [...ids],
        period: "hour",
        types: ["sum", "mean"],
        units: { energy: "kWh", temperature: "°C" },
    });
    for (const mode of ["heating", "water"]) {
        const electric = roles[`${mode}Electric`], heat = roles[`${mode}Heat`], environment = roles[`${mode}Environment`];
        if (!electric || !heat)
            continue;
        if (electric.device_id !== heat.device_id)
            continue;
        const supports = (id) => valid.some((m) => m.statistic_id === id && energyUnit(m));
        const ext = [external(electric), external(heat)];
        const useExternal = ext.every((id) => supports(id) && (stats[id]?.length ?? 0) > 1);
        const idFor = (e) => useExternal ? external(e) : e.entity_id;
        if (![electric, heat].every((e) => supports(idFor(e))))
            continue;
        result.sources[mode] = useExternal ? "external" : "recorder";
        result.ids[mode] = { electric: idFor(electric), heat: idFor(heat) };
        result[mode] = summarize({
            electric: stats[idFor(electric)] ?? [],
            heat: stats[idFor(heat)] ?? [],
            environment: environment &&
                environment.device_id === electric.device_id &&
                supports(idFor(environment))
                ? stats[idFor(environment)]
                : undefined,
            outdoor: roles.outdoor ? stats[roles.outdoor.entity_id] : undefined,
        }, range.start, range.end);
    }
    return result;
}
function loadEnergy(c, roles, window, now = Date.now()) {
    let items = cache.get(c);
    if (!items) {
        items = new Map();
        cache.set(c, items);
    }
    const key = JSON.stringify([
        window,
        windowRange(window, now).end,
        Object.entries(roles)
            .filter(([r]) => energyRoles.includes(r) || r === "outdoor")
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([r, e]) => [r, e.entity_id, e.unique_id, e.device_id]),
    ]);
    const found = items.get(key);
    if (found && found.expires > Date.now())
        return found.promise;
    for (const [id, value] of items)
        if (value.expires <= Date.now())
            items.delete(id);
    const promise = fetchEnergy(c, roles, window, now).catch((error) => {
        items.delete(key);
        throw error;
    });
    items.set(key, { expires: Date.now() + 300000, promise });
    return promise;
}
function watchRegistry(c, cb) {
    let active = true, epoch = 0;
    const subscriptions = [];
    const refresh = async () => {
        const ticket = ++epoch;
        invalidate(c);
        cb({ disconnected: !c.connected, loading: c.connected });
        if (!c.connected)
            return;
        try {
            const [entities, devices] = await Promise.all([
                c.sendMessagePromise({
                    type: "config/entity_registry/list",
                }),
                c.sendMessagePromise({
                    type: "config/device_registry/list",
                }),
            ]);
            if (active && ticket === epoch)
                cb({ registry: { entities, devices } });
        }
        catch (error) {
            if (active && ticket === epoch)
                cb({ error: String(error) });
        }
    };
    const disconnected = () => {
        epoch++;
        invalidate(c);
        if (active)
            cb({ disconnected: true });
    };
    const ready = () => {
        void refresh();
    };
    c.addEventListener("ready", ready);
    c.addEventListener("disconnected", disconnected);
    for (const event of ["entity_registry_updated", "device_registry_updated"]) {
        void c
            .subscribeEvents(ready, event)
            .then((unsub) => {
            if (active)
                subscriptions.push(unsub);
            else
                unsub();
        })
            .catch((error) => {
            if (active)
                cb({ error: String(error) });
        });
    }
    void refresh();
    return () => {
        active = false;
        epoch++;
        subscriptions.forEach((unsub) => unsub());
        c.removeEventListener("ready", ready);
        c.removeEventListener("disconnected", disconnected);
    };
}

function available(entity) {
    return !!entity && !["unavailable", "unknown", ""].includes(entity.state);
}
function numeric$1(value) {
    if (typeof value !== "number" && typeof value !== "string")
        return;
    if (typeof value === "string" && !value.trim())
        return;
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
}
class Readings {
    constructor() {
        this.last = new Map();
    }
    remember(entity) {
        if (available(entity))
            this.last.set(entity.entity_id, {
                ...entity,
                attributes: { ...entity.attributes },
            });
    }
    get(id, current, connected) {
        if (!id)
            return { stale: false };
        const live = current[id];
        if (connected && available(live))
            return { entity: live, stale: false };
        return { entity: this.last.get(id), stale: true };
    }
}

function actionPayload(role, action, entity, config, value, duration, temperatureUnit = "°C") {
    if (!available(entity))
        throw Error("unavailable");
    const data = { entity_id: entity.entity_id };
    const domain = entity.entity_id.split(".")[0];
    if (action === "boost" && role === "boost" && domain === "switch") {
        if (!["on", "off"].includes(entity.state))
            throw Error("unavailable");
        return {
            domain,
            service: entity.state === "on" ? "turn_off" : "turn_on",
            data,
        };
    }
    if (action === "mode" && domain === "climate") {
        if (!Array.isArray(entity.attributes.hvac_modes) ||
            !entity.attributes.hvac_modes.includes(value))
            throw Error("invalidMode");
        return {
            domain,
            service: "set_hvac_mode",
            data: { ...data, hvac_mode: value },
        };
    }
    if ((action === "number" && domain !== "number") ||
        (["temperature", "quickVeto"].includes(action) &&
            !["climate", "water_heater"].includes(domain)))
        throw Error("unavailable");
    if (["curve", "minFlow"].includes(role) && !config.allow_curve_edit)
        throw Error("unavailable");
    const number = numeric$1(value);
    const isNumber = action === "number";
    const min = numeric$1(entity.attributes[isNumber ? "min" : "min_temp"]);
    const max = numeric$1(entity.attributes[isNumber ? "max" : "max_temp"]);
    const step = numeric$1(entity.attributes[isNumber ? "step" : "target_temp_step"]);
    if (number === undefined ||
        (min !== undefined && number < min) ||
        (max !== undefined && number > max) ||
        (step &&
            Math.abs((number - (min ?? 0)) / step - Math.round((number - (min ?? 0)) / step)) > 1e-6))
        throw Error("range");
    if (action === "quickVeto") {
        const temperature = temperatureUnit === "°F" ? ((number - 32) * 5) / 9 : number;
        if (temperature < 0 || temperature > 30)
            throw Error("range");
        if (domain !== "climate" ||
            duration === undefined ||
            !Number.isFinite(duration) ||
            duration < 1 ||
            duration > 12)
            throw Error("range");
        return {
            domain: "mypyllant",
            service: "set_quick_veto",
            data: {
                ...data,
                temperature,
                duration_hours: duration,
            },
        };
    }
    if (!isNumber &&
        (Number(entity.attributes.supported_features ?? 0) & 1) === 0)
        throw Error("unavailable");
    return {
        domain,
        service: isNumber ? "set_value" : "set_temperature",
        data: { ...data, [isNumber ? "value" : "temperature"]: number },
    };
}
/** Heating/cooling selector: an external on/off entity where on = cooling. */
function coolingPayload(entity, cooling) {
    if (!available(entity) || !["on", "off"].includes(entity.state))
        throw Error("unavailable");
    const domain = entity.entity_id.split(".")[0];
    if (!["switch", "input_boolean"].includes(domain))
        throw Error("unavailable");
    return {
        domain,
        service: cooling ? "turn_on" : "turn_off",
        data: { entity_id: entity.entity_id },
    };
}
async function perform(hass, payload) {
    await hass.callService(payload.domain, payload.service, payload.data);
}

function language(hass) {
    const value = (hass?.language || hass?.locale?.language || "en")
        .replace(/_/g, "-")
        .toLowerCase();
    if (/^(nb|nn|no)(-|$)/.test(value))
        return "nb-NO";
    try {
        return Intl.getCanonicalLocales(value)[0] ?? "en";
    }
    catch {
        return "en";
    }
}
const en$1 = {
    off: "Off",
    hvacHeat: "Heating",
    cool: "Cooling",
    heat_cool: "Heating/cooling",
    dry: "Dry",
    fan_only: "Fan only",
    "24h": "24 hours",
    "7d": "7 days",
    "30d": "30 days",
    invalidValue: "Invalid value",
    title: "Heat pump",
    comfort: "Comfort",
    water: "Hot water",
    efficiency: "Efficiency",
    heating: "Heating",
    current: "Room",
    target: "Target",
    mode: "Operating mode",
    flow: "Flow",
    flowTarget: "Flow target",
    outdoor: "Outdoors",
    pressure: "Pressure",
    tank: "Tank temperature",
    tankHint: "Temperature relative to target, not remaining water volume.",
    boost: "Boost hot water",
    boosting: "Boost active · stop",
    quickVeto: "Warmer for a while",
    startVeto: "Start temporary override",
    duration: "Duration (hours)",
    vetoHint: "Uses the temperature above for the selected duration.",
    curve: "Heating curve",
    minFlow: "Minimum flow temperature",
    curveHint: "Changes affect heating over several hours.",
    legionella: "Legionella protection",
    lastReached: "Last reached",
    daysAgo: "days ago",
    today: "today",
    overdue: "Past the reminder interval",
    neverReached: "No temperature-reached date reported",
    futureDate: "Reported date is in the future",
    fault: "Heat pump needs attention",
    details: "Open details",
    stale: "Stale",
    lastSeen: "last seen",
    unknown: "Unknown",
    loading: "Loading…",
    history: "History",
    historyTitle: "Heat pump history",
    waterHistory: "Hot water history",
    copHistory: "COP per day",
    waterTargetLine: "Hot water target",
    heatingCop: "Heating COP",
    waterCop: "Hot water COP",
    copHint: "Heat out ÷ electricity in, per day. Days with under 0.1 kWh of electricity are left out.",
    historyFailed: "Could not load history",
    noHistory: "No history for this period",
    close: "Close",
    now: "Now",
    retry: "Retry",
    unavailable: "Unavailable",
    pending: "Sending…",
    sent: "Sent · waiting for device update",
    failed: "Could not update",
    range: "Value is outside the permitted range or step",
    invalidMode: "Unsupported operating mode",
    cop: "Measured COP",
    electric: "Electricity in",
    environment: "Environment",
    heat: "Heat out",
    balance: "Reported energy balance",
    noOperation: "No recorded operation in this period",
    noInput: "Heat reported without measured electricity; COP is undefined.",
    missingStats: "No paired energy statistics available",
    partial: "Paired hourly coverage",
    plot: "COP and outdoor temperature",
    plotEmpty: "No matching outdoor-temperature history",
    plotHint: "Each point is one paired hour with at least 0.05 kWh of electricity. COP alone does not establish the best heating curve.",
    recorderHint: "Recorder counters: late cloud updates can distort hourly points.",
    externalHint: "myVAILLANT hourly statistics",
    through: "Complete hours through",
    chooseEntry: "Choose a myVAILLANT entry or climate entity in the editor.",
    invalidAnchor: "The climate entity must belong to the selected myVAILLANT entry.",
    noEntities: "No enabled myVAILLANT entities found for this entry.",
    ambiguous: "Some roles need an explicit entities override",
    noRoles: "No matching entities for this panel.",
    statisticsError: "Could not load statistics",
    registryError: "Could not load entity discovery",
    disconnected: "Home Assistant disconnected",
    appearance: "Appearance",
    window: "COP window",
    entry: "Config entry ID",
    entity: "Climate entity",
    name: "Title",
    all: "All panels",
    default: "Default",
    bubble: "Bubble",
    show_efficiency: "Show efficiency",
    show_hot_water: "Show hot water",
    allow_curve_edit: "Allow heating curve edits",
    legionella_interval_days: "Legionella reminder interval (days)",
    auto: "Automatic",
    editorHint: "Select a climate entity or paste an entry ID. Optional role overrides remain available in YAML.",
    noLastSeen: "No last-known reading",
    hours: "h",
    energyNote: "Energy values cover matching valid hours only.",
    statisticsStale: "Previously loaded statistics",
    config: "Configuration",
    season: "Heating or cooling",
    cooling_entity: "Heating/cooling switch (on = cooling)",
    coolingMissing: "Heating/cooling switch not found",
};
const nb$1 = {
    off: "Av",
    hvacHeat: "Oppvarming",
    cool: "Kjøling",
    heat_cool: "Oppvarming/kjøling",
    dry: "Avfukting",
    fan_only: "Bare vifte",
    "24h": "24 timer",
    "7d": "7 dager",
    "30d": "30 dager",
    invalidValue: "Ugyldig verdi",
    title: "Varmepumpe",
    comfort: "Komfort",
    water: "Varmtvann",
    efficiency: "Effektivitet",
    heating: "Oppvarming",
    current: "Rom",
    target: "Ønsket",
    mode: "Driftsmodus",
    flow: "Turtemperatur",
    flowTarget: "Ønsket turtemperatur",
    outdoor: "Utendørs",
    pressure: "Trykk",
    tank: "Tanktemperatur",
    tankHint: "Temperatur i forhold til ønsket verdi, ikke gjenværende vannmengde.",
    boost: "Ekstra varmtvann",
    boosting: "Ekstra varmtvann aktivt · stopp",
    quickVeto: "Varmere en stund",
    startVeto: "Start midlertidig overstyring",
    duration: "Varighet (timer)",
    vetoHint: "Bruker temperaturen over i valgt tidsrom.",
    curve: "Varmekurve",
    minFlow: "Minste turtemperatur",
    curveHint: "Endringer påvirker oppvarmingen over flere timer.",
    legionella: "Legionellabeskyttelse",
    lastReached: "Sist nådd",
    daysAgo: "dager siden",
    today: "i dag",
    overdue: "Påminnelsesintervallet er overskredet",
    neverReached: "Ingen dato for oppnådd temperatur",
    futureDate: "Rapportert dato er i fremtiden",
    fault: "Varmepumpen trenger oppmerksomhet",
    details: "Åpne detaljer",
    stale: "Utdatert",
    lastSeen: "sist sett",
    unknown: "Ukjent",
    loading: "Laster…",
    history: "Historikk",
    historyTitle: "Varmepumpehistorikk",
    waterHistory: "Varmtvannshistorikk",
    copHistory: "COP per døgn",
    waterTargetLine: "Ønsket varmtvann",
    heatingCop: "COP oppvarming",
    waterCop: "COP varmtvann",
    copHint: "Varme ut ÷ strøm inn, per døgn. Døgn med under 0,1 kWh strøm er utelatt.",
    historyFailed: "Kunne ikke hente historikk",
    noHistory: "Ingen historikk for denne perioden",
    close: "Lukk",
    now: "Nå",
    retry: "Prøv igjen",
    unavailable: "Utilgjengelig",
    pending: "Sender…",
    sent: "Sendt · venter på oppdatering fra enheten",
    failed: "Kunne ikke oppdatere",
    range: "Verdien er utenfor tillatt område eller trinn",
    invalidMode: "Driftsmodusen støttes ikke",
    cop: "Målt COP",
    electric: "Strøm inn",
    environment: "Omgivelsesenergi",
    heat: "Varme ut",
    balance: "Rapportert energibalanse",
    noOperation: "Ingen varmedrift registrert i perioden",
    noInput: "Varme rapportert uten målt strømforbruk; COP er ikke definert.",
    missingStats: "Ingen sammenfallende energistatistikk tilgjengelig",
    partial: "Dekning av sammenfallende timer",
    plot: "COP og utetemperatur",
    plotEmpty: "Ingen sammenfallende historikk for utetemperatur",
    plotHint: "Hvert punkt er én sammenfallende time med minst 0,05 kWh strøm. COP alene avgjør ikke riktig varmekurve.",
    recorderHint: "Recorder-tellere: forsinkede skyoppdateringer kan forvrenge timepunktene.",
    externalHint: "Timestatistikk fra myVAILLANT",
    through: "Hele timer frem til",
    chooseEntry: "Velg en myVAILLANT-oppføring eller klimaenhet i redigeringsverktøyet.",
    invalidAnchor: "Klimaenheten må tilhøre den valgte myVAILLANT-oppføringen.",
    noEntities: "Ingen aktiverte myVAILLANT-enheter funnet for denne oppføringen.",
    ambiguous: "Noen roller trenger eksplisitt entities-konfigurasjon",
    noRoles: "Ingen samsvarende enheter for dette panelet.",
    statisticsError: "Kunne ikke laste statistikk",
    registryError: "Kunne ikke finne enheter",
    disconnected: "Home Assistant er frakoblet",
    appearance: "Utseende",
    window: "COP-periode",
    entry: "ID for konfigurasjonsoppføring",
    entity: "Klimaenhet",
    name: "Tittel",
    all: "Alle paneler",
    default: "Standard",
    bubble: "Bubble",
    show_efficiency: "Vis effektivitet",
    show_hot_water: "Vis varmtvann",
    allow_curve_edit: "Tillat endring av varmekurve",
    legionella_interval_days: "Påminnelsesintervall for legionella (dager)",
    auto: "Automatisk",
    editorHint: "Velg en klimaenhet eller lim inn oppførings-ID. Roller kan overstyres i YAML.",
    noLastSeen: "Ingen sist kjente måling",
    hours: "t",
    energyNote: "Energiverdiene gjelder bare sammenfallende gyldige timer.",
    statisticsStale: "Tidligere lastet statistikk",
    config: "Konfigurasjon",
    season: "Varme eller kjøling",
    cooling_entity: "Bryter for varme/kjøling (på = kjøling)",
    coolingMissing: "Fant ikke bryteren for varme/kjøling",
};
function localize(language, key) {
    return /^(nb|nn|no)(-|$)/.test((language ?? "").replace(/_/g, "-").toLowerCase())
        ? nb$1[key]
        : en$1[key];
}
function modeLabel(locale, mode) {
    if (mode === "heat")
        return localize(locale, "hvacHeat");
    return ["off", "auto", "cool", "heat_cool", "dry", "fan_only"].includes(mode)
        ? localize(locale, mode)
        : mode;
}

const formatter = (language) => (n, digits = 1) => n === undefined
    ? "—"
    : new Intl.NumberFormat(language, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(n);
function plot(summary, t, language) {
    const fmt = formatter(language);
    const points = summary.points;
    if (!points.length)
        return b `<p class="hint">${t("plotEmpty")}</p>`;
    const xMin = Math.floor(Math.min(...points.map((p) => p.temperature))) - 1, xMax = Math.ceil(Math.max(...points.map((p) => p.temperature))) + 1;
    const yMax = Math.max(1, Math.ceil(Math.max(...points.map((p) => p.cop))));
    const x = (n) => 40 + ((n - xMin) / (xMax - xMin)) * 275, y = (n) => 155 - (n / yMax) * 125;
    return b `<div class="plot-title">${t("plot")}</div>
    <svg class="plot" viewBox="0 0 340 195" role="img" aria-label=${t("plot")}>
      <title>${t("plot")}</title>
      ${[0, yMax / 2, yMax].map((n) => w `<line class="grid" x1="40" y1=${y(n)} x2="315" y2=${y(n)}></line><text x="32" y=${y(n) + 4} text-anchor="end">${fmt(n)}</text>`)}
      <line class="axis" x1="40" y1="155" x2="315" y2="155"></line>
      ${[xMin, (xMin + xMax) / 2, xMax].map((n) => w `<text x=${x(n)} y="173" text-anchor="middle">${fmt(n, 0)}°</text>`)}
      <text x="40" y="15">COP</text>
      <text x="178" y="191" text-anchor="middle">${t("outdoor")} (°C)</text>
      ${points.map((p) => w `<circle class="point" cx=${x(p.temperature)} cy=${y(p.cop)} r="3"><title>${new Date(p.start).toLocaleString(language)} · ${fmt(p.temperature)} °C · COP ${fmt(p.cop, 2)}</title></circle>`)}
    </svg>
    <p class="hint">${t("plotHint")}</p>
    <details>
      <summary class="hint">${t("details")} (${points.length})</summary>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>${t("through")}</th>
              <th>°C</th>
              <th>COP</th>
            </tr>
          </thead>
          <tbody>
            ${points.map((p) => b `<tr>
                  <td>${new Date(p.start).toLocaleString(language)}</td>
                  <td>${fmt(p.temperature)}</td>
                  <td>${fmt(p.cop, 2)}</td>
                </tr>`)}
          </tbody>
        </table>
      </div>
    </details>`;
}
function efficiencyGroup(mode, data, t, language = "en", 
/** Opens the COP-per-day history. */
onHistory) {
    const fmt = formatter(language);
    const s = data?.[mode];
    if (!s || s.status === "missing")
        return b `<div class="energy-group">
      <h4>${t(mode)}</h4>
      <p class="hint">${t("missingStats")}</p>
    </div>`;
    const input = (s.electric ?? 0) + (s.environment ?? 0);
    const electricWidth = input > 0 ? ((s.electric ?? 0) / input) * 100 : 0;
    return b `<div class="energy-group">
    <div class="row between">
      <h4>${t(mode)}</h4>
      <div>
        <div class="eyebrow muted">${t("cop")}</div>
        ${onHistory
        ? b `<button
                class="big cop"
                data-cop=${mode}
                aria-label=${`${t("cop")} ${fmt(s.cop, 2)}: ${t("copHistory")}`}
                @click=${onHistory}
              >
                ${fmt(s.cop, 2)}
              </button>`
        : b `<div class="big cop">${fmt(s.cop, 2)}</div>`}
      </div>
    </div>
    ${s.status === "noInput" ? b `<p class="hint warning">${t("noInput")}</p>` : A}
    ${s.status === "idle" ? b `<p class="hint">${t("noOperation")}</p>` : A}
    <div
      class="energy-bar"
      role="img"
      aria-label=${`${t("balance")}: ${t("electric")} ${fmt(s.electric)} kWh; ${t("environment")} ${fmt(s.environment)} kWh; ${t("heat")} ${fmt(s.heat)} kWh`}
    >
      <span class="electric" style=${`width:${electricWidth}%`}></span
      >${s.environment !== undefined ? b `<span class="environment" style=${`width:${100 - electricWidth}%`}></span>` : A}
    </div>
    <div class="legend">
      <span
        ><i class="dot electric"></i>${t("electric")}
        <strong>${fmt(s.electric)} kWh</strong></span
      >${s.environment !== undefined ? b `<span><i class="dot environment"></i>${t("environment")} <strong>${fmt(s.environment)} kWh</strong></span>` : A}
    </div>
    <div class="heat-out">
      → ${t("heat")} <strong>${fmt(s.heat)} kWh</strong>
    </div>
    <p class=${`hint ${s.coverage < 1 ? "warning" : ""}`}>
      ${t("partial")}: ${Math.round(s.coverage * 100)}%
    </p>
    <p class="hint">
      ${t(data?.sources[mode] === "external" ? "externalHint" : "recorderHint")}
    </p>
    ${plot(s, t, language)}
  </div>`;
}

const styles = i$4 `
  :host {
    display: block;
    color: var(--primary-text-color, #243a39);
    font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
    --hp-warm: #c27430;
    --hp-water: #327ca0;
    --hp-green: #42866d;
  }
  * {
    box-sizing: border-box;
  }
  ha-card {
    display: block;
    padding: 22px;
    background: var(--ha-card-background, var(--card-background-color, #fff));
    border: var(--ha-card-border-width, 1px) solid
      var(--ha-card-border-color, #e2e7e4);
    border-radius: var(--ha-card-border-radius, 20px);
    box-shadow: var(--ha-card-box-shadow);
    overflow: hidden;
  }
  .bubble {
    --hp-warm: var(--bubble-accent-color, #c27430);
    background: var(
      --bubble-main-background-color,
      var(--ha-card-background, #fff)
    );
    border: var(--bubble-border, none);
    border-radius: var(--bubble-border-radius, 32px);
    box-shadow: var(--bubble-box-shadow, var(--ha-card-box-shadow));
  }
  header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
  }
  header .symbol {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    flex: none;
    background: var(
      --bubble-icon-background-color,
      var(--secondary-background-color, #eff3ef)
    );
    border-radius: var(--bubble-icon-border-radius, 50%);
    color: var(--hp-green);
  }
  h2 {
    font-size: 1.15rem;
    letter-spacing: -0.02em;
    margin: 0;
  }
  h3 {
    font-size: 1rem;
    margin: 0 0 14px;
  }
  h4 {
    font-size: 0.95rem;
    margin: 0;
  }
  .muted,
  .hint {
    color: var(--secondary-text-color, #627370);
  }
  .hint {
    font-size: 0.78rem;
    line-height: 1.55;
    margin: 8px 0;
  }
  .eyebrow {
    font-size: 0.68rem;
    font-weight: 650;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
  .header-name {
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  section {
    padding: 18px 0;
    border-top: 1px solid var(--divider-color, #e1e6e3);
  }
  section:last-child {
    padding-bottom: 0;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .between {
    justify-content: space-between;
  }
  .readings {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: 12px 0;
  }
  .chip {
    border: 1px solid var(--divider-color, #dce4df);
    padding: 5px 9px;
    border-radius: 12px;
    font-size: 0.8rem;
  }
  /* Readings that open their history: text that is also a button. */
  button.big,
  button.hint.link {
    display: block;
    font-family: inherit;
    color: inherit;
    background: none;
    border: 0;
    padding: 0;
    text-align: start;
    cursor: pointer;
    min-height: 32px;
  }
  button.big:hover,
  button.hint.link:hover {
    text-decoration: underline dotted;
    text-underline-offset: 4px;
  }
  button.chip {
    font: inherit;
    font-size: 0.8rem;
    color: inherit;
    background: none;
    cursor: pointer;
    min-height: 32px;
  }
  button.chip:hover {
    background: var(--secondary-background-color, #eff3ef);
  }
  /* History: the readings on one chart, temperatures left, pressure right. */
  .s-flow {
    --series: var(--hp-warm);
  }
  .s-flowTarget {
    --series: color-mix(
      in srgb,
      var(--hp-warm) 60%,
      var(--primary-text-color, #243a39)
    );
  }
  .s-outdoor {
    --series: var(--hp-water);
  }
  .s-pressure {
    --series: var(--hp-green);
  }
  .s-tank,
  .s-heatingCop {
    --series: var(--hp-warm);
  }
  .s-waterTarget {
    --series: var(--secondary-text-color, #627370);
  }
  .s-waterCop {
    --series: var(--hp-green);
  }
  .chart .s-waterTarget {
    stroke-dasharray: 5 4;
  }
  dialog#history {
    color: var(--primary-text-color, #243a39);
    background: var(--ha-card-background, var(--card-background-color, #fff));
    border: 0;
    border-radius: var(--ha-card-border-radius, 20px);
    padding: 16px 16px 20px;
    width: min(640px, calc(100vw - 24px));
    max-height: 90dvh;
    overflow: auto;
    box-shadow: 0 16px 60px #0006;
  }
  dialog#history.bubble {
    background: var(
      --bubble-main-background-color,
      var(--ha-card-background, var(--card-background-color, #fff))
    );
    border-radius: min(var(--bubble-border-radius, 32px), 28px);
  }
  dialog#history::backdrop {
    background: #0007;
  }
  .chart {
    display: block;
    width: 100%;
    height: auto;
  }
  .chart .grid {
    stroke: color-mix(
      in srgb,
      var(--secondary-text-color, #627370) 22%,
      transparent
    );
  }
  .chart .axis {
    fill: var(--secondary-text-color, #627370);
    font-size: 12px;
    font-variant-numeric: tabular-nums;
  }
  .chart .line {
    fill: none;
    stroke: var(--series);
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
  .chart .s-flowTarget {
    stroke-dasharray: 5 4;
  }
  .chart .cursor {
    stroke: var(--secondary-text-color, #627370);
    stroke-dasharray: 3 3;
  }
  :host {
    --history-accent: var(--hp-green);
    --history-series-0: var(--hp-warm);
    --history-series-1: var(--secondary-text-color, #627370);
    --history-series-2: var(--hp-water);
    --history-series-3: var(--hp-green);
  }
  .big {
    font-size: 2.25rem;
    font-weight: 550;
    letter-spacing: -0.055em;
    line-height: 1.2;
    font-variant-numeric: tabular-nums;
  }
  .unit {
    font-size: 0.9rem;
    letter-spacing: normal;
    font-weight: 400;
    margin-left: 4px;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.8rem;
    min-width: 0;
  }
  input,
  select,
  button {
    font: inherit;
    color: inherit;
    border: 1px solid var(--divider-color, #ced8d2);
    border-radius: 10px;
    background: var(--card-background-color, #fff);
    min-height: 44px;
    padding: 9px 12px;
  }
  input,
  select {
    max-width: 100%;
    width: 100%;
  }
  input[type="number"] {
    width: 100px;
  }
  button {
    cursor: pointer;
  }
  button:disabled,
  input:disabled,
  select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  summary:focus-visible {
    outline: 3px solid var(--primary-color, #367b6e);
    outline-offset: 3px;
  }
  .primary {
    background: var(--hp-water);
    color: white;
    border-color: transparent;
    font-weight: 550;
    width: 100%;
  }
  .active {
    background: var(--hp-warm);
  }
  .secondary {
    background: var(
      --bubble-sub-button-background-color,
      var(--secondary-background-color, #f1f4f1)
    );
    border-radius: var(--bubble-sub-button-border-radius, 12px);
  }
  .season-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 14px;
  }
  .season {
    display: inline-flex;
    gap: 2px;
    padding: 3px;
    border-radius: 999px;
    background: var(
      --bubble-secondary-background-color,
      var(--secondary-background-color, #f1f4f1)
    );
  }
  .season .segment {
    border: 0;
    border-radius: 999px;
    background: transparent;
    padding: 0 18px;
    font-weight: 550;
  }
  .season .segment.selected[data-season="heating"] {
    background: var(--hp-warm);
    color: #fff;
  }
  .season .segment.selected[data-season="cooling"] {
    background: var(--hp-water);
    color: #fff;
  }
  .season .segment:disabled {
    opacity: 1;
    color: var(--secondary-text-color, #627370);
  }
  .season .segment.selected:disabled {
    opacity: 0.6;
    color: #fff;
  }
  .controls {
    display: flex;
    gap: 12px;
    align-items: flex-end;
    flex-wrap: wrap;
  }
  .veto {
    padding: 12px;
    margin-top: 14px;
    border-radius: var(--bubble-sub-button-border-radius, 14px);
    background: var(
      --bubble-secondary-background-color,
      var(--secondary-background-color, #f4f6f3)
    );
  }
  .veto summary {
    font-size: 0.85rem;
    cursor: pointer;
  }
  .veto .controls {
    margin-top: 12px;
  }
  .veto .controls button {
    flex: 1;
  }
  .water-layout {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 22px;
    align-items: center;
  }
  .tank {
    height: 146px;
    border: 2px solid var(--hp-water);
    border-radius: 22px;
    position: relative;
    overflow: hidden;
    background: var(--secondary-background-color, #f2f6f8);
  }
  .fill {
    position: absolute;
    inset: auto 0 0;
    background: var(--hp-water);
    opacity: 0.58;
    border-top: 2px solid var(--hp-water);
    transition: height 0.4s;
  }
  .tank::after {
    content: "";
    position: absolute;
    inset: 14px 9px;
    border-top: 1px dashed var(--hp-water);
    border-bottom: 1px dashed var(--hp-water);
    opacity: 0.5;
  }
  .water-info {
    min-width: 0;
  }
  .water-info .primary {
    margin-top: 12px;
  }
  .legionella {
    display: flex;
    gap: 8px;
    align-items: baseline;
    flex-wrap: wrap;
    margin-top: 16px;
    font-size: 0.78rem;
  }
  .warning {
    color: var(--warning-color, #986013);
  }
  .stale {
    font-size: 0.75rem;
    color: var(--warning-color, #986013);
    display: block;
    margin-top: 4px;
  }
  .takeover {
    padding: 16px;
    border-radius: 14px;
    background: var(--error-color, #b52424);
    color: #fff;
    margin-bottom: 16px;
  }
  .takeover h3 {
    margin-bottom: 8px;
  }
  .takeover button {
    color: inherit;
    background: transparent;
    border-color: currentColor;
  }
  .takeover .stale {
    color: inherit;
  }
  .takeover pre {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-size: 0.85rem;
  }
  .feedback {
    padding: 10px;
    border-radius: 10px;
    background: var(--secondary-background-color, #f3f5f2);
    font-size: 0.85rem;
    overflow-wrap: anywhere;
  }
  .error {
    border-left: 3px solid var(--error-color, #b52424);
  }
  .energy-group {
    padding: 14px;
    margin: 12px 0;
    border-radius: var(--bubble-sub-button-border-radius, 16px);
    background: var(
      --bubble-secondary-background-color,
      var(--secondary-background-color, #f4f6f3)
    );
  }
  .cop {
    color: var(--heatpump-cop-color, var(--primary-text-color, #367b61));
  }
  .energy-bar {
    display: flex;
    height: 14px;
    overflow: hidden;
    border-radius: 7px;
    margin: 14px 0 8px;
    background: var(--divider-color, #ddd);
  }
  .electric {
    background: var(--hp-warm);
  }
  .environment {
    background: var(--hp-green);
  }
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
    font-size: 0.75rem;
    line-height: 1.6;
  }
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .heat-out {
    margin-top: 8px;
    font-size: 0.85rem;
  }
  .plot {
    width: 100%;
    display: block;
    margin-top: 10px;
    color: var(--secondary-text-color, #627370);
  }
  .plot text {
    font: 11px system-ui;
    fill: currentColor;
  }
  .plot .point {
    fill: var(--hp-green);
    opacity: 0.55;
  }
  .plot .grid {
    stroke: var(--divider-color, #dce4df);
    stroke-width: 1;
  }
  .plot .axis {
    stroke: currentColor;
    stroke-width: 1;
  }
  .plot-title {
    margin-top: 16px;
    font-size: 0.8rem;
  }
  details table {
    width: 100%;
    font-size: 0.75rem;
    border-collapse: collapse;
  }
  th,
  td {
    text-align: left;
    padding: 5px;
    border-bottom: 1px solid var(--divider-color, #ddd);
  }
  .table-scroll {
    max-height: 200px;
    overflow: auto;
  }
  .hidden {
    display: none;
  }
  .editor {
    display: grid;
    gap: 16px;
  }
  .editor input[type="number"] {
    width: 100%;
  }
  .editor .toggle {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  .editor input[type="checkbox"] {
    width: 20px;
    min-height: 20px;
    height: 20px;
  }
  .editor h3 {
    margin: 6px 0 0;
  }
  @media (max-width: 380px) {
    ha-card {
      padding: 16px;
    }
    .water-layout {
      grid-template-columns: 65px 1fr;
      gap: 14px;
    }
    .big {
      font-size: 2rem;
    }
    .controls {
      gap: 8px;
    }
    .controls label {
      flex: 1;
    }
    .controls input {
      width: 100%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .fill {
      transition: none;
    }
  }
  ${colorSchemeStyles}
`;

/** Loading recorder history for charts and timelines. */
/**
 * A connection for history requests: `hass.callWS` when Home Assistant offers
 * it, else its websocket connection.
 */
/** The ranges every history view offers, in hours. */
const RANGES$1 = [6, 24, 168];
const SILENT = new Set(["unavailable", "unknown", ""]);
/** A reading as a number; `undefined` while unavailable or not a number. */
function numeric(state) {
    if (state === undefined || SILENT.has(state))
        return undefined;
    const value = Number(state);
    return Number.isFinite(value) ? value : undefined;
}
/** States that mean on/open for a lane; anything else reported means off. */
const ON = ["on", "open", "opening", "ajar", "unlocked", "true"];
/** 1 while on/open, 0 while off, `undefined` while unreported. */
function onOff(state) {
    if (state === undefined || SILENT.has(state))
        return undefined;
    return ON.includes(state.toLowerCase()) ? 1 : 0;
}
const isTemperature = (unit) => ["°C", "°F", "K"].includes(unit);
/** The unit of an entity's readings. */
const unitOf = (state) => String(state?.attributes.unit_of_measurement ?? "");
/**
 * Raw history of `ids` since `start`, one request. With `attributes`, each row
 * carries its attributes (needed to read one), which costs a larger reply.
 */
async function rawRows(connection, ids, start, attributes = false) {
    if (!ids.length)
        return {};
    return ((await connection.sendMessagePromise({
        type: "history/history_during_period",
        start_time: new Date(start).toISOString(),
        entity_ids: ids,
        minimal_response: !attributes,
        no_attributes: !attributes,
        significant_changes_only: false,
    })) ?? {});
}
/** Raw state history of `ids` since `start`, as marks. */
async function rawHistory(connection, ids, start) {
    const reply = await rawRows(connection, ids, start);
    return Object.fromEntries(ids.map((id) => [
        id,
        (reply?.[id] ?? []).map((row) => [
            Math.max(start, (row.lu ?? row.lc ?? 0) * 1000),
            row.s,
        ]),
    ]));
}
/**
 * Hourly means of `ids` since `start`. An hour without a statistic is a gap: the
 * mark after the last row of a run says the sensor went quiet.
 */
async function hourlyMeans(connection, ids, start, end) {
    if (!ids.length)
        return {};
    const reply = await connection.sendMessagePromise({
        type: "recorder/statistics_during_period",
        start_time: new Date(start).toISOString(),
        end_time: new Date(end).toISOString(),
        statistic_ids: ids,
        period: "hour",
        types: ["mean", "state"],
    });
    const HOUR = 3600000;
    return Object.fromEntries(ids.map((id) => {
        const marks = [];
        let last;
        for (const row of reply?.[id] ?? []) {
            const t = typeof row.start === "number" ? row.start : Date.parse(row.start);
            const value = row.mean ?? row.state;
            if (!Number.isFinite(t) || value === null || value === undefined)
                continue;
            if (last !== undefined && t - last > HOUR * 1.5)
                marks.push([last + HOUR, undefined]);
            marks.push([Math.max(start, t), String(value)]);
            last = t;
        }
        return [id, marks];
    }));
}
/**
 * The history of each source over the last `hours`, ending with the entity's
 * current state. Lanes are loaded as on/off, lines and steps as numbers.
 */
async function loadSeries(connection, sources, states, hours, options = {}) {
    const now = options.now ?? Date.now();
    const start = now - hours * 3600000;
    const statisticsFrom = options.statisticsFrom ?? 168;
    const ids = [
        ...new Set(sources.filter((s) => !s.attribute).map((s) => s.entityId)),
    ];
    const withAttributes = [
        ...new Set(sources.filter((s) => s.attribute).map((s) => s.entityId)),
    ];
    const fromStatistics = new Set(statisticsFrom > 0 && hours >= statisticsFrom
        ? sources
            .filter((s) => s.kind !== "lane" &&
            s.kind !== "step" &&
            !s.attribute &&
            states[s.entityId]?.attributes.state_class)
            .map((s) => s.entityId)
        : []);
    const [raw, means, full] = await Promise.all([
        rawHistory(connection, ids.filter((id) => !fromStatistics.has(id)), start),
        hourlyMeans(connection, [...fromStatistics], start, now),
        rawRows(connection, withAttributes, start, true),
    ]);
    return sources.map((source) => {
        const current = states[source.entityId];
        const read = (state, a) => source.attribute
            ? SILENT.has(state ?? "") || a?.[source.attribute] == null
                ? undefined
                : String(a[source.attribute])
            : state;
        // Full rows repeat the last attributes: a row may omit unchanged ones.
        let attrs;
        const marks = source.attribute
            ? (full[source.entityId] ?? []).map((row) => {
                attrs = row.a ?? attrs;
                return [
                    Math.max(start, (row.lu ?? row.lc ?? 0) * 1000),
                    read(row.s, attrs),
                ];
            })
            : [...(raw[source.entityId] ?? means[source.entityId] ?? [])];
        if (current)
            marks.push([now, read(current.state, current.attributes)]);
        const lane = source.kind === "lane";
        return {
            ...source,
            unit: source.unit ?? (lane ? "" : unitOf(current)),
            points: marks.map(([t, s]) => [t, lane ? onOff(s) : numeric(s)]),
            states: marks.map(([t, s]) => [
                t,
                s === undefined || SILENT.has(s) ? undefined : s,
            ]),
        };
    });
}
/** The value in force at `time`: the last point at or before it. */
function valueAt(series, time) {
    let value;
    for (const [t, v] of series.points) {
        if (t > time)
            break;
        value = v;
    }
    return value;
}

/** Round-number ticks covering [min, max], about `count` of them. */
function ticks(min, max, count = 4) {
    const raw = (max - min) / count || 1;
    const power = 10 ** Math.floor(Math.log10(raw));
    const step = [1, 2, 2.5, 5, 10].map((m) => m * power).find((s) => s >= raw) ??
        10 * power;
    const out = [];
    // From the step at or below min up to the first step at or above max.
    for (let v = Math.floor(min / step) * step;; v += step) {
        out.push(Number(v.toFixed(6)));
        if (v >= max - 1e-9)
            break;
    }
    return out;
}

const LEFT$1 = 44;
const TOP$1 = 24;
const PLOT_BOTTOM = 196;
/** Room right of the plot for each additional scale. */
const GUTTER$1 = 44;
/** One lane below the plot, and the gap above the first. */
const LANE = 14;
const LANE_GAP = 6;
/** The left and right units of a chart; lanes have no scale. */
function units(all, leftUnit) {
    const series = all.filter((s) => s.kind !== "lane");
    const left = leftUnit ??
        series.find((s) => isTemperature(s.unit))?.unit ??
        series[0]?.unit ??
        "";
    return [left, series.find((s) => s.unit !== left)?.unit];
}
/** Units rendered, in axis order. Pass the length to lineChartTimeAt. */
function chartUnits(all, leftUnit, maxUnits = 2) {
    const [left] = units(all, leftUnit);
    return [
        ...new Set([
            left,
            ...all.filter((s) => s.kind !== "lane").map((s) => s.unit),
        ]),
    ].slice(0, maxUnits);
}
function rightMargin(count) {
    return count <= 1 ? 12 : GUTTER$1 * (count - 1);
}
/**
 * Unbroken spells of a series. A step holds its value until the next change, so
 * its spell runs on to the moment it became unavailable.
 */
function runs$1(points, hold) {
    const out = [];
    let current = [];
    for (const [t, v] of points) {
        if (v === undefined) {
            if (current.length) {
                if (hold)
                    current.push([t, current[current.length - 1][1]]);
                out.push(current);
            }
            current = [];
        }
        else
            current.push([t, v]);
    }
    if (current.length)
        out.push(current);
    return out;
}
function scale$1(series, pad, domain) {
    if (domain &&
        Number.isFinite(domain[0]) &&
        Number.isFinite(domain[1]) &&
        domain[1] > domain[0]) {
        const [min, max] = domain;
        return {
            min,
            max,
            marks: [min, ...ticks(min, max).filter((v) => v > min && v < max), max],
        };
    }
    const values = series.flatMap((s) => s.points.flatMap(([, v]) => (v === undefined ? [] : [v])));
    if (!values.length)
        return undefined;
    const marks = ticks(Math.min(...values) - pad, Math.max(...values) + pad);
    return { marks, min: marks[0], max: marks[marks.length - 1] };
}
/** Monotone cubic through the points: smooth, never overshooting a reading. */
function smoothPath(pts) {
    const n = pts.length;
    if (n < 3)
        return pts
            .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`)
            .join(" ");
    const d = [];
    for (let i = 0; i < n - 1; i++)
        d.push((pts[i + 1][1] - pts[i][1]) / (pts[i + 1][0] - pts[i][0] || 1));
    const m = [d[0]];
    for (let i = 1; i < n - 1; i++)
        m.push(d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2);
    m.push(d[n - 2]);
    let path = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < n - 1; i++) {
        const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], h = (x1 - x0) / 3;
        path += ` C${(x0 + h).toFixed(1)},${(y0 + m[i] * h).toFixed(1)} ${(x1 - h).toFixed(1)},${(y1 - m[i + 1] * h).toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`;
    }
    return path;
}
/** Hours between x-axis ticks, fewer on a narrow chart. */
function tickEvery(hours, narrow) {
    if (hours <= 6)
        return narrow ? 2 : 1;
    if (hours <= 24)
        return narrow ? 6 : 4;
    return narrow ? 48 : 24;
}
/**
 * One chart of related readings: the left scale in the main unit, a right-hand
 * scale for a reading in another unit, dashed steps for setpoints and a lane per
 * on/off state below the plot. Unavailable spells are gaps.
 */
function lineChart(all, start, end, hover, text, options = {}) {
    const W = options.width ?? 600;
    const fill = options.fill ?? true;
    const series = all.filter((s) => s.kind !== "lane");
    const lanes = all.filter((s) => s.kind === "lane");
    // Without readings the chart is just its lanes.
    const BOTTOM = series.length ? PLOT_BOTTOM : TOP$1 - LANE_GAP;
    const END = BOTTOM + (lanes.length ? LANE_GAP + lanes.length * LANE : 0);
    const H = END + 34;
    const axisUnits = chartUnits(series, options.leftUnit, options.maxUnits);
    const RIGHT = W - rightMargin(axisUnits.length);
    const pad = (list, unit) => isTemperature(unit) ||
        list.some((s) => s.points.some(([, v]) => v !== undefined && Math.abs(v) >= 10))
        ? 1
        : 0.1;
    const axes = axisUnits.map((unit) => {
        const list = series.filter((s) => s.unit === unit);
        return {
            unit,
            list,
            scale: scale$1(list, pad(list, unit), options.domains?.[unit]),
        };
    });
    const x = (t) => LEFT$1 +
        ((Math.min(Math.max(t, start), end) - start) / (end - start)) *
            (RIGHT - LEFT$1);
    const y = (v, s) => BOTTOM - ((v - s.min) / (s.max - s.min || 1)) * (BOTTOM - TOP$1);
    const every = tickEvery((end - start) / 3600000, W < 480);
    const xTicks = [];
    const hour = new Date(start);
    hour.setMinutes(0, 0, 0);
    let midnights = 0;
    for (let t = hour.getTime(); t <= end; t += 3600000) {
        if (t < start)
            continue;
        const h = new Date(t).getHours();
        if (every >= 24
            ? h === 0 && midnights++ % (every / 24) === 0
            : h % every === 0)
            xTicks.push(t);
    }
    // Leave room for localized clock labels, including a 12-hour AM/PM suffix.
    let previousLabelRight = -Infinity;
    const labeledTicks = xTicks.filter((t) => {
        const half = text.time(t, every >= 24).length * 3.5;
        if (x(t) - half < previousLabelRight + 10)
            return false;
        previousLabelRight = x(t) + half;
        return true;
    });
    const paths = (s, sc) => runs$1(s.points, s.kind === "step").map((run) => {
        const pts = run.map(([t, v]) => [x(t), y(v, sc)]);
        const line = pts.length === 1
            ? `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)} h0.01`
            : s.kind === "step"
                ? pts
                    .map(([px, py], i) => i
                    ? `H${px.toFixed(1)} V${py.toFixed(1)}`
                    : `M${px.toFixed(1)},${py.toFixed(1)}`)
                    .join(" ")
                : options.smooth
                    ? smoothPath(pts)
                    : pts
                        .map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`)
                        .join(" ");
        const area = fill && s.kind !== "step" && pts.length > 1
            ? `${line} L${pts[pts.length - 1][0].toFixed(1)},${BOTTOM} L${pts[0][0].toFixed(1)},${BOTTOM} Z`
            : "";
        return { line, area };
    });
    // As many decimals as the tick steps need (2.5 steps show 57.5, not 58).
    const digits = (sc) => Math.min(2, Math.max(...sc.marks.map((v) => String(v).split(".")[1]?.length ?? 0)));
    const draw = (s, sc) => {
        const parts = paths(s, sc);
        const cls = `series-${s.color}`;
        return w `${parts.map((p) => (p.area ? w `<path class=${`area ${cls}`} d=${p.area}></path>` : A))}<path class=${`line ${cls}${s.kind === "step" ? " dashed" : ""}`} data-entity=${s.entityId} d=${parts.map((p) => p.line).join(" ")}></path>`;
    };
    const lane = (s, i) => {
        const top = BOTTOM + LANE_GAP + i * LANE;
        const spells = s.points
            .map(([t, v], j) => ({
            from: t,
            to: Math.min(end, s.points[j + 1]?.[0] ?? end),
            value: v,
        }))
            .filter((p) => p.value !== undefined);
        const rect = (p, cls) => w `<rect class=${cls} x=${x(p.from).toFixed(1)} y=${top} width=${Math.max(1, x(p.to) - x(p.from)).toFixed(1)} height=${LANE - 4} rx="2"></rect>`;
        return w `<g class=${`history-lane series-${s.color}`} data-entity=${s.entityId}>${spells.map((p) => rect(p, "lane-track"))}${spells.filter((p) => p.value === 1).map((p) => rect(p, "lane-on"))}</g>`;
    };
    const grid = axes.find((a) => a.scale)?.scale;
    return w `<svg class="history-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label=${text.label}>
    <title>${text.label}</title>
    <defs>${[0, 1, 2, 3, 4].map((c) => w `<linearGradient id=${`history-fill-${c}`} class=${`series-${c}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="fill-top"></stop><stop offset="1" class="fill-bottom"></stop></linearGradient>`)}</defs>
    ${grid?.marks.map((v) => w `<line class="grid" x1=${LEFT$1} x2=${RIGHT} y1=${y(v, grid)} y2=${y(v, grid)}></line>`)}
    ${axes.map(({ unit, scale: sc }, i) => sc
        ? w `
      ${sc.marks.map((v) => w `<text class="axis" x=${i === 0 ? LEFT$1 - 6 : RIGHT + 6 + (i - 1) * GUTTER$1} y=${y(v, sc) + 4} text-anchor=${i === 0 ? "end" : "start"}>${text.number(v, digits(sc))}</text>`)}
      ${unit ? w `<text class="axis unit" x=${i === 0 ? 4 : RIGHT + (i - 1) * GUTTER$1 + 4} y="12">${unit}</text>` : A}`
        : A)}
    ${labeledTicks.map((t) => w `<line class="grid" x1=${x(t)} x2=${x(t)} y1=${TOP$1} y2=${END}></line><text class="axis" x=${x(t)} y=${END + 18} text-anchor="middle">${text.time(t, every >= 24)}</text>`)}
    ${axes.map(({ list, scale: sc }) => (sc ? list.map((s) => draw(s, sc)) : A))}
    ${lanes.map(lane)}
    ${hover === undefined ? A : w `<line class="cursor" x1=${x(hover)} x2=${x(hover)} y1=${TOP$1} y2=${END}></line>`}
  </svg>`;
}
/** The time under a pointer over a line chart. */
function lineChartTimeAt(event, element, start, end, twoScales) {
    const box = element.getBoundingClientRect();
    const W = element.viewBox?.baseVal?.width || box.width;
    const px = ((event.clientX - box.left) / box.width) * W;
    const count = typeof twoScales === "number" ? twoScales : twoScales ? 2 : 1;
    const ratio = (px - LEFT$1) / (W - rightMargin(count) - LEFT$1);
    return start + Math.min(1, Math.max(0, ratio)) * (end - start);
}

/**
 * The state of one history view: its range, what it loaded for which window,
 * the time under the pointer, loading and failure, and the plot's width.
 *
 * A reply that arrives after the range changed, the view was reset or the host
 * left the page is dropped, so a slow request never overwrites a newer one.
 */
class HistoryController {
    constructor(host, load, options = {}) {
        this.host = host;
        this.load = load;
        this.loading = false;
        this.error = "";
        /** The plot's width in px, following its element (see `observe`). */
        this.width = 600;
        this.ticket = 0;
        this.range = options.range ?? 24;
        host.addController(this);
    }
    hostDisconnected() {
        this.ticket++;
        this.loading = false;
        this.resize?.disconnect();
        this.resize = this.observed = undefined;
    }
    /** Load `range` (the current one by default). The failure text is prefixed with `failed`. */
    async reload(range = this.range, failed = "") {
        const ticket = ++this.ticket;
        this.range = range;
        this.loading = true;
        this.error = "";
        this.hover = undefined;
        this.host.requestUpdate();
        const end = Date.now();
        try {
            const data = await this.load(range, end);
            if (ticket !== this.ticket)
                return;
            this.data = data;
            this.window = [end - range * 3600000, end];
        }
        catch (error) {
            if (ticket !== this.ticket)
                return;
            this.data = this.window = undefined;
            const message = error instanceof Error
                ? error.message
                : typeof error === "object" && error && "message" in error
                    ? String(error.message)
                    : String(error);
            this.error = failed ? `${failed}: ${message}` : message;
        }
        this.loading = false;
        this.host.requestUpdate();
    }
    /** Forget what was loaded and ignore replies still on their way. */
    reset() {
        this.ticket++;
        this.data = this.window = this.hover = undefined;
        this.loading = false;
        this.error = "";
        this.host.requestUpdate();
    }
    /** Stop listening for a reply without forgetting what is shown (a closed dialog). */
    cancel() {
        this.ticket++;
        this.loading = false;
        this.hover = undefined;
    }
    setHover(time) {
        if (time === this.hover)
            return;
        this.hover = time;
        this.host.requestUpdate();
    }
    /** Follow an element's width, so the chart is drawn at its real size. */
    observe(element) {
        if (!element || element === this.observed)
            return;
        this.resize?.disconnect();
        this.observed = element;
        this.resize = new ResizeObserver(([entry]) => {
            const width = Math.round(entry.contentRect.width);
            // Redraw next frame, outside the observer's own layout pass.
            if (width > 0 && Math.abs(width - this.width) > 4)
                requestAnimationFrame(() => {
                    this.width = width;
                    this.host.requestUpdate();
                });
        });
        this.resize.observe(element);
    }
}

/**
 * The body of a history view, shared by a card's dialog and the history card:
 * range buttons, the chart with a pointer readout, the time read, and a legend
 * whose entries open each entity's more-info.
 */
function historyView(ctl, o) {
    const { data, window: range, hover, error } = ctl;
    const long = ctl.range > 48;
    const legend = data !== undefined && range ? o.legend(data, hover) : [];
    return b `<div
      class="history-ranges"
      role="group"
      aria-label=${o.strings.ranges}
    >
      ${(o.ranges ?? RANGES$1).map((hours) => b `<button
            class="history-range"
            type="button"
            data-range=${hours}
            aria-pressed=${String(ctl.range === hours)}
            @click=${() => void ctl.reload(hours, o.strings.failed)}
          >
            ${o.format.span(hours)}
          </button>`)}
    </div>
    <div
      class="history-plot"
      aria-busy=${String(ctl.loading)}
      @pointermove=${(e) => {
        const svg = e.currentTarget.querySelector("svg");
        if (!svg || !range || data === undefined)
            return;
        ctl.setHover(o.timeAt(e, svg, range, data));
    }}
      @pointerleave=${() => ctl.setHover(undefined)}
    >
      ${error
        ? b `<div class="history-note failed" role="alert">
              <span>${error}</span>
              <button
                class="history-range"
                type="button"
                data-retry
                @click=${() => void ctl.reload(ctl.range, o.strings.failed)}
              >
                ${o.strings.retry}
              </button>
            </div>`
        : data === undefined || !range
            ? b `<p class="history-note" role="status">
                ${o.strings.loading}
              </p>`
            : o.isEmpty(data)
                ? b `<p class="history-note">${o.strings.empty}</p>`
                : o.chart(data, range, hover, Math.max(280, ctl.width))}
    </div>
    ${data !== undefined && range && !error && !o.isEmpty(data)
        ? b `<label class="history-inspector"
            >${o.strings.inspect}
            <input
              type="range"
              min=${range[0]}
              max=${range[1]}
              step=${(range[1] - range[0]) / 200}
              .value=${String(hover ?? range[1])}
              aria-valuetext=${o.format.moment(hover ?? range[1])}
              @input=${(e) => ctl.setHover(Number(e.target.value))}
            />
          </label>`
        : A}
    <p class="history-when" aria-live="polite">
      ${hover === undefined ? o.strings.now : long ? o.format.moment(hover) : o.format.time(hover)}
    </p>
    <div class="history-legend">
      ${data !== undefined && o.renderLegend
        ? o.renderLegend(data, hover)
        : legend.map((entry) => b `<button
                  class=${`history-item series-${entry.color}${entry.kind ? ` kind-${entry.kind}` : ""}`}
                  type="button"
                  data-series=${entry.entityId}
                  title=${entry.title ?? A}
                  @click=${(e) => o.select(entry.entityId, e)}
                >
                  <span class="swatch" aria-hidden="true"></span>
                  <span class="label">${entry.name}</span>
                  <strong>${entry.value}</strong>
                </button>`)}
    </div>`;
}
/** Close a dialog when its backdrop, outside the box, is clicked. */
function backdrop(e) {
    if (e.target !== e.currentTarget)
        return;
    const dialog = e.currentTarget;
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom)
        dialog.close();
}
/**
 * A card's history dialog (`<dialog id="history">`). Open it with
 * `openHistoryDialog`, which also starts loading.
 */
function historyDialog(ctl, o) {
    const close = (e) => e.currentTarget
        .closest("dialog")
        ?.close();
    return b `<dialog
    id="history"
    class="history-dialog"
    aria-labelledby="history-title"
    @click=${backdrop}
    @close=${(e) => {
        ctl.cancel();
        // Back to what opened the history, for keyboard and screen reader users.
        e.currentTarget.trigger?.focus?.();
        o.closed?.();
    }}
  >
    <div class="history-top">
      <h2 class="history-title" id="history-title">
        ${o.strings.history}${o.subtitle ? b ` <span class="history-subtitle">${o.subtitle}</span>` : A}
      </h2>
      ${o.headerActions ?? A}
      <button
        class="history-close"
        type="button"
        data-close-history
        aria-label=${o.strings.closeHistory}
        title=${o.strings.closeHistory}
        @click=${close}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    ${historyView(ctl, {
        ...o,
        // Home Assistant's more-info opens over the page: close the history first.
        select: (id, e) => {
            close(e);
            o.select(id, e);
        },
    })}
    ${o.footer ?? A}
  </dialog>`;
}
/**
 * Open the history dialog in `root` and load its data. Focus returns to
 * `trigger` (the tapped reading) when the dialog closes.
 */
async function openHistoryDialog(ctl, root, host, failed, trigger) {
    ctl.reset();
    await host.updateComplete;
    const dialog = root?.querySelector("dialog#history");
    if (dialog)
        dialog.trigger = trigger ?? undefined;
    if (dialog && !dialog.open)
        dialog.showModal();
    ctl.observe(root?.querySelector(".history-plot"));
    await ctl.reload(ctl.range, failed);
}

/** The history view's own words, in English and Norwegian Bokmål. */
/** `nb` for Bokmål and its aliases (`nb-NO`, legacy `no`, `nn` → Bokmål), else `en`. */
function historyLanguage(hass) {
    const code = (hass?.language || hass?.locale?.language || "en")
        .toLowerCase()
        .replace(/_/g, "-")
        .split("-")[0];
    return ["nb", "no", "nn"].includes(code) ? "nb" : "en";
}
/**
 * The locale for dates and numbers, kept apart from the dictionary: `en-GB`
 * keeps its 24-hour clock, and Norwegian aliases format as Bokmål.
 */
function historyLocale(hass) {
    const code = (hass?.language || hass?.locale?.language || "en")
        .toLowerCase()
        .replace(/_/g, "-")
        .replace(/^(no|nn)(?=-|$)/, "nb");
    try {
        return Intl.getCanonicalLocales(code)[0] || "en";
    }
    catch {
        return "en";
    }
}
const en = {
    history: "History",
    inspect: "Inspect time",
    showHistory: "Show history",
    closeHistory: "Close history",
    ranges: "History ranges",
    loading: "Loading history…",
    empty: "No history for this period.",
    failed: "Could not load history",
    retry: "Try again",
    now: "Now",
    unavailable: "Unavailable",
    on: "On",
    off: "Off",
    target: "target",
    mode: "History view",
    modeCard: "In the card",
    modeMoreInfo: "Home Assistant's details",
    modePanel: "Home Assistant's History page",
};
const nb = {
    history: "Historikk",
    inspect: "Undersøk tidspunkt",
    showHistory: "Vis historikk",
    closeHistory: "Lukk historikk",
    ranges: "Tidsrom",
    loading: "Henter historikk …",
    empty: "Ingen historikk for denne perioden.",
    failed: "Kunne ikke hente historikk",
    retry: "Prøv igjen",
    now: "Nå",
    unavailable: "Utilgjengelig",
    on: "På",
    off: "Av",
    target: "ønsket",
    mode: "Historikkvisning",
    modeCard: "I kortet",
    modeMoreInfo: "Home Assistants detaljer",
    modePanel: "Home Assistants historikkside",
};
function historyStrings(hass) {
    return historyLanguage(hass) === "nb" ? nb : en;
}

/** Locale formatting for charts, following HA's language and 12/24-hour setting. */
function historyFormat(hass) {
    const locale = historyLocale(hass);
    const format = hass?.locale?.time_format;
    const hour12 = format === "12" ? true : format === "24" ? false : undefined;
    const safe = (make, fallback) => {
        try {
            return make();
        }
        catch {
            return fallback;
        }
    };
    return {
        locale,
        /** A clock time, or a weekday and date on a multi-day axis. */
        time: (ms, withDay = false) => safe(() => new Intl.DateTimeFormat(locale, withDay
            ? { weekday: "short", day: "numeric" }
            : { hour: "2-digit", minute: "2-digit", hour12 }).format(ms), new Date(ms).toLocaleTimeString()),
        /** Day and time, for the readout above the legend on a multi-day range. */
        moment: (ms) => safe(() => new Intl.DateTimeFormat(locale, {
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12,
        }).format(ms), new Date(ms).toLocaleString()),
        /** A fixed number of decimals, for axis ticks. */
        number: (value, digits) => safe(() => new Intl.NumberFormat(locale, {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits,
        }).format(value), value.toFixed(digits)),
        /** A reading: up to `digits` decimals, and its unit. */
        reading: (value, unit = "", digits = 1) => `${safe(() => new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value), String(value))}${unit ? ` ${unit}` : ""}`,
        /** A range button's label: "6 h", "24 t", "7 d". */
        span: (hours) => safe(() => new Intl.NumberFormat(locale, {
            style: "unit",
            unit: hours < 48 ? "hour" : "day",
            unitDisplay: "short",
        }).format(hours < 48 ? hours : hours / 24), hours < 48 ? `${hours} h` : `${hours / 24} d`),
    };
}

/**
 * Styles for the history view, chart, timeline and dialog. A card maps its own
 * tokens onto the `--history-*` variables (on its host or card); without them
 * the view follows the Home Assistant theme.
 *
 * Palette: `.series-0` … `.series-4` set `--series` from `--history-series-N`.
 * Timeline bands take `--band`, which a card sets per tone class (`.b-<tone>`)
 * or per band (Home Assistant state colors).
 */
const historyStyles = i$4 `
  :host {
    --history-text-color: var(
      --history-text,
      var(--primary-text-color, #1b1b1a)
    );
    --history-muted-color: var(
      --history-muted,
      var(--secondary-text-color, #5b5a55)
    );
    --history-surface-color: var(
      --history-surface,
      var(--ha-card-background, var(--card-background-color, #fff))
    );
    --history-pill-color: var(
      --history-pill,
      var(--secondary-background-color, #f1f2f3)
    );
    --history-accent-color: var(
      --history-accent,
      var(--primary-color, #03a9f4)
    );
    --history-error-color: var(--history-error, var(--error-color, #c62828));
  }
  .series-0 {
    --series: var(--history-series-0, var(--primary-color, #03a9f4));
  }
  .series-1 {
    --series: var(--history-series-1, var(--orange-color, #ff9800));
  }
  .series-2 {
    --series: var(--history-series-2, var(--green-color, #4caf50));
  }
  .series-3 {
    --series: var(--history-series-3, var(--purple-color, #9c27b0));
  }
  .series-4 {
    --series: var(--history-series-4, var(--red-color, #f44336));
  }
  .history-ranges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .history-range {
    min-height: 44px;
    padding: 0 16px;
    border: 0;
    border-radius: 22px;
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    color: var(--history-text-color);
    background: color-mix(in srgb, var(--history-text-color) 7%, transparent);
    cursor: pointer;
  }
  .history-range[aria-pressed="true"] {
    color: color-mix(
      in srgb,
      var(--history-accent-color) 65%,
      var(--history-text-color)
    );
    background: color-mix(
      in srgb,
      var(--history-accent-color) 24%,
      transparent
    );
    box-shadow: inset 0 0 0 1.5px
      color-mix(in srgb, var(--history-accent-color) 60%, transparent);
  }
  .history-range:focus-visible,
  .history-item:focus-visible,
  .history-action:focus-visible,
  .history-inspector input:focus-visible,
  .history-close:focus-visible {
    outline: 2px solid var(--history-accent-color);
    outline-offset: 2px;
  }
  .history-inspector {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    color: var(--history-muted-color);
    font-size: 12px;
  }
  .history-inspector input {
    flex: 1;
    width: auto;
    padding: 0;
    border: 0;
    background: transparent;
    min-width: 120px;
    min-height: 44px;
    accent-color: var(--history-accent-color);
  }
  .timeline .band-label {
    fill: var(--history-text-color);
    font-size: 11px;
    pointer-events: none;
  }
  .history-plot {
    min-height: 120px;
    touch-action: pan-y;
  }
  .history-chart,
  .timeline {
    display: block;
    width: 100%;
    height: auto;
  }
  .history-chart .grid,
  .timeline .grid {
    stroke: color-mix(in srgb, var(--history-muted-color) 22%, transparent);
  }
  .history-chart .axis,
  .timeline .axis,
  .timeline .lane-label {
    fill: var(--history-muted-color);
    font-size: 12px;
    font-variant-numeric: tabular-nums;
  }
  .timeline .lane-label {
    font-weight: 600;
  }
  .history-chart .line {
    fill: none;
    stroke: var(--series);
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
  .history-chart .dashed {
    stroke-dasharray: 5 4;
  }
  .history-chart .area {
    stroke: none;
  }
  .history-chart .area.series-0 {
    fill: url(#history-fill-0);
  }
  .history-chart .area.series-1 {
    fill: url(#history-fill-1);
  }
  .history-chart .area.series-2 {
    fill: url(#history-fill-2);
  }
  .history-chart .area.series-3 {
    fill: url(#history-fill-3);
  }
  .history-chart .area.series-4 {
    fill: url(#history-fill-4);
  }
  .history-chart .fill-top {
    stop-color: var(--series);
    stop-opacity: var(--history-fill-opacity, 0.32);
  }
  .history-chart .fill-bottom {
    stop-color: var(--series);
    stop-opacity: 0;
  }
  .history-chart .lane-track {
    fill: color-mix(in srgb, var(--series) 16%, transparent);
  }
  .history-chart .lane-on {
    fill: var(--series);
  }
  .history-chart .cursor,
  .timeline .cursor {
    stroke: var(--history-muted-color);
    stroke-dasharray: 3 3;
  }
  .timeline .track {
    fill: color-mix(in srgb, var(--history-muted-color) 10%, transparent);
  }
  .timeline .band {
    fill: var(--band, var(--history-muted-color));
  }
  .timeline .band.b-gap {
    fill: url(#history-hatch);
  }
  .timeline .hatch-bg {
    fill: color-mix(in srgb, var(--history-muted-color) 12%, transparent);
  }
  .timeline .hatch {
    stroke: color-mix(in srgb, var(--history-muted-color) 45%, transparent);
    stroke-width: 2;
  }
  .history-note {
    margin: 40px 0;
    text-align: center;
    font-size: 14px;
    color: var(--history-muted-color);
  }
  .history-note.failed {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px 14px;
    margin: 24px 0;
    padding: 12px 14px;
    border-radius: var(--history-tile, 16px);
    color: var(--history-text-color);
    background: color-mix(
      in srgb,
      var(--history-error-color) 16%,
      var(--history-pill-color)
    );
  }
  .history-when {
    margin: -6px 8px 0;
    font-size: 12.5px;
    color: var(--history-muted-color);
    font-variant-numeric: tabular-nums;
  }
  .history-legend {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr));
    gap: 6px;
  }
  .history-item {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 2px 10px;
    min-height: 44px;
    padding: 8px 14px;
    border: 0;
    border-radius: var(--history-tile, 16px);
    font: inherit;
    text-align: left;
    color: var(--history-text-color);
    background: var(--history-pill-color);
    cursor: pointer;
  }
  .history-item .swatch {
    grid-row: span 2;
    width: 16px;
    height: 0;
    border-top: 3px solid var(--series);
  }
  .history-item.kind-step .swatch {
    border-top-style: dashed;
  }
  .history-item.kind-lane .swatch {
    height: 10px;
    border-top: 0;
    border-radius: 2px;
    background: var(--series);
  }
  .history-item .label {
    font-size: 0.78rem;
    color: var(--history-muted-color);
    overflow-wrap: anywhere;
  }
  .history-item strong {
    font-size: 1rem;
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }
  dialog.history-dialog {
    color: var(--history-text-color);
    background: var(--history-surface-color);
    border: 0;
    border-radius: var(--history-radius, 24px);
    padding: 16px;
    width: min(640px, calc(100vw - 24px));
    max-width: calc(100vw - 24px);
    max-height: calc(100dvh - 32px);
    overflow: auto;
    box-shadow: 0 16px 60px #0006;
  }
  dialog.history-dialog[open] {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  dialog.history-dialog::backdrop {
    background: #0008;
  }
  .history-top {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-left: 8px;
  }
  .history-title {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    color: var(--history-muted-color);
    overflow-wrap: anywhere;
  }
  .history-subtitle {
    display: block;
    font-size: 13px;
    font-weight: 500;
  }
  .history-action,
  .history-close {
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    padding: 0;
    display: grid;
    place-items: center;
    border: 0;
    border-radius: 50%;
    color: var(--history-muted-color);
    background: var(--history-pill-color);
    cursor: pointer;
  }
  .history-action svg,
  .history-close svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
  }
  @media (max-width: 400px) {
    dialog.history-dialog {
      padding: 12px;
    }
  }
`;

const RANGES = {
    readings: [6, 24, 168],
    water: [6, 24, 168],
    cop: [168, 720, 2160],
};
const DEFAULT_RANGE = {
    readings: 24,
    water: 24,
    cop: 720,
};
/** Card roles retain their palette and setpoint semantics in the shared chart. */
function sharedSeries(series) {
    return series.map((s) => ({
        ...s,
        tag: s.role,
        color: s.role === "outdoor"
            ? 2
            : s.role === "pressure" || s.role === "waterCop"
                ? 3
                : s.role === "flowTarget" || s.role === "waterTarget"
                    ? 1
                    : 0,
        kind: s.role === "flowTarget" || s.role === "waterTarget" ? "step" : "line",
        states: [],
    }));
}
/** Keep raw recorder readings at every range, including attribute-based tank sensors. */
async function loadHistory(connection, sources, states, hours, now = Date.now()) {
    const loaded = await loadSeries(connection, sources.map((s) => ({
        ...s,
        tag: s.role,
        color: 0,
    })), states, hours, { now, statisticsFrom: 0 });
    return loaded.map((s) => ({ ...s, role: s.tag }));
}

const LEFT = 40, TOP = 24, BOTTOM = 196, H = 230, GUTTER = 44;
function runs(points) {
    const out = [];
    let current = [];
    for (const [t, v] of points) {
        if (v === undefined) {
            if (current.length)
                out.push(current);
            current = [];
        }
        else
            current.push([t, v]);
    }
    if (current.length)
        out.push(current);
    return out;
}
function scale(series, pad) {
    const values = series.flatMap((s) => s.points.flatMap(([, v]) => (v === undefined ? [] : [v])));
    if (!values.length)
        return undefined;
    const lo = Math.min(...values), hi = Math.max(...values);
    const marks = ticks(lo - pad, hi + pad);
    return { marks, min: marks[0], max: marks[marks.length - 1] };
}
/**
 * Daily COP and outdoor temperature retain their custom daily chart.
 */
function chart(series, start, end, hover, text, W = 600) {
    const RIGHT = W - GUTTER;
    const left = series.filter((s) => isTemperature(s.unit));
    const right = series.filter((s) => !isTemperature(s.unit));
    const l = scale(left, 1), r = scale(right, 0.1);
    const unit = right[0]?.unit ?? "";
    const x = (t) => LEFT +
        ((Math.min(Math.max(t, start), end) - start) / (end - start)) *
            (RIGHT - LEFT);
    const y = (v, s) => BOTTOM - ((v - s.min) / (s.max - s.min || 1)) * (BOTTOM - TOP);
    const hours = (end - start) / 3600000;
    const narrow = W < 480;
    const every = hours > 168
        ? narrow
            ? 336
            : 168
        : hours <= 6
            ? narrow
                ? 2
                : 1
            : hours <= 24
                ? narrow
                    ? 6
                    : 4
                : narrow
                    ? 48
                    : 24;
    const xTicks = [];
    const hour = new Date(start);
    hour.setMinutes(0, 0, 0);
    let midnights = 0;
    for (let t = hour.getTime(); t <= end; t += 3600000) {
        const h = new Date(t).getHours();
        if (t < start)
            continue;
        if (every >= 24
            ? h === 0 && midnights++ % (every / 24) === 0
            : h % every === 0)
            xTicks.push(t);
    }
    const path = (s, sc) => runs(s.points)
        .map((run) => run
        .map(([t, v], i) => {
        const at = `${x(t).toFixed(1)},${y(v, sc).toFixed(1)}`;
        // A lone reading between gaps is drawn as a dot.
        if (!i)
            return run.length === 1 ? `M${at} h0.01` : `M${at}`;
        return `L${at}`;
    })
        .join(" "))
        .join(" ");
    // As many decimals as the tick spacing needs, so 57.5 never shows as 58.
    const decimals = (marks) => marks.length > 1
        ? Math.min(2, (String(Number((marks[1] - marks[0]).toFixed(6))).split(".")[1] ?? "")
            .length)
        : 0;
    const digits = r ? decimals(r.marks) : 0;
    return w `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label=${text.label}>
    <title>${text.label}</title>
    ${(l ?? r)?.marks.map((v) => {
        const sc = (l ?? r);
        return w `<line class="grid" x1=${LEFT} x2=${RIGHT} y1=${y(v, sc)} y2=${y(v, sc)}></line>`;
    })}
    ${l
        ? l.marks.map((v) => w `<text class="axis" x=${LEFT - 6} y=${y(v, l) + 4} text-anchor="end">${text.number(v, decimals(l.marks))}°</text>`)
        : A}
    ${r
        ? r.marks.map((v) => w `<text class="axis" x=${RIGHT + 6} y=${y(v, r) + 4}>${text.number(v, digits)}</text>`)
        : A}
    ${r
        ? w `<text class="axis unit" x=${W - 4} y="12" text-anchor="end">${unit}</text>`
        : A}
    ${xTicks.map((t) => w `<line class="grid" x1=${x(t)} x2=${x(t)} y1=${TOP} y2=${BOTTOM}></line>
        <text class="axis" x=${x(t)} y=${BOTTOM + 18} text-anchor="middle">${text.time(t, every >= 24)}</text>`)}
    ${left.map((s) => w `<path class=${`line s-${s.role}`} d=${path(s, l)}></path>`)}
    ${right.map((s) => w `<path class=${`line s-${s.role}`} d=${path(s, r)}></path>`)}
    ${hover === undefined
        ? A
        : w `<line class="cursor" x1=${x(hover)} x2=${x(hover)} y1=${TOP} y2=${BOTTOM}></line>`}
  </svg>`;
}
/** The time under a pointer over the chart. */
function timeAt(event, element, start, end) {
    const box = element.getBoundingClientRect();
    const W = element.viewBox?.baseVal?.width || box.width;
    const px = ((event.clientX - box.left) / box.width) * W;
    const ratio = (px - LEFT) / (W - GUTTER - LEFT);
    return start + Math.min(1, Math.max(0, ratio)) * (end - start);
}

/** Below this much electricity a day's COP is noise, not efficiency. */
const MIN_KWH = 0.1;
const DAY = 86400000;
/**
 * Daily COP (heat out ÷ electricity in) for heating and hot water, from the
 * same statistics as the card's efficiency summary, with the day's mean
 * outdoor temperature. A day without enough electricity is a gap.
 */
async function loadCop(connection, energy, outdoor, days, entities = {}, now = Date.now()) {
    const modes = ["heating", "water"].filter((m) => energy.ids[m]);
    const ids = [
        ...modes.flatMap((m) => [energy.ids[m].electric, energy.ids[m].heat]),
        ...(outdoor ? [outdoor] : []),
    ];
    if (!ids.length)
        return [];
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const start = today.getTime() - (days - 1) * DAY;
    const stats = await connection.sendMessagePromise({
        type: "recorder/statistics_during_period",
        start_time: new Date(start).toISOString(),
        end_time: new Date(now).toISOString(),
        statistic_ids: [...new Set(ids)],
        period: "day",
        types: ["change", "mean"],
        units: { energy: "kWh", temperature: "°C" },
    });
    const byDay = (id, key) => new Map((stats[id] ?? []).flatMap((row) => typeof row[key] === "number" && Number.isFinite(row[key])
        ? [[row.start, row[key]]]
        : []));
    const dayStarts = [];
    for (let t = start; t <= now; t += DAY) {
        // Local midnights, robust to daylight-saving days of 23 or 25 hours.
        const d = new Date(t);
        d.setHours(0, 0, 0, 0);
        if (dayStarts[dayStarts.length - 1] !== d.getTime())
            dayStarts.push(d.getTime());
    }
    // Statistics may be stamped at UTC or local midnight; match to the day.
    const lookup = (values, day) => {
        for (const [time, value] of values)
            if (time >= day - 12 * 3600000 && time < day + 12 * 3600000)
                return value;
        return undefined;
    };
    const series = modes.map((mode) => {
        const electric = byDay(energy.ids[mode].electric, "change");
        const heat = byDay(energy.ids[mode].heat, "change");
        const points = dayStarts.map((day) => {
            const e = lookup(electric, day), h = lookup(heat, day);
            return [
                day,
                e !== undefined && h !== undefined && e >= MIN_KWH ? h / e : undefined,
            ];
        });
        return {
            role: mode === "heating" ? "heatingCop" : "waterCop",
            entityId: entities[mode] ?? energy.ids[mode].heat,
            unit: "COP",
            points,
        };
    });
    if (outdoor) {
        const mean = byDay(outdoor, "mean");
        series.push({
            role: "outdoor",
            entityId: outdoor,
            unit: "°C",
            points: dayStarts.map((day) => [day, lookup(mean, day)]),
        });
    }
    return series;
}

class HeatpumpEditor extends i$1 {
    constructor() {
        super(...arguments);
        this.config = { type: "custom:heatpump-card" };
    }
    setConfig(config) {
        this.config = {
            ...config,
            entities: config.entities ? { ...config.entities } : undefined,
        };
        this.requestUpdate();
    }
    updated() {
        this.renderRoot
            .querySelectorAll("input")
            .forEach((input) => {
            if (input.validity.customError)
                input.setCustomValidity(this.t("invalidValue"));
        });
    }
    t(key) {
        return localize(language(this.hass), key);
    }
    change(key, event) {
        const input = event.target;
        const value = input.type === "checkbox"
            ? input.checked
            : input.type === "number"
                ? Number(input.value)
                : input.value;
        const next = { ...this.config, [key]: value };
        if (value === "")
            delete next[key];
        if (key === "entity" && value)
            delete next.entry;
        if (key === "entry" && value)
            delete next.entity;
        try {
            normalizeConfig(next);
        }
        catch {
            input.setCustomValidity(this.t("invalidValue"));
            input.reportValidity();
            return;
        }
        input.setCustomValidity("");
        this.config = next;
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent("config-changed", {
            detail: { config: { ...next } },
            bubbles: true,
            composed: true,
        }));
    }
    select(key, label, values) {
        const selected = this.config[key] ??
            { mode: "all", appearance: "default", cop_window: "7d" }[key];
        return b `<label
      >${this.t(label)}<select
        data-config=${key}
        .value=${l(selected)}
        @change=${(e) => this.change(key, e)}
      >
        ${values.map((v) => b `<option value=${v} ?selected=${v === selected}>${this.t(v)}</option>`)}
      </select></label
    >`;
    }
    render() {
        return b `<div class="editor">
      ${colorSchemeSelector(this.hass, this.config.color_scheme, (scheme) => {
            this.config = { ...this.config, color_scheme: scheme };
            this.requestUpdate();
            this.dispatchEvent(new CustomEvent("config-changed", {
                detail: { config: { ...this.config } },
                bubbles: true,
                composed: true,
            }));
        })}
      <p class="hint">${this.t("editorHint")}</p>
      <label
        >${this.t("entity")}<input
          data-config="entity"
          list="climates"
          .value=${l(this.config.entity ?? "")}
          placeholder="climate.…"
          @change=${(e) => this.change("entity", e)}
        /><datalist id="climates">
          ${Object.keys(this.hass?.states ?? {})
            .filter((id) => id.startsWith("climate."))
            .map((id) => b `<option value=${id}></option>`)}
        </datalist></label
      >
      <label
        >${this.t("entry")}<input
          data-config="entry"
          .value=${l(this.config.entry ?? "")}
          @change=${(e) => this.change("entry", e)}
      /></label>
      <label
        >${this.t("cooling_entity")}<input
          data-config="cooling_entity"
          list="cooling-switches"
          .value=${l(this.config.cooling_entity ?? "")}
          placeholder="switch.…"
          @change=${(e) => this.change("cooling_entity", e)}
        /><datalist id="cooling-switches">
          ${Object.keys(this.hass?.states ?? {})
            .filter((id) => /^(switch|input_boolean)\./.test(id))
            .map((id) => b `<option value=${id}></option>`)}
        </datalist></label
      >
      <label
        >${this.t("name")}<input
          data-config="name"
          .value=${l(this.config.name ?? "")}
          @change=${(e) => this.change("name", e)}
      /></label>
      ${this.select("mode", "mode", ["all", "comfort", "water", "efficiency"])}${this.select("appearance", "appearance", ["default", "bubble"])}${this.select("cop_window", "window", ["24h", "7d", "30d"])}
      ${["show_efficiency", "show_hot_water", "allow_curve_edit"].map((key) => b `<label class="toggle"><input data-config=${key} type="checkbox" .checked=${l(this.config[key] ?? key !== "allow_curve_edit")} @change=${(e) => this.change(key, e)} />${this.t(key)}</label>`)}
      <label
        >${this.t("legionella_interval_days")}<input
          data-config="legionella_interval_days"
          type="number"
          min="1"
          step="1"
          .value=${l(String(this.config.legionella_interval_days ?? 7))}
          @change=${(e) => this.change("legionella_interval_days", e)}
      /></label>
    </div>`;
    }
}
HeatpumpEditor.styles = styles;
HeatpumpEditor.properties = { hass: { attribute: false } };
if (!customElements.get("heatpump-card-editor"))
    customElements.define("heatpump-card-editor", HeatpumpEditor);

class HeatpumpCard extends i$1 {
    constructor() {
        super(...arguments);
        this.registry = {};
        this.found = { roles: {}, ambiguous: [] };
        this.readings = new Readings();
        this.energyKey = "";
        this.energyEpoch = 0;
        this.actionEpoch = 0;
        this.nextEnergy = 0;
        this.energyLoading = false;
        this.energyError = "";
        this.pending = false;
        this.feedback = "";
        this.failed = false;
        this.vetoHours = 2;
        /** History dialog: chosen range, loaded series and the hovered time. */
        this.group = "readings";
        this.history = new HistoryController(this, (range, end) => this.fetchHistory(range, end));
        this.t = (key) => localize(language(this.ha), key);
    }
    get hass() {
        return this.ha;
    }
    set hass(value) {
        const changed = this.ha?.connection !== value?.connection;
        this.ha = value;
        if (changed) {
            this.stop();
            this.registry = {};
            this.found = { roles: {}, ambiguous: [] };
            this.readings = new Readings();
            this.energy = undefined;
            this.energyKey = "";
        }
        if (this.isConnected)
            this.start();
        this.resolve();
        this.requestUpdate();
    }
    setConfig(value) {
        const next = normalizeConfig(value);
        applyColorScheme(this, value.color_scheme, this.ha);
        this.config = next;
        this.readings = new Readings();
        this.energy = undefined;
        this.energyKey = "";
        this.energyEpoch++;
        this.energyLoading = false;
        this.actionEpoch++;
        this.pending = false;
        this.feedback = "";
        this.vetoHours = 2;
        this.history.reset();
        this.shadowRoot?.querySelector("#history")?.close();
        this.resolve();
        this.requestUpdate();
    }
    connectedCallback() {
        super.connectedCallback();
        this.start();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.stop();
    }
    updated() {
        this.history.observe(this.shadowRoot?.querySelector(".history-plot"));
        this.shadowRoot
            ?.querySelector("#history")
            ?.classList.toggle("bubble", this.config?.appearance === "bubble");
    }
    start() {
        if (!this.ha || this.unwatch)
            return;
        this.connection = this.ha.connection;
        this.unwatch = watchRegistry(this.connection, (state) => {
            this.registry = state.registry
                ? state
                : { ...state, registry: this.registry.registry };
            if (!state.registry) {
                this.energyEpoch++;
                this.energyLoading = false;
                this.energyKey = "";
            }
            this.resolve();
            this.requestUpdate();
        });
        this.timer = setInterval(() => {
            this.refreshEnergy();
            this.requestUpdate();
        }, 60000);
    }
    stop() {
        this.history.reset();
        this.unwatch?.();
        this.unwatch = undefined;
        if (this.timer)
            clearInterval(this.timer);
        this.timer = undefined;
        this.energyEpoch++;
        this.energyLoading = false;
        this.actionEpoch++;
        this.pending = false;
        this.energyKey = "";
    }
    resolve() {
        if (!this.config || !this.ha || !this.registry.registry)
            return;
        this.found = discover(this.registry.registry, this.ha.states, this.config);
        if (this.ha.connection.connected && !this.registry.disconnected)
            for (const e of Object.values(this.found.roles))
                this.readings.remember(this.ha.states[e.entity_id]);
        this.refreshEnergy();
    }
    get ready() {
        return (!!this.registry.registry &&
            !this.registry.error &&
            !this.registry.loading &&
            !this.registry.disconnected &&
            !!this.ha?.connection.connected);
    }
    show(mode) {
        return ((this.config?.mode === "all" || this.config?.mode === mode) &&
            (mode !== "water" || !!this.config?.show_hot_water) &&
            (mode !== "efficiency" || !!this.config?.show_efficiency));
    }
    refreshEnergy(force = false) {
        if (!this.isConnected ||
            !this.ready ||
            !this.config ||
            !this.ha ||
            !this.show("efficiency") ||
            this.found.error)
            return;
        const key = JSON.stringify([this.config.cop_window, this.found.roles]);
        if (!force &&
            key === this.energyKey &&
            (this.energyLoading || Date.now() < this.nextEnergy))
            return;
        const changed = key !== this.energyKey;
        this.energyKey = key;
        this.nextEnergy = Date.now() + 300000;
        this.energyLoading = true;
        this.energyError = "";
        if (changed)
            this.energy = undefined;
        const ticket = ++this.energyEpoch;
        void loadEnergy(this.ha.connection, this.found.roles, this.config.cop_window ?? "7d")
            .then((data) => {
            if (ticket === this.energyEpoch) {
                this.energy = data;
            }
        })
            .catch((error) => {
            if (ticket === this.energyEpoch)
                this.energyError = String(error);
        })
            .finally(() => {
            if (ticket === this.energyEpoch) {
                this.energyLoading = false;
                this.requestUpdate();
            }
        });
    }
    reading(role) {
        return this.readings.get(this.found.roles[role]?.entity_id, this.ha?.states ?? {}, !!this.ha?.connection.connected && !this.registry.disconnected);
    }
    enabled(role) {
        return (this.ready &&
            !this.pending &&
            available(this.ha?.states[this.found.roles[role]?.entity_id ?? ""]));
    }
    temperatureUnit() {
        return this.ha?.config?.unit_system?.temperature ?? "°C";
    }
    number(value) {
        const n = numeric$1(value);
        return n === undefined
            ? "—"
            : new Intl.NumberFormat(language(this.ha), {
                maximumFractionDigits: 1,
            }).format(n);
    }
    stamp(role) {
        const r = this.reading(role);
        if (!r.stale)
            return A;
        const stamp = r.entity?.last_updated ?? r.entity?.last_changed;
        return b `<span class="stale"
      >${this.t("stale")} ·
      ${stamp ? b `${this.t("lastSeen")} <time datetime=${stamp}>${new Date(stamp).toLocaleString(language(this.ha))}</time>` : this.t("noLastSeen")}</span
    >`;
    }
    info(role) {
        this.moreInfo(this.found.roles[role]?.entity_id);
    }
    moreInfo(id) {
        if (id)
            this.dispatchEvent(new CustomEvent("hass-more-info", {
                detail: { entityId: id },
                bubbles: true,
                composed: true,
            }));
    }
    async act(role, action, value) {
        if (!this.enabled(role) || !this.ha || !this.config)
            return;
        const entity = this.ha.states[this.found.roles[role].entity_id];
        const config = this.config;
        await this.send(() => actionPayload(role, action, entity, config, value, this.vetoHours, this.temperatureUnit()));
    }
    async send(build) {
        if (this.pending || !this.ha)
            return;
        const ticket = ++this.actionEpoch;
        try {
            const payload = build();
            this.pending = true;
            this.failed = false;
            this.feedback = this.t("pending");
            this.requestUpdate();
            await perform(this.ha, payload);
            if (ticket === this.actionEpoch)
                this.feedback = this.t("sent");
        }
        catch (error) {
            if (ticket === this.actionEpoch) {
                const message = error instanceof Error ? error.message : String(error);
                this.failed = true;
                this.feedback = `${this.t("failed")}: ${["range", "unavailable", "invalidMode"].includes(message) ? this.t(message) : message}`;
            }
        }
        finally {
            if (ticket === this.actionEpoch) {
                this.pending = false;
                this.requestUpdate();
            }
        }
    }
    control(role, label, action = "number") {
        const r = this.reading(role), entity = r.entity;
        if (!this.found.roles[role])
            return A;
        const temperature = action === "temperature";
        if (temperature &&
            entity &&
            (Number(entity.attributes.supported_features ?? 0) & 1) === 0)
            return A;
        const value = temperature ? entity?.attributes.temperature : entity?.state;
        const min = numeric$1(entity?.attributes[temperature ? "min_temp" : "min"]);
        const max = numeric$1(entity?.attributes[temperature ? "max_temp" : "max"]);
        const step = numeric$1(entity?.attributes[temperature ? "target_temp_step" : "step"]);
        return b `<label
      >${this.t(label)}<input
        data-control=${role}
        type="number"
        aria-label=${this.t(label)}
        min=${o(min)}
        max=${o(max)}
        step=${step ?? "any"}
        .value=${l(numeric$1(value) === undefined ? "" : String(value))}
        ?disabled=${!this.enabled(role)}
        @change=${(e) => {
            const input = e.target;
            void this.act(role, action, input.value);
        }}
      />${this.stamp(role)}</label
    >`;
    }
    /** Heating/cooling selector for an external switch (on = cooling). */
    season() {
        const id = this.config?.cooling_entity;
        if (!id)
            return A;
        const entity = this.ha?.states[id];
        const known = available(entity) && ["on", "off"].includes(entity.state);
        const cooling = entity?.state === "on";
        const enabled = this.ready && !this.pending && known;
        const option = (value, label) => {
            const selected = known && value === cooling;
            return b `<button
        type="button"
        class=${`segment ${selected ? "selected" : ""}`}
        data-season=${value ? "cooling" : "heating"}
        aria-pressed=${selected ? "true" : "false"}
        ?disabled=${!enabled}
        @click=${() => {
                if (!selected)
                    void this.send(() => coolingPayload(this.ha?.states[id], value));
            }}
      >
        ${this.t(label)}
      </button>`;
        };
        return b `<div class="season-row">
      <div class="season" role="group" aria-label=${this.t("season")}>
        ${option(false, "heating")}${option(true, "cool")}
      </div>
      ${known ? A : b `<span class="stale">${this.t(entity ? "unavailable" : "coolingMissing")}</span>`}
    </div>`;
    }
    chip(role, label) {
        if (!this.found.roles[role])
            return A;
        const e = this.reading(role).entity;
        return b `<button
      class="chip"
      data-chip=${role}
      aria-label=${`${this.t(label)}: ${this.t("history")}`}
      @click=${() => void this.openHistory("readings")}
    >
      ${this.t(label)}
      <strong
        >${this.number(e?.state)}
        ${e?.attributes.unit_of_measurement ?? ""}</strong
      >${this.stamp(role)}
    </button>`;
    }
    async openHistory(group) {
        if (group !== this.group) {
            this.group = group;
            this.history.range = DEFAULT_RANGE[group];
        }
        const trigger = this.shadowRoot?.activeElement;
        await openHistoryDialog(this.history, this.shadowRoot, this, this.t("historyFailed"), trigger);
    }
    /** The tank and its target: separate sensors, else the water heater's own. */
    waterSources() {
        const roles = this.found.roles;
        const water = roles.water?.entity_id;
        const unit = this.temperatureUnit();
        const tank = roles.tank
            ? { role: "tank", entityId: roles.tank.entity_id }
            : water
                ? {
                    role: "tank",
                    entityId: water,
                    attribute: "current_temperature",
                    unit,
                }
                : undefined;
        const target = roles.waterTarget
            ? { role: "waterTarget", entityId: roles.waterTarget.entity_id }
            : water
                ? {
                    role: "waterTarget",
                    entityId: water,
                    attribute: "temperature",
                    unit,
                }
                : undefined;
        return [tank, target].filter((s) => !!s);
    }
    async fetchHistory(range, end) {
        if (!this.ha)
            return [];
        const hass = this.ha;
        const roles = this.found.roles;
        if (this.group === "cop") {
            const energy = this.energy ??
                (await loadEnergy(hass.connection, roles, this.config?.cop_window ?? "7d"));
            return loadCop(hass.connection, energy, roles.outdoor?.entity_id, range / 24, {
                heating: roles.heatingHeat?.entity_id,
                water: roles.waterHeat?.entity_id,
            }, end);
        }
        const sources = this.group === "water"
            ? this.waterSources()
            : HeatpumpCard.HISTORY.flatMap((role) => {
                const id = roles[role]?.entity_id;
                return id ? [{ role, entityId: id }] : [];
            });
        return loadHistory(hass.connection, sources, hass.states, range, end);
    }
    historyDialog() {
        const format = historyFormat(this.ha);
        const title = this.t(HeatpumpCard.TITLES[this.group]);
        return historyDialog(this.history, {
            strings: { ...historyStrings(this.ha), history: title },
            format,
            ranges: RANGES[this.group],
            footer: this.group === "cop"
                ? b `<p class="hint">${this.t("copHint")}</p>`
                : undefined,
            chart: (series, [start, end], hover, width) => this.group === "cop"
                ? chart(series, start, end, hover, { number: format.number, time: format.time, label: title }, width)
                : lineChart(sharedSeries(series), start, end, hover, { number: format.number, time: format.time, label: title }, { width, fill: false }),
            isEmpty: (series) => series.every((s) => s.points.every(([, value]) => value === undefined)),
            timeAt: (event, svg, [start, end], series) => this.group === "cop"
                ? timeAt(event, svg, start, end)
                : lineChartTimeAt(event, svg, start, end, units(sharedSeries(series))[1] !== undefined),
            legend: (series, at) => sharedSeries(series).map((s) => {
                const value = at === undefined
                    ? s.points[s.points.length - 1]?.[1]
                    : valueAt(s, at);
                return {
                    entityId: s.entityId,
                    name: this.t(HeatpumpCard.LABELS[s.tag]),
                    value: value === undefined
                        ? "—"
                        : s.unit === "COP"
                            ? format.number(value, 2)
                            : format.reading(value, s.unit),
                    color: s.color,
                    kind: s.kind,
                };
            }),
            select: (entityId) => this.moreInfo(entityId),
        });
    }
    comfort() {
        const e = this.reading("climate").entity;
        if (!this.found.roles.climate)
            return A;
        const modes = Array.isArray(e?.attributes.hvac_modes)
            ? e.attributes.hvac_modes.filter((m) => typeof m === "string")
            : [];
        return b `<section data-panel="comfort">
      <h3>${this.t("comfort")}</h3>
      ${this.season()}
      <div class="row between">
        <div>
          <div class="eyebrow muted">${this.t("current")}</div>
          <div class="big">
            ${this.number(e?.attributes.current_temperature)}<span class="unit"
              >${this.temperatureUnit()}</span
            >
          </div>
          ${this.stamp("climate")}
        </div>
        <div class="controls">
          ${this.control("climate", "target", "temperature")}${modes.length
            ? b `<label
                  >${this.t("mode")}<select
                    data-control="mode"
                    ?disabled=${!this.enabled("climate")}
                    .value=${l(e?.state ?? "")}
                    @change=${(event) => void this.act("climate", "mode", event.target.value)}
                  >
                    ${modes.map((m) => b `<option value=${m} ?selected=${m === e?.state}>${modeLabel(language(this.ha), m)}</option>`)}
                  </select></label
                >`
            : A}
        </div>
      </div>
      <div class="readings">
        ${this.chip("flow", "flow")}${this.chip("flowTarget", "flowTarget")}${this.chip("outdoor", "outdoor")}${this.chip("pressure", "pressure")}
      </div>
      <details class="veto">
        <summary>${this.t("quickVeto")}</summary>
        <p class="hint">${this.t("vetoHint")}</p>
        <div class="controls">
          <label
            >${this.t("duration")}<input
              type="number"
              min="1"
              max="12"
              step="0.5"
              .value=${String(this.vetoHours)}
              @change=${(event) => {
            this.vetoHours = Number(event.target.value);
        }} /></label
          ><button
            class="secondary"
            data-action="quickVeto"
            ?disabled=${!this.enabled("climate") || numeric$1(e?.attributes.temperature) === undefined}
            @click=${() => void this.act("climate", "quickVeto", e?.attributes.temperature)}
          >
            ${this.t("startVeto")}</button
          >${this.reading("quickVeto").entity && !this.reading("quickVeto").stale ? this.control("quickVeto", "duration") : A}
        </div>
      </details>
      ${this.config?.allow_curve_edit &&
            (this.found.roles.curve || this.found.roles.minFlow)
            ? b `<details class="veto" open>
              <summary>${this.t("curve")}</summary>
              <p class="hint">${this.t("curveHint")}</p>
              <div class="controls">
                ${this.control("curve", "curve")}${this.control("minFlow", "minFlow")}
              </div>
            </details>`
            : A}
    </section>`;
    }
    water() {
        const roles = this.found.roles;
        if (!["water", "tank", "boost", "legionella"].some((r) => roles[r]))
            return A;
        const e = this.reading("water").entity;
        const tankRole = roles.tank ? "tank" : "water", targetRole = roles.waterTarget ? "waterTarget" : "water";
        const tank = numeric$1(roles.tank
            ? this.reading("tank").entity?.state
            : e?.attributes.current_temperature);
        const target = numeric$1(roles.waterTarget
            ? this.reading("waterTarget").entity?.state
            : e?.attributes.temperature);
        const tankUnit = String(roles.tank
            ? (this.reading("tank").entity?.attributes.unit_of_measurement ??
                this.temperatureUnit())
            : this.temperatureUnit());
        const targetUnit = String(roles.waterTarget
            ? (this.reading("waterTarget").entity?.attributes.unit_of_measurement ??
                this.temperatureUnit())
            : this.temperatureUnit());
        const celsius = (n, unit) => n === undefined ? undefined : unit === "°F" ? ((n - 32) * 5) / 9 : n;
        const currentC = celsius(tank, tankUnit), targetC = celsius(target, targetUnit);
        const fill = currentC !== undefined && targetC !== undefined && targetC > 0
            ? Math.max(0, Math.min(100, (currentC / targetC) * 100))
            : 0;
        const boosting = this.reading("boost").entity?.state === "on";
        const date = this.reading("legionella").entity?.state;
        const time = date ? Date.parse(date) : NaN, days = Number.isFinite(time)
            ? Math.floor((Date.now() - time) / 86400000)
            : undefined;
        const overdue = days !== undefined &&
            (Date.now() - time) / 86400000 >
                (this.config?.legionella_interval_days ?? 7);
        return b `<section data-panel="water">
      <h3>${this.t("water")}</h3>
      <div class="water-layout">
        <div
          class="tank"
          role="progressbar"
          aria-label=${this.t("tank")}
          aria-valuemin="0"
          aria-valuemax=${o(target !== undefined ? Math.max(tank ?? 0, target) : undefined)}
          aria-valuenow=${o(tank)}
          aria-valuetext=${tank === undefined ? this.t("unknown") : `${tank} ${tankUnit} / ${target ?? "—"} ${targetUnit}`}
        >
          <div class="fill" style=${`height:${fill}%`}></div>
        </div>
        <div class="water-info">
          <div class="eyebrow muted">${this.t("tank")}</div>
          <button
            class="big"
            data-history="water"
            aria-label=${`${this.t("tank")} ${this.number(tank)} ${tankUnit}: ${this.t("history")}`}
            @click=${() => void this.openHistory("water")}
          >
            ${this.number(tank)}<span class="unit">${tankUnit}</span>
          </button>
          ${this.stamp(tankRole)}
          <button
            class="hint link"
            data-history="waterTarget"
            @click=${() => void this.openHistory("water")}
          >
            ${this.t("target")} ${this.number(target)} ${targetUnit}
          </button>
          ${targetRole !== tankRole ? this.stamp(targetRole) : A}
          ${roles.boost ? b `<button class=${`primary ${boosting ? "active" : ""}`} data-action="boost" ?disabled=${!this.enabled("boost")} @click=${() => void this.act("boost", "boost")}>${this.t(boosting ? "boosting" : "boost")}</button>${this.stamp("boost")}` : A}
        </div>
      </div>
      <p class="hint">${this.t("tankHint")}</p>
      ${roles.water ? b `<div class="controls">${this.control("water", "target", "temperature")}</div>` : A}
      ${roles.legionella ? b `<div class=${`legionella ${overdue ? "warning" : ""}`}><strong>${this.t("legionella")}</strong><span>${days === undefined ? this.t("neverReached") : days < 0 ? this.t("futureDate") : b `${this.t("lastReached")} ${days === 0 ? this.t("today") : b `${days} ${this.t("daysAgo")}`}`}</span>${overdue ? b `<span>· ${this.t("overdue")}</span>` : A}${this.stamp("legionella")}</div>` : A}
    </section>`;
    }
    efficiency() {
        const hasHeating = !!this.found.roles.heatingElectric && !!this.found.roles.heatingHeat, hasWater = !!this.found.roles.waterElectric && !!this.found.roles.waterHeat;
        if (!hasHeating && !hasWater)
            return A;
        return b `<section data-panel="efficiency">
      <div class="row between">
        <h3>${this.t("efficiency")}</h3>
        <span class="chip">${this.t(this.config.cop_window)}</span>
      </div>
      ${this.energyLoading ? b `<p class="hint" role="status">${this.t("loading")}</p>` : A}
      ${this.energyError
            ? b `<p class="feedback error" role="alert">
                ${this.t("statisticsError")}: ${this.energyError}
                <button
                  @click=${() => {
                invalidate(this.ha.connection);
                this.refreshEnergy(true);
                this.requestUpdate();
            }}
                >
                  ${this.t("retry")}
                </button>
              </p>
              ${this.energy ? b `<span class="stale">${this.t("statisticsStale")}</span>` : A}`
            : A}
      ${hasHeating ? efficiencyGroup("heating", this.energy, this.t, language(this.ha), () => void this.openHistory("cop")) : A}${hasWater ? efficiencyGroup("water", this.energy, this.t, language(this.ha), () => void this.openHistory("cop")) : A}
      <p class="hint">
        ${this.t("energyNote")}${this.energy ? b `<br />${this.t("through")} <time datetime=${new Date(this.energy.end).toISOString()}>${new Date(this.energy.end).toLocaleString(language(this.ha))}</time>` : A}
      </p>
    </section>`;
    }
    retry() {
        this.stop();
        this.registry = {};
        this.energyKey = "";
        this.start();
        this.requestUpdate();
    }
    render() {
        if (!this.config)
            return A;
        const fault = this.reading("trouble").entity;
        return b `<ha-card
        class=${this.config.appearance === "bubble" ? "bubble" : ""}
        ><header>
          <span class="symbol"
            ><ha-icon icon="mdi:heat-pump-outline"></ha-icon
          ></span>
          <div class="header-name">
            <div class="eyebrow muted">myVAILLANT</div>
            <h2>${this.config.name ?? this.t("title")}</h2>
          </div>
        </header>
        ${fault?.state === "on"
            ? b `<div class="takeover" role="alert">
                <h3>${this.t("fault")}</h3>
                <pre>
${JSON.stringify(fault.attributes.diagnostic_trouble_codes ?? [], null, 2)}</pre>
                ${this.stamp("trouble")}<button
                  @click=${() => this.info("trouble")}
                >
                  ${this.t("details")}
                </button>
              </div>`
            : this.found.roles.trouble
                ? this.stamp("trouble")
                : A}
        ${this.registry.error || this.registry.disconnected ? b `<p class="feedback error" role="alert">${this.registry.disconnected ? this.t("disconnected") : b `${this.t("registryError")}: ${this.registry.error}`} <button @click=${this.retry}>${this.t("retry")}</button></p>` : A}
        ${!this.registry.registry
            ? b `<p role="status">${this.t("loading")}</p>`
            : this.found.error
                ? b `<p role="alert">${this.t(this.found.error)}</p>`
                : b ` ${this.found.ambiguous.length ? b `<p class="hint warning">${this.t("ambiguous")}: ${this.found.ambiguous.join(", ")}</p>` : A}
                ${this.feedback ? b `<p class=${`feedback ${this.failed ? "error" : ""}`} role=${this.failed ? "alert" : "status"}>${this.feedback}</p>` : A}
                ${this.show("comfort") ? this.comfort() : A}${this.show("water") ? this.water() : A}${this.show("efficiency") ? this.efficiency() : A}
                ${!Object.keys(this.found.roles).length ? b `<p class="hint">${this.t("noRoles")}</p>` : A}`}</ha-card
      >${this.historyDialog()}`;
    }
    getCardSize() {
        return this.config?.mode === "all" ? 12 : 5;
    }
    static getConfigElement() {
        return document.createElement("heatpump-card-editor");
    }
    static getStubConfig() {
        return {
            type: "custom:heatpump-card",
            mode: "all",
            appearance: "default",
            cop_window: "7d",
        };
    }
}
HeatpumpCard.styles = [styles, historyStyles];
/** The readings drawn together in the history. */
HeatpumpCard.HISTORY = [
    "flow",
    "flowTarget",
    "outdoor",
    "pressure",
];
HeatpumpCard.LABELS = {
    flow: "flow",
    flowTarget: "flowTarget",
    outdoor: "outdoor",
    pressure: "pressure",
    tank: "tank",
    waterTarget: "waterTargetLine",
    heatingCop: "heatingCop",
    waterCop: "waterCop",
};
HeatpumpCard.TITLES = {
    readings: "historyTitle",
    water: "waterHistory",
    cop: "copHistory",
};
if (!customElements.get("heatpump-card"))
    customElements.define("heatpump-card", HeatpumpCard);
const catalog = window;
catalog.customCards ?? (catalog.customCards = []);
if (!catalog.customCards.some((c) => c.type === "heatpump-card"))
    catalog.customCards.push({
        type: "heatpump-card",
        name: "Heat Pump Card",
        description: "myVAILLANT comfort, hot water and measured efficiency",
        preview: true,
    });

export { HeatpumpCard };
//# sourceMappingURL=heatpump-card.js.map
