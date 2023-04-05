// #ДЗ 
// ---------------------------------------------------------------------------—————————
// 2) протипізувати функції:
// const user = {
//     name:"Max",
//     age:18,
//     gender:'male'
// }
// function sum(a,b){
//     return a+b
// }
// function showSum(a,b){
//     console.log(a + b);
// }
// function incAge(someUser, inc){
//     someUser.age+=inc
//     return someUser
// }
// console.log(sum(1, 2));
// showSum(2,3)
// incAge(user, 2)
var User = /** @class */ (function () {
    function User(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    User.prototype.incAge = function (someUser, inc) {
        someUser.age += inc;
        return someUser;
    };
    return User;
}());
var user = new User('Max', 18, 'male');
console.log(user.incAge(user, 5));
var Numbers = /** @class */ (function () {
    function Numbers(a, b) {
        this.a = a;
        this.b = b;
    }
    ;
    Numbers.prototype.sum = function () {
        return this.a + this.b;
    };
    Numbers.prototype.showSum = function () {
        console.log(this.a + this.b);
    };
    return Numbers;
}());
var numbers = new Numbers(3, 9);
console.log(numbers.sum());
numbers.showSum();
