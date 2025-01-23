this.global = "Gobal this declaration";
this.krupal = "Infinix is alive";

function declaration(calling) {
  console.log(`\nDeclaration :${calling} `, this);
  return this;
}

const expression = function (calling) {
  console.log(`\nExpression ${calling} :`, this);
  return this;
};

const arrow = (calling) => {
  console.log(`\nArrow ${calling} :`, this);
  return this;
};

// declaration("Global standlone call");
// expression("Global standlone call");
// arrow("Global standlone call");

const person = {
  firstName: "Krupal",
  middleName: "Ganeshbhai",
  lastName: "Patel",
  objMethod(calling) {
    console.log(`\nMethod ${calling} :`, this);
  },
  declaration,
  arrow,
  expression,
};

// person.declaration("Object property");
// person.arrow("Object property");
// person.expression("Object property");
// person.objMethod("Object inside method");

const funObject = {
  name: "Calling function inside object",
  declaration() {
    console.log("\nThis inside object method", this);
    declaration("Calling standlone inside method of object");
    person.declaration("Calling inside method of object as person property");
  },
  arrow() {
    console.log("\nThis inside object method", this);
    arrow("Calling standlone inside method of object");
    person.arrow("Calling inside method of object as person property");
  },
  expression() {
    console.log("\nThis inside object method", this);
    expression("Calling standlone inside method of object");
    person.expression("Calling inside method of object as person property");
  },

  nestedMethodObject() {
    const methodObject = {
      mOPD: declaration,
      mOPE: expression,
      mOPA: arrow,
    };

    methodObject.mOPD("object method's object's property");
    methodObject.mOPE("object method's object's property");
    methodObject.mOPA("object method's object's property");
  },

  nestedPropertyObject: () => {
    const propertyObject = {
      pOPD: declaration,
      pOPE: expression,
      pOPA: arrow,
    };

    propertyObject.pOPD("object properties's object's property");
    propertyObject.pOPE("object properties's object's property");
    propertyObject.pOPA("object properties's object's property");
  },

  nestesdMedthodCall: () => {
    // this.nestedPropertyObject();
    // this.nestedMethodObject();
    // funObject.nestedMethodObject();
    // funObject.nestedPropertyObject();
  },
};

// funObject.declaration();
// funObject.arrow();
// funObject.expression();
// funObject.nestedMethodObject();
// funObject.nestedPropertyObject();
// funObject.nestesdMedthodCall();

const onlyObjectNested = {
  l1: {
    l2: {
      l3: {
        l4: {
          l5: {
            arrow: () => {
              console.log("\nNested object arrow :", this);
            },
            method() {
              console.log("\nNested object method :", this);
            },
          },
        },
      },
    },
  },
};

onlyObjectNested.l1.l2.l3.l4.l5.arrow();
onlyObjectNested.l1.l2.l3.l4.l5.method();

const objectNestedWithFunction = {
  l1: {
    l2: {
      l3: {
        l4: {
          method() {
            const nestedObj = {
              arrow: () => {
                console.log("\nNested method arrow :", this);
              },
              method() {
                console.log("\nNested method method :", this);
              },
            };
            nestedObj.arrow();
            nestedObj.method();
          },

          checkNestedArrow() {
            const na = {
              na: () => {
                console.log("\nna", this);
                const nb = {
                  nb: () => {
                    console.log("\nnb", this);
                  },
                };
                nb.nb();
              },
            };
            na.na();
          },
        },
      },
    },
  },
};

objectNestedWithFunction.l1.l2.l3.l4.method();
objectNestedWithFunction.l1.l2.l3.l4.checkNestedArrow();
