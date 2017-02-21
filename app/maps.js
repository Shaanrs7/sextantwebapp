/**
 * Created by johan on 2/20/2017.
 */
import * as _ from 'lodash';
import 'bootstrap-loader';
//import * as messenger from './socket.js';
import {ViewerWrapper} from './cesiumlib';

console.log('creating the wrapper');
const viewerWrapper = new ViewerWrapper('http://localhost', 3001, 1, 'cesiumContainer');
const viewer = viewerWrapper.viewer;
const camera = viewer.scene.camera;
