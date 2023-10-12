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
         Object.entries(options.data).forEach(it => formData.append(Array.form(it)));
      }
   }
   try {
      xhr.open(options.method, url);
      xhr.send(formData);

      console.log("Вариант Основной")
   } catch (error) {
      
      console.log("Ошибка данных!");
   }

   xhr.onerror = (e) => {
      throw Error("Нет данных. Ошибка соединения -" + e);
   }
};