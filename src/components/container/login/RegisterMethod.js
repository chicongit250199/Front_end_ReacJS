export default function Register(register) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(register)
        })
            .then((response) => response.json())
            .then((responseJson) => {

                resolve(responseJson)
            })
            .catch((error) => {
                reject(error)
            });
    });
}