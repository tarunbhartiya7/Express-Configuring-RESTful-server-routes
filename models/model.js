/**
 * Created by Tarun on 8/17/2016.
 */

var mongoose = require('mongoose');

//create schema
var islandSchema = mongoose.Schema({
    name: String,
    popularFor: String,
    population: Number,
});

//create model that uses schema
mongoose.model('Island', islandSchema, 'islands');