export default async function getList(userId){
    console.log(userId);
    let response = await fetch('http://localhost:3000/api/car/view', {
        method: 'GET',
        body: JSON.stringify(userId)
    } );
    let data = await response.json()
    return data;
}
