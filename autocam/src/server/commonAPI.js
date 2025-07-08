import axios from "axios"

export const commonAPI=async(httpRequest,url,reqBody,reqHeader)=>{
    const config={
        method:httpRequest,
        url,
        
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
    }
    if(httpRequest==="POST" || httpRequest==="PUT"|| httpRequest==="PATCH"){
        config.data=reqBody;
    }
    return await axios(config).then(res=>{
        return res
    }).catch(err=>{
        return err
    })
}