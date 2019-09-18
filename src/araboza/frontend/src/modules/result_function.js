
export function findSiteCode(siteCode, data){
    for(let i=0;i<data.length;i++){
        if(siteCode === data[i].site_code){
            return data[i];
        }
    }
}


