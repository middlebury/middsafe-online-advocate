!function t(e,n,r){function a(i,u){if(!n[i]){if(!e[i]){var s="function"==typeof require&&require;if(!u&&s)return s(i,!0);if(o)return o(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[i]={exports:{}};e[i][0].call(f.exports,function(t){var n=e[i][1][t];return a(n?n:t)},f,f.exports,t,e,n,r)}return n[i].exports}for(var o="function"==typeof require&&require,i=0;i<r.length;i++)a(r[i]);return a}({1:[function(t,e,n){"use strict";function r(t){t.preventDefault();var e=m.pop();e&&o(e)}function a(){s(c,function(t){t.classList.remove(d),t.setAttribute("aria-hidden",!0)})}function o(t){a();var e=document.getElementById(t);e&&(document.body.classList.remove("discovery-item-"+p),document.body.classList.add("discovery-item-"+t),p=t,e.classList.add(d),e.setAttribute("aria-hidden",!1),e.focus(),window.scrollTo(0,0))}function i(t){t.preventDefault();var e=t.target.href,n=e.split("#")[1];m.push(p),o(n)}function u(){if(document.body.classList.add("has-discovery"),!f.length||!c.length)return!1;s(f,function(t){t.addEventListener("click",i)});var t=c[0].id;o(t),l.addEventListener("click",r)}var s=t("./forEach"),c=document.querySelectorAll(".discovery__item"),f=document.querySelectorAll(".answers-list__link"),l=document.querySelector(".js-discovery-back-button"),d="discovery__item--is-open",m=[],p="";u()},{"./forEach":2}],2:[function(t,e,n){"use strict";e.exports=function(t,e){for(var n=t.length,r=0;r<n;r++)e(t[r],r)}},{}],3:[function(t,e,n){"use strict";var r=document.documentElement;r.classList.add("js"),r.classList.remove("no-js"),"ontouchstart"in r||r.classList.add("no-touch"),t("./decision-tree"),t("./modals");var a=document.querySelector(".site-header"),o=a.offsetHeight+"px";document.body.style.paddingTop=o;var i=document.querySelector(".js-escape-button");i.addEventListener("click",function(){document.querySelector("body").style.display="none"})},{"./decision-tree":1,"./modals":4}],4:[function(t,e,n){"use strict";function r(t){var e=document.getElementById(t);if(!e)throw new Error("no modal found");x===t||E||(x=t,E=!0,document.body.classList.add(h),l(p,function(t){return t.classList.remove(y)}),e.classList.add(g),e.classList.add(y),e.setAttribute("aria-hidden",!1),e.style.transform="translateX(-100vw)",f({targets:e,translateX:[-e.offsetWidth-50,0],elasticity:b,duration:w,complete:function(){e.focus(),E=!1}}))}function a(t){t.preventDefault(),o()}function o(){l(p,function(t){return t.id===x?i(t.id):(t.classList.remove(y),void t.classList.remove(g))})}function i(t){var e=document.getElementById(t);E||(u(),E=!0,x=null,document.body.classList.remove(h),f({targets:e,translateX:[0,-e.offsetWidth-50],elasticity:b,duration:w,complete:function(){e.classList.remove(g,y),e.setAttribute("aria-hidden",!0),E=!1}}))}function u(){l(m,function(t){t.classList.remove(v)})}function s(t){if(t.preventDefault(),!E){var e=t.target.getAttribute("data-modal-id");if(e===x)return o();u(),t.target.classList.add(v),r(e)}}function c(){l(m,function(t){t.addEventListener("click",s)}),l(p,function(t){var e=t.querySelector("[data-modal-close-button]");e.addEventListener("click",a)});var t=d.offsetHeight+"px";l(p,function(e){return e.style.paddingTop=t})}var f=t("animejs"),l=t("./forEach"),d=document.querySelector(".site-header"),m=document.querySelectorAll("a[data-modal-id]"),p=document.querySelectorAll(".modal"),v="active",h="has-modal",y="modal--is-top",g="modal--is-open",b=-800,w=800,x="",E=!1;c()},{"./forEach":2,animejs:5}],5:[function(t,e,n){!function(t,n){"function"==typeof define&&define.amd?define([],n):"object"==typeof e&&e.exports?e.exports=n():t.anime=n()}(this,function(){var t,e="1.1.3",n={duration:1e3,delay:0,loop:!1,autoplay:!0,direction:"normal",easing:"easeOutElastic",elasticity:400,round:!1,begin:void 0,update:void 0,complete:void 0},r=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skewX","skewY"],a="transform",o={arr:function(t){return Array.isArray(t)},obj:function(t){return Object.prototype.toString.call(t).indexOf("Object")>-1},svg:function(t){return t instanceof SVGElement},dom:function(t){return t.nodeType||o.svg(t)},num:function(t){return!isNaN(parseInt(t))},str:function(t){return"string"==typeof t},fnc:function(t){return"function"==typeof t},und:function(t){return"undefined"==typeof t},nul:function(t){return"null"==typeof t},hex:function(t){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)},rgb:function(t){return/^rgb/.test(t)},hsl:function(t){return/^hsl/.test(t)},col:function(t){return o.hex(t)||o.rgb(t)||o.hsl(t)}},i=function(){var t={},e=["Quad","Cubic","Quart","Quint","Expo"],n={Sine:function(t){return 1+Math.sin(Math.PI/2*t-Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t,e){if(0===t||1===t)return t;var n=1-Math.min(e,998)/1e3,r=t/1,a=r-1,o=n/(2*Math.PI)*Math.asin(1);return-(Math.pow(2,10*a)*Math.sin((a-o)*(2*Math.PI)/n))},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,n=4;t<((e=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*e-2)/22-t,2)}};return e.forEach(function(t,e){n[t]=function(t){return Math.pow(t,e+2)}}),Object.keys(n).forEach(function(e){var r=n[e];t["easeIn"+e]=r,t["easeOut"+e]=function(t,e){return 1-r(1-t,e)},t["easeInOut"+e]=function(t,e){return t<.5?r(2*t,e)/2:1-r(t*-2+2,e)/2},t["easeOutIn"+e]=function(t,e){return t<.5?(1-r(1-2*t,e))/2:(r(2*t-1,e)+1)/2}}),t.linear=function(t){return t},t}(),u=function(t){return o.str(t)?t:t+""},s=function(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},c=function(t){if(o.col(t))return!1;try{var e=document.querySelectorAll(t);return e}catch(t){return!1}},f=function(t,e){return Math.floor(Math.random()*(e-t+1))+t},l=function(t){return t.reduce(function(t,e){return t.concat(o.arr(e)?l(e):e)},[])},d=function(t){return o.arr(t)?t:(o.str(t)&&(t=c(t)||t),t instanceof NodeList||t instanceof HTMLCollection?[].slice.call(t):[t])},m=function(t,e){return t.some(function(t){return t===e})},p=function(t,e){var n={};return t.forEach(function(t){var r=JSON.stringify(e.map(function(e){return t[e]}));n[r]=n[r]||[],n[r].push(t)}),Object.keys(n).map(function(t){return n[t]})},v=function(t){return t.filter(function(t,e,n){return n.indexOf(t)===e})},h=function(t){var e={};for(var n in t)e[n]=t[n];return e},y=function(t,e){for(var n in e)t[n]=o.und(t[n])?e[n]:t[n];return t},g=function(t){var e=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,t=t.replace(e,function(t,e,n,r){return e+e+n+n+r+r}),n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),r=parseInt(n[1],16),a=parseInt(n[2],16),o=parseInt(n[3],16);return"rgb("+r+","+a+","+o+")"},b=function(t){var e,n,r,t=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t),a=parseInt(t[1])/360,o=parseInt(t[2])/100,i=parseInt(t[3])/100,u=function(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t};if(0==o)e=n=r=i;else{var s=i<.5?i*(1+o):i+o-i*o,c=2*i-s;e=u(c,s,a+1/3),n=u(c,s,a),r=u(c,s,a-1/3)}return"rgb("+255*e+","+255*n+","+255*r+")"},w=function(t){return o.rgb(t)?t:o.hex(t)?g(t):o.hsl(t)?b(t):void 0},x=function(t){return/([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(t)[2]},E=function(t,e,n){return x(e)?e:t.indexOf("translate")>-1?x(n)?e+x(n):e+"px":t.indexOf("rotate")>-1||t.indexOf("skew")>-1?e+"deg":e},L=function(t,e){if(e in t.style)return getComputedStyle(t).getPropertyValue(s(e))||"0"},M=function(t,e){var n=e.indexOf("scale")>-1?1:0,r=t.style.transform;if(!r)return n;for(var a=/(\w+)\((.+?)\)/g,o=[],i=[],u=[];o=a.exec(r);)i.push(o[1]),u.push(o[2]);var s=u.filter(function(t,n){return i[n]===e});return s.length?s[0]:n},k=function(t,e){return o.dom(t)&&m(r,e)?"transform":o.dom(t)&&(t.getAttribute(e)||o.svg(t)&&t[e])?"attribute":o.dom(t)&&"transform"!==e&&L(t,e)?"css":o.nul(t[e])||o.und(t[e])?void 0:"object"},A=function(t,e){switch(k(t,e)){case"transform":return M(t,e);case"css":return L(t,e);case"attribute":return t.getAttribute(e)}return t[e]||0},O=function(t,e,n){if(o.col(e))return w(e);if(x(e))return e;var r=x(x(t.to)?t.to:t.from);return!r&&n&&(r=x(n)),r?e+r:e},I=function(t){var e=/-?\d*\.?\d+/g;return{original:t,numbers:u(t).match(e)?u(t).match(e).map(Number):[0],strings:u(t).split(e)}},j=function(t,e,n){return e.reduce(function(e,r,a){var r=r?r:n[a-1];return e+t[a-1]+r})},q=function(t){var t=t?l(o.arr(t)?t.map(d):d(t)):[];return t.map(function(t,e){return{target:t,id:e}})},S=function(t,e){var r=[];for(var a in t)if(!n.hasOwnProperty(a)&&"targets"!==a){var i=o.obj(t[a])?h(t[a]):{value:t[a]};i.name=a,r.push(y(i,e))}return r},T=function(t,e,n,r){var a=d(o.fnc(n)?n(t,r):n);return{from:a.length>1?a[0]:A(t,e),to:a.length>1?a[1]:a[0]}},P=function(t,e,n,r){var a={};if("transform"===n)a.from=t+"("+E(t,e.from,e.to)+")",a.to=t+"("+E(t,e.to)+")";else{var o="css"===n?L(r,t):void 0;a.from=O(e,e.from,o),a.to=O(e,e.to,o)}return{from:I(a.from),to:I(a.to)}},D=function(t,e){var n=[];return t.forEach(function(r,a){var i=r.target;return e.forEach(function(e){var u=k(i,e.name);if(u){var s=T(i,e.name,e.value,a),c=h(e);c.animatables=r,c.type=u,c.from=P(e.name,s,c.type,i).from,c.to=P(e.name,s,c.type,i).to,c.round=o.col(s.from)||c.round?1:0,c.delay=(o.fnc(c.delay)?c.delay(i,a,t.length):c.delay)/G.speed,c.duration=(o.fnc(c.duration)?c.duration(i,a,t.length):c.duration)/G.speed,n.push(c)}})}),n},X=function(t,e){var n=D(t,e),r=p(n,["name","from","to","delay","duration"]);return r.map(function(t){var e=h(t[0]);return e.animatables=t.map(function(t){return t.animatables}),e.totalDuration=e.delay+e.duration,e})},_=function(t,e){t.tweens.forEach(function(n){var r=n.to,a=n.from,o=t.duration-(n.delay+n.duration);n.from=r,n.to=a,e&&(n.delay=o)}),t.reversed=!t.reversed},C=function(t){return Math.max.apply(Math,t.map(function(t){return t.totalDuration}))},N=function(t){return Math.min.apply(Math,t.map(function(t){return t.delay}))},$=function(t){var e=[],n=[];return t.tweens.forEach(function(t){"css"!==t.type&&"transform"!==t.type||(e.push("css"===t.type?s(t.name):"transform"),t.animatables.forEach(function(t){n.push(t.target)}))}),{properties:v(e).join(", "),elements:v(n)}},B=function(t){var e=$(t);e.elements.forEach(function(t){t.style.willChange=e.properties})},F=function(t){var e=$(t);e.elements.forEach(function(t){t.style.removeProperty("will-change")})},V=function(t){var e=o.str(t)?c(t)[0]:t;return{path:e,value:e.getTotalLength()}},Y=function(t,e){var n=t.path,r=t.value*e,a=function(a){var o=a||0,i=e>1?t.value+o:r+o;return n.getPointAtLength(i)},o=a(),i=a(-1),u=a(1);switch(t.name){case"translateX":return o.x;case"translateY":return o.y;case"rotate":return 180*Math.atan2(u.y-i.y,u.x-i.x)/Math.PI}},Z=function(t,e){var n=Math.min(Math.max(e-t.delay,0),t.duration),r=n/t.duration,a=t.to.numbers.map(function(e,n){var a=t.from.numbers[n],o=i[t.easing](r,t.elasticity),u=t.path?Y(t,o):a+o*(e-a);return u=t.round?Math.round(u*t.round)/t.round:u});return j(a,t.to.strings,t.from.strings)},H=function(e,n){var r;e.currentTime=n,e.progress=n/e.duration*100;for(var o=0;o<e.tweens.length;o++){var i=e.tweens[o];i.currentValue=Z(i,n);for(var u=i.currentValue,s=0;s<i.animatables.length;s++){var c=i.animatables[s],f=c.id,l=c.target,d=i.name;switch(i.type){case"css":l.style[d]=u;break;case"attribute":l.setAttribute(d,u);break;case"object":l[d]=u;break;case"transform":r||(r={}),r[f]||(r[f]=[]),r[f].push(u)}}}if(r){t||(t=(L(document.body,a)?"":"-webkit-")+a);for(var o in r)e.animatables[o].target.style[t]=r[o].join(" ")}},Q=function(t){var e={};return e.animatables=q(t.targets),e.settings=y(t,n),e.properties=S(t,e.settings),e.tweens=X(e.animatables,e.properties),e.duration=e.tweens.length?C(e.tweens):t.duration,e.delay=e.tweens.length?N(e.tweens):t.delay,e.currentTime=0,e.progress=0,e.ended=!1,e},U=[],W=0,z=function(){var t=function(){W=requestAnimationFrame(e)},e=function(e){if(U.length){for(var n=0;n<U.length;n++)U[n].tick(e);t()}else cancelAnimationFrame(W),W=0};return t}(),G=function(t){var e=Q(t),n={};return e.tick=function(t){e.ended=!1,n.start||(n.start=t),n.current=Math.min(Math.max(n.last+t-n.start,0),e.duration),H(e,n.current);var r=e.settings;n.current>=e.delay&&(r.begin&&r.begin(e),r.begin=void 0,r.update&&r.update(e)),n.current>=e.duration&&(r.loop?(n.start=t,"alternate"===r.direction&&_(e,!0),o.num(r.loop)&&r.loop--):(e.ended=!0,e.pause(),r.complete&&r.complete(e)),n.last=0)},e.seek=function(t){H(e,t/100*e.duration)},e.pause=function(){F(e);var t=U.indexOf(e);t>-1&&U.splice(t,1)},e.play=function(t){e.pause(),t&&(e=y(Q(y(t,e.settings)),e)),n.start=0,n.last=e.ended?0:e.currentTime;var r=e.settings;"reverse"===r.direction&&_(e),"alternate"!==r.direction||r.loop||(r.loop=1),B(e),U.push(e),W||z()},e.restart=function(){e.reversed&&_(e),e.pause(),e.seek(0),e.play()},e.settings.autoplay&&e.play(),e},J=function(t){for(var e=l(o.arr(t)?t.map(d):d(t)),n=U.length-1;n>=0;n--)for(var r=U[n],a=r.tweens,i=a.length-1;i>=0;i--)for(var u=a[i].animatables,s=u.length-1;s>=0;s--)m(e,u[s].target)&&(u.splice(s,1),u.length||a.splice(i,1),a.length||r.pause())};return G.version=e,G.speed=1,G.list=U,G.remove=J,G.easings=i,G.getValue=A,G.path=V,G.random=f,G})},{}]},{},[3]);
//# sourceMappingURL=bundle.js.map
