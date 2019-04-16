// 3d button should be only one to avoid overlaps
var mapdiv = document.getElementById('map');
var button = document.createElement("div");
button.setAttribute("id", "extrude");
button.setAttribute("class", "mapboxgl-ctrl-group");
button.innerHTML = "3D";
mapdiv.appendChild(button);

// global map
let map = null;


// entry
choose(2012);

function gun_sale_controller() {
    if ((map.getLayoutProperty('stateLayer', 'visibility')) === 'visible') {

        map.setLayoutProperty('3dLayer', 'visibility', 'none');
        map.setLayoutProperty('stateLayer', 'visibility', 'none');

    }
    else {
        map.setLayoutProperty('3dLayer', 'visibility', 'none');
        map.setLayoutProperty('stateLayer', 'visibility', 'visible');
    }
}


function choose(year){
    mapboxgl.accessToken = 'pk.eyJ1IjoicmF5bW9uZGx4IiwiYSI6ImNqc3RpZ3R6NjI0NDIzeXBkNDlucW81MXEifQ.VThJpKXtsJZEQhScbEiItw';
     map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [-99.9, 41.5],
        zoom:3
    });
    let baseRadius = 4;
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());





    let url = 'https://api.myjson.com/bins/15yxeu';

    async function fetchAsync () {
        // await response of fetch call
        let response = await fetch(url);
        // only proceed once promise is resolved
        let data = await response.json();
        // only proceed once second promise is resolved
        return data;
    }

// set legend range

    function getColor(number){
        return number > 1000000 ? 'rgb(32, 31, 30)' :
            number > 600000 ? 'rgb(52, 51, 50)' :
                number > 300000  ? 'rgb(72, 71, 70)' :
                    number > 200000   ? 'rgb(92, 91, 90)' :
                        number > 150000   ? 'rgb(112, 111, 110)' :
                            number > 100000   ? 'rgb(132, 131, 130)' :
                                'rgb(152, 151, 150)';
    }

    local = fetchAsync();

    local.then(function (data) {
        console.log(data);
        let data_cur = data[year];
        let data_norm = [];
        let max = 0;
        let max_location = [];
        let min = Number.MAX_VALUE;
        for (let key in data_cur){
            if (parseInt(data_cur[key]['permit']) > max)
                max = parseInt(data_cur[key]['permit']);
            if (parseInt(data_cur[key]['permit']) < min)
                min = parseInt(data_cur[key]['permit']);

            data_norm.push({"STATE_ID":data_cur[key]['id'],"PERMIT_NUM":parseInt(data_cur[key]['permit'])});
        }

        console.log(data_norm);

        map.on('load', function() {

            let exp_other = [
                "all",
                ['==','year',parseInt(year)],
                ['!=','cause_short','Gunfire']
            ];

            let exp_gunfire = [
                "all",
                ['==','year',parseInt(year)],
                ['==','cause_short','Gunfire']
            ];

            map.addLayer({
                id: 'gunfire_points',
                type: 'circle',
                source: {
                    type: 'vector',
                    url: 'mapbox://raymondlx.00zyxnxb'
                },
                'source-layer': 'clean_data_with_location-atsza0',
                filter:exp_gunfire,
                paint:{
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
                filter:exp_other,
                paint:{
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

            data_norm.forEach(function(row) {
                // var green = (row["PERMIT_NUM"] / (max/10)) * 255;
                // var color = "rgba(" + green + ", " + 0 + ", " + 0 + ", 1)";

                // new range color
                // console.log(row["PERMIT_NUM"]);
                let color = getColor(parseInt(row["PERMIT_NUM"]));
                expression.push(row["STATE_ID"], color);

                //calculate height
                let height = Math.round(parseInt(row["PERMIT_NUM"]));
                expression_heigh.push(row["STATE_ID"],height);

            });
            console.log(max,min);

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
                    'fill-extrusion-height':expression_heigh,
                    'fill-extrusion-opacity': 0.9,
                    'fill-extrusion-base': 0
                }
            },'waterway-label');

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
            ex.addEventListener('click', function() {
                // console.log("click")
                if ((map.getLayoutProperty('stateLayer', 'visibility')) === 'visible') {
                    // console.log("click")
                    map.setLayoutProperty('3dLayer', 'visibility', 'visible');
                    ex.className = 'mapboxgl-ctrl-group active';
                    setTimeout(function() {
                        map.flyTo(highestView);
                        map.setLayoutProperty('stateLayer', 'visibility', 'none');
                        map.setLayoutProperty('gunfire_points','visibility','none');
                        map.setLayoutProperty('other_points','visibility','none');

                    }, 1000);
                }
                else {
                    map.setLayoutProperty('stateLayer', 'visibility', 'visible');
                    map.setLayoutProperty('gunfire_points','visibility','visible');
                    map.setLayoutProperty('other_points','visibility','visible');

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
            if (features !==  null && features[0]["layer"]["id"] === 'stateLayer') {
                // console.log(features)
                var popupText = "";

                popupText += "<strong>" + fields[0] + ":</strong> " + features[0].properties["STATE_NAME"] + "<" + "br" + ">";
                let id = features[0].properties["STATE_ID"];
                for (let i=0;i<data_norm.length;i++){
                    if (data_norm[i]["STATE_ID"] === id ){
                        popupText += "<strong>" + "GUN_SALES" + ":</strong> " + data_norm[i]["PERMIT_NUM"] + "<" + "br" + ">";
                        break;
                    }
                }

                popup.setLngLat(location.lngLat)
                    .setHTML(popupText)
                    .addTo(map);
            }
        }

        map.on('mousemove', function(e) {
            showDetail(e, 'stateLayer', ["STATE_NAME", "PERMITS_NUM"])
        });

        map.on('click', function(e) {
            showDetail(e, 'stateLayer', ["STATE_NAME", "PERMITS_NUM"])
        });
    });
}

