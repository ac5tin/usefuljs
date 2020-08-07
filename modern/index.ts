import { ajaxReq } from "./interface";

class useful {
    static arr_dedupe = <T>(x:Array<T>):Array<T>=>{
        return x.filter((item,index)=> x.indexOf(item) === index);
    }

    static ajax = async<T>({method="GET" , url="",data=undefined,signal=undefined,headers={},encodeuri=true, cors=undefined , formdata=undefined, fetcher=undefined, jsonbody=true, jsonheader=true , json=true}:ajaxReq):Promise<T>=>{
        try{
            if(fetcher === undefined)fetcher = fetch;
            method = method.toUpperCase();
            type requestBody = {
                method:string,
                body?:any,
                headers?:any,
                mode?:string,
                signal?:AbortSignal
            }
            const reqBody:requestBody = {
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
    
}

export default useful;