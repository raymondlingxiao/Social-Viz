
//gloabl map

let map = null;

choose("2016");

function mass_shooting_controller() {
    if (map.getLayoutProperty('mass_shooting','visibility') === 'visible'){
        map.setLayoutProperty('mass_shooting','visibility','none');
    }
    else
        map.setLayoutProperty('mass_shooting','visibility','visible');

}

function choose(year){
    mapboxgl.accessToken = 'pk.eyJ1IjoicmF5bW9uZGx4IiwiYSI6ImNqc3RpZ3R6NjI0NDIzeXBkNDlucW81MXEifQ.VThJpKXtsJZEQhScbEiItw';
    map = new mapboxgl.Map({
        container: 'map',
        // change style
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-99.9, 41.5],
        zoom:3
    });

    // get data from URL
    async function fetchAsync(){

        let response = await fetch("https://api.myjson.com/bins/1aoe6w");

        let data = await response.json();

        return data;
    }

    let data = fetchAsync();

    data.then(function (ele) {
        let cur = ele[year.toString()];
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;

        for (let s in cur){
            if (cur.hasOwnProperty(s)){
                let cur_fa = parseInt(cur[s].Fatalities);
                if (cur_fa < min){
                    min = cur_fa;
                }
                if (cur_fa > max){
                    max = cur_fa;
                }
            }
        }

        let dif = max-min;


        // get min max per year
        let exp_mass_shooting = [
            "all",
            ["==",'date',parseInt(year)]
        ];

        map.on('load',function () {
            map.addLayer({
                id: 'mass_shooting',
                type: 'circle',
                source: {
                    type: 'vector',
                    url: 'mapbox://raymondlx.5tgwg8tn'
                },
                'source-layer': 'mass_shooting_data-2gox7n',
                filter: exp_mass_shooting,
                paint:{
                    // scaled betweeen 4,14
                    'circle-radius': ['+',['*',['/',['-',['get','fatalities'],min],dif],10],4] ,
                    'circle-color': "#ff3161"
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

        if(clicked === null)
            return;

        let coordinates = clicked.geometry.coordinates.slice();
        let cases = clicked.properties.case;
        let death = clicked.properties.fatalities;
        let legality = clicked.properties.weapons_obtained_legally;

        let description = "";
        description += "<strong>Case:</strong> " + cases + "<" + "br" + ">";
        description += "<strong>Fatalities:</strong> " + death + "<" + "br" + ">";
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

        console.log(clicked)


    });

// Change the cursor to a pointer when the mouse is over the layer.
    map.on('mouseenter', 'mass_shooting', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

// Change it back to a pointer when it leaves.
    map.on('mouseleave', 'mass_shooting', function () {
        map.getCanvas().style.cursor = '';
    });
}
