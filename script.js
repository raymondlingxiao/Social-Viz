// 3d button should be only one to avoid overlaps
var mapdiv = document.getElementById('map');
var button = document.createElement("div");
button.setAttribute("id", "extrude");
button.setAttribute("class", "mapboxgl-ctrl-group");
button.innerHTML = "3D";
mapdiv.appendChild(button);

$('.slider').on('input', () => {
    const val = $('.slider')[0].value;
    $('.year-labels li').removeClass('active');
    $('.year-labels').find(`li:nth-child(${(val - 2012 + 1)})`).addClass('active');
    choose(val);
});

$('.year-labels li').on('click', (e) => {
  const val = e.target.innerHTML;
  $('.slider').val(val).trigger('input');
});

// State location data
const stateData = {
	"Alaska": [-154.493062, 63.588753],
	"Alabama": [-86.902298, 32.318231],
	"Arkansas": [-91.831833, 35.20105],
	"Arizona": [-111.093731, 34.048928],
	"California": [-119.417932, 36.778261],
	"Colorado": [-105.782067, 39.550051],
	"Connecticut": [-73.087749, 41.603221],
	"District of Columbia": [-77.033418, 38.905985],
	"Delaware": [-75.52767, 38.910832],
	"Florida": [-81.515754, 27.664827],
	"Georgia": [-82.907123, 32.157435],
	"Hawaii": [-155.665857, 19.898682],
	"Iowa": [-93.097702, 41.878003],
	"Idaho": [-114.742041, 44.068202],
	"Illinois": [-89.398528, 40.633125],
	"Indiana": [-85.602364, 40.551217],
	"Kansas": [-98.484246, 39.011902],
	"Kentucky": [-84.270018, 37.839333],
	"Louisiana": [-92.145024, 31.244823],
	"Massachusetts": [-71.382437, 42.407211],
	"Maryland": [-76.641271, 39.045755],
	"Maine": [-69.445469, 45.253783],
	"Michigan": [-85.602364, 44.314844],
	"Minnesota": [-94.6859, 46.729553],
	"Missouri": [-91.831833, 37.964253],
	"Mississippi": [-89.398528, 32.354668],
	"Montana": [-110.362566, 46.879682],
	"North Carolina": [-79.0193, 35.759573],
	"North Dakota": [-101.002012, 47.551493],
	"Nebraska": [-99.901813, 41.492537],
	"New Hampshire": [-71.572395, 43.193852],
	"New Jersey": [-74.405661, 40.058324],
	"New Mexico": [-105.032363, 34.97273],
	"Nevada": [-116.419389, 38.80261],
	"New York": [-74.217933, 43.299428],
	"Ohio": [-82.907123, 40.417287],
	"Oklahoma": [-97.092877, 35.007752],
	"Oregon": [-120.554201, 43.804133],
	"Pennsylvania": [-77.194525, 41.203322],
	"Puerto Rico": [-66.590149, 18.220833],
	"Rhode Island": [-71.477429, 41.580095],
	"South Carolina": [-81.163725, 33.836081],
	"South Dakota": [-99.901813, 43.969515],
	"Tennessee": [-86.580447, 35.517491],
	"Texas": [-99.901813, 31.968599],
	"Utah": [-111.093731, 39.32098],
	"Virginia": [-78.656894, 37.431573],
	"Vermont": [-72.577841, 44.558803],
	"Washington": [-120.740139, 47.751074],
	"Wisconsin": [-88.787868, 43.78444],
	"West Virginia": [-80.454903, 38.597626],
	"Wyoming": [-107.290284, 43.075968]
}

// global map
let map = null;
//global var

let policeStatus = true;
let massStatus = false;
let huntStatus = false;


// points controller
var filter_button_3 = document.getElementById('bu_police');
// mass shooting controller
var flag_3 = 1;

function police_controller() {
    if (flag_3 == 0) {
        filter_button_3.style.backgroundColor = "dodgerblue";
        flag_3 = 1;
    } else {
        flag_3 = 0;
        filter_button_3.style.backgroundColor = "white";
    }

    if (map.getLayoutProperty('gunfire_points','visibility') === 'visible'){
        map.setLayoutProperty('gunfire_points','visibility','none');
        policeStatus = false;
    }
    else{
        map.setLayoutProperty('gunfire_points','visibility','visible');
        policeStatus = true;
    }

    if (map.getLayoutProperty('other_points','visibility') === 'visible'){
        map.setLayoutProperty('other_points','visibility','none');
        policeStatus = false;

    }
    else{
        map.setLayoutProperty('other_points','visibility','visible');
        policeStatus = true;
    }
}
var filter_button_1 = document.getElementById('bu_mass');
// mass shooting controller
var flag = 1;

function mass_shooting_controller() {
    if (flag == 0) {
        filter_button_1.style.backgroundColor = "dodgerblue";
        flag = 1;
    } else {
        flag = 0;
        filter_button_1.style.backgroundColor = "white";
    }


    if (map.getLayoutProperty('mass_shooting','visibility') === 'visible'){
        map.setLayoutProperty('mass_shooting','visibility','none');
        massStatus = false;
    }
    else{
        map.setLayoutProperty('mass_shooting','visibility','visible');
        massStatus = true;
    }
}

// entry
choose(2012);
var filter_button_2 = document.getElementById('bu_gunsales');
// mass shooting controller
var flag_2 = 1;

function gun_sale_controller() {
    if (flag_2 == 0) {
        filter_button_2.style.backgroundColor = "dodgerblue";
        flag_2 = 1;
    } else {
        flag_2 = 0;
        filter_button_2.style.backgroundColor = "white";
    }
    if ((map.getLayoutProperty('stateLayer', 'visibility')) === 'visible') {

        // map.setLayoutProperty('3dLayer', 'visibility', 'none');
        map.setLayoutProperty('stateLayer', 'visibility', 'none');

    }
    else {
        // map.setLayoutProperty('3dLayer', 'visibility', 'none');
        map.setLayoutProperty('stateLayer', 'visibility', 'visible');
    }
}
var filter_button_4 = document.getElementById('bu_hunting');
// mass shooting controller
var flag_4 = 1;

function hunting_controller() {
    if (flag_4 == 0) {
        filter_button_4.style.backgroundColor = "dodgerblue";
        flag_4 = 1;
    } else {
        flag_4 = 0;
        filter_button_4.style.backgroundColor = "white";
    }

    if (map.getLayoutProperty('hunting_bars','visibility') === 'visible'){
        map.setLayoutProperty('hunting_bars','visibility','none');
        huntStatus = false;
    }
    else{
        map.setLayoutProperty('hunting_bars','visibility','visible');
        huntStatus = true;
    }

}


function choose(year) {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmF5bW9uZGx4IiwiYSI6ImNqc3RpZ3R6NjI0NDIzeXBkNDlucW81MXEifQ.VThJpKXtsJZEQhScbEiItw';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/raymondlx/cjukhgjzv1v8d1gqfjsrcqf5g',
        center: [-99.9, 41.5],
        zoom: 3
    });
    let baseRadius = 2.5;
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());


    let url = 'https://api.myjson.com/bins/15yxeu';

    async function fetchAsync() {
        // await response of fetch call
        let response = await fetch(url);
        // only proceed once promise is resolved
        let data = await response.json();
        // only proceed once second promise is resolved
        return data;
    }

    async function fetchMass() {

        let response = await fetch("https://api.myjson.com/bins/1aoe6w");

        let data = await response.json();

        return data;
    }

    async function fetchHunting() {

        let response = await fetch("https://api.myjson.com/bins/1h7e2g");

        let data = await response.json();

        return data;
    }

// set legend range

    function getColor(number) {
        return number > 1000000 ? 'rgb(21, 20, 20)' :
            number > 600000 ? 'rgb(40, 38, 38)' :
                number > 300000 ? 'rgb(58, 55, 55)' :
                    number > 200000 ? 'rgb(84, 79, 79)' :
                        number > 150000 ? 'rgb(97, 94, 94)' :
                            number > 100000 ? 'rgb(116, 113, 113)' :
                                'rgb(133, 130, 130)';
    }


    let data = fetchMass();

    data.then(function (ele) {
        let cur = ele[year.toString()];
        let min_fa = Number.MAX_VALUE;
        let max_fa = Number.MIN_VALUE;

        for (let s in cur) {
            if (cur.hasOwnProperty(s)) {
                let cur_fa = parseInt(cur[s].Total_victims);
                if (cur_fa < min_fa) {
                    min_fa = cur_fa;
                }
                if (cur_fa > max_fa) {
                    max_fa = cur_fa;
                }
            }
        }

        let dif_fa = max_fa - min_fa;


        // get min max per year
        let exp_mass_shooting = [
            "all",
            ["==", 'date', parseInt(year)]
        ];

        map.on('load', function () {
            map.addLayer({
                id: 'mass_shooting',
                type: 'circle',
                source: {
                    type: 'vector',
                    url: 'mapbox://raymondlx.5tgwg8tn'
                },
                'source-layer': 'mass_shooting_data-2gox7n',
                filter: exp_mass_shooting,
                layout: {
                    visibility: massStatus ? 'visible' : 'none'
                },
                paint: {
                    // scaled betweeen 4,14
                    'circle-radius': ['+', ['*', ['/', ['-', ['get', 'total_victims'], min_fa], dif_fa], 35], 10],
                    // 'circle-radius':['get','fatalities'],
                    'circle-color': "#E64531",
                    'circle-opacity': 0.7
                }
            });
        });
    })


// create pop up
    map.on('click', function (e) {
        let features = map.queryRenderedFeatures(e.point);
        let clicked = null;

        features.forEach(function (feature) {
            if (feature.layer.id === 'mass_shooting')
                clicked = feature;
        })

        if (clicked === null)
            return;
        let coordinates = clicked.geometry.coordinates.slice();
        let cases = clicked.properties.case;
        let death = clicked.properties.fatalities;
        let legality = clicked.properties.weapons_obtained_legally;
        let total = clicked.properties.total_victims;

        let description = "";
        description += "<strong>Case:</strong> " + cases + "<" + "br" + ">";
        description += "<strong>Fatalities:</strong> " + death + "<" + "br" + ">";
        description += "<strong>Total Victims:</strong> " + total + "<" + "br" + ">";
        description += "<strong>Weapon Legality:</strong> " + legality + "<" + "br" + ">";

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the layer.
    map.on('mouseenter', 'mass_shooting', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'mass_shooting', function () {
        map.getCanvas().style.cursor = '';
    });
    //-----------------------------------------------------------------


    local = fetchAsync();

    local.then(function (data) {

        let data_cur = data[year];
        let data_norm = [];
        let max = 0;
        let min = Number.MAX_VALUE;
        for (let key in data_cur) {
            if (parseInt(data_cur[key]['permit']) > max)
                max = parseInt(data_cur[key]['permit']);
            if (parseInt(data_cur[key]['permit']) < min)
                min = parseInt(data_cur[key]['permit']);

            data_norm.push({"STATE_ID": data_cur[key]['id'], "PERMIT_NUM": parseInt(data_cur[key]['permit'])});
        }

        map.on('load', function () {
            //--------------new section hunting ------------------------
            const huntingPromise = fetchHunting();

            huntingPromise.then(function (huntingData) {

                const maxHeight = 90;
                const barWidth = 10;

                const generateBar = (height) => {
                    const channels = 4;
                    let data = new Uint8Array(barWidth * height * channels);

                    const r = 93, g = 189, b = 234, a = 200;

                    for (let x = 0; x < barWidth; x++) {
                        for (let y = height - 1; y >= 0; y--) {
                            const offset = (y * barWidth + x) * channels;
                            data[offset + 0] = r; // red
                            data[offset + 1] = g; // green
                            data[offset + 2] = b; // blue
                            data[offset + 3] = a; // alpha
                        }
                    }
                    return data;
                }

                features = []
                data = huntingData[year.toString()];

                let min = 1, max = -1;

                const getMinMaxVal = (rangeMin, rangeMax, curVal) => {
                    return (rangeMax - rangeMin) / (max - min) * (curVal - max) + rangeMax;
                };

                $.each(data, (_, val) => {
                    let v = val["huntingperperson"];
                    if (v > max)
                        max = v;
                    if (v < min)
                        min = v;
                });

                $.each(data, (state, val) => {
                    var loc = stateData[state];
                    const height = Math.ceil(getMinMaxVal(20, 90, val["huntingperperson"]));
                    const bar = generateBar(height);
                    map.addImage(`bar_${state}`, {width: barWidth, height: height, data: bar});
                    features.push({
                        "type": "Feature",
                        "properties": {
                            "icon": `bar_${state}`,
                            "state": state,
                            "statePop": val["pop"],
                            "huntingPop": val["hunting"],
                            "huntingProportion": `${(100 * val["huntingperperson"]).toFixed(2)}%`
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": loc
                        }
                    })
                });


                map.addLayer({
                    "id": "hunting_bars",
                    "type": "symbol",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": features
                        }
                    },
                    "layout": {
                        "icon-image": "{icon}",
                        "icon-allow-overlap": true,
                        visibility: huntStatus ? 'visible' : 'none'
                    }
                });

                var popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });

                function showDetail(location, layer, fields) {
                    var features = map.queryRenderedFeatures(location.point, layer);
                    popup.remove();
                    // exclude no-need land
                    if (features !== null && features[0]["layer"]["id"] === 'hunting_bars') {

                        var popupText = "";

                        popupText =
                            `<strong>${fields[0]}</strong>${features[0].properties["state"]}<br><strong>${fields[1]}</strong>${features[0].properties["statePop"]}<br><strong>${fields[2]}</strong>${features[0].properties["huntingPop"]}<br><strong>${fields[3]}</strong>${features[0].properties["huntingProportion"]}<br>`;

                        popup.setLngLat(location.lngLat)
                            .setHTML(popupText)
                            .addTo(map);
                    }
                }

                map.on('mousemove', function (e) {
                    showDetail(e, 'stateLayer', ["State: ", "Population: ",
                        "# Hunting Permit: ", "% Hunting Permit: "])
                });

            });

        });
        //--------------

        local = fetchAsync();

        local.then(function (data) {
            let data_cur = data[year];
            let data_norm = [];
            let max = 0;
            let min = Number.MAX_VALUE;
            for (let key in data_cur) {
                if (parseInt(data_cur[key]['permit']) > max)
                    max = parseInt(data_cur[key]['permit']);
                if (parseInt(data_cur[key]['permit']) < min)
                    min = parseInt(data_cur[key]['permit']);

                data_norm.push({
                    "STATE_ID": data_cur[key]['id'],
                    "PERMIT_NUM": parseInt(data_cur[key]['permit'])
                });
            }

            map.on('load', function () {

                let exp_other = [
                    "all",
                    ['==', 'year', parseInt(year)],
                    ['!=', 'cause_short', 'Gunfire']
                ];

                let exp_gunfire = [
                    "all",
                    ['==', 'year', parseInt(year)],
                    ['==', 'cause_short', 'Gunfire']
                ];

                map.addLayer({
                    id: 'gunfire_points',
                    type: 'circle',
                    source: {
                        type: 'vector',
                        url: 'mapbox://raymondlx.00zyxnxb'
                    },
                    'source-layer': 'clean_data_with_location-atsza0',
                    filter: exp_gunfire,
                    layout: {
                        visibility: policeStatus ? 'visible' : 'none'
                    },
                    paint: {
                        'circle-radius': baseRadius,

                        'circle-color': "#FF3D33"
                    }
                });

                map.addLayer({
                    id: 'other_points',
                    type: 'circle',
                    source: {
                        type: 'vector',
                        url: 'mapbox://raymondlx.00zyxnxb'
                    },
                    'source-layer': 'clean_data_with_location-atsza0',
                    filter: exp_other,
                    layout: {
                        visibility: policeStatus ? 'visible' : 'none'
                    },
                    paint: {
                        'circle-radius': baseRadius,
                        'circle-color': "#F4C77A"
                    }
                });


                map.addSource("states", {
                    type: "vector",
                    url: "mapbox://mapbox.us_census_states_2015"
                });

                var expression = ["match", ["get", "STATE_ID"]];
                var expression_heigh = ["match", ["get", "STATE_ID"]];

                data_norm.forEach(function (row) {
                    // var green = (row["PERMIT_NUM"] / (max/10)) * 255;
                    // var color = "rgba(" + green + ", " + 0 + ", " + 0 + ", 1)";

                    // new range color
                    // console.log(row["PERMIT_NUM"]);
                    let color = getColor(parseInt(row["PERMIT_NUM"]));
                    expression.push(row["STATE_ID"], color);

                    //calculate height
                    let height = Math.round(parseInt(row["PERMIT_NUM"]));
                    expression_heigh.push(row["STATE_ID"], height);

                });

                expression.push("rgba(0,0,0,0)");

                expression_heigh.push(0);

                // add layer
                map.addLayer({
                    "id": "stateLayer",
                    "type": "fill",
                    "source": "states",
                    "source-layer": "states",
                    "paint": {
                        "fill-color": expression,
                        'fill-outline-color': 'grey',
                        'fill-opacity': 0.9
                    }
                }, 'waterway-label');

                map.addLayer({
                    "id": "3dLayer",
                    'type': 'fill-extrusion',
                    "source": "states",
                    "source-layer": "states",
                    'layout': {
                        'visibility': 'none'
                    },
                    "paint": {
                        "fill-extrusion-color": expression,
                        'fill-extrusion-height': expression_heigh,
                        'fill-extrusion-opacity': 0.9,
                        'fill-extrusion-base': 0
                    }
                }, 'waterway-label');

                var overView = {
                    center: [-95.52, 39.94],
                    zoom: 3.5,
                    bearing: 0,
                    pitch: 0,
                    speed: 0.5,
                    curve: 0.5
                };


                var highestView = {
                    center: [-80.6, 39.1],
                    zoom: 5,
                    bearing: -18.1,
                    pitch: 60,
                    speed: 0.2,
                    curve: 0.7
                };

                // build 3d view function
                let ex = document.getElementById('extrude');
                ex.addEventListener('click', function () {
                    // console.log("click")
                    if ((map.getLayoutProperty('stateLayer', 'visibility')) === 'visible') {
                        // console.log("click")
                        map.setLayoutProperty('3dLayer', 'visibility', 'visible');
                        ex.className = 'mapboxgl-ctrl-group active';
                        map.flyTo(highestView);
                        map.setLayoutProperty('stateLayer', 'visibility', 'none');
                        // map.setLayoutProperty('gunfire_points','visibility','none');
                        // map.setLayoutProperty('other_points','visibility','none');
                        // map.setLayoutProperty('hunting_bars','visibility','none');

                    } else {
                        map.setLayoutProperty('stateLayer', 'visibility', 'visible');
                        // map.setLayoutProperty('gunfire_points','visibility','visible');
                        // map.setLayoutProperty('other_points','visibility','visible');
                        // map.setLayoutProperty('hunting_bars','visibility','visible');

                        map.setLayoutProperty('3dLayer', 'visibility', 'none');
                        ex.className = 'mapboxgl-ctrl-group';
                        map.flyTo(overView);
                    }
                });
            });


            // build popUp function
            var popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            function showDetail(location, layer, fields) {
                var features = map.queryRenderedFeatures(location.point, layer);

                popup.remove();
                // exclude no-need land
                if (features !== null && features[0]["layer"]["id"] === 'stateLayer') {
                    // console.log(features)
                    var popupText = "";

                    popupText += "<strong>" + fields[0] + ":</strong> " + features[0].properties["STATE_NAME"] + "<" + "br" + ">";
                    let id = features[0].properties["STATE_ID"];
                    for (let i = 0; i < data_norm.length; i++) {
                        if (data_norm[i]["STATE_ID"] === id) {
                            popupText += "<strong>" + "GUN_SALES" + ":</strong> " + data_norm[i]["PERMIT_NUM"] + "<" + "br" + ">";
                            break;
                        }
                    }

                    popup.setLngLat(location.lngLat)
                        .setHTML(popupText)
                        .addTo(map);
                }
            }

            map.on('mousemove', function (e) {
                showDetail(e, 'stateLayer', ["STATE_NAME", "PERMITS_NUM"])
            });

            map.on('click', function (e) {
                showDetail(e, 'stateLayer', ["STATE_NAME", "PERMITS_NUM"])
            });
        });
    })
}

