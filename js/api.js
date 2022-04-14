const POST_ADDRESS = 'https://25.javascript.pages.academy/keksobooking';
const GET_ADDRESS = 'https://25.javascript.pages.academy/keksobooking/data';

const getData = (onSuccess, onFail) => {
  fetch(GET_ADDRESS)
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then((dataSet) => {
            onSuccess(dataSet);
          })
          .catch(() => {
            onFail('Не удалось обработать данные');
          });
      } else {
        onFail('Не удалось загрузить данные');
      }
    });
};

const sendData = (onSuccess, onFail, data) => {
  fetch(
    POST_ADDRESS,
    {
      method: 'POST',
      body: new FormData(data),
    },
  )
    .then((response) => {
      if(response.ok) {
        return onSuccess();
      } else {
        return onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
export {getData, sendData, POST_ADDRESS};
