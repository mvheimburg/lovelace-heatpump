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
const t$1=globalThis,i$2=t=>t,s$1=t$1.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o$2,r$1=`<${n}>`,l$1=document,c=()=>l$1.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p$1=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l$1.createTreeWalker(l$1,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m$1:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p$1):void 0!==u[3]&&(c=p$1):c===p$1?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p$1:'"'===u[3]?$:g):c===$||c===g?c=p$1:c===_||c===m$1?c=v:(c=p$1,n=void 0);const x=c===p$1&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$1:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l$1).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l$1,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l$1.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$2(t).nextSibling;i$2(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

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
const en$1 = {
    label: "Color scheme",
    "home-assistant": "Home Assistant",
    bright: "Bright",
    warm: "Warm",
    mint: "Mint",
    sky: "Sky",
    lavender: "Lavender",
    invalid: "Choose a valid color_scheme: home-assistant, bright, warm, mint, sky or lavender.",
};
const nb$1 = {
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
    return ["nb", "no", "nn"].includes(language) ? nb$1 : en$1;
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
            electric > 0 &&
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
    const range = windowRange(window, now), result = { ...range, sources: {} };
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
function numeric(value) {
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
    const number = numeric(value);
    const isNumber = action === "number";
    const min = numeric(entity.attributes[isNumber ? "min" : "min_temp"]);
    const max = numeric(entity.attributes[isNumber ? "max" : "max_temp"]);
    const step = numeric(entity.attributes[isNumber ? "step" : "target_temp_step"]);
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
const en = {
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
    plotHint: "Each point is one paired hour. COP alone does not establish the best heating curve.",
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
};
const nb = {
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
    plotHint: "Hvert punkt er én sammenfallende time. COP alene avgjør ikke riktig varmekurve.",
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
};
function localize(language, key) {
    return /^(nb|nn|no)(-|$)/.test((language ?? "").replace(/_/g, "-").toLowerCase())
        ? nb[key]
        : en[key];
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
function efficiencyGroup(mode, data, t, language = "en") {
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
        <div class="big cop">${fmt(s.cop, 2)}</div>
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
            this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: { ...this.config } }, bubbles: true, composed: true }));
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
        const n = numeric(value);
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
        const id = this.found.roles[role]?.entity_id;
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
        const ticket = ++this.actionEpoch;
        try {
            const entity = this.ha.states[this.found.roles[role].entity_id];
            const payload = actionPayload(role, action, entity, this.config, value, this.vetoHours, this.temperatureUnit());
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
        const min = numeric(entity?.attributes[temperature ? "min_temp" : "min"]);
        const max = numeric(entity?.attributes[temperature ? "max_temp" : "max"]);
        const step = numeric(entity?.attributes[temperature ? "target_temp_step" : "step"]);
        return b `<label
      >${this.t(label)}<input
        data-control=${role}
        type="number"
        aria-label=${this.t(label)}
        min=${o(min)}
        max=${o(max)}
        step=${step ?? "any"}
        .value=${l(numeric(value) === undefined ? "" : String(value))}
        ?disabled=${!this.enabled(role)}
        @change=${(e) => {
            const input = e.target;
            void this.act(role, action, input.value);
        }}
      />${this.stamp(role)}</label
    >`;
    }
    chip(role, label) {
        if (!this.found.roles[role])
            return A;
        const e = this.reading(role).entity;
        return b `<span class="chip"
      >${this.t(label)}
      <strong
        >${this.number(e?.state)}
        ${e?.attributes.unit_of_measurement ?? ""}</strong
      >${this.stamp(role)}</span
    >`;
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
            ?disabled=${!this.enabled("climate") || numeric(e?.attributes.temperature) === undefined}
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
        const tank = numeric(roles.tank
            ? this.reading("tank").entity?.state
            : e?.attributes.current_temperature);
        const target = numeric(roles.waterTarget
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
          <div class="big">
            ${this.number(tank)}<span class="unit">${tankUnit}</span>
          </div>
          ${this.stamp(tankRole)}
          <div class="hint">
            ${this.t("target")} ${this.number(target)}
            ${targetUnit}${targetRole !== tankRole ? this.stamp(targetRole) : A}
          </div>
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
      ${hasHeating ? efficiencyGroup("heating", this.energy, this.t, language(this.ha)) : A}${hasWater ? efficiencyGroup("water", this.energy, this.t, language(this.ha)) : A}
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
    >`;
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
HeatpumpCard.styles = styles;
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
