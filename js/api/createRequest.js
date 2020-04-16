/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const { url, data, method, callback, responseType } = options;

    const xhr = new XMLHttpRequest();
    if (!responseType) {
        xhr.responseType = 'json';
    } else {
        xhr.responseType = responseType;
    }


    const formData = new FormData();

    let finalUrl = url;
    if (method === 'GET') {
        let paramUrl = '';
        for (idx in data) {
            paramUrl += (paramUrl === '' ? '' : '&') + idx + '=' + data[idx];
        }
        if (paramUrl) {
            finalUrl += '?' + paramUrl;
        }
    } else {
        for (idx in data) {
            formData.append(idx, data[idx]);
        };
    }

    try {
        xhr.open(method, finalUrl);

        xhr.onreadystatechange = function () {
            if (this.readyState === this.DONE && this.status === 200) {
                callback(null, this.response);
            }
        };        

        xhr.withCredentials = true;

        xhr.send(formData);

    } catch (e) {
        callback(e, null);
    }

    return xhr;
};