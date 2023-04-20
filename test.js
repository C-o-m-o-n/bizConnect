function reverseString(str) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return str.split("").reverse().join("");
}

console.log(reverseString(readline()))
