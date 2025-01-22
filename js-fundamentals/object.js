const person = {
  firstName: "Krupal",
  lastName: "Patel",
  age: 21,
  address: {
    houseNo: 601,
    buildingName: "Balaji Park",
    city: "Navasri",
    state: "Gujarat",
  },
  phoneNumber: 9814525289,
  fullName: function (middlename) {
    return [this.firstName, middlename, this.lastName].join(" ");
  },
};

//fuction stored in object is refered as methods
console.log(`\nfunction definition :${person.fullName}`);
console.log(`function :${person.fullName("Ganeshbhai")}\n`);

//values
const values = Object.values(person);
console.log("\nvalues :", values);

//entries make it easy to use object in loops
const entries = Object.entries(person.address);
console.log("\nentries :", entries);

//creates an object from a list of key/value pairs.
const fruits = [
  ["apples", 300],
  ["pears", 900],
  ["bananas", 500],
];

console.log("\nfromEntries :", Object.fromEntries(fruits));

//by this object is immutable
const freezObj = Object.freeze({ item: "Apple", price: 200, qty: 5 });
freezObj.item = "Banana";
console.log("\nfreeze :", freezObj);

const city = {
  name: "Navasri",
};

//parameter: object,property,{descripters}
Object.defineProperty(city, "state", {
  value: "Gujarat",
  enumerable: true,
  writable: true,
});

console.log("\ndefineProperty :", city);

//method copies properties from one or more source objects to a target object.
const source = {
  firstName: "Bobby",
  lastName: "Upreti",
};
console.log("\nassign :", Object.assign(person, source));

const obj1 = {
  name: "Krupal",
};

const obj2 = Object.assign({}, obj1);
console.log(obj2);
obj2.name = "Bobby";
console.log(obj2);

//assign and create method create shallow copy
const parent = {
  greet: function (anmimal) {
    return console.log(`Hello ${anmimal}`);
  },
};

const child = Object.create(parent);
console.log("\ncreate :", Object.getPrototypeOf(child));

//only stop adding if new properties
const car_extension = { type: "sedan", model: "M5", color: "Black" };
Object.preventExtensions(car_extension);
console.log(
  "\npreventExtensions :",
  Object.isExtensible(car_extension),
  Object.isFrozen(car_extension),
  Object.isSealed(car_extension)
);
car_extension.type = "hatchback";
car_extension.company = "BMW";
delete car_extension.model;
console.log(car_extension);

//stop any changes in object
const car_frozen = { type: "sedan", model: "M5", color: "Black" };
Object.freeze(car_frozen);
console.log(
  "\nfreeze :",
  Object.isExtensible(car_frozen),
  Object.isFrozen(),
  Object.isSealed()
);
car_frozen.type = "hatchback";
car_frozen.company = "BMW";
delete car_frozen.model;
console.log(car_frozen);

//stop adding and deleting object
const car_seal = { type: "sedan", model: "M5", color: "Black" };
Object.seal(car_seal);
console.log(
  "\nseal :",
  Object.isExtensible(car_seal),
  Object.isFrozen(),
  Object.isSealed()
);
car_seal.type = "hatchback";
car_seal.company = "BMW";
delete car_seal.model;
console.log(car_seal);
