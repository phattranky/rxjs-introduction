var count = 0;
var rate = 1000;
var lastClick = Date.now() - rate;
var normalBtn = document.querySelector('#normal');
normalBtn.addEventListener('click', (event) => {
  if (Date.now() - lastClick >= rate) {
    count += event.clientX;
    console.log(`Normal Clicked ${count} times`);
    lastClick = Date.now();
  }
});

var button = document.querySelector('#observable');
Rx.Observable.fromEvent(button, 'click')
  .throttleTime(1000)
  .map(event => event.clientX)
  .scan((count, clientX) => count + clientX, 0)
  .subscribe(count => console.log(`Observable Clicked ${count} times`));
