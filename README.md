### Задание:

1.  Перенести все запросы что сделали до этого на Express
    - GET `/products/:id` - получение товара
      - получаем `id` параметр с запроса
      - находим товар в `<all-products.json>`
      - отправляем json с товаром
      - если товара нет отправляем json с {'status': 'no products', 'products':
        []}
    - GET `/products/?ids='<id>, <id>,<id>'` - получение нескольких товаров
      - получаем `id`шки с запроса
      - находим товары в `<all-products.json>`
      - отправляем json с товарами
      - если товара нет отправляем json с {'status': 'no products', 'products':
        []}
    - POST `/users` - создание юзера
      - получаем json с юзером
      - добавляем к нему уникальный `id`
      - сохраняем юзера в `<all-users.json>`
      - отправляем json с юзером и полем `success`
      ```
      {
        "status": "success",
        "user": <user>
      }
      ```
    - GET `/users/:id` - получение юзера
      - получаем `id` параметр с запроса
      - находим юзера в `<all-users.json>`
      - отправляем json с юзером
      - если юзером нет отправляем json с {'status': 'not found'}

    #### Новый функцинал
    - POST `/orders/` - создание заказа
      - в `body` шлем параметры заказа
      ```
       {
        "user": <userId>,
        "products": [<productId1>, <productId2>, <productId2>]
        "deliveryType": "delivery"
        "deliveryAdress": "<deliveryAdressText>"
       }
      ```
      - находим товары в `<all-products.json>`
      - создаем в папке с юзером папку `orders`
      - создаем в `orders` новый json с тем что пришло нам из запроса
      - отправляем json с готовым заказом
      ```
       {
        "status": "success",
        "order": {
          "id": <orderId>,
          "user": <userId>,
          "products": [<productId1>, <productId2>, <productId2>]
          "deliveryType": "delivery"
          "deliveryAdress": "<deliveryAdressText>"
         }
       }
      ```
      - если товара нет отправляем json с {'status': 'failed', 'order': null}

#### Доп задание

- Реализовать `multipart-data` запрос c отправлением картинки и данных юзера
  - POST `/images` - создание картинки
  - в теле запроса должна быть картинка и `id` товара которому нужно добавить
    эту картинку
  - похожая реализация есть в `demo/routes/image/save-image-multipart`
  - для копирования картинки из папки в папку использовать `stream` (поток)
  **Как выглядит запрос из postman**
     <img src="./img/3.png" />
     <img src="./img/4.png" />
     
     - в ответе должен приходить адрес новой картинки
