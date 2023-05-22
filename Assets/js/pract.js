const product = [];
const arr1 = [12,6,4];
const arr2 = [1,2,3];
for(let i=0;i<=arr1.length;i++)
{
    product = arr1[i]*arr2[i]
    i++;
}
console.log(product);

// const product = [];
// const arr1 = [12, 6, 4];
// const arr2 = [1, 2, 3];

// for (let i = 0; i < arr1.length; i++) {
//   const prod = arr1[i] * arr2[i];
//   product.push(prod);
// }

// console.log(product);
// var res;

// const result = [];
// const arr3 = [12,6,4]
// const arr4 = [1,2,3]
// for(let i = 0; i<=arr3.length;i++)
// {
//   for(let j=0;j<=arr4.length;j++)
//   {
//      res = arr3[i]*arr4[j]
//     result.push(res) 
//   }
// }
// console.log(result)

// const str = ["hari","Ravi","Olive","Harsh"];
// const newname = [];
// const oldname = [];
// var add;
// for(let i = 0; i < str.length; i++)
// {
//   if(str[i].length < 5)
//   {
//     add = str[i]  + "Mr";
//     newname.push(add);
//   }
//   else {
//         oldname.push(str[i]);
//       }
// }

// const str = ["hari", "Ravi", "Olive", "Harsh"];
// const newname = [];
// const oldname = [];
// for (let i = 0; i <= str.length; i++) {
//   if (str[i].length < 5) {
//     add = str[i] + "Mr";
//     newname.push(add);
//   } else {
//     oldname.push(str[i]);
//   }
// }
// console.log(newname); // Output: ["hariMr", "OliveMr"]
// console.log(oldname); // Output: ["Ravi", "Harsh"]

// const str = ["hari", "Ravi", "Olive", "Harsh"];



// const newname = [];
// const oldname = [];

// for (let i = 0; i < str.length; i++) {
//   if (str[i].length < 5) {
//     add = str[i] + "Mr";
//     newname.push(add);
//   } else {
//     oldname.push(str[i]);
//   }
// }
// console.log(newname); // Output: ["hariMr", "RaviMr"]
//console.log(oldname); // Output: ["Olive", "Harsh"]

// const arr_test = [15,13,14,18,12,11];
// var a;
// for (let i = 0; i<=arr_test.length;i++)
// {
//   for(let j = i+1; j<arr_test.length;j++)
//   if(arr_test[i] > arr_test[j])
//   {
//      a = arr_test[i];
//      arr_test[i] = arr_test[j];
//      arr_test[j] = a;
// }

// }
// console.log(arr_test)

// const arr_test1 =[15,13,14,18,12,11];
// var a;
// for (let i = 0; i<=arr_test1.length;i++)
// {
//   for(let j = i+1; j<= arr_test1.length;j++){
//   if(arr_test1[i] > arr_test1[j])
// {
//   a=arr_test1[j];
// }
// else if(arr_test1[i] < arr_test1[j])
// {
//  b = arr_test1[j]
// }
// }
// }
// console.log(a)
// console.log(b)