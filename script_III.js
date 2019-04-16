mapboxgl.accessToken =
	"pk.eyJ1IjoicmF5bW9uZGx4IiwiYSI6ImNqc3RpZ3R6NjI0NDIzeXBkNDlucW81MXEifQ.VThJpKXtsJZEQhScbEiItw";
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/dark-v9",
	center: [-99.9, 41.5],
	zoom: 3
});
let baseRadius = 4;
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

var mapdiv = document.getElementById("map");
var button = document.createElement("div");
button.setAttribute("id", "extrude");
button.setAttribute("class", "mapboxgl-ctrl-group");
button.innerHTML = "3D";
mapdiv.appendChild(button);

let url = "https://api.myjson.com/bins/15yxeu";

async function fetchAsync() {
	// await response of fetch call
	let response = await fetch(url);
	// only proceed once promise is resolved
	let data = await response.json();
	// only proceed once second promise is resolved
	return data;
}

// set legend range

function getColor(number) {
	return number > 1000000
		? "rgb(32, 31, 30)"
		: number > 600000
		? "rgb(52, 51, 50)"
		: number > 300000
		? "rgb(72, 71, 70)"
		: number > 200000
		? "rgb(92, 91, 90)"
		: number > 150000
		? "rgb(112, 111, 110)"
		: number > 100000
		? "rgb(132, 131, 130)"
		: "rgb(152, 151, 150)";
}

// save promise to local file for later use
// use within scope
var year = 2012;
local = fetchAsync();
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

local.then(function(data) {

	map.on("load", function() {
        
        const maxHeight = 90;
        const barWidth = 20;

        const generateBar = (height) => {
            const channels = 4; 
            const maxBlue = 204, minBlue = 94, maxRed = 204, minRed = 89, maxGreen = 152, minGreen = 89;
            let data = new Uint8Array(barWidth * height * channels);
            
            const r = minRed + (height / maxHeight) * (maxRed - minRed), 
                    g = maxGreen - (height / maxHeight) * (maxGreen - minGreen), 
                    b = maxBlue - (height / maxHeight) * (maxBlue - minBlue);

            for (let x = 0; x < barWidth; x++) {
                for (let y = height - 1; y >= 0; y--) {
                    const offset = (y * barWidth + x) * channels;
                    data[offset + 0] = r; // red
                    data[offset + 1] = g; // green
                    data[offset + 2] = b; // blue
                    data[offset + 3] = 255; // alpha
                }
            }
            return data;
        }
        
        $.getJSON("https://api.myjson.com/bins/1h7e2g", (data) => {
            features = []
            data = data["2012"];
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
                map.addImage(`bar_${state}`, { width: barWidth, height: height, data: bar });
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

            map.addSource("states", {
                type: "vector",
                url: "mapbox://mapbox.us_census_states_2015"
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
                    "icon-allow-overlap": true
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
                if (features !==  null && features[0]["layer"]["id"] === 'hunting_bars') {

                    var popupText = "";
                    
                    popupText = 
                    `<strong>${fields[0]}</strong>${features[0].properties["state"]}<br><strong>${fields[1]}</strong>${features[0].properties["statePop"]}<br><strong>${fields[2]}</strong>${features[0].properties["huntingPop"]}<br><strong>${fields[3]}</strong>${features[0].properties["huntingProportion"]}<br>`;
            
                    popup.setLngLat(location.lngLat)
                        .setHTML(popupText)
                        .addTo(map);
                }
            }
    
            map.on('mousemove', function(e) {
                showDetail(e, 'stateLayer', ["State: ", "Population: ", 
                                            "# Hunting Permit: ", "% Hunting Permit: "])
            });
    
        });

	});
});
