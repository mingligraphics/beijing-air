parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"HjtF":[function(require,module,exports) {
module.exports="detector_dots.a2d6aa93.geojson";
},{}],"3ZEB":[function(require,module,exports) {
var e=null,r=40,o=116.5,a=require("/data/detector_dots.geojson"),i="pk.eyJ1IjoieGlhb2xlaWFvIiwiYSI6ImNqdzc4YTltNzJic3c0OHFxeWhlZDVodGkifQ.fq-KOXgjoJwsGRBsfqmy6w",t="mapbox://styles/mapbox/light-v10";function l(){e.addSource("markers-source",{type:"geojson",data:a}),e.addLayer({id:"markers",type:"circle",source:"markers-source",paint:{"circle-color":"orange","circle-radius":4,"circle-stroke-width":0}}),e.on("click",function(r){var o=e.queryRenderedFeatures(r.point,{layers:["markers"]});if(o.length){var a=o[0];(new mapboxgl.Popup).setLngLat(e.unproject(r.point)).setHTML('<ul><img src="'+a.properties.image+'"><li>Sale price: <b>'+a.properties.AdjustedSa+"</b></li><li>Address: <b>"+a.properties.Address+"</b></li><li>Property type: <b>"+a.properties.PropType+"</b></li></ul>").addTo(e)}})}mapboxgl.accessToken=i,(e=new mapboxgl.Map({container:"map",style:t,center:[o,r],zoom:7.9})).once("style.load",function(r){l(),e.addControl(new mapboxgl.NavigationControl)});
},{"/data/detector_dots.geojson":"HjtF"}]},{},["3ZEB"], null)
//# sourceMappingURL=mapbox.c0287474.js.map