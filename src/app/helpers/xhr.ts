/**
 * Simplified XHR to request JSON
 * Returns a promise
 * @param path Path to API/JSON
 */
export const getJSON = (path: string) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', path);
      
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
    
        xhr.onload = (event: ProgressEvent) => {
            try {
                const json = JSON.parse(xhr.responseText);
                resolve({
                    status: xhr.status,
                    statusText: xhr.statusText,
                    data: json,
                });
            } catch(e) {
                reject('Error while parsing JSON');
            }
            
        };
    
        xhr.onerror = (event: ProgressEvent) => {
            resolve({
                status: xhr.status,
                statusText: xhr.statusText,
                data: xhr.statusText,
            });
        };
    
        xhr.send();
    });
}