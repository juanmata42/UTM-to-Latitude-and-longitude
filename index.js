// function plays sound when button is pressed
function playSound() {
    new Audio('./yeah.mp3').play()
}

//function returns random number between 2 numbers
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
setInterval(playSound, randomNum(100000, 4000000))

function UTMtoLatLon(northing, easting, zone, zoneLetter = null) {
    const a = 6378137.0;
    const f_inv = 298.257223563;
    const b = a * (1 - 1 / f_inv);
    const e = Math.sqrt((a ** 2 - b ** 2) / a ** 2);
    const e_p = Math.sqrt((a ** 2 - b ** 2) / b ** 2);
    const x = easting - 500000;
    const y = northing;
    const k0 = 0.9996;
    const M = y / k0;
    const mu = M / (a * (1 - e ** 2 / 4 - 3 * e ** 4 / 64 - 5 * e ** 6 / 256));
    const e1 = (1 - Math.sqrt(1 - e ** 2)) / (1 + Math.sqrt(1 - e ** 2));
    const phi1 = mu + (3 * e1 / 2 - 27 * e1 ** 3 / 32) * Math.sin(2 * mu) + (21 * e1 ** 2 / 16 - 55 * e1 ** 4 / 32) * Math.sin(4 * mu) + (151 * e1 ** 3 / 96) * Math.sin(6 * mu) + (1097 * e1 ** 4 / 512) * Math.sin(8 * mu);
    /* const C = e_p ** 2 * Math.cos(phi1) ** 2 / (1 - e ** 2);
    const T = Math.tan(phi1) ** 2; */
    const N = a / Math.sqrt(1 - e ** 2 * Math.sin(phi1) ** 2);
    /* const R = a * (1 - e ** 2) / (1 - e ** 2 * Math.sin(phi1) ** 2) ** 1.5; */
    const phi = phi1 * 180 / Math.PI;
    const lambdas = [-177, -171, -165, -159, -153, -147, -141, -135, -129, -123, -117, -111, -105, -99, -93, -87, -81, -75, -69, -63, -57, -51, -45, -39, -33, -27, -21, -15, -9, -3, 3, 9, 15];
    const lambda0 = lambdas[zone - 1];
    const lambda = lambda0 + (x / (N * Math.cos(phi1)));
    // Check for southern hemisphere
    let lat = phi;
    if (zoneLetter >= 'M' && zoneLetter <= 'Z') {
        lat = -90 + lat;
    }
    /* playSound() */
    return { lat: lat, lon: lambda };
}
