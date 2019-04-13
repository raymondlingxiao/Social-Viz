
choose("2018");


function choose(year){
    mapboxgl.accessToken = 'pk.eyJ1IjoicmF5bW9uZGx4IiwiYSI6ImNqc3RpZ3R6NjI0NDIzeXBkNDlucW81MXEifQ.VThJpKXtsJZEQhScbEiItw';
    var map = new mapboxgl.Map({
        container: 'map',
        // change style
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-99.9, 41.5],
        zoom:3
    });

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
                // may need to scale
                'circle-radius': ['get','fatalities'] ,
                'circle-color': "#f432ff"
            }
        });



    });

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
