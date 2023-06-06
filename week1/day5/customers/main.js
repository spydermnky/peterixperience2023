//CLASSES

class Person {
    constructor(firstName, lastName, age, address, phoneNumber){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    fullName(){
        return `Full name: ${this.firstName} ${this.lastName}`;
    }
    sayHello(){
        return `Good morning ${this.firstName} ${this.lastName}`;
    }
    addTwoNumbers(num1,num2){
        return `Result: ${num1 + num2}`;
    }
}

const peter = new Person('Peter','Parker',19,'Yeet st','15289');

//console.log(peter);
//console.log(peter.fullName());
//console.log(peter.sayHello());
//console.log(peter.addTwoNumbers(10,5));

//INHERITANCE

class Customer extends Person {
    constructor(
        firstName,
        lastName,
        age,
        address,
        phoneNumber,
        dob,
        membershipType
    ){
        //When we instantiate a Customer, we want to call the parent
        //constructor
        super(firstName, lastName, age, address, phoneNumber);
        
        this.dob = dob;
        this.membershipType = membershipType;
    }
    //Static function is not available on an instance
    //Something that applies to all instances
    //Membership costs 500
    static getMembershipCost() {
        let cost = 500;
        return `Membership costs: ${cost}`;
    }
    getMembershipType() {
        return `${this.membershipType} membership`;
    }
}

//Only available on the Object class
console.log(Customer.getMembershipCost());

const jamie = new Customer(
    'Jamie',
    'Finnegan',
    25,
    '7 Murray Avenue',
    '129083',
    '11/03/1996',
    'Premium'
);

console.log(jamie);
console.log(jamie.fullName());
console.log(jamie.sayHello());
console.log(jamie.getMembershipType());

const lily = new Customer(
    'Lily',
    'Ranger',
    77,
    '88 Holy Street',
    '011 425 2783',
    '02/02/1943',
    'Medallion'
);

console.log(lily);
console.log(lily.fullName());
console.log(lily.sayHello());
console.log(lily.getMembershipType());

let customers = [];
customers.push(jamie);
customers.push(lily);
console.log(customers);

class UI {
    constructor(){
        this.tableBody = document.getElementById('table-body');
    }

    renderCustomers() {
        this.tableBody.innerHTML = [];

        for(let i = 0; i < customers.length; i++){
            const tr = document.createElement('tr');
            
            let firstName = document.createElement('td');
            let lastName = document.createElement('td');
            let age = document.createElement('td');
            let address = document.createElement('td');
            let phoneNumber = document.createElement('td');
            let dob = document.createElement('td');
            let membershipType = document.createElement('td');

            firstName.innerHTML = customers[i].firstName;
            lastName.innerHTML = customers[i].lastName;
            age.innerHTML = customers[i].age
            address.innerHTML = customers[i].address;
            phoneNumber.innerHTML = customers[i].phoneNumber;
            dob.innerHTML = customers[i].dob;
            membershipType.innerHTML = customers[i].membershipType;

            tr.appendChild(firstName);
            tr.appendChild(lastName);
            tr.appendChild(age);
            tr.appendChild(address);
            tr.appendChild(phoneNumber);
            tr.appendChild(dob);
            tr.appendChild(membershipType);

            this.tableBody.appendChild(tr);
        }
    }
}

const ui = new UI();
ui.renderCustomers();