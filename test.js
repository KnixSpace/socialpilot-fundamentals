// let p1 = new Promise((resolve, reject) => {
//   resolve();
//   console.log("Hello");
//   reject();
//   console.log("Hello again");
// })
//   .then(() => {
//     console.log("Resolve");
//     console.log(p1);
//   })
//   .catch(() => {
//     console.log("Reject");
//     console.log(p1);
//   });

// function parent(name) {
//   console.log("Start");
//   async function child(surname) {
//     console.log("Hello");
//     await new Promise((res, rej) => {
//       console.log(name + " " + surname);
//       setTimeout(() => {
//         console.log("settimeOut");
//         res();
//       }, 1000);
//     });
//     console.log("Hello again");
//   }
//   child("Patel");
// }

// parent("Krupal");

// for (let i = 0; i <= 1000000; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 2000);
// }

// var x = {};

// if (x == 1 && x == 2 && x == 3) {
//   console.log("aa log karavo");
// }

//customised object functions

// async function loopAsync() {
//   for (let i = 0; i < 5; i++) {
//     await new Promise((res, rej) => {
//       setTimeout(() => {
//         console.log(i);
//         res();
//       }, 3000);
//     });
//   }
// }

// const myObj = {
//   a: "b",
//   b: "c",
//   forEach: function () {
//     for (let i of Object.entries(this)) {
//       console.log(i);
//     }
//   },
// };

// myObj.forEach();

// const obj = {
//   a: 1,
//   b: 2,
//   c: 3,
// };

// Object.prototype.getkeys = function () {
//   for (let val in this) {
//     if (Object.hasOwn(this, val)) {
//       console.log(val);
//     }
//   }
// };

// obj.getkeys();

// const ar = [
//   "a",
//   "b",
//   "c",
//   "d",
//   "a",
//   "d",
//   "d",
//   "b",
//   "a",
//   "c",
//   "b",
//   "c",
//   "c",
//   "d",
// ];
// const freq = {};

// ar.forEach((e) => {
//   if (Object.keys(freq).includes(e)) {
//     freq[e] = freq[e] += 1;
//   } else {
//     freq[e] = 1;
//   }
// });

// console.log(freq);

// var x = {
//   value: 1,
//   valueOf: function () {
//     return this.value++;
//   },
// };

// if (x == 1 && x == 2 && x == 3) {
//   console.log("Hello world");
// }

// console.log(console.trace("ghgh"));
// new Promise((res,rej)=>{

// })

// const fruitBasket = {
//   apple: 27,
//   grape: 0,
//   pear: 14,
// };

// const fruitsToGet = ["apple", "grape", "pear"];

// const sleep = (delay) => {
//   return new Promise((resolve) => setTimeout(resolve, delay));
// };

// const getNumFruit = (fruit) => {
//   return sleep(1000).then((v) => fruitBasket[fruit]);
// };

// const forEachLoop = async () => {
//   console.log("Start");
//   fruitsToGet.forEach(async (fruit) => {
//     const numFruit = await getNumFruit(fruit);
//     console.log(numFruit);
//   });
//   console.log("End");
// };

// const mapLoop = async () => {
//   console.log("Start");
//   const promises = fruitsToGet.map(async (fruit) => {
//     return sleep(1000).then((v) => fruitBasket[fruit]);
//   });

//   const results = await Promise.all(promises);
//   results.forEach((result) => console.log(result));

//   console.log("End");
// };

// mapLoop();

// const arr = [2, 4, 8, 9];
// console.log(arr.reduce((acc, ci) => acc * ci, 1));

// const arrSplice = [1, 2, 5, 7, 8, 5];

// console.log(arrSplice.splice(0,0,0,1,0,1,0));
// console.log(arrSplice)

// console.log(arrSplice.join(""))
// console.log(arrSplice)

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("Rejected");
//     reject();
//   }, 1500);
// })
//   .then((resA, rejA) => {
//     setTimeout(() => {
//       console.log("Inner");
//       rejA();
//     }, 1500);
//   })
//   .catch(() => {
//     console.log("first");
//   });

// const callApi = (url) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`calling API: ${url}`);
//       resolve(`Response from ${url}`);
//     }, 1000);
//   });
// };

// const apiUrls = ["api1.com", "api2.com", "api3.com"];

// apiUrls
//   .reduce(async (promiseChain, url) => {
//     return promiseChain.then(() =>
//       callApi(url).then((v) => {
//         console.log(v);
//       })
//     );
//   }, Promise.resolve())
//   .then(() => {
//     console.log("Done ");
//   });

// async function mapSeries(array, iteratorFn) {
//   const results = [];
//   let promise = Promise.resolve();

//   array.forEach((item, index) => {
//     promise = promise
//       .then(() => {
//         return iteratorFn(item, index, array);
//       })
//       .then((result) => {
//         results.push(result);
//       });
//   });

//   return promise.then(() => results);
// }

// const apiUrls = ["api1.com", "api2.com", "api3.com"];

// mapSeries(apiUrls, (url, index) => callApi(url, index))
//   .then((responses) => {
//     console.log("All APIs called sequentially:", responses);
//   })
//   .catch((err) => {
//     console.log("Error");
//   });

// function reduceSeries(array, itf) {
//   return array.reduce((promise, item, index) => {
//     return promise.then((results) => {
//       return itf(item, index, array).then((result) => {
//         results.push(result);
//         return result;
//       });
//     });
//   }, Promise.resolve([]));
// }

const apiUrls = [
  "https://dummyjson.com/posts",
  "https://dummyjson.com/products",
  "https://dummyjson.com/users",
];

const callApi = (url, index, array) => {
  // console.log(index);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Calling API: ${url}`);
      resolve(`Response from ${url}`);
    }, 1000);
  });
};

// apiUrls
//   .reduce((promiseChain, apiUrl) => {
//     return promiseChain.then(() => callApi(apiUrl));
//   }, Promise.resolve())
//   .then(() => {
//     console.log("All APIs called sequentially.");
//   });

// apiUrls
//   .reduce(async (promiseChain, apiUrl) => {
//     return promiseChain.then(() => {
//       return fetch(apiUrl)
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error("http error");
//           }
//           return res.json();
//         })
//         .then((data) => {
//           console.log(`Fetched data ${apiUrl}`, data);
//         });
//     });
//   }, Promise.resolve())
//   .then(() => {
//     console.log("Done");
//   })
//   .catch((error) => {
//     console.error("An error occured");
//   });

// console.log("Krupal".slice(1, 4));

// const ii = [1, 2, 3, 4, 5];
// const objii = {
//   fullName: "Krupal",
//   age: 12,
// };

// console.log(...ii);

// const func = (...numbers) => {
//   return console.log(numbers);
// };

// func({ name: "krupal", age: 24 });

// let a, b;
// const arr = [(a = 1), (b = 2)];
// console.log(arr);
// console.log(a);
// console.log(b);

// Override console.log
// console.log = (function (originalLog) {
//   return function (...args) {
//     originalLog.apply(console, [`Krupal:`, ...args]);
//   };
// })(console.log);

// console.log("Hello, World!");
// console.log("This is a test.");

// console.log("Yoo this is reg reg exp reg".match(/reg/g));
// console.log("Yoo this is reg reg exp reg".matchAll(/reg/g).next());

// null.a = 2000

// console.log(null.a)

const arr = [1, 2, 3, 4, 5];

console.log(arr.splice(3,2,6,7,8,9));
console.log(arr.slice());

console.log(arr)
