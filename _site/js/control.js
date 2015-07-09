$.ajaxSetup ({
    // Disable caching of AJAX responses
    cache: false
});


var myFrame;
var meta = {};


$(document).ready(function() {
        $.ajaxSetup({ cache: false });
        registerListeners();
        $( "#result" ).hide();
});

function registerListeners() {
	$( "#submit" ).click(function() {
                url = $( "#input_url").val();
                $( "#front-page" ).fadeOut("slow",function() {
                	getDataFromURL(url);
		});
        });
}

function getDataFromURL(url) {
	$('body').append('<iframe style="display: none;" src="server/proxy.php?site='+url+'" id="iframe" onLoad="getData();"></iframe>');
        $( "#result" ).fadeIn("slow",function() {
        })
}

function dispose(id) {
	$('#' + id).fadeOut();
}


function getData() {
	var myFrame = window.frames[0].window;
	var output = {};
	for (key in myFrame) {
		if (typeof myFrame[key] === 'object' && key.substring(0,6)!= "jQuery" ) {
			var toAdd = "Error fetching this data, sorry!";
			try {
				toAdd = JSON.stringify(myFrame[key],censor(myFrame[key]),4);
			} catch(err) {
				continue;
			}
			if (toAdd != "" && toAdd != "null" && toAdd != "{}" && toAdd != "[]") {
				key = key.trim();
				var output = "<tr id='tab-"+ key +"'><td><button id='dispose' onclick='dispose(\"tab-" + key + "\");' value='dispose'>Dispose</button><td><a href='getData.php?url=" + requested_url + "&variable=" + key + "'>" + key + "</a></td><td><pre>" + syntaxHighlight(toAdd) + "</pre></td></tr>";
				$('#data').append(output);
				
			}
			//output.push(console.log(JSON.stringify(myFrame[key],censor(myFrame[key]))));
		}
	}
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function censor(censor) {
        var i = 0;
        return function(key, value) {
            if (i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value)
                return '[Circular]';

//	    if (i >= 29) // seems to be a harded maximum of 30 serialized objects?
//                return '[Unknown]';
            
	    ++i; // so we know we aren't using the original object anymore

            return value;
        }
}

/*
function getData(myFrame) {
	var price = {};
	var stock = {};
	for (key in myFrame) {
		if (key.indexOf("priceLook") > -1) {
			price = (myFrame[key]);
		}
		if (key.indexOf("StockDetails") > -1) {
			stock = (myFrame[key]);
		}
	}
	var thing = $(myFrame.window.document.head);
	thing = thing[0].children;
	for (i=0;i<thing.length;i++) {
		getMeta($(thing[i]));
	}
	processResult(stock,price);
}
*/

function getMeta(node) {
	if (node[0].nodeName == "META") {
		property = node[0].attributes[0];
		value = node[0].attributes[1];
		property = $(property)[0].nodeValue;
		try {
			value = $(value)[0].nodeValue;
		}
		catch(err) {
			value = "";
		}
		meta[property] = value;
	}
}

function processResult(stock,prices) {
	$("body").append("<h1>" + meta["og:title"] + "<h1>");
	var priceKey;
	for (key in stock) {
		priceKey = key;
		stock=stock[key];
	}
	for (size in stock) {
		number = stock[size].count; 
		price = prices[priceKey + "_" + size].price;
		size = size.replace("DUMMY","");
		$("body").append(size + " : " + number + " (" + price + ")<br/>");
	}
		
}
