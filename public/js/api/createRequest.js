/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
   let url = options.url;
   let formData = null, resp = null, err = null;

   const xhr = new XMLHttpRequest();
   xhr.responseType = 'json';

   if (options.data) {
      if (options.method === 'GET') {
         url += '?' + Object.entries(options.data).map(entry => entry.map(encodeURIComponent).join('=')).join('&');
      } else {
         formData = new FormData();
         Object.entries(options.data).forEach(it => formData.append(...it));
      }
   }
   try {
      xhr.open(options.method, url);
      xhr.send(formData);
      resp = xhr.response;
   } catch (error) {
      err = xhr.error;
      console.log("Ошибка данных!");
   }

   options.callback(err, resp);
   xhr.onerror = (e) => {
      throw Error("Нет данных. Ошибка соединения -" + e);
   }
};