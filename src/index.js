var count = 0;
var normalBtn = document.querySelector('#normal');
normalBtn.addEventListener('click', () => console.log(`Normal Clicked ${++count} times`));

var button = document.querySelector('#observable');
Rx.Observable.fromEvent(button, 'click')
  .scan(count => count + 1, 0)
  .subscribe(count => console.log(`Observable Clicked ${count} times`));
