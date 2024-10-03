//type conversion or coercion

console.log("20" +5); //205 -string concatination
console.log("20" -5); //15  -coverted to integer (bcoz sting-integer act as [integer-integer])
console.log("20" *5); //100
console.log("20" *5); //4

console.log(true +1); //2
console.log(Number("42")); //42
console.log(Number("Hello"));  //NaN -not a number

console.log(typeof String(123)); //"123"  -string
console.log(String(true));   //true   -string

console.log(Boolean(0));  //false
console.log(Boolean('')); //false
console.log(Boolean(0));  //true

console.log(parseInt("15.99"));  //15
console.log(parseFloat("3.14"));  //3.14
