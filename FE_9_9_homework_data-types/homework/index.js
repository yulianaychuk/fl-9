const one = 1;
const two = 2;
const three = 3;
const five = 5;
const eight = 8;
const seventeen = 17;

function findType(o){
    return typeof o;
}

function forEach(array,func){
    for(let i=0; i<array.length; i++){
        func(array[i]);
    }
}

function map(array,func){
    let arrRes = [];
    forEach(array,function(el){
        arrRes.push(func(el));
    });
    return arrRes;
}

function filter(array,func){
    let arrRes = [];
    forEach(array,function(el){
        if(func(el)){
        arrRes.push(el);
        }
    });
    return arrRes;
}

function getAdultAppleLovers(data){	
    return map(filter(data,(obj) => obj.age>seventeen && obj.eyeColor==='green'),(el) => el.name);
}

function keys(o){
    let arrRes=[];
    for (const key in o) {
        if(o.hasOwnProperty(key)){
            arrRes.push(key);
        }
    }
    return arrRes;
}

function values(o){
    let arrRes=[];
    for (const key in o) {
        if(o.hasOwnProperty(key)){
            arrRes.push(o[key]);
        }
    }
    return arrRes;
}

function showFormattedDate(date){
    let mShort = {month: 'short'};
    return `It is ${date.getDate()} of ${date.toLocaleString('en', mShort)}, ${date.getFullYear()}`;
}


alert(findType('number'));
alert(findType(null));

alert(forEach([two,five,eight], function(el) { 
	console.log(el)
    }
    )
);	

alert(map([two, five, eight], function(el) { 
	return el + three 
    }
    )
);

alert(filter([two, five, eight], function(el) { 
	return el > three 
    }
    )
);

alert(getAdultAppleLovers([
  {
    '_id': '5b5e3168c6bf40f2c1235cd6',
    'index': 0,
    'age': 39,
    'eyeColor': 'green',
    'name': 'Stein',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e3168e328c0d72e4f27d8',
    'index': 1,
    'age': 38,
    'eyeColor': 'blue',
    'name': 'Cortez',
    'favoriteFruit': 'strawberry'
  },
  {
    '_id': '5b5e3168cc79132b631c666a',
    'index': 2,
    'age': 2,
    'eyeColor': 'blue',
    'name': 'Suzette',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e31682093adcc6cd0dde5',
    'index': 3,
    'age': 17,
    'eyeColor': 'green',
    'name': 'Weiss',
    'favoriteFruit': 'banana'
  }
]
));

alert(keys({keyOne: one, keyTwo: two, keyThree: three}));

alert(values({keyOne: one, keyTwo: two, keyThree: three}));

alert(showFormattedDate(new Date('2018-08-27T01:10:00')));