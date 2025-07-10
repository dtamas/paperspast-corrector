function autocorrectText() {
    document.querySelectorAll('input[name=ntv]').forEach((input) => {
	let SYMBOLS = {'ß':'s', '«':'', 'fc':'t', 'VV':'W'};
	let WORDS = {
"aad":"and",
"afc":"at",
"aiid":"and",
"aro":"are",
"Au":"An",
"aucl":"and",
"aud":"and",
"Bey.":"Rev.",
"bo":"be",
"cf":"of",
"fche":"the",
"fco":"to",
"ft":"a",
"havo":"have",
"ho":"he",
"ia":"in",
"Ifc":"It",
"Ihe":"The",
"Ist":"1st",
"iu":"in",
"iv":"in",
"lias":"has",
"lt":"It",
"m":"in",
"mado":"made",
"nigbfc":"night",
"nofc":"not",
"o£":"of",
"ot":"of",
"tbe":"the",
"tbo":"the",
"tlie":"the",
"tlio":"the",
"tlje":"the",
"Tha":"The",
"Thb":"The",
"thb":"the",
"Tho":"The",
"tho":"the",
"Tub":"The",
"vvas":"was",
"wiah":"wish",
"whieh":"which",
"wo":"we",
"woro":"were",
"Yogel":"Vogel",
};
	var val = input.value;
	for (var i = 0, keys = Object.keys(SYMBOLS), ii = keys.length; i < ii; i++) {
	    val = val.replaceAll(keys[i],SYMBOLS[keys[i]]);
	}
	sp = val.split(' ');
	for (var j = 0; j < sp.length; j++) {
	    for (var i = 0, keys = Object.keys(WORDS), ii = keys.length; i < ii; i++) {
		if (sp[j] == keys[i]) {
	            sp[j] = WORDS[keys[i]];
		}
	    }
	}
	val = sp.join(' ');
	if (val != input.value) {
	    input.value = val;
	}
    });
}

function restoreLastInputFocus() {
    if (window.lastInput) {
	window.lastInput[0].focus({focusVisible:true});
	window.lastInput[0].selectionStart = window.lastInput[1];
	window.lastInput[0].selectionEnd = window.lastInput[2];
    }
}

((fn) => {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
})(() => {
    var popup = document.querySelector('#articletextcorrectionpopupcontrolsleft');
    if (popup) {
	popup.innerHTML += '<span class="quickglyphs">';
	["—","°","‘","’","“","”","„","£","¢","½","¼","¾","⅓","⅔","⅛","⅜","⅝","⅞","■"].map((sym) => {
	    popup.innerHTML += '<a class="copytoclipboard">'+sym+'</a> ';
	});
	popup.innerHtml + '</span>';
	popup.innerHTML += '<button class="button" type="button" id="autocorrectbutton" style="background:#80e080;margin-left: 1em;">Autocorrect</button>';
	document.querySelector('#autocorrectbutton').addEventListener("click", autocorrectText);
	document.querySelectorAll('a.copytoclipboard').forEach( (elem) => {
	    elem.addEventListener("click", (e) => {
		e.preventDefault();
                navigator.clipboard.writeText(e.target.innerText);
	        document.querySelectorAll('a.copytoclipboard').forEach( (elem) => {
		    elem.style.backgroundColor = (elem == e.target)?'#e0e0e0':'#ffffff';
	        });
		restoreLastInputFocus();
	    });
	});
	document.addEventListener('focusout', (e) => {
	    if (e.target.selectionStart !== undefined) {
	        window.lastInput = [e.target, e.target.selectionStart, e.target.selectionEnd];
	    }
	});
	document.querySelectorAll('#alertpopup .popupclosebutton').forEach( (elem) => {
	    elem.addEventListener('click', (e) => {
		restoreLastInputFocus();
	    });
	});
    }
});
