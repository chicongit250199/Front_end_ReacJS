// import baseurl from ''
export default function PostData(path, userData) 
{
    let BaseUrl = 'http://localhost:3000/api';
    console.log('user data',userData);
    const username = userData.username;
    const password = userData.password;
    return new Promise((resolve, reject) =>{
    fetch(BaseUrl + path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then((response) =>response.json() )
        .then((responseJson) => {
            resolve(responseJson);
            console.log(responseJson);
        })
        .catch((error) => {
            reject(error)
        });
    });
}   