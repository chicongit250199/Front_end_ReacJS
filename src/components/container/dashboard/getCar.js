
export default async function getCar(){
    let response = await fetch('http://localhost:3000/api/car/view');
    const userId = localStorage.getItem('id');
    console.log(userId);
    let data = await response.json()
    return data;
}