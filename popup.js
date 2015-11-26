/*
 *  @author: milos.silni@gmail.com
 */
function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

function copyTextToClipboard(text) {
    var copyFrom = document.createElement("textarea");
    copyFrom.textContent = text;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    body.removeChild(copyFrom);
};

document.addEventListener('DOMContentLoaded', function() {

    var x = new XMLHttpRequest();
    x.open('GET', 'http://www.vpnbook.com/freevpn');
    x.onload = function() {
        var response = x.response;

        var doc = new DOMParser().parseFromString(response, 'text/html');

        var pass = doc.evaluate('//*[@id="pricing"]/div/div[3]/ul/li[9]/strong', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
        copyTextToClipboard(pass);

        renderStatus('Password copied to clipboard: ' + pass);

    };
    x.onerror = function() {
        errorCallback('Network error.');
    };
    x.send();

});
