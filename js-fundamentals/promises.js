const promise1 = new Promise((res, rej) => {
  setTimeout(res, 1000, "Resolved 1");
});
const promise2 = new Promise((res, rej) => {
  setTimeout(res, 1000, "Resolved 2");
});
const promise3 = new Promise((res, rej) => {
  setTimeout(rej, 1000, "Rejected 3");
});
// const promise4 = new Promise((res, rej) => {
//   setTimeout(rej, 1000, "rejected 4");
// });

Promise.all([promise1, promise2]).then(console.log).catch(console.log);

Promise.allSettled([promise1, promise2, promise3])
  .then(console.log)
  .catch(console.log);

Promise.race([promise1, promise2, promise3])
  .then(console.log)
  .catch(console.log);

Promise.any([promise1, promise2]).then(console.log).catch(console.log);