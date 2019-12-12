/** removes item from array by value
 * @param {array} arr
 * @param {element} element
 * @returns {array} array
 */
function removeA(arr){
    let what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}


/** TODO
// regex match text against array of keywords
const contains_kw = expression =>{
    // make everything uppercase first (easier to match)
    const kws = (!skw || !skw.length) ? keywords.map(k => k.value.toUpperCase()) : skw.map(s => keywords[s].value.toUpperCase());
    // if expression contains any of the keywords return true
    const re = new RegExp(kws.map(k => "\\b" + k).join("|"),"g");// format -> /\bkeyword0|\bkeyword1|\bkeyword2/g
    return re.exec(expression.toUpperCase());
}
 */


/** escape double quotes in string
 * @param {string} str target string
 * returns {string}
 * source : (https://gist.github.com/getify/3667624)
 */
const escape_dq = str => str.replace(/\\([\s\S])|("|')/g,"\\$1$2"); // thanks @slevithan!

/** escape HTML string
 * @param {string} html_str HTML string
 * reurns {string}
 * source : {https://www.w3resource.com/javascript-exercises/javascript-string-exercise-19.php}
 */
const escape_HTML = html_str =>{
    return html_str.replace(/[&<>"]/g, function (tag) {
        const chars_to_replace = {
            '&': '&',
            '<': '<',
            '>': '>',
            '"': '"'
        };
        return chars_to_replace[tag] || tag;
    });
}


/** difference(delta) between 2 objects
  * @param {object} v1 first object
  * @param {object} v2 second object
  * return {array}
  * source : (https://stackoverflow.com/questions/22108837/get-the-delta-of-two-javascript-objects) :by blackcatweb
  */
const diffObjs = (v1, v2)=>{

    // return NULL when passed references to
    // the same objects or matching scalar values
    if (v1 === v2) {
        return null;
    }
    let cloneIt = function(v) {
        if (v == null || typeof v != 'object') {
            return v;
        }

        let isArray = Array.isArray(v);

        let obj = isArray ? [] : {};
        if (!isArray) {
            // handles function, etc
            Object.assign({}, v);
        }

        for (let i in v) {
            obj[i] = cloneIt(v[i]);
        }

        return obj;
    }

    // different types or array compared to non-array
    if (typeof v1 != typeof v2 || Array.isArray(v1) != Array.isArray(v2)) {
        return [cloneIt(v1), cloneIt(v2)];
    }

    // different scalars (no cloning needed)
    if (typeof v1 != 'object' && v1 !== v2) {
        return [v1, v2];
    }

    // one is null, the other isn't
    // (if they were both null, the '===' comparison
    // above would not have allowed us here)
    if (v1 == null || v2 == null) {
        return [cloneIt(v1), cloneIt(v2)]; 
    }

    // We have two objects or two arrays to compare.
    let isArray = Array.isArray(v1);

    let left = isArray ? [] : {};
    let right = isArray ? [] : {};

    for (let i in v1) {
        if (!v2.hasOwnProperty(i)) {
            left[i] = cloneIt(v1[i]);
        } else {
            let sub_diff = diffObjs(v1[i], v2[i]);
            // copy the differences between the 
            // two objects into the results.
            // - If the object is array, use 'null'
            //   to indicate the two corresponding elements
            //   match.
            //
            // - If the object is not an array, copy only
            //   the members that point to an unmatched
            //   object.
            if (isArray || sub_diff) { 
                left[i] = sub_diff ? cloneIt(sub_diff[0]) : null;
                right[i] = sub_diff ? cloneIt(sub_diff[1]) : null;
            }
        }
    }

    for (let i in v2) {
        if (!v1.hasOwnProperty(i)) {
            right[i] = cloneIt(v2[i]);
        }
    }

    return [ left, right];
};




/*
 * @param {array} arr array
 * @returns {any} last element in array
 */
const arr_last = arr => arr[arr.length - 1];

/** adds element to beginning of array and returns the array
 * @param {element} value 
 * @param {array} array
 */
const prepend = (value, array)=>{
    let newArray = array.slice();
    newArray.unshift(value);
    return newArray;
}


/** convert bytes to human readable sizes
 * @param {number} a bytes
 * @param {number} b number of decimals
 * @return {string} 
 * source: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 */
const formatBytes = (a,b) =>{if(0==a)return"0 Bytes";let c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]};




/** only push to array if value doesn't exist already
 * @param {array} array
 * @param {element} element
 */
const array_push = (arr,el)=>{
    if(!arr.includes(el)){
        arr.push(el);
    }
}


/** remove an element from array
 * @param {Array} array
 * @param {element} element
 */
function array_remove(array, element) {
    return array.filter(e => e !== element);
}


/** removes array duplicates
 * @param {array} array
 * @return {array}
 * source: (https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c)
 */
const arr_dedup = arr => arr.filter((item,index) => arr.indexOf(item) === index);



/** replace all 
 * @param {string} str
 * @param {string} find
 * @param {string} replace
 * @returns {string}
*/
const replaceAll = (str, find, replace)=>{
    return str.replace(new RegExp(find, 'g'), replace);
}




/** return distance from bottom of page 
 * @param {element} element html div element
 * @returns {number}
*/
const getDistFromBottom = (element=null) =>{
    if(element){
        return element.scrollTop  - (element.scrollHeight - element.offsetHeight);
    }else{
        const scrollPosition = window.pageYOffset;
        const windowSize = window.innerHeight;
        const bodyHeight = document.body.offsetHeight;
        return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
    }
    
}


/** converts object into array
 * @param {Object} obj
 * @returns {array}
 */
const obj2arr = obj=>{
    let tmp = [];
    Object.keys(obj).forEach(val=>{
        tmp.push(obj[val]);
    })
    return tmp;
}



/** validates input values
 * @param {string} value
 * @param {string} type (text / password / email / int)
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @param {number} length minimum lenght of the input value (default value = 6)
 * @returns {boolean}
 */
const form_validate = (value,type,min=null,max=null,length=6)=>{
    // check length first
    value = value.trim();
    
    switch(type){
        case 'text':
        case 'password':
            if(value.length < length)return false;
            return true;
        case 'email':
            return validateEmail(value);
        case 'int':
            // first check if value is integer
            if(isInt(value)){
                // now check if contains min/max
                if(min !== null && value < min)return false;
                if(max !== null && value > max)return false;
                return true;
            }
            else{return false;}
        default:
            return false;
    }
}


/** validates email
 * @param {string} email
 * @returns {boolean}
 */
const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


/** validate integer
 * @param {number} value
 * @returns {boolean}
 */
const isInt = value =>{
    let x;
    return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
}


/** check if string contains numbers only
 * @param {string} value
 * @returns {boolean}
 * source: {https://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits}
 */
const isNum = value => /^\d+$/.test(value);



/** ajax submit request using native fetch API 
 * @param {Object} arguments
 * @param {string} arguments.method GET or POST
 * @param {string} arguments.url url
 * @param {Object} arguments.data data
 * @param {Object} arguments.signal
 * @param {object} arguments.headers additional headers
 * @param {boolean arguments.cors enable CORS (default is unset)
 * @param {Object} arguments.formdata Form data (default is null)
 */
const ajax = async({method='GET',url=null,data=null,signal=null,headers={}, cors=null , formdata=null, fetcher=null }) =>{
    try{
        if(!fetcher)fetcher = fetch;
		method = method.toUpperCase();
        const reqBody = {
            method: method.toUpperCase()
        };
        if(method === "POST" || method === "PUT"){
            reqBody.body = JSON.stringify(data);
            reqBody.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
        }
        if(method === "GET" && data){
            // append each item to end of url
            url += '?';
            //Object.keys(data).forEach(key => url += key+'='+data[key]+'&');

            let props_appended = 0;
            const all_props_length = Object.keys(data).length;
            Object.keys(data).forEach(key => {
                url += key+'='+data[key];
                props_appended ++;
                if(props_appended < all_props_length)url+= '&';
            })
        }
        
        
        // additonal headers
        reqBody.headers = {...reqBody.headers,...headers}
        
        // IF form data
        if(formdata){
            delete reqBody.headers;
            reqBody.body = formdata;
        }
        
        // cors
        if(cors !== null)reqBody.mode = cors ? 'cors' : 'no-cors';
        
        // if abort signal present, attach it to body
        if(signal){
            reqBody.signal = signal
        }
        const res = await fetcher(url,reqBody);
    
        const content = await res.json();
        return content;
    }catch(err){console.log(err);throw err}
    
}






/** string time to minutes in int format
 * @param {string} time (hh:mm:ss)
 * @returns {number}
 */
const time_in_minutes = time =>{
    time = String(time);
    if(time.split(":").length !== 3){
        return 0;
    }
    const h = parseInt(time.split(":")[0]);
    let m = parseInt(time.split(":")[1]);
    const s = parseInt(time.split(":")[2]);

    m += h*60;
    m += s >=30 ? 1 : 0;

    return m;
}



/** split array into chunks of smaller arrays
 * @param {array} arr
 * @param {number} length
 * @returns {array}
 */
const arr_chunk = (arr,length)=>{
    let retMe = [];
    for(let i=0;i<arr.length;i+=length){
        retMe.push(arr.slice(i,i+length));
    }
    return retMe;
}

/** async for each
 * @param {array} arr
 * @param {function} callback
 * !sauce: https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
 */
const asyncForEach = async (arr,callback)=>{
    for(let i=0;i< arr.length;i++){
        await callback(arr[i],i,arr);
    }
}


/** sort array of object by object property value
 * Supply this as the parameter of the array.sort() function 
 * @param {string} name property name
 * @param {boolean} length sort by length
 * @param {boolean} reverse reverse sort
 * @returns {function} compare function
 */
const obj_sort = (name,length=false,reverse=false) =>{
    const sort_order = reverse ? -1 : 1;

    return (a,b)=>{
        const res = length ? (a[name].length < b[name].length) ? -1 : (a[name].length > b[name].length) ? 1 : 0  : (a[name] < b[name]) ? -1 : (a[name] > b[name]) ? 1 : 0;
        return res * sort_order;
    }
}



/** remove an element from array
 * @param {array} arr
 * @param {element} element
 * @param {boolean} mutate (true by default)
 * @return {array} if mutate is false
 */
const arr_rm = (arr,element,mutate=true) =>{
    if(!mutate)return arr.filter(x => x!== element);
    arr.splice(arr.indexOf(element),1);
}



/** remove an element from array by index
 * @param {array} arr
 * @param {number} index
 * @param {mutate} mutate (true by default)
 * @return {array} if mutate is false
 */
const arr_rmi = (arr,index=0,mutate=true)=>{
    if(!mutate)return arr.slice(0, index).concat(arr.slice(index+1, arr.length));
    arr.splice(index,1);
}




/** generates unique id 
 * @returns {string} unique id
*/
const uuidv4 = ()=>{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c=> {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}


/** generates unique id */
const unique_id = ()=>(
	Math.random().toString(36).substr(2, 9)
);


/** generate short uid 
 * @returns {string} unique id
*/
const shortuid = ()=> {
    let firstPart = (Math.random() * 46656) | 0;
    let secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

/** find matching values in 2 different arrays
 * @param {array} array0
 * @param {array} array1
 */
const matching_array = (ar0,ar1)=>{
    let retMe = []; //return this array at the end
    ar0.forEach(x=>{
        if(ar1.includes(x)){
            retMe.push(x);
        }
    });
    return retMe;
}








/** changes property name of an object
 * @param {Object} obj
 * @param {string} oldName property name
 * @param {string} newName property name
 * @returns {Object} new object with new property name
 */
const obj_prop_rename = (obj,oldName,newName)=>{
	if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
    }
    return obj;
}





/**
 * filters object
 * @param {object} obj 
 * @param {function} predicate 
 * @returns {object} 
 */
const obj_filter = (obj,predicate)=>{
    const list = {};
    Object.keys(obj).forEach(each => {
        const o = obj[each];
        if(predicate(o))list[each] = o;
    });
    return list;
}


/**
 * filters object by key
 * @param {object} obj 
 * @param {function} predicate 
 * @returns {object} 
 */
const obj_key_filter = (obj,predicate)=>{
	const list = {};
	Object.keys(obj).forEach(each =>{
		if(predicate(each))list[each] = obj[each];
	});
	return list;
}




/** uppercase first letter 
  * @param {string} text input string
  * @returns {string}
*/
const ucfirst = text =>(
    text.charAt(0).toUpperCase() + text.substring(1)
)





/** converts array of objects into big object
 * @param {array} arr input array
 * @param {string} keyname key name of each object
 * @returns {object}
 */
const arr2Obj = (arr,keyname) =>{
	const retme = {};
	arr.forEach(a => {
		retme[a[keyname]] = {...a};
		delete retme[a[keyname]][keyname]
	});
	return retme;
}


/** pause 
  * @param {number} milliseconds
*/
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/** filter out empty NaN values from array 
 * @param { array } input_array
 * @returns array
*/
const f_arr = test_array =>{
    let index = -1;
    const arr_length = test_array ? test_array.length : 0;
    let resIndex = -1;
    const result = [];

    while (++index < arr_length) {
        const value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}



/** Random Colour hex code Generator
 * @return { string }
 * source: {https://gomakethings.com/how-to-generate-a-random-color-with-vanilla-js/}
 */
const colourgen = ()=> {
	// The available hex options
	const hex = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	let colour = '#';
    const shuffle = array => {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

	// Create a six-digit hex colour
	for (let i = 0; i < 6; i++) {

		// Shuffle the hex values
		shuffle(hex);

		// Append first hex value to the string
		colour += hex[0];

	}

	// Return the color string
	return colour;

};

/** generate random integer from range
  * @param { number } low
  * @param { number } high\
  * @return { number }
  * source: {https://stackoverflow.com/questions/33609404/node-js-how-to-generate-random-numbers-in-specific-range-using-crypto-randomby}
  */
const intgen = (low,high)=> Math.floor(Math.random() * (high+1 - low) + low);

module.exports = {
    removeA, arr_last, prepend, array_push, array_remove,
    replaceAll, getDistFromBottom, obj2arr, form_validate, validateEmail,
    isInt, ajax, time_in_minutes, arr_chunk, asyncForEach, obj_sort,
    arr_rm, uuidv4, shortuid, matching_array, obj_prop_rename, obj_filter,
    obj_key_filter, ucfirst, arr2Obj, sleep , f_arr , arr_rmi,escape_dq, 
    formatBytes, diffObjs,escape_HTML,arr_dedup,isNum,colourgen,intgen
}