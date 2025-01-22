// "use strict";

// const person = {
//   name: "John",
//   greet: function () {
//     const arrowFunction = () => {
//       console.log(this); // "this" refers to the surrounding context (person object)
//     };
//     arrowFunction();
//   },
// };

// person.greet(); // Outputs: John

// const person2 = {
//   name: "John",
//   greet: function () {
//     return function inside() {
//       const arrowFunction = () => {
//         console.log(this);
//       };
//       arrowFunction();
//     };
//   },
// };

// const inside = person2.greet(); // Outputs: global window
// inside();

// const obj = {};
// Object.defineProperties(obj, { name: { value: "Krupal" }, age: { value: 10 } });
// console.log(obj);

// const obj1 = {
//   name: "Krupal",
//   calling() {},
//   call: function () {
//     console.log(this);
//   },
// };

// // console.log(Object.keys(obj1));

// const obj2 = {
//   age: 22,
//   calli: function () {
//     console.log(this);
//   },
// };

// Object.assign(obj2, obj1);

// obj1.call();
// obj2.call();
// obj2.calli();

// "use strict";

const person = {
  firstName: "Krupal",
  lastName: "Patel",
  fullName() {
    console.log(`${this.firstName} ${this.middleName()} ${this.lastName}`);

    function fullNameCapitalize() {
      console.log("Inside declaration", this);
      return this;
    }

    // fullNameCapitalize();

    const insideObj = {
      inside: "in",
      fullNameCapitalize,
    };

    console.log("Inside", insideObj.fullNameCapitalize());
  },

  middleName: function () {
    console.log(this);
    return "Ganeshbhai";
  },
};

person.fullName();
