import axios from "axios";
const defaultTemp = 22;

export async function manageTemp(houseId) {
    // first, get array of all users who are at home
    const atHomeUsers = await axios.get(`http://localhost:5000/search/getAtHomeUsers/${houseId}`);
    console.log(atHomeUsers.data);
    const data = await atHomeUsers.data;
    const len = data.length;
    console.log(houseId);

    // if empty: set to default, return.
    if (len == 0) {
        return defaultTemp;
    }

    let totalTemp = 0;
    
    for (let i = 0; i < len; ++i) {
        // console.log(i);
        console.log(len);
        console.log(atHomeUsers.data[i]);
        const username = atHomeUsers.data[i];

        const retval = await axios.get(`http://localhost:5000/search/getStatus/${username}`);
        console.log(retval.data);
        const temp = retval.data.temp;
        console.log(temp);
        totalTemp += temp;
    }
    console.log(totalTemp / len);
    return Math.round(totalTemp / len);
}