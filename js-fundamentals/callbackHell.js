const step1 = (callback) => {
  setTimeout(() => {
    console.log("Step 1");
    callback();
  }, 2000);
};

const step2 = (callback) => {
  setTimeout(() => {
    console.log("Step 2");
    callback();
  }, 1000);
};

const step3 = (callback) => {
  setTimeout(() => {
    console.log("Step 3");
    callback();
  }, 1500);
};

step1(() => {
  step2(() => {
    step3(() => {
      console.log("Done all the callbacks");
    });
  });
});

//solution of above to write it in more readable way

const stepPromise1 = () => {
  return new Promise((res) => {
    console.log("Promise 1 registered");
    setTimeout(() => {
      console.log("Promise Step 1");
      res("1");
    }, 2000);
  });
};

const stepPromise2 = () => {
  return new Promise((res) => {
    console.log("Promise 2 registered");
    setTimeout(() => {
      console.log("Promise Step 2");
      res("2");
    }, 1000);
  });
};

const stepPromise3 = () => {
  return new Promise((res) => {
    console.log("Promise 3 registered");
    setTimeout(() => {
      console.log("Promise Step 3");
      res("3");
    }, 1500);
  });
};

stepPromise1().then(stepPromise2).then(stepPromise3).then(console.log);
