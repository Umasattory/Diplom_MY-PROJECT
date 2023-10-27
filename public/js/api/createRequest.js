/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
   const xhr = new XMLHttpRequest();   
   let formData = null, err = null, resp = null;
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
      xhr.onreadystatechange = () => {
         if (xhr.readyState === xhr.DONE) {
            try {
               if (xhr.response.success) {
                  resp = xhr.response;
               }
            } catch (error) {
               err = error;
            }
            options.callback(err, resp);
         }
      }
   }
   xhr.open(options.method, url);
   xhr.send(formData);   

   xhr.onerror = () => { console.log(`Произошла ошибка при отправке данных. ошибка - ${xhr.status}`) }
};