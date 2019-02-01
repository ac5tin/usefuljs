# Useful JS functions
### List of functions that might be useful
### Some of them are copied from others


## removeA
returns item from array by value

## array_push 
Only push to array if value doesn't already exist
```javascript
array_push(arr,el);
```


## array_remove
Removes an element from array
```javascript
array_remove(array, element)
```


## replaceAll
String replace all
```javascript
replaceAll(str, find, replace)
```



## getDistFromBottom
Returns distance from bottom of page
```javascript
getDistFromBottom ()
```


## obj2arr
Converts object into array
```javascript
obj2arr(obj)
```


## form_validate
Validates input values and returns a boolean value
```javascript
form_validate('abc','text')
```


## validateEmail
validates email
```javascript
validateEmail('abc@foo.bar')
```


## isInt
Validate integer
```javascript
isInt(foobar)
```


## ajax
Ajax submit request using native fetch API
```javascript
ajax({url='/api/test'})
```

## time_in_minutes
String time to minutes in int format
```javascript
time_in_minutes(time)
```


## download
generate download file and start download 
```javascript
download(filename,content)
```


## arr_chunk
splits array into chunks of smaller arrays
```javascript
arr_chunk(arr,length)
```


## asyncForEach
async version of forEach
```javascript
asyncForEach(arr,callback)
```


## obj_sort
INFO: Pass this as a parameter to array.sort()
```javascript
arr.sort(obj_sort(sort_method_name))
```

## arr_rm
Remove element from array (similar to array_remove but instead doesn't return result)
```javascript
arr_rm(arr,element)
```


## uuidv4
generates uuidv4
```javascript
uuidv4()
```


## shortuid
generate short uid
```javascript
shortuid();
```

## readFile
File Reader with callback
```javascript
readFile(file, callback)
```


## readFile_content
read file content as text
```javascript
readFile_content(file);
```



## getSiblings
get array of siblings of an element
```javascript
getSiblings(element)
```


## obj_prop_rename
Renames an object property
```javascript
obj_prop_rename(obj,oldname,newname)
```
