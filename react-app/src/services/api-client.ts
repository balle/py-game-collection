let base_url = location.origin;
base_url = "http://127.0.0.1:8000";

// function apicall(method: string = "GET", url: string = "", callback: (this: XMLHttpRequest) => void) {
//     let ajax = new XMLHttpRequest();
//     ajax.open(method, `${base_url}/${url}`);
//     ajax.responseType = "json";
//     ajax.timeout = 2000;
//     ajax.onload = callback;
//     ajax.send()
// }

async function apicall(method: string = "GET", url: string = "") {
    const response = await fetch(`${base_url}/${url}`, {method: method, 
                                               headers: {'Content-Type': 'application/json'}})  
    const data = await response.json();

    return data;
}

export default apicall;
export {base_url};
