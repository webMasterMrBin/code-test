// 123456789 => '1,234,567,891'

const target = '1234567891';
// '123,456,789,1'

/// [1,2,3,4,5,6,7,8,9] => [[1,2, 3], 
// for (let index = 0; index < target.length / 3; index++) {
//   console.log(target.substring(index * 3, index * 3 + 3));
  
// }
const result = []
for (let index = 0; index < target.length; index++) {
  if (index > 0 && index % 3 === 0) { 
    result.push(',')
    
  }
  result.push(target[index]);
  
}
console.log(result.join(''));