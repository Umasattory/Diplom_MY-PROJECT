/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
   const xhr = new XMLHttpRequest();
   xhr.responseType = 'json';
   const url = options.url;
   const formData = null;

   if (options.data) {
      if (options.method === 'GET') {
         url += '?' + Object.entries(data).map(
            entry => entry.map(encodeURIComponent).join('=')).join('&');
      } else {
         formData = new FormData();
         Object.entries(data).forEach(it=>formData.append(...it))
      }
   }
   if(options.callback){
      try {
         xhr.onreadystatechange = function () {
            const err = null;
            const response = null;      
            if (xhr.response?.success) {
               callback(err, response = JSON.parse(xhr.responseText));
               console.log(response);
            } else {
               callback(err = xhr.response, response);
               console.error(err)
            }
         }
         xhr.open(options.method, url);
         xhr.send(formData)      
      } catch (error) {
         callback(error)
      }
   }
   xhr.onerror = function () {
      throw Error('Ошибка запроса, нет соединения с сервером')
   }
};