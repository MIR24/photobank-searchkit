import {
    PHOTOBANK_BACKEND_HOST,
    PHOTOBANK_BACKEND_HOST_API,
    PHOTOBANK_BACKEND_ADMIN_USER,
    PHOTOBANK_BACKEND_ADMIN_KEY,
} from '../config';

export const METHOD_TYPE_GET = 'GET';

export function requestBase (method, url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText)
                } else {
                    reject(xhr.statusText);
                }
            }
        };
        xhr.open(method, url);
        xhr.send();
    });
}

export function requestPhotoBankBase (params) {
    const userData = {
        username: PHOTOBANK_BACKEND_ADMIN_USER,
        key: PHOTOBANK_BACKEND_ADMIN_KEY,
    };

    return requestBase(METHOD_TYPE_GET, PHOTOBANK_BACKEND_HOST + PHOTOBANK_BACKEND_HOST_API + makeUrlGetParams(userData) + '&' + makeUrlGetParams(params))
    .then(function (res) {
        if (typeof res === 'string') {
            var resParsed = JSON.parse(res);
            if (resParsed.error) {
                Promise.reject({
                    msg: resParsed
                });
            } else {
                return resParsed;
            }
        }
    });
} 

function makeUrlGetParams (data) {
    const ret = [];

    for (let d in data) {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }

    return ret.join('&');
}
