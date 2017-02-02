// var Person = {
// 	name: "Tarif",
// 	age: 24
// };

// function passObj(obj){
// 	obj.age = 32;
// }

// passObj(Person);
// console.log(Person);

var nums = [1,2,3,4];

function passArray(x){

	nums.forEach(function (value, index){
		nums[index] = value * 2;
		debugger;
	});

}

passArray(nums);

console.log(nums);