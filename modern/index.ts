import { ajaxReq } from "./interface.ts";

class useful {
    /** array dedupe 
     * @param {Array} x an array
     * @returns {Array}
    */
    static arr_dedupe = <T>(x:Array<T>):Array<T>=>{
        return x.filter((item,index)=> x.indexOf(item) === index);
    }

    /** wrapper around the Fetch API */
    static ajax = async<T>({method="GET" , url="",data=undefined,signal=undefined,headers={},encodeuri=true, cors=undefined , formdata=undefined, fetcher=undefined, jsonbody=true, jsonheader=true , json=true}:ajaxReq):Promise<T>=>{
        try{
            if(fetcher === undefined)fetcher = fetch;
            method = method.toUpperCase();
            const reqBody:RequestInit = {
                method:method.toUpperCase(),
            };

            if((method === "POST" || method === "PUT")){
                reqBody.body = jsonbody ? JSON.stringify(data) : data;
                if(jsonheader){
                    reqBody.headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    };
                }
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
            const res = await fetcher((encodeuri ? encodeURI(url) : url),reqBody);
    
            let content = res;
            if(json)content = await res.json();
            return content;
        }catch(err){throw err}
    }

    /** last item of an array */
    static arr_last = <T>(arr:Array<T>):T=> arr[arr.length - 1];

    /** split array into chunks of smaller arrays */
    static arr_chunk = <T>(arr:Array<T>,length:number):Array<T>[]=>{
        const retMe:Array<T>[] = [];
        for(let i = 0;i < arr.length;i+=length){
            retMe.push(arr.slice(i,i+length));
        }
        return retMe;
    }

    /** generates uuidv4 string */
    static uuidv4 = ():string=> "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c=> {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    
      /** generate a short uid */
    static shortuid = ():string=>{
        let firstPart = (Math.random() * 46656) | 0;
        let secondPart = (Math.random() * 46656) | 0;
        const fp = ("000" + firstPart.toString(36)).slice(-3);
        const sp = ("000" + secondPart.toString(36)).slice(-3);
        return fp + sp;
    }

    /** pause */
    static sleep = (milliseconds:number)=> new Promise(resolve => setTimeout(resolve,milliseconds));

    /** filter out empty NaN values from array */
    static f_arr = <T>(arr:Array<T>):Array<T>=>{
        let index = -1;
        const arr_length = arr.length;
        let resIndex = -1;
        const results:Array<T> = [];
        while(++index < arr_length){
            const value:T = arr[index];
            if(value){
                results[++resIndex] = value;
            }
        }
        return results;
    }

    /** string to hex code */
    static hexCode = (x:string):string =>{
        let hex;

        let result = "";
        for (let i=0; i<x.length; i++) {
            hex = x.charCodeAt(i).toString(16);
            result += ("000"+hex).slice(-4);
        }

        return result
    }

    /** array of json to csv */
    static toCSV = (json:any[]):string =>{
        const jv:any[] = Object.values(json);
        let csv = "";
        let keys = (jv[0] && Object.keys(jv[0])) || [];
        csv += keys.join(",") + "\n";
        for(let line of jv){
            csv += keys.map(key => line[key]).join(",") + "\n";
        }
        return csv;
    }

    static uniqDedupe = <T>(list:Array<T>,uid:string):Array<T>=>{
        try{
            const uidlist = new Set();
            const retlist:Array<T> = [];
            for(let l of list){
                const x = (l as any)[uid];
                if(uidlist.has(x))continue;
                uidlist.add(x);
                retlist.push(l)
            }
            return retlist;
        }catch(err){throw err}
    }
    
}

export default useful;