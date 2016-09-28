Wxs3Map
=======

NOTE: This is a fork of wxs.threejs, for the original version please refer to [the original reposityory](https://github.com/jarped/wxs.threejs).

Wxs3Map is a lightweight JavaScript library build on top of the great [three.js](https://threejs.org) library.

The main purpose is to facilitate showing small 3d-blocks of the world, using the OGC services WCS for elevation data and WMS/WMTS for textures (maps or sattelite/aerial photos).

Usage
-----

The recommended way to use wxs.threejs2 is by some tool like Webpack or browserify:

```
npm install wxs3map --save
```

And then

```
import Wxs3Map from 'wxs3map';
```


If you want to include this as a "traditional" js package, add the 

```build/Wxs3Map.min.js```

to your project, as well as

```build/trackball.js```

and the libraries:

- three.js
- underscore
- proj4js

Development
-----------

1. ```npm install```
2. ```npm run dev-server```
3. Navigate the browser to http://localhost:8080/demos/

