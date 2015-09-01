(function () {
	'use strict';
	var sh;

	sh = window.sh = {};

	sh.inlineScripts = [];

	sh.namespace = function (nsString) {
		var parts = nsString.split('.'),
			parent = sh,
			i;

		for (i = 0; i < parts.length; i += 1) {
			if ((typeof parent[parts[i]] === 'undefined') || (parent[parts[i]] === null)) {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	};

	sh.queueInlineScript = function (task) {
		if (typeof task === 'function') {
			sh.inlineScripts.push(task);
		}
	};
})();

// http://timkadlec.com/2013/01/windows-phone-8-and-device-width/
(function () {
	'use strict';
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style");
		msViewportStyle.appendChild(
			document.createTextNode(
				"@-ms-viewport{width:auto!important}"
			)
		);
		document.getElementsByTagName("head")[0].
			appendChild(msViewportStyle);
	}
}());