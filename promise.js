const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.round(Math.random() * 10) % 2 === 0) {
      resolve("Promise 1");
      // let count = 0;
      // let id = setInterval(() => {
      //   console.log(count);
      //   count++;
      //   if (count > 3) {
      //     clearInterval(id);
      //     resolve("Promise 1")
      //   }
      // }, 500);
    } else {
      reject("Error 1");
    }
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // if (Math.round(Math.random() * 10) % 2 === 0) {
    //   resolve("Promise 2");
    // } else {
    //   reject("Error 2");
    // }
    reject("Error 2");
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // if (Math.round(Math.random() * 10) % 2 === 0)
    //   resolve("Promise 3");
    // } else {
    //   reject("Error 3");
    // }
    reject("Error 3");
  }, 2000);
});

const allPromises = [p1, p2, p3];

Promise.all(allPromises)
  .then((v) => {
    console.log(v);
  })
  .catch((e) => {
    console.log(e);
  });

//output
//all promise are resolved : [ 'Promise 1', 'Promise 2', 'Promise 3' ]
//if any rejected : return the error of the rejected promise
//rejected will not gurenteed that it will kill all the other promises

Promise.any(allPromises)
  .then((v) => {
    console.log(v);
  })
  .catch((e) => {
    console.log(e);
  });

//output
//any reject or resolve


