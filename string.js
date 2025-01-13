const firstName = "Krupal";
const middleName = "Ganeshbhai";
const lastName = "Patel";
const text =
  "This is string method is search and main advantage we can also use regx here";

console.log(`length :${firstName.length}\n`);

//string seacrh methods

//return the first occurance of the substring in the string or if not found then return -1
console.log(`indexOf :${middleName.indexOf("hb")}`);
console.log(`indexOf with position parameter :${middleName.indexOf("a", 2)}`);
console.log(`indexOf element not found :${middleName.indexOf("x")}\n`);

//return the last occurance of the substring in the string or if not found then return -1
console.log(`lastIndexOf :${middleName.lastIndexOf("hb")}`);
console.log(
  `indexOf with position parameter :${middleName.lastIndexOf("a", 2)}`
);
console.log(`indexOf element not found :${middleName.lastIndexOf("x")}\n`);

//we can also add here  RegEx in search but it lacks start position
console.log(`search :${text.search("main")}`);
console.log(`search RegEx :${text.search(/[i]/)}\n`);

//case sensitive
console.log(`includes :${text.includes("also")}`);
console.log(`includes :${text.includes("k")}\n`);

//return elemet at give index if not found return undefined
//negative index start form back
// at and charAt are same at introduced in ES2022
console.log(`at :${lastName.at(2)}`);
console.log(`at negavite index :${lastName.at(-1)}`);
console.log(`at irrevelent index :${lastName.at(5)}\n`);

//return char code between (0 and 65535)
//return NaN if char in not in range
console.log(`charCodeAt :${lastName.charCodeAt(2)}`);
console.log(`charCodeAt irrevelent index :${lastName.charCodeAt(5)}\n`);

//find in original string and replace and retrun new string
const fullname = "Krupal Ganeshbhai Patel";
console.log(`replace :${fullname.replace(/krupal/gi, "Praharsh")}\n`);

//Extracting string parts

//negative splits strign from back and return new string
console.log(`slice :${firstName.slice(2, 4)}`);
console.log(`slice negative index :${firstName.slice(-5, -3)}\n`);

//here negative index is replace with 0
console.log(`substring :${firstName.substring(2, 4)}`);
console.log(`substring negative index:${firstName.substring(-4, 3)}\n`);

//conversion of string case
console.log(`toUpperCase :${firstName.toUpperCase()}`);
console.log(`toLoaclUpperCase :${firstName.toLowerCase()}\n`);

console.log(`concate :${firstName.concat(" ", lastName)}\n`);

const trimText = "   Krupal   ";
console.log(`trim :${trimText.trim()}`);
console.log(`trimStart :${trimText.trimStart()}`);
console.log(`trimEnd :${trimText.trimEnd()}\n`);

console.log(`split :${fullname.split(" ")}`);
