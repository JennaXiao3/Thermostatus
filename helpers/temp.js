import axios from "axios";
const defaultTemp = 22;

export async function manageTemp(houseId) {
    // first, get array of all users who are at home
    const atHomeUsers = await axios.get(`http://localhost:5000/search/getAtHomeUsers/${houseId}`);
    const len = atHomeUsers.data.length;

    // if empty: set to default, return.
    if (len == 0) {
        return defaultTemp;
    }

    let totalTempArr = 0;
    
    for (let i = 0; i < len; ++i) {
        const retval = await axios.get(`http://localhost:5000/search//getStatus/${atHomeUsers[i]}`);
        const temp = retval.data.temperature;
        console.log(temp);
        totalTempArr += temp;
    }
    console.log(totalTempArr / len);
    return Math.round(totalTempArr / len);
}