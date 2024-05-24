let req = new XMLHttpRequest();
let result: string;

export const request = (fetch: string, json: string | null) => {
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            return result = req.responseText;
        }
    };

    switch (fetch) {
        case 'GET':
            req.open("GET", "https://api.jsonbin.io/v3/b/66330b7ee41b4d34e4ed881b", true);
            req.setRequestHeader("X-Master-Key", "$2a$10$tl9MpYfy2qBEoZO03TlB3urB29YOpMNB3xVR/wMmn2E.tYhfF3YW.");
            req.send();
            return result;
        case 'POST':
            req.open("POST", "https://api.jsonbin.io/v3/b", true)
            req.setRequestHeader("Content-Type", "application/json");
            req.setRequestHeader("X-Master-Key", "$2a$10$tl9MpYfy2qBEoZO03TlB3urB29YOpMNB3xVR/wMmn2E.tYhfF3YW.");
            req.send(json);
            break;
        case 'PUT':
            req.open("PUT", "https://api.jsonbin.io/v3/b/66330b7ee41b4d34e4ed881b", true);
            req.setRequestHeader("Content-Type", "application/json");
            req.setRequestHeader("X-Master-Key", "$2a$10$tl9MpYfy2qBEoZO03TlB3urB29YOpMNB3xVR/wMmn2E.tYhfF3YW.");
            req.send(json);
            break;
    }
}