function switch_fun(name) {
  switch (name) {
    case "Jay":
      console.log("Interns in Benzinga");
      break;
    case "Krupal":
    case "Bobby":
      console.log("Interns in SocialPilot");
      break;
    case "Mihir":
      console.log("Interns in Parker");
    default:
      console.log("Not an  Interns");
  }
}

//normal case
console.log("Normal case");
switch_fun("Jay");

//if same thing is run on both the bellow case
console.log("\nCombined case");
switch_fun("Krupal");
switch_fun("Bobby");

//without break default is also going to run
console.log("\nMatching case without break");
switch_fun("Mihir");

//if no matching case default is going to run
console.log("\nNo matching case");
switch_fun("Shivam");
