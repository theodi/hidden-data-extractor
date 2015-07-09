var system = require('system');
var args = system.args;

var url = args[1];
var variable = args[2];
//var url = "http://www.marksandspencer.com/textured-circle-lace-skater-dress/p/p22380707";

var page = require('webpage').create();
page.open(url, function(status) {
  var data = evaluate(page, function(variable) {
    return eval(variable);
  }, variable); 
/*
  var data = page.evaluate(function() {
    var variable = "catEntryIdLookUp_3365010";
    return eval(variable);
  });
*/
  console.log(JSON.stringify(data));
  phantom.exit();
});

function evaluate(page, func) {
    var args = [].slice.call(arguments, 2);
    var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
    return page.evaluate(fn);
}
