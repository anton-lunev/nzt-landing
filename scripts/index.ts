import rangeslider from 'rangeslider-js/src'
import '../styles/modal.less';
import '../styles/main.less';
import {Modal} from "./modal";

window.addEventListener('load', () => {

  new Modal('video-modal');

  const valuesList = [
    {
      value: '$50',
      result: 'Доход до 1 000$ в неделю',
    },
    {
      value: '$100',
      result: 'Доход до 5 000$ в неделю',
    },
    {
      value: '$250',
      result: 'Доход до 25 000$ в неделю',
    }
  ];

  let sliderValue = 1;
  const moneyValueEl = document.getElementById('money-value');
  const moneyResultEl = document.getElementById('money-result');

  rangeslider.create(document.getElementById('slider'), {
    min: 0, max: 2, value: sliderValue, step: 1,
    onSlide(value) {
      if (value === sliderValue) return;
      sliderValue = value;
      moneyValueEl.innerText = valuesList[value].value;
      moneyResultEl.innerText = valuesList[value].result;
    }
  });
});
