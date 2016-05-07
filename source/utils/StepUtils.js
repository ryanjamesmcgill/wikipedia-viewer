var _ = require('lodash');
var $ = require('jquery');
var StepActionCreators = require('../actions/StepActionCreators');
var stepArray = window.references.stepMaster;

function generateMasterSteps(){
    console.log('generate master steps');
    var getStaticData = true; //debugging parameter to use when API is not available
    
    if(getStaticData){
        StepActionCreators.setMasterSteps(stepArray);
        console.log('get static data');
    } else {
        StepActionCreators.setLoadingStatus(true);
        $.ajax({
            url: "http://105.193.20.157:3031/api/steps",
            type: "GET",
            crossDomain: true,
            dataType: "json",
            success: function(data){
                var arrayData = JSON.parse(data);
                console.log('success from api request');
                StepActionCreators.setMasterSteps(arrayData);
                StepActionCreators.setLoadingStatus(false);
            },
            error: function(xhr, status, error){
                console.log('error from api request');
                alert("Uh oh! There seems to be a problem contacting the server."
                        + "\nPlease contact Ryan McGill (r.mcgill@samsung.com)"
                        + "\nstatus: " + status);
                StepActionCreators.setLoadingStatus(false);
            },
            timeout: 7000
        });
    }
}

function filterTest(row, filters){
    var pass = true;
    _.forEach(filters,function(filterObj, key){
        var value = filterObj.value;
        if(value !== ""){
        pass = pass && (row[key].toLowerCase().indexOf(value) !== -1);
        }
    });
    return pass;
}

function sortWorklist(WorklistSteps){
    WorklistSteps.sort(
        function(a,b){
            var aStep = a.stepseq;
            var bStep = b.stepseq;
            if(aStep < bStep){
                return -1;
            } else if(aStep > bStep){
                return 1;
            } else {
                return 0;
            }
        });
}

function autoCorrelateToScans(WorklistSteps){
    _.forEach(WorklistSteps,
        function(stepObj){
            if(!stepObj.isScan){
                //process step
                var index = _.indexOf(WorklistSteps, stepObj);
                var sublist = _.slice(WorklistSteps, index);
                var nextScan= _.find(sublist,function(o){return o.isScan});
                if(nextScan){
                    stepObj.scanstep=nextScan.stepseq;
                } else {
                    stepObj.scanstep=null;
                }
            }
        }
    );
    
}

module.exports = {
    generateMasterSteps: generateMasterSteps,
    filterTest: filterTest,
    sortWorklist: sortWorklist,
    autoCorrelateToScans: autoCorrelateToScans
};