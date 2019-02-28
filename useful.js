/* dependencies: jquery
 * =====================================
 */

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


/** only push to array if value doesn't exist already
 * @param {array} array
 * @param {element} element
 */
const array_push = (arr,el)=>{
    if(!arr.includes(el) && el){
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



/** detailed input values validation (more verbose version of form_validate) */
const form_validate_v = (value,type,min=null,max=null,length=6)=>{
    value = value.trim();
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


/** send an ajax request to api endpoint
 * @param {string} api_endpoint
 * @param {Object} param
 * @returns {Object} response json
 */
const fetch_data = async(api_endpoint,param = {})=>{
    try{
        const res = await $.get(api_endpoint,param);
        return await res;
    }catch(err){console.log(err);return null}
}


/** send an ajax post request to api endpoint (requires jQuery)
 * @param {string} api_endpoint
 * @param {Object} param
 * @returns {Object} response json
 */
const post_data = async(api_endpoint,param = {})=>{
    try{
        const res = await $.post(api_endpoint,param);
        return await res;
    }catch(err){console.log(err);return null}
}


/** ajax submit request using native fetch API 
 * @param {Object} arguments
 * @param {string} arguments.method GET or POST
 * @param {string} arguments.url url
 * @param {Object} arguments.data data
 */
const ajax = async({method='GET',url=null,data=null}) =>{
    try{
        const reqBody = {
            method: method.toUpperCase()
        };
        if(method === "POST"){
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

        const res = await fetch(url,reqBody);
    
        const content = await res.json();
        return content;
    }catch(err){console.log(err);return {result:'error'}}
    
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



/** generate download file and start download
 * @param {string} filename
 * @param {string} text file content
 */
const download = (filename, text)=>{
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
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
 */
const arr_rm = (arr,element) =>{
    arr.splice(arr.indexOf(element),1);
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





/** file reader with callback
 * @param {file} file
 * @param {function} onLoadCallback
 */
const readFile =(file, onLoadCallback)=>{
    const reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsText(file);
}




/** returns file content as text
 * @param {file} inputFile
 * @returns {string} text content
 */
const readFile_content = inputFile => {
    const temporaryFileReader = new FileReader();
  
    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };
  
        temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsText(inputFile);
    });
};


/** returns array of siblings of an element 
 * @param {element} elem
 * @returns {array} siblings
*/
const getSiblings = elem=> {
	let siblings = [];
	let sibling = elem.parentNode.firstChild;
	for (; sibling; sibling = sibling.nextSibling) {
		if (sibling.nodeType !== 1 || sibling === elem) continue;
		siblings.push(sibling);
	}
	return siblings;
};



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




/** ajax submit request using xhr API 
 * @param {Object} arguments
 * @param {string} arguments.method GET or POST
 * @param {string} arguments.url url
 * @param {Object} arguments.data data
 */
const ajaxhr = async({method='GET',url=null,data=null})=>{
    try{
        method = method.toUpperCase();
        const reqBody = {
            method: method.toUpperCase()
        };
        if(method === "POST"){
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

        // create new xhr instance
		return new Promise((resolve,reject)=>{
			const xhr = new XMLHttpRequest();
			xhr.open(method,url,true);
			xhr.setRequestHeader("Content-Type","application/json");
			
			/*
			xhr.onreadystatechange = ()=>{
				// Only run if the request is complete
				if (xhr.readyState !== 4) return;
				// Process our return data
				if (xhr.status >= 200 && xhr.status < 300) {
					// What do when the request is successful
					return resolve(JSON.parse(xhr.responseText));
				} else {
					// What to do when the request has failed
					return reject(JSON.parse(xhr.response));
				}
			
			};
			*/
			xhr.onload = ()=>{
				if (this.status >= 200 && this.status < 300){
					resolve(JSON.parse(xhr.responseText));
				}else{
					reject(JSON.parse(xhr.responseText));
				}
			}
			
			xhr.onerror = ()=> reject(JSON.parse(xhr.responseText));
			
			
			
			xhr.send(reqBody.body);
		})
        

    }catch(err){console.log(err);return {result:'error'}}
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
arr2Obj = (arr,keyname) =>{
	const retme = {};
	arr.forEach(a => {
		retme[a[keyname]] = {...a};
		delete retme[a[keyname]][keyname]
	});
	return retme;
}

