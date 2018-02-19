var funcBtn = document.querySelector('#func');
var subscribeBtn = document.querySelector('#subscribe-btn');
var unsubscribeBtn = document.querySelector('#unsubscribe-btn');

function sampleFunction() {
  console.log('Hello World');
  return 'Pure Function';
  return 'more...'
}

// Create Observable
const observableFunc = Rx.Observable.create(function (observer) {
  // 1.
  console.log('Hello');
  observer.next(42);

  setInterval(() => {
    observer.next('Kaka');
  }, 2000);

  // 2.
  // setTimeout(() => {
  //   observer.error('Error...');
  // }, 4000)

  // setTimeout(() => {
  //   observer.complete();
  // }, 6000)
});

// Call sample function while click
funcBtn.addEventListener('click', (event) => {
  const result = sampleFunction();
  console.log(result);
});

var subscription;
// Subscribe
subscribeBtn.addEventListener('click', (event) => {
  console.log('Subscribe....');
  // 1.
  // subscription = observableFunc.subscribe((data) => {
  //   console.log(data);
  // });

  // 2.
  var observer = {
    next: x => console.log('Observer got a next value: ' + x),
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };
  subscription = observableFunc.subscribe(observer);
});

unsubscribeBtn.addEventListener('click', (event) => {
  console.log('Unsubscribe....');
  subscription.unsubscribe();
});

