Wxs3Map
=======

NOTE: This is a fork of wxs.threejs, for the original version please refer to [the original reposityory](https://github.com/jarped/wxs.threejs).

Wxs3Map is a lightweight JavaScript library build on top of the great [three.js](https://threejs.org) library.

The main purpose is to facilitate showing small 3d-blocks of the world, using the OGC services WCS for elevation data and WMS/WMTS for textures (maps or sattelite/aerial photos).

Usage
-----

The recommended way to use wxs.threejs2 is by some tool like Webpack or browserify:

```npm install wxs3map --save```

And then

```import Wxs3Map from 'wxs3map';```


If you want to include this as a "traditional" js package, add the 

```build/Wxs3Map.min.js```

to your project, as well as

```build/trackball.js```

and the libraries:

- three.js
- underscore
- proj4js


Configuration
=============

A new 3d-scene is created using the following syntax


```var threeDMap = window.Wxs3Map.default(options);```

Here options is an object of the following structure:

| Option        | Type             | Default    | Description |
| ------------- | ---------------- | ---------- | ----------- |
| div           | String           | null       | Id of div to place scene in  |
| bbox          | String           | null       | Bounding box of area to show |
| bboxCrs       | String           | EPSG:4326  | Crs of bbox            |
| wireframe     | Boolean          | false      | Show wireframe (for debugging)            |
| zMult         | Number           | 1          | Factor to adjust z-values (height) by            |
| crs           | String           | EPSG:32633 | Internal coordinate system of scene            |
| texture       | TextureOptions   |            | Configure texture, see below |
| terrain       | TerrainOptions   |            | Configure terrain, see below |
| profiles      | ProfileOptions[] |            | Configure texture, see below |

*TextureOptions*

| Option        | Type             | Default    | Description |
| ------------- | ---------------- | ---------- | ----------- |
| type          | String           | wms        | Type of texture (wms or image)  |
| wmsUrl        | String           | http://openwms.statkart.no/skwms1/wms.topo2 | Url to wms server |
| wmsLayers     | String           | topo2_WMS  | Wms layers to use            |
| wmsFormat     | String           | image/png  | Wms format            |
| imgUrl        | String           | null       | Path to image used for texture if type = image|

*TerrainOptions*

| Option          | Type             | Default        | Description |
| --------------- | ---------------- | -------------- | ----------- |
| pixelsPerVertex | Integer          | 8              | Resolution of the height model in the image  |
| wcsResolution   | Integer          | 10             | Resolution of grid cell in meters |
| coverage        | String           | land_utm33_10m | Wcs coverage to use |
| format          | String           | geotiff        | WCS format (geotiff or xyz) |
| showBox         | Boolean          | true           | Show a box around the terrain slice |
| boxColor        | Hex color        | 0xdddddd       | Color of the box around the terrain slice |

ProfileOptions



Development
-----------

1. ```npm install```
2. ```npm run dev-server```
3. Navigate the browser to http://localhost:8080/demos/


