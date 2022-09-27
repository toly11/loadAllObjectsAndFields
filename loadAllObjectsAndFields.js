// based on https://github.com/bjuriewicz/lightningGoodizer/blob/master/src/main.js
(function() {
    const tmpAjax = {
        open: XMLHttpRequest.prototype.open,
        send: XMLHttpRequest.prototype.send
    };

    XMLHttpRequest.prototype.open = function(method, url) {
        if (!method) method = '';
        if (!url) url = '';

        tmpAjax.open.apply(this, arguments);
        tmpAjax.method = method;
        tmpAjax.url = url;
        if (method.toLowerCase() == 'get') {
            tmpAjax.data = url.split('?')[1];
        }
    };

    XMLHttpRequest.prototype.send = function(body) {
        if (!body) body = '';
        if (tmpAjax.url && (
            tmpAjax.url.includes('FieldsAndRelationshipsDetailList.queryDetails') ||
            tmpAjax.url.includes('ObjectList.getObjectListRecords')
        )
        ) {
            body = body
                .replace(/(?<=pageSize%22%3A).*?(?=%2C)/gi, '1000')
                .replace(/(?<=offset%22%3A).*?(?=%2C)/gi, '0');
        }

        tmpAjax.send.apply(this, arguments);
        if (tmpAjax.method.toLowerCase() == 'post') tmpAjax.data = body;
    };
})()