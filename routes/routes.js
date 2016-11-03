/**
 * Created by Tarun on 8/17/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Island = mongoose.model('Island');

router.post('/', function (req, res) {
    //CREATE a new island document
    var name = req.body.name;
    var popularFor = req.body.popularFor;
    var population = req.body.population;
    
    var island = new Island({
        name: name ,
        popularFor: popularFor ,
        population: population
    });

    island.save(function (err, island) {
        if(err)
             res.send({error:err});
        res.json({message:'Island added', island:island});
    });
});

router.get('/', function (req, res) {
    //RETRIEVE all island documents
    Island.find({}, function (err, islands) {
        if(err)
            res.send({error:err});
        res.json(islands);
    });
});

router.get('/:id', function (req, res) {
    //RETRIEVE a single island document by id
    Island.findById(req.params.id, function (err, island) {
        if(err)
            res.send({error:err});
        res.json(island);
    });
});
//
router.put('/:id', function (req, res) {
    //UPDATE a single island document by id
    var id = req.params.id;
    var name = req.body.name;
    var popularFor = req.body.popularFor;
    var population = req.body.population;

    Island.findById(id, function (err, island) {
        if(err)
            res.send({error:err});
        island.name = name;
        island.popularFor = popularFor;
        island.population = population;

        island.save(function (err, island) {
            if(err)
                res.send({error:err});
            res.json({message:'Island updated'});
        });
    });

});

router.delete('/:id', function (req, res) {
    //DELETE a single island document by id
    var id = req.params.id;

    Island.findById(id, function (err, island) {
        if(err)
            res.send({error:err});
        Island.remove({_id:id}, function(err, island){
            if(err)
                res.send({error:err});
            res.json({message: 'Island deleted'});
        });
    });
});

module.exports = router;