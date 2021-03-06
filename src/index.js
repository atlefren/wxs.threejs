import * as _ from 'underscore';

import ThreeDMapUntiled from './ThreeDMapUntiled';


import Texture from './Texture';
import Terrain from './Terrain';
import Profiles from './Profiles';
import Envelope from './Envelope';

var defaults = {
    div: null,
    bbox: null,
    bboxCrs: 'EPSG:4326',
    wireframe: false,
    zMult: 1,
    zInv: false,
    crs: 'EPSG:32633',
    texture: {
        type: 'wms',
        wmsUrl: 'http://openwms.statkart.no/skwms1/wms.topo2',
        wmsLayers: 'topo2_WMS',
        wmsFormat: 'image/png',
        wmsFormatMode: ''
    },
    terrain: {
        pixelsPerVertex: 8, //the resolution of the height model in the image
        wcsUrl: 'http://wms.geonorge.no/skwms1/wcs.dtm',
        wcsResolution: 10, //resolution of grid cell in meters
        coverage: 'land_utm33_10m',
        format: 'geotiff',
        showBox: true,
        boxColor: 0xdddddd
    },
    profiles: null
};

function extendDefaults(config) {
    var texture = _.extend({}, defaults.texture, config.texture || {});
    var terrain = _.extend({}, defaults.terrain, config.terrain || {});
    var confExtended = _.extend({}, defaults, config);
    confExtended.texture = texture;
    confExtended.terrain = terrain;
    return confExtended;
};

function Dimensions(config) {

    var div = document.getElementById(config.div);
    var width = div.clientWidth;
    var height = div.clientHeight;

    var envelope = Envelope(config.bbox, config.crs, config.bboxCrs);

    var metersWidth = envelope.width();
    var metersHeight = envelope.height();

    //Adjust output image to canvas if not specified
    var imgWidth, imgHeight;
    if (!config.texture.imgWidth || !config.texture.imgHeight) {
        var imgCoefficient = metersWidth / metersHeight;
        if ((width / height) < imgCoefficient) {
            imgWidth = width;
            imgHeight = Math.round(imgWidth / imgCoefficient);
        } else {
            imgHeight = height;
            imgWidth = Math.round(imgHeight * imgCoefficient);
        }
    } else {
        imgWidth = config.texture.imgWidth;
        imgHeight = config.texture.imgHeight;
    }

    //Compute the resolution of the height model in the image (pixelsPerVertex)
    var demWidth = Math.round(imgWidth / config.terrain.pixelsPerVertex);
    var demHeight = Math.round(imgHeight / config.terrain.pixelsPerVertex);

    if (demWidth > metersWidth / config.terrain.wcsResolution) {
        //ajust to avoid stairs in the model - reduce dem to actual resolution
        demWidth = Math.round(metersWidth / config.terrain.wcsResolution);
        demHeight = Math.round(metersHeight / config.terrain.wcsResolution);
    }

    // mapunits between vertexes in x-dimention
    var proportionWidth = metersWidth / demWidth;

    // mapunits between vertexes in y-dimention
    var proportionHeight = metersHeight / demHeight;

    // average mapunits between vertexes
    var proportionAverage = ((proportionWidth + proportionHeight) / 2);

    if (config.zInv) {
        proportionAverage = proportionAverage * -1;
    }
    var zMult;
    if (config.zMult) {
        zMult = proportionAverage / config.zMult;
    } else {
        zMult = proportionAverage;
    }

    return {
        config: config,
        div: div,
        envelope: envelope,
        width: width,
        height: height,
        imgWidth: imgWidth,
        imgHeight: imgHeight,
        demWidth: demWidth,
        demHeight: demHeight,
        zMult: zMult,
        crs: config.crs
    };
}

function Wxs3Map(config) {
    config = extendDefaults(config || {});
    var dimensions = Dimensions(config);
    var texture = Texture(config.texture, dimensions);
    var terrain = Terrain(config.terrain, dimensions);
    var profiles;
    if (config.profiles) {
        profiles = Profiles(config.profiles, terrain, dimensions);
    }
    return new ThreeDMapUntiled(dimensions, terrain, texture, profiles);
}

window.Wxs3Map = Wxs3Map;

export default Wxs3Map;
