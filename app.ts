// #ДЗ 

// 1) створити інтерфейс на основі цього объекта:
// Зверніть увагу там де масиви... в них може бути багато однотипних обїектів

// {
//     "mission_name": "Starlink-15 (v1.0)",
//     "launch_date_local": "2020-10-24T11:31:00-04:00",
//     "launch_site": {
//         "site_name_long": "Cape Canaveral Air Force Station Space Launch Complex 40"
//     },
//     "links": {
//         "article_link": "http://some.com",
//         "video_link": "https://youtu/J442-ti-Dhg"
//     },
//     "rocket": {
//         "rocket_name": "Falcon 9",
//         "first_stage": {
//             "cores": [
//                 {
//                     "flight": 7,
//                     "core": {
//                         "reuse_count": 6,
//                         "status": "unknown"
//                     }
//                 }
//             ]
//         },
//         "second_stage": {
//             "payloads": [
//                 {
//                     "payload_type": "Satellite",
//                     "payload_mass_kg": 15400,
//                     "payload_mass_lbs": 33951.2
//                 }
//             ]
//         }
//     }
// }
interface INasaMission {
    mission_name: string;
    launch_date_local: string;
    launch_site: Launchsite;
    links: Links;
    rocket: Rocket;
}

interface Rocket {
    rocket_name: string;
    first_stage: Firststage;
    second_stage: Secondstage;
}

interface Secondstage {
    payloads: Payload[];
}

interface Payload {
    payload_type: string;
    payload_mass_kg: number;
    payload_mass_lbs: number;
}

interface Firststage {
    cores: Core2[];
}

interface Core2 {
    flight: number;
    core: Core;
}

interface Core {
    reuse_count: number;
    status: string;
}

interface Links {
    article_link: string;
    video_link: string;
}

interface Launchsite {
    site_name_long: string;
}

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

class User {
    constructor(
        private name: string, 
        private age: number, 
        private gender: string
    ) {}

    incAge(someUser: User, inc: number) {
        someUser.age += inc
        return someUser
    }
}

const user = new User('Max', 18, 'male');

console.log(user.incAge(user, 5));

interface INumbersActions {
    sum: () => number;
    showSum: () => void;
}

class Numbers implements INumbersActions {
    constructor(public a: number, public b: number){};
    sum(): number {
        return this.a + this.b
    }
    showSum(): void {
        console.log(this.a + this.b);
    }
}

const numbers = new Numbers(3,9);

console.log(numbers.sum());
numbers.showSum()