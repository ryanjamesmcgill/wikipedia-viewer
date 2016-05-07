var defectClasses = window.references.defectClasses;
var dataTypes = window.references.dataTypes;
var stepSets = window.references.stepSets;
var WorklistFormActionCreators = require('../actions/WorklistFormActionCreators');

function initializeWorklistFormOptions(){
    WorklistFormActionCreators.setOptionsDefectClasses(defectClasses);
    WorklistFormActionCreators.setOptionsDataTypes(dataTypes);
    WorklistFormActionCreators.setOptionsSavedStepSets(stepSets);
}

module.exports = {
    initializeWorklistFormOptions: initializeWorklistFormOptions
};