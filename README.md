# Useful JS functions
### List of functions that might be useful
### Some of them are copied from others

### install
```
yarn add usefuljs --use-pnp 
```

### import
```javascript
import { ajax , arr_last } from 'usefuljs' // react

import { ajax } from "usefuljs/useful.modern.js" // svelte


// install node fetch first on nodejs
global.fetch = require("node-fetch") // if using node.js
const { ajax } = require("usefuljs") // node.js
```


## ajax
Perform ajax request using the native fetch API
### parameters
```
method : default = GET
url
data : (if using post or put method)
signal : AbortController().signal (optional)
headers : additional headers in Object format (optional)
cors : enable or disabled cors (boolean) (optional)
formdata : form data object (optional),if set to true, data object is ignored
fetcher : custom fetch (optional)
json : parse response as json (option), by default set to true
```
### get request
```javascript
ajax({url:'/api/users/list'}).then(res => console.log(res));
```
### post request
```javascript
ajax({
        method:'POST',
        url:'/api/users/create',
        data:{ username:'austin',password:'abcdef'}
    }).then(res => console.log(res));
```

### additional headers
``` javascript
ajax({
    method:'post',
    url:'/api/verify',
    heades: {token: "abc123"},
    data: { username: "testuser"}
})
```

### abort controller signal
```javascript
const controller = new AbortController();
const signal = this.controller.signal;
ajax({url:'/api/test',signal});

// -- when u want to abort the ajax requet --
controller.abort();
```


### sapper preload fetch
```javascript
ajax({fetcher: this.fetch})
```


## ajaxhr
Same as ajax but uses xhr API instead of fetch API + doesn't have the signal parameter



## arr_last
Returns last element from an array
```javascript
arr_last(array)
```


## arr_rm
Removes an element from an array (by value)
```javascript
arr_rm(arr,elem)
```
### optional 3rd parameter (mutate)
By default mutate is set to true
If set to false, array will be returned instead of mutating the original array
```javascript
arr_rm(arr,elem,false)
```



## arr_rmi
Removes an element from an array (by index)
```javascript
arr_rm(arr,index)
```
### optional 3rd parameter (mutate)
By default mutate is set to true
If set to false, array will be returned instead of mutating the original array
```javascript
arr_rm(arr,index,false)
```


## array_push
Similar to the php array_push method, it adds new element to array (if value doesn't exist in array)
```javascript
array_push(arr,"foo")
```


## formatBytes
### Parameters
```
bytes (int)
decimal places (int)
```
Bytes to human readable string
```javascript
formatBytes(1024)
// returns "1 KB"
formatBytes(3241234,3)
// returns "3.091 MB"
```



## diffObjs
Delta/Difference between 2 objects
```javascript
let a = {x: 123,y:456,c:999}
let b = {x: 123,y:222,c:888}
diffObjs(a,b)
// returns [{y:456,c:999},{y:222,c:888}]
```


## prepend
Add an element to the beginning of an array
```javascript
prepend("foo",array)
```


## arr_dedup
Deduplicates array 
```javascript
arr_dedup([2,3,4,4,2,5,5]);
// returns [2, 3, 4, 5]
```


## replaceAll
Replaces all matches in a string
```javascript
replaceAll(string1,'find','replace')
```


## getDistFromBottom
Get distance from bottom of the page
```javascript
getDistFromBottom()
```


## obj2arr
Object into array
```javascript
const a = {a:"123",b:"456",c:"789"};
obj2arr(a); // <-- this returns : ["123","456","789"]
```


## isInt
Is the value an integer (parses string too)
```javascript
isInt("1") // true
isInt(1)  // true
isInt("1cd") // false
```


## isNum
Does the string contain numbers only
```javascript
isNum("222") // true
isNum("222/22")  //false
```

## arr_chunk
split array into chunks of smaller arrays
```javascript
arr_chunk([1,2,3,4,5,6],2); // <-- returns 3 arrays : [1,2] , [3,4] , [5,6]
arr_chunk([1,2,3,4,5,6],3); // <-- returns 2 arrays: [1,2,3] , [4,5,6]
```

## asyncForEach
Async version of foreach
```javascript
await asyncForEach(arr, x => console.log(x))
```


## obj_sort
sort array of object by object property value
* Supply this as the parameter of the array.sort() function *

### parameters
```
name : key name
length : sort by length   boolean (default = false)
reverse: boolean (default = false)
```

```javascript
const a = [{number:1}, {number:2}];
a.sort(obj_sort('number',false,true)); // <- returns [{number:2}, {number:1}]
```


## uuidv4
generates uuidv4
```javascript
uuidv4();
```


## unique_id
generates a uid
```javascript
unique_id()
```


## shortuid
generates a short uid
```javascript
shortuid()
```


## matching_array
Find all matching values in 2 arrays
```javascript
const a = [1,2,3];
const b = [4,5,6];
const c = [1,2,3];

matching_array(a,b); // returns []
matching_array(a,c); // returns [1,2,3]
```


## obj_prop_rename
Change property name of an object
```javascript
obj_prop_rename(obj,'old','new')
```


## obj_filter
Filters an object
```javascript
obj_filter(obj, x => x === 'abc');
```

## obj_key_filter
Filters an object by key name
```javascript
obj_key_filter(obj, x => x === 'name');
```


## ucfirst
Upper case first letter
```javascript
ucfirst('foobar'); // returns Foobar
```

## sleep
Pauses
```javascript
sleep(1000); // <-- sleep for 1000 miliseconds
```


## f_arr
Filter out empty/NaN elements in array
```javascript
f_arr(['a',NaN,22,null]); // returns ["a", 22]
```



## escape_dq
Escape Double Quotes
```javascript
const newstring = escape_dq(oldstring);
```



## escape_HTML
Escape HTML
```javascript
const escaped = escape_HTML(html);
```


## colourgen
Generate random colour hexcode
```javascript
const colour = colourgen();
```


## intgen
Generate random number integer from range
```javascript
intgen(1,5); // returns a random number from 1 to 5
```


## arrobj2objarr
Converts array of object to object of arrays
```javascript
arrobj2objarr([{a:1,b:2,c:3},{a:5,b:2,c:9}]); // { a:[1,5] , b:[2,2] , c:[3,9] }
```

## arrobj2obj
Converts an array of object to a big object (user specify the column to be used as key)
```javascript
arrobj2obj([{a:1,b:2,c:3},{a:5,b:2,c:9}],"a"); // { 1: {a:1,b:2,c:3}, 5: {a:5,b:2,c:9} }
```