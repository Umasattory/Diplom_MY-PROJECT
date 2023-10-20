/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
   let url = options.url;
   let formData = null;

   const xhr = new XMLHttpRequest();
   xhr.responseType = 'json';

   if (options.data) {
      if (options.method === 'GET') {
         url += '?' + Object.entries(options.data).map(entry => entry.map(encodeURIComponent).join('=')).join('&');
      } else {
         formData = new FormData();
         Object.entries(options.data).forEach(it => formData.append(...it));
      }
   };

   if (options.callback) {
      xhr.onerror = () => { console.log(`Произошла ошибка при отправке данных. ошибка - ${xhr.status}`) }
      xhr.onreadystatechange = () => {
         if (xhr.readyState === xhr.DONE) {
            let error = null, response = null;
            try {
               if (xhr.response?.cuccess) {
                  response = xhr.response;
               }
            } catch (err) {
               error = err;
            }
            options.callback(error, response);
         }
      }
   }

   xhr.open(options.method, url);
   xhr.send(formData);
};