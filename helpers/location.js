const longitude_error = 0.05;
const latitude_error = 0.007;

// returns boolean indicating at home or not, within radius
export function userAtHome(long1, lat1, long2, lat2) {
    const lat_diff = Math.abs(lat1 - lat2);
    const long_diff = Math.abs(long1 - long2);

    return (lat_diff <= latitude_error) && (long_diff <= longitude_error);
}

