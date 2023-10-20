/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
   const xhr = new XMLHttpRequest();   
   let formData = null;
   let url = options.url;
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
            let err = null, resp = null;
            try {
               if (xhr.response?.cuccess) {
                  resp = xhr.response;
               }
            } catch (e) {
               err = e;
            }
            options.callback(err, resp);
         }
      }
   }

   xhr.open(options.method, url);
   xhr.send(formData);
};