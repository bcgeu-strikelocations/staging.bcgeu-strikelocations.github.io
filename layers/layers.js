var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_BCGEUStrikeLocations30km_1 = new ol.format.GeoJSON();
var features_BCGEUStrikeLocations30km_1 = format_BCGEUStrikeLocations30km_1.readFeatures(json_BCGEUStrikeLocations30km_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_BCGEUStrikeLocations30km_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BCGEUStrikeLocations30km_1.addFeatures(features_BCGEUStrikeLocations30km_1);
var lyr_BCGEUStrikeLocations30km_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_BCGEUStrikeLocations30km_1, 
                style: style_BCGEUStrikeLocations30km_1,
                popuplayertitle: 'BCGEU Strike Locations - 30km',
                interactive: false,
                title: '<img src="styles/legend/BCGEUStrikeLocations30km_1.png" /> BCGEU Strike Locations - 30km'
            });
var format_BCGEUStrikeLocations_2 = new ol.format.GeoJSON();
var features_BCGEUStrikeLocations_2 = format_BCGEUStrikeLocations_2.readFeatures(json_BCGEUStrikeLocations_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_BCGEUStrikeLocations_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BCGEUStrikeLocations_2.addFeatures(features_BCGEUStrikeLocations_2);
var lyr_BCGEUStrikeLocations_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_BCGEUStrikeLocations_2, 
                style: style_BCGEUStrikeLocations_2,
                popuplayertitle: 'BCGEU Strike Locations',
                interactive: true,
                title: '<img src="styles/legend/BCGEUStrikeLocations_2.png" /> BCGEU Strike Locations'
            });

lyr_OpenStreetMap_0.setVisible(true);lyr_BCGEUStrikeLocations30km_1.setVisible(true);lyr_BCGEUStrikeLocations_2.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_BCGEUStrikeLocations30km_1,lyr_BCGEUStrikeLocations_2];
lyr_BCGEUStrikeLocations30km_1.set('fieldAliases', {'fid': 'fid', 'id': 'id', 'Address': 'Address', });
lyr_BCGEUStrikeLocations_2.set('fieldAliases', {'id': 'id', 'Address': 'Address', });
lyr_BCGEUStrikeLocations30km_1.set('fieldImages', {'fid': '', 'id': '', 'Address': '', });
lyr_BCGEUStrikeLocations_2.set('fieldImages', {'id': 'Hidden', 'Address': 'TextEdit', });
lyr_BCGEUStrikeLocations30km_1.set('fieldLabels', {'fid': 'no label', 'id': 'no label', 'Address': 'no label', });
lyr_BCGEUStrikeLocations_2.set('fieldLabels', {'Address': 'header label - always visible', });
lyr_BCGEUStrikeLocations_2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});