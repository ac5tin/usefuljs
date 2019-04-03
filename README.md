# Useful JS functions
### List of functions that might be useful
### Some of them are copied from others

### install
```
yarn add usefuljs --use-pnp 
```

### import
```javascript
import { ajax , arr_last } from 'usefuljs'
```


## ajax
Perform ajax request using the native fetch API
### parameters
```
method : default = GET
url
data : (if using post or put method)
signal : AbortController().signal (optional)
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

## ajaxhr
Same as ajax but uses xhr API instead of fetch API + doesn't have the signal parameter



## arr_last
Returns last element from an array
```javascript
arr_last(array)
```

## array_push
Similar to the php array_push method, it adds new element to array (if value doesn't exist in array)
```javascript
array_push(arr,"foo")
```



## prepend
Add an element to the beginning of an array
```javascript
prepend("foo",array)
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
