let base_url = location.origin;
base_url = "http://127.0.0.1:8000";

function apicall(method: string = "GET", url: string = "") {
    let ajax = new XMLHttpRequest();
    ajax.open(method, `${base_url}/${url}`);
    ajax.responseType = "json";
    ajax.timeout = 2000;
    
    return ajax;
}

export default apicall;
export {base_url};
