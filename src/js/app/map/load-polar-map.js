/**
 * Created by alvinWei on 15/5/13.
 */
function loadPolarMaps(){
    require(["esri/map", "dojo/domReady!"], function(Map) {
        var map = new Map("map", {
            center: [-118, 34.5],
            zoom: 8,
            basemap: "topo"
        });
    });
}
$(document).ready(function(){
    loadPolarMaps()
});

