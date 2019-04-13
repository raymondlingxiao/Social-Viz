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

local.then(function(data) {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

	map.on("load", function() {
        
        const maxHeight = 64;
        const STATE_NUM = 52;
        const barWidth = 8;

        const coords = [
            [-154.493062, 63.588753],
            [-86.902298, 32.318231],
            [-91.831833, 35.20105],
            [-111.093731, 34.048928],
            [-119.417932, 36.778261],
            [-105.782067, 39.550051],
            [-73.087749, 41.603221],
            [-77.033418, 38.905985],
            [-75.52767, 38.910832],
            [-81.515754, 27.664827],
            [-82.907123, 32.157435],
            [-155.665857, 19.898682],
            [-93.097702, 41.878003],
            [-114.742041, 44.068202],
            [-89.398528, 40.633125],
            [-85.602364, 40.551217],
            [-98.484246, 39.011902],
            [-84.270018, 37.839333],
            [-92.145024, 31.244823],
            [-71.382437, 42.407211],
            [-76.641271, 39.045755],
            [-69.445469, 45.253783],
            [-85.602364, 44.314844],
            [-94.6859, 46.729553],
            [-91.831833, 37.964253],
            [-89.398528, 32.354668],
            [-110.362566, 46.879682],
            [-79.0193, 35.759573],
            [-101.002012, 47.551493],
            [-99.901813, 41.492537],
            [-71.572395, 43.193852],
            [-74.405661, 40.058324],
            [-105.032363, 34.97273],
            [-116.419389, 38.80261],
            [-74.217933, 43.299428],
            [-82.907123, 40.417287],
            [-97.092877, 35.007752],
            [-120.554201, 43.804133],
            [-77.194525, 41.203322],
            [-66.590149, 18.220833],
            [-71.477429, 41.580095],
            [-81.163725, 33.836081],
            [-99.901813, 43.969515],
            [-86.580447, 35.517491],
            [-99.901813, 31.968599],
            [-111.093731, 39.32098],
            [-78.656894, 37.431573],
            [-72.577841, 44.558803],
            [-120.740139, 47.751074],
            [-88.787868, 43.78444],
            [-80.454903, 38.597626],
            [-107.290284, 43.075968]
        ];

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
        
        features = []
        for (let i = 0; i < STATE_NUM; ++i) {
            const height = getRandomInt(10, maxHeight);
            const data = generateBar(height);
            map.addImage(`bar_${i}`, { width: barWidth, height: height, data: data });
            features.push({
                "type": "Feature",
                "properties": {
                    "icon": `bar_${i}`
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": coords[i]
                }
            })
        }

        console.log(features);
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

	});
});
