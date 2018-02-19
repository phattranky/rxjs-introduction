// The Interval operator returns an Observable that emits an infinite sequence of ascending integers, with a constant interval of time of your choosing between emissions.
var source = Rx.Observable.interval(500);
var subject = new Rx.Subject();
// Using refCount, don't need connect
var multicasted = source.multicast(subject);
// var multicasted = source.multicast(subject).refCount();
var subscription1, subscription2, subscriptionConnect;

console.log('observerA subscribed');
subscription1 = multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
// We should call `connect()` here, because the first
// subscriber to `multicasted` is interested in consuming values
// Comment this if using refCount
subscriptionConnect = multicasted.connect();

setTimeout(() => {
  console.log('observerB subscribed');
  subscription2 = multicasted.subscribe({
    next: (v) => console.log('observerB: ' + v)
  });
}, 600);

setTimeout(() => {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200);

// We should unsubscribe the shared Observable execution here,
// because `multicasted` would have no more subscribers after this
setTimeout(() => {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
  if (subscriptionConnect) {
    subscriptionConnect.unsubscribe(); // for the shared Observable execution
  }
}, 2000);
