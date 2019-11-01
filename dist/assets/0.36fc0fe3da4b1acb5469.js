webpackJsonp([0],{

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/lib/index.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/styles/main.scss":
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__("./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\n.posts .subheader,\n.posts ul li a h1,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  vertical-align: baseline;\n  margin: 0;\n  border: 0;\n  padding: 0;\n  font: inherit;\n  font-size: 100%;\n}\n\n/* HTML5 display-role reset for older browsers */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nblockquote,\nq {\n  quotes: none;\n}\n\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n*,\n*:before,\n*:after {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit;\n}\n\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\nbody {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          flex: 1;\n          flex-direction: column;\n  margin: 0;\n  padding: 0;\n  overflow-y: scroll;\n}\n\n.wrapper {\n  min-height: 100vh;\n}\n\n#root,\n.wrapper,\n.page,\n.authComponent {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          flex: 1;\n          flex-direction: column;\n}\n\nfooter {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 auto;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          flex: 0 1 auto;\n          align-items: center;\n          justify-content: center;\n  border-top: 1px solid #eee;\n  padding: 18px 0;\n  width: 100%;\n  height: 60px;\n  color: #666;\n  font-size: 13px;\n}\n\nfooter a {\n  margin-left: .5ch;\n}\n\nfooter a:first-child {\n  margin-right: .5ch;\n}\n\nhtml {\n  -webkit-font-smoothing: antialiased;\n  font-family: 'Roboto', Helvetica, sans-serif;\n  font-size: 100%;\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1.5;\n  text-rendering: optimizeLegibility;\n}\n\nbody {\n  color: #666;\n  line-height: 1.333;\n}\n\nh1 {\n  margin-top: 0;\n  font-size: 3.998em;\n}\n\nh1,\nh2 {\n  font-size: 2.827em;\n}\n\nh3 {\n  font-size: 1.999em;\n}\n\nh4,\n.posts .subheader,\n.posts ul li a h1 {\n  font-size: 1.414em;\n}\n\nsmall,\n.font_small {\n  font-size: 0.707em;\n}\n\na {\n  cursor: pointer;\n  color: rgba(0, 0, 0, .9);\n  text-decoration: none;\n}\n\na:hover {\n  color: black;\n}\n\na.active {\n  color: black;\n}\n\n.topbar {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 auto;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          flex: 0 1 auto;\n          align-items: center;\n  background: #F6E27F;\n  padding: 0 24px;\n  width: 100%;\n  height: 60px;\n}\n\n.topbar .button {\n  color: rgba(0, 0, 0, .5);\n  font-weight: 600;\n}\n\n.topbar .button:hover {\n  color: black;\n}\n\n.topbar nav {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          flex: 1;\n}\n\n.topbar nav a {\n  margin-right: 24px;\n  color: rgba(0, 0, 0, .5);\n  font-weight: 500;\n}\n\n.topbar nav a:hover {\n  color: black;\n}\n\n.topbar nav a.active {\n  color: black;\n}\n\n.page {\n  background: #fff;\n}\n\n.home .hero-unit {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 auto;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          flex: 0 1 auto;\n          flex-flow: row wrap;\n          align-items: center;\n          justify-content: center;\n  width: 100%;\n}\n\n.home .react-logo {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n  display: block;\n          flex: none;\n  clear: both;\n  margin-bottom: 24px;\n  background: url(" + escape(__webpack_require__("./src/images/react_logo.svg")) + ");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: 96px 96px;\n  width: 100%;\n  height: 96px;\n  overflow: hidden;\n}\n\n.home header {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n          flex-direction: column;\n          align-items: center;\n          justify-content: center;\n  background: #F6E27F;\n  min-height: 420px;\n}\n\n.home header .hero-unit {\n  margin-bottom: 24px;\n}\n\n.home header h1 {\n  color: #000;\n  font-weight: 700;\n}\n\n.home header h4,\n.home header .posts .subheader,\n.posts .home header .subheader,\n.home header .posts ul li a h1,\n.posts ul li a .home header h1 {\n  color: rgba(0, 0, 0, .5);\n  font-weight: 400;\n}\n\n.home main {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          flex-flow: row wrap;\n  margin: 0 auto;\n  padding: 96px 0;\n  min-width: 960px;\n  max-width: 960px;\n}\n\n.home main .section-header {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 auto;\n          flex: 0 1 auto;\n  padding-bottom: 72px;\n  width: 100%;\n  color: #000;\n  text-align: center;\n}\n\n.home main .section-header h3 {\n  font-weight: 700;\n}\n\n.home main .section-header.extras {\n  margin-top: 48px;\n}\n\n.home main .section-header.extras h4,\n.home main .section-header.extras .posts .subheader,\n.posts .home main .section-header.extras .subheader,\n.home main .section-header.extras .posts ul li a h1,\n.posts ul li a .home main .section-header.extras h1 {\n  color: #000;\n  font-weight: 700;\n}\n\n.home main .section-header.extras ul {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row nowrap;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          flex: 1;\n          flex-flow: row nowrap;\n  margin: 36px auto 0 auto;\n  width: 100%;\n  max-width: 720px;\n}\n\n.home main .section-header.extras ul li {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n  -ms-flex-line-pack: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          flex: 1;\n      align-content: center;\n          justify-content: center;\n}\n\n.home main .section-header hr {\n  margin: 24px auto 0px;\n  border: none;\n  background-color: #ddd;\n  max-width: 96px;\n  height: 1px;\n  color: #ddd;\n}\n\n.home main .boilerplate-item {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 auto;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row nowrap;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          flex: 0 1 auto;\n          flex-flow: row nowrap;\n  margin-right: 48px;\n  margin-bottom: 48px;\n  width: calc(50% - 48px);\n}\n\n.home main .boilerplate-item .boilerplate-logo {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: 24px;\n  background: url(" + escape(__webpack_require__("./src/images/react.png")) + ");\n  background-repeat: no-repeat;\n  background-size: contain;\n  width: 80px;\n  height: 80px;\n}\n\n.home main .boilerplate-item .boilerplate-logo.mobx {\n  background: url(" + escape(__webpack_require__("./src/images/mobx.png")) + ");\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n\n.home main .boilerplate-item .boilerplate-logo.reactrouter {\n  background: url(" + escape(__webpack_require__("./src/images/reactrouter.png")) + ");\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n\n.home main .boilerplate-item .boilerplate-logo.webpack {\n  background: url(" + escape(__webpack_require__("./src/images/webpack.png")) + ");\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n\n.home main .boilerplate-item .boilerplate-item-content {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n\n.home main .boilerplate-item h4,\n.home main .boilerplate-item .posts .subheader,\n.posts .home main .boilerplate-item .subheader,\n.home main .boilerplate-item .posts ul li a h1,\n.posts ul li a .home main .boilerplate-item h1 {\n  color: #000;\n  font-weight: 500;\n}\n\n.home main .boilerplate-item small {\n  color: #999;\n  font-weight: 500;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n\n.home main .boilerplate-item p {\n  margin-top: 12px;\n}\n\n.github-buttons {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 auto;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          flex: 0 1 auto;\n          align-items: center;\n          justify-content: center;\n  margin: 36px 0;\n  width: 100%;\n}\n\n.github-buttons a {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          align-items: center;\n  border: 1px solid #000;\n  border-radius: 2px;\n  padding: 18px 24px;\n  color: #000;\n  font-size: 18px;\n  font-weight: 600;\n}\n\n.github-buttons a:before {\n  margin-right: 12px;\n  background: url(" + escape(__webpack_require__("./src/images/GitHub-Mark-32px.png")) + ");\n  background-repeat: no-repeat;\n  background-size: contain;\n  width: 24px;\n  height: 24px;\n  content: '';\n}\n\n.github-buttons a:hover {\n  background: #000;\n  color: #fff;\n}\n\n.github-buttons a:hover:before {\n  background: url(" + escape(__webpack_require__("./src/images/GitHub-Mark-Light-32px.png")) + ");\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n\n.posts {\n  margin: 0 auto;\n  padding: 48px 24px;\n  min-width: 960px;\n  max-width: 960px;\n}\n\n.posts h1 {\n  margin-bottom: 9px;\n  color: #000;\n  font-weight: 700;\n}\n\n.posts .subheader {\n  font-weight: 300;\n}\n\n.posts hr {\n  margin-top: 48px;\n  margin-bottom: 48px;\n  border: none;\n  background-color: #ddd;\n  width: 100%;\n  height: 1px;\n  color: red;\n}\n\n.posts ul {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          flex-flow: row wrap;\n}\n\n.posts ul li {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 auto;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n          flex: 0 1 auto;\n          flex-direction: column;\n          justify-content: space-between;\n  margin-right: 36px;\n  margin-bottom: 36px;\n  width: calc(50% - 36px);\n}\n\n.posts ul li a {\n  display: block;\n  margin-bottom: 12px;\n  font-weight: 700;\n}\n\n.posts ul li a h1 {\n  line-height: 1.2;\n}\n\n.posts ul li a h1::first-letter {\n  text-transform: uppercase;\n}\n\n.posts ul li p {\n  font-weight: 400;\n}\n\n.posts ul li p::first-letter {\n  text-transform: uppercase;\n}\n\n.post {\n  margin: 0 auto;\n  padding: 48px 24px;\n  min-width: 960px;\n  max-width: 960px;\n}\n\n.post a {\n  margin: 0 0 72px 0;\n}\n\n.post h1 {\n  margin-bottom: 24px;\n  color: #000;\n  font-weight: 700;\n}\n\n.post h1::first-letter {\n  text-transform: uppercase;\n}\n\n.post p::first-letter {\n  text-transform: uppercase;\n}\n\n@media screen and (max-width: 960px) {\n  .home header {\n    padding: 24px;\n    text-align: center;\n  }\n\n  .home header h1 {\n    font-size: 6vmax;\n  }\n  .home main .section-header.extras ul {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: column;\n            flex-flow: column;\n  }\n\n  .home main .section-header.extras ul li {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 1 auto;\n            flex: 0 1 auto;\n    margin-bottom: 18px;\n    width: 100%;\n  }\n  .home main {\n    padding: 48px 24px;\n    min-width: 100%;\n    max-width: 100%;\n  }\n\n  .home main .boilerplate-item {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 1 auto;\n            flex: 0 1 auto;\n    margin-right: 0;\n    width: 100%;\n  }\n  .posts {\n    padding: 48px 24px;\n    min-width: 100%;\n    max-width: 100%;\n  }\n\n  .posts ul li {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 1 auto;\n            flex: 0 1 auto;\n    margin-right: 0;\n    width: 100%;\n  }\n  .post {\n    padding: 48px 24px;\n    min-width: 100%;\n    max-width: 100%;\n  }\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__("./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/images/GitHub-Mark-32px.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cd786512517cb3dfae993e8c02d8eaa8.png";

/***/ }),

/***/ "./src/images/GitHub-Mark-Light-32px.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2194ad1b26df465e655d420979911be5.png";

/***/ }),

/***/ "./src/images/mobx.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "adcb66df467d00674cdea7b49241fa0a.png";

/***/ }),

/***/ "./src/images/react.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a24049fd1012640a59c4644b1e5d60bc.png";

/***/ }),

/***/ "./src/images/react_logo.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a13b74bb18e4ad086fd9701810809586.svg";

/***/ }),

/***/ "./src/images/reactrouter.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9dceaa39a2538df73d1aba588cf3c742.png";

/***/ }),

/***/ "./src/images/webpack.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ab5e8418c145830b07335f352ea9b9ba.png";

/***/ }),

/***/ "./src/styles/main.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/lib/index.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/styles/main.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/resolve-url-loader/index.js!../../node_modules/sass-loader/lib/loader.js?sourceMap!./main.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/resolve-url-loader/index.js!../../node_modules/sass-loader/lib/loader.js?sourceMap!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

});
//# sourceMappingURL=0.36fc0fe3da4b1acb5469.js.map