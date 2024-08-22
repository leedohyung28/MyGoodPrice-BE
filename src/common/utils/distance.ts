export function getDistance(lat1:number,lng1:number,lat2:number,lng2:number) {

    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    const dLat = deg2rad(lat2-lat1);  
    const dLon = deg2rad(lng2-lng1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let dis = 6371 * c; 
    dis = Math.round(dis * 1000) / 1000
    return dis
}