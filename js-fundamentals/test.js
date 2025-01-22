// //execution of api in sequential order
// //forEach

// const apiUrls = [
//   "https://dummyjson.com/users/1",
//   "https://dummyjson.com/users/2",
//   "https://dummyjson.com/users/3",
// ];

// function fetchApi(url) {
//   return fetch(url).then((v) => {
//     return v.json();
//   });
// }

// function callApiForEach() {
//   let promiseChain = Promise.resolve();
//   let count = 0;
//   apiUrls.forEach((url) => {
//     console.log(count++);
//     promiseChain.then(() => {
//       return fetchApi(url)
//         .then((v) => {
//           console.log(v.firstName);
//         })
//         .catch(console.log);
//     });
//   });
// }

// callApiForEach();

// "use strict";

// var a = 10

const arr = [1, 2, 3, 4];

try {
  arr.map((i) => {
    if (i == 3) {
      new Promise.reject("jsadc")
    } else {
      console.log(i);
    }
  });
} catch (error) {
  console.log(error);
}

console.log("Heloo");

// const person = {
//   firstName: "Krupal",
//   lastName: "Patel",
//   fullName() {
//     console.log(`${this.firstName} ${this.middleName()} ${this.lastName}`);

//     function declareation() {
//       console.log("Inside declaration", this);
//       return this;
//     }

//     const arrow = () => {
//       console.log("Inside arrow", this);
//       return this;
//     };

//     const expression = function () {
//       console.log("Inside expression", this);
//       return this;
//     };


//   },

//   middleName: function () {
//     console.log(this);
//     return "Ganeshbhai";
//   },
// };

// person.fullName();
