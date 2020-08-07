export type ajaxReq = {
    method:string,
    url:string,
    data?:any,
    signal?:AbortSignal,
    headers?:any,
    encodeuri?:boolean,
    cors?:boolean,
    formdata?:FormData,
    fetcher?:any,
    jsonbody?:boolean,
    jsonheader?:boolean,
    json?:boolean
}
