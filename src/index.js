var count = 0;
var rate = 1000;
var lastClick = Date.now() - rate;
var normalBtn = document.querySelector('#normal');
normalBtn.addEventListener('click', () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Normal Clicked ${++count} times`);
    lastClick = Date.now();
  }
});

var button = document.querySelector('#observable');
Rx.Observable.fromEvent(button, 'click')
  .throttleTime(1000)
  .scan(count => count + 1, 0)
  .subscribe(count => console.log(`Observable Clicked ${count} times`));
