(function () {
    'use strict';

    // define factory
    angular.module('wapClient').service('wapService', ['$rootScope', 'wapResource', wapService]);
    wapService.$inject = ['$rootScope', 'wapResource'];
    function wapService($rootScope, wapResource) {

        // service public signature
        return {
            signIn: signIn,
            SummaryOfPriorSubmissions: SummaryOfPriorSubmissions,
            GetAllApplications:GetAllApplications,
            getStates: getStates,
            getInsuredAddressStateData: getInsuredAddressStateData,
            getCountiesByState: getCountiesByState,
            getUnderwritingQuestions: getUnderwritingQuestions,
            postUnderwritingAnswers: postUnderwritingAnswers,
            insertUpdateApplication: insertUpdateApplication,
            insertUpdateLocation: insertUpdateLocation,
            validateLocation: validateLocation,
            getQuoteNumberForApplication: getQuoteNumberForApplication,
            deleteSubQuestionAnswers: deleteSubQuestionAnswers,
            getApplicationDetails: getApplicationDetails,
            getConstructionTypes: getConstructionTypes,
            getConstructionTypesForTexasCommercial:getConstructionTypesForTexasCommercial,
            getRiskTypes: getRiskTypes,
            getRiskDescription: getRiskDescription,
            GetRiskTypeDescriptionTxCommercial: GetRiskTypeDescriptionTxCommercial,
            getRisksDropdownsData: getRisksDropdownsData,
            getLocationRisk: getLocationRisk,
            getLocationRiskForTexasCommercial:getLocationRiskForTexasCommercial,
            getMainLocationByApplication: getMainLocationByApplication,
            insertUpdateLocationCommercialWind: insertUpdateLocationCommercialWind,
            insertUpdateRiskCommercialWind: insertUpdateRiskCommercialWind,
            insertUpdateRiskCommercialWindForTexas:insertUpdateRiskCommercialWindForTexas,
            insertUpdateApplicant: insertUpdateApplicant,
            insertUpdateApplicationCommercialWindCitiZenPolicyNum: insertUpdateApplicationCommercialWindCitiZenPolicyNum,
            insertUpdateApplicationCommercialWindEffectiveDate: insertUpdateApplicationCommercialWindEffectiveDate,
            deleteLocationById: deleteLocationById,
            deleteRiskById: deleteRiskById,
            getRequiredDocuments: getRequiredDocuments,
            postComment: postComment,
            uploadDocument: uploadDocument,
            getIfCpnVisible: getIfCpnVisible,
            getOccupancyType: getOccupancyType,
            getPrequalification: getPrequalification,
            getComments: getComments,
            getHeaderDetails: getHeaderDetails,
            getApplicationStatus: getApplicationStatus,
            updateLastVisitedPage: updateLastVisitedPage,
            getLastVisitedPage: getLastVisitedPage,
            getMitigationFields: getMitigationFields,
            getWindMitigationFieldsForTexasCommercial:getWindMitigationFieldsForTexasCommercial,
            encryptData: encryptData,
            decryptData: decryptData,
            getSummaryDetails: getSummaryDetails,
            getSummaryDetailsTxCommercial: getSummaryDetailsTxCommercial,
            getSummaryHvhoDetails: getSummaryHvhoDetails,
            getIfEIFSVsible: getIfEIFSVsible,
            getDownloadLinks: getDownloadLinks,
            getQuotesForApplication: getQuotesForApplication,
            getApplicationQuotesForTexasCommercial:getApplicationQuotesForTexasCommercial,
            getBCEGS: getBCEGS,
            getBCEGSCommercialWindHVHO: getBCEGSCommercialWindHVHO,
            insertUpdateAdditionalInterests: insertUpdateAdditionalInterests,
            getAdditionalInterest: getAdditionalInterest,
            insertUpdateApplicationStatus: insertUpdateApplicationStatus,
            insertUpdateApplicationAgentName: insertUpdateApplicationAgentName,
            updateSelectedQuote: updateSelectedQuote,
            getLocationRiskPaymentPlan: getLocationRiskPaymentPlan,
            insertUpdateOrdinanceOrLawCoverage: insertUpdateOrdinanceOrLawCoverage,
            insertUpdatePaymentPlan: insertUpdatePaymentPlan,
            getBillingInfo: getBillingInfo,
            getOrdinanceOrLawCoverage: getOrdinanceOrLawCoverage,
            getInterestTypes: getInterestTypes,
            getFinancialInstitutions: getFinancialInstitutions,
            getLocationIdsByApplication: getLocationIdsByApplication,
            getRiskIdsByLocation: getRiskIdsByLocation,
            download: download,
            insertUpdatePolicyInterest: insertUpdatePolicyInterest,
            getPayPlan: getPayPlan,
            getRenewalPayPlan: getRenewalPayPlan,
            getPolicyInterestListByApplicationId: getPolicyInterestListByApplicationId,
            getPolicyInterestById: getPolicyInterestById,
            deletePolicyInterestById: deletePolicyInterestById,
            insertUpdateBillingInfo: insertUpdateBillingInfo,
            getRequiredDocumentsForBindingPhase: getRequiredDocumentsForBindingPhase,
            generatePDF: generatePDF,
            validateOccupancyTypeAndApproximateValue: validateOccupancyTypeAndApproximateValue,
            validateOccupancyTypeAndApproximateValueForSelectedAgency:validateOccupancyTypeAndApproximateValueForSelectedAgency,
            getAgencyNameByCode:getAgencyNameByCode,
            getOccupanyTypeQuestionsAndAnswerOptions:getOccupanyTypeQuestionsAndAnswerOptions,
            getOccupanyTypeSubQuestionsAndAnswerOptionsByQuestionId: getOccupanyTypeSubQuestionsAndAnswerOptionsByQuestionId,
            insertUpdateAnswerForSupplementaryQuestion: insertUpdateAnswerForSupplementaryQuestion,
            getSupplementaryQuestionAnswers: getSupplementaryQuestionAnswers,
            getLocationRiskForOccupanyInfo:getLocationRiskForOccupanyInfo,
            getPolicyDetailsByApplicationId: getPolicyDetailsByApplicationId,
            getPremiumAfterOLCoverage: getPremiumAfterOLCoverage,
            isFirstLossPolicy:isFirstLossPolicy,
            getEffectiveDateWindow: getEffectiveDateWindow,
            getCancelResetStatusByRole: getCancelResetStatusByRole,
            insertUpdateApplicationNoticeAccepted: insertUpdateApplicationNoticeAccepted,
            insertUpdateApplicationPropertyInsured: insertUpdateApplicationPropertyInsured,
            insertUpdateApplicationUWReview:insertUpdateApplicationUWReview,
            getNoticeAcceptedStatus: getNoticeAcceptedStatus,
            getPropertyInsuredStatus: getPropertyInsuredStatus,
            getUWReviewStatus: getUWReviewStatus,
            hasPremiumFinanceORMortgageeInPolicy:hasPremiumFinanceORMortgageeInPolicy,
            validateAgencyAccess: validateAgencyAccess,
            getAgentListByAgencyCode:getAgentListByAgencyCode,
            getPrintedAgentNameByApplicationId:getPrintedAgentNameByApplicationId,
            insertUpdateApplicationPDFAgentName: insertUpdateApplicationPDFAgentName,
            getReadOnlyThroughoutStatusByRole: getReadOnlyThroughoutStatusByRole,
            getAddCommentsStatusByRole: getAddCommentsStatusByRole,
            getSuspendAccessForUserStatusByRole: getSuspendAccessForUserStatusByRole,
            getAgencyOnlyApplicationsStatusByRole:getAgencyOnlyApplicationsStatusByRole,
            getChangeSystemStatusByRole:getChangeSystemStatusByRole,
            getTimeFrameLimitByRole: getTimeFrameLimitByRole,
            insertNotifications: insertNotifications,
            insertUpdateLoginDetails: insertUpdateLoginDetails,
            checkLoggedinUserStatus: checkLoggedinUserStatus,
            checkLoggedinUserBindingStatus: checkLoggedinUserBindingStatus,
            checkApplicationBindingStatus:checkApplicationBindingStatus,
            getBindingSuspendedStates: getBindingSuspendedStates,
            getAllAgencyList: getAllAgencyList,
            getAgentListForAgency:getAgentListForAgency,
            updateSystemStatusForAgency:updateSystemStatusForAgency,
            updateSystemStatusForAgent:updateSystemStatusForAgent,
            getStateForSuspend:getStateForSuspend,
            updateSystemStatusForState:updateSystemStatusForState,
            getPropertiesByRole: getPropertiesByRole,
            getUnderwritingQuestionsForHvho: getUnderwritingQuestionsForHvho,
            deleteApplicationDataOnProgramChange : deleteApplicationDataOnProgramChange,
            getLocationRiskHvho:getLocationRiskHvho,
            getConstructionTypesHvho:getConstructionTypesHvho,
            getRisksDropdownsDataHvho:getRisksDropdownsDataHvho,
            insertUpdateApplicantHvho: insertUpdateApplicantHvho,
            getQuestionsForPremiumSurcharges: getQuestionsForPremiumSurcharges,
            savePremiumSurchargesAnswersAndCalculateFactors: savePremiumSurchargesAnswersAndCalculateFactors,
            getAnswersForPremiumSurchagesQuestionsByApplicationId: getAnswersForPremiumSurchagesQuestionsByApplicationId,
            insertUpdateRiskCommercialWindHvho: insertUpdateRiskCommercialWindHvho,
            insertUpdateRiskForManualOverride:insertUpdateRiskForManualOverride,
            getRequiredDocumentsHVHOForQuoting: getRequiredDocumentsHVHOForQuoting,
            generateConsentToRateForm: generateConsentToRateForm,
            getApplicationDetailsForBoundPolicy: getApplicationDetailsForBoundPolicy,
            getOccupancyInformationQuestionsForHvho: getOccupancyInformationQuestionsForHvho,
            getAnswersForOccupancyInformationQuestionsHvhoByApplicationId: getAnswersForOccupancyInformationQuestionsHvhoByApplicationId,
            insertUpdateSupplementaryAnswersHvho: insertUpdateSupplementaryAnswersHvho,
            getLossAndPriorHomeownersWindstormHistory:getLossAndPriorHomeownersWindstormHistory,
            insertUpdatePriorHomeownersWindstormInsurance:insertUpdatePriorHomeownersWindstormInsurance,
            insertUpdateLossHistory: insertUpdateLossHistory,
            deleteSubQuestionAnswersForOccupancyInformationQuestionsHvho: deleteSubQuestionAnswersForOccupancyInformationQuestionsHvho,
            getDownloadLinksHvho:getDownloadLinksHvho,
            validateLocationRisk: validateLocationRisk,
            generateActivityReport: generateActivityReport,
            validateLocationHVHO: validateLocationHVHO,
            generatePDFHvho: generatePDFHvho,
            insertUpdateActiveHomeownersInsurance: insertUpdateActiveHomeownersInsurance,
            insertUpdateActiveFloodInsurance: insertUpdateActiveFloodInsurance,
            insertUpdateFloodInsuranceForTexasCommercial:insertUpdateFloodInsuranceForTexasCommercial,
            generateRejectionSelectionForm: generateRejectionSelectionForm,
            generateContentsCoverageExclusionForm: generateContentsCoverageExclusionForm,
            insertUpdateApplicationNewPurchase: insertUpdateApplicationNewPurchase,
            getLossHistoryListByApplicationId: getLossHistoryListByApplicationId,
            getFloodInsuranceListByApplicationIdForTexasCommercial:getFloodInsuranceListByApplicationIdForTexasCommercial,
            getHasFloodInsuranceByApplicationIdForTexasCommercial:getHasFloodInsuranceByApplicationIdForTexasCommercial,
            getFloodInsuranceByIdForTexasCommercial: getFloodInsuranceByIdForTexasCommercial,
            getLossHistoryById: getLossHistoryById,
            deleteAllLossHistoryByApplicationId: deleteAllLossHistoryByApplicationId,
            deleteAllFloodInsuranceByApplicationIdForTxCommercial:deleteAllFloodInsuranceByApplicationIdForTxCommercial,
            deleteLossHistoryById: deleteLossHistoryById,
            deleteFloodInsuranceByIdForTexasCommercial: deleteFloodInsuranceByIdForTexasCommercial,
            getHasLossHistoryByApplicationId: getHasLossHistoryByApplicationId,
            insertUpdateApplicationLossHistory: insertUpdateApplicationLossHistory,
            insertUpdateApplicationFloodInsuranceForTexasCommercial:insertUpdateApplicationFloodInsuranceForTexasCommercial,
            insertUpdateApplicationOffBuilderRisk: insertUpdateApplicationOffBuilderRisk,
            getOffBuilderRiskOrNewPurchaseStatus: getOffBuilderRiskOrNewPurchaseStatus,
            getRequiredDocumentsTexasForQuoting: getRequiredDocumentsTexasForQuoting,
            getHeaderDetailsTexas: getHeaderDetailsTexas,
            getUnderwritingQuestionsForTexasCommercial: getUnderwritingQuestionsForTexasCommercial,
            getAdditionalUnderwritingQuestionsForTexasCommercial:getAdditionalUnderwritingQuestionsForTexasCommercial,
            getPremiumForQuote: getPremiumForQuote,
            getRequiredDocumentsForBindingPhaseTxCommercial: getRequiredDocumentsForBindingPhaseTxCommercial,
            getContactInformationByApplicationIdForTexasCommercial:getContactInformationByApplicationIdForTexasCommercial,
            getCondominiumPropertyFormAnswerForTexasCommercial:getCondominiumPropertyFormAnswerForTexasCommercial,
            insertUpdateApplicationCondominiumPropertyForTexasCommercial:insertUpdateApplicationCondominiumPropertyForTexasCommercial,
            insertUpdateContactInformationForTexasCommercial:insertUpdateContactInformationForTexasCommercial,
            getApplicationDetailsForBoundPolicyForTexasCommercial: getApplicationDetailsForBoundPolicyForTexasCommercial,
            getBICategoryList: getBICategoryList,
            insertUpdateUserContactInformation: insertUpdateUserContactInformation,
            getUserContactInformation: getUserContactInformation,
            generatePDFTexas: generatePDFTexas,
            generateQuoteSheetHvho: generateQuoteSheetHvho,
            validateLocationTexasCommercial: validateLocationTexasCommercial,
            getUnderwritingQuestionsForClearingHouse: getUnderwritingQuestionsForClearingHouse
        };

        function signIn(data) {
            return wapResource.signIn(data);
        }
        function SummaryOfPriorSubmissions() {
            return wapResource.SummaryOfPriorSubmissions();
        }
        function GetAllApplications(hasTimeFrameLimit) {
            return wapResource.GetAllApplications(hasTimeFrameLimit);
        }

        function getStates() {
            return wapResource.getStates();
        }

        function getInsuredAddressStateData() {
            return wapResource.getInsuredAddressStateData();
        }

        function getCountiesByState(stateId) {
            return wapResource.getCountiesByState(stateId);
        }

        function getUnderwritingQuestions() {
            var defer = $.Deferred();
            var Underwriting = [];
            wapResource.getUnderwritingQuestions().then(function (data) {
                var questionObj;
                var answerObj;
                var underwritingObj;
                data.Question.forEach(function (qObj) {
                    questionObj = {
                        'QuestionId': qObj.QuestionId,
                        'QuestionText': qObj.QuestionText,
                        'QuestionType': qObj.QuestionType,
                        'MainQuestionId': qObj.MainQuestionId,
                        'QuestionCode':qObj.QuestionCode,
                        'AnswerType': qObj.AnswerType,
                        "Id": qObj.QuestionId,
                        "IsNumericFormat": qObj.IsNumericFormat
                    };

                    var answers = [];

                    data.Answers.forEach(function (aObj) {
                        var errorMessage;
                        if (aObj.QuestionId == qObj.QuestionId) {
                            if (aObj.WrongAnswerMessage != "") {
                                errorMessage = aObj.WrongAnswerMessage;
                            }
                            answerObj = {
                                'AnswerText': aObj.AnswerText,
                                'ExpectedAnswer': aObj.ExpectedAnswer,
                                'WrongAnswerMessage': errorMessage,
                                'AnswerId': aObj.AnswerId,
                                'IsCancelEnabled': aObj.IsCancelEnabled
                            };

                            answers.push(answerObj);
                        }
                    });

                    if(questionObj.AnswerType != 'Text'){
                        underwritingObj = {
                            'Question': questionObj,
                            'AnswerOption1': answers[0],
                            'AnswerOption2': answers[1],
                            'AnswerOption3': answers[2]
                        }
                    }
                    else{
                        underwritingObj = {
                            'Question': questionObj,
                            'AnswerOption1': ''
                        }
                    }
                    Underwriting.push(underwritingObj);
                });
                var retArr = _.uniq(Underwriting, false, function (p) { return p.Question.QuestionId; });
                defer.resolve(retArr);
            });
            return defer.promise();
        }

        function postUnderwritingAnswers(userData) {

            var applicationObject = {
                "ApplicationId": userData.ApplicationId,
                "Underwriting": {
                    "UnderwritingId": userData.UnderwritingId,
                    "Question": [{ "QuestionId": userData.QuestionId }],
                    "Answers": [{ "AnswerText": userData.AnswerText }]
                }
            };

            return wapResource.postUnderwritingAnswers(applicationObject);

        }

        function insertUpdateApplication(agentData) {
            return wapResource.insertUpdateApplication(agentData);
        }
        function insertUpdateLocation(agentData, id) {
            return wapResource.insertUpdateLocation(agentData, id);
        }

        function validateLocation(agentData, state) {
            return wapResource.validateLocation(agentData, state);
        }

        function validateLocationTexasCommercial(agentData, state) {
            return wapResource.validateLocationTexasCommercial(agentData, state);
        }

        function getQuoteNumberForApplication(applicationId) {
            var defer = $.Deferred();
            var quoteNumber;

            wapResource.getQuoteNumberForApplication(applicationId).then(function (data) {
                quoteNumber = data;
                defer.resolve(quoteNumber);
            });
            return defer.promise();
        }

        function deleteSubQuestionAnswers(userData) {
            var applicationObject = {
                "ApplicationId": userData.ApplicationId,
                "Underwriting": {
                    "UnderwritingId": userData.UnderwritingId,
                    "Question": [{ "QuestionId": userData.QuestionId }]
                }
            };

            return wapResource.deleteSubQuestionAnswers(applicationObject);
        }

        function getApplicationDetails(quoteNumber) {
            return wapResource.getApplicationDetails(quoteNumber);
        }

        function getConstructionTypes() {
            return wapResource.getConstructionTypes();
        }
        function getConstructionTypesForTexasCommercial() {
            return wapResource.getConstructionTypesForTexasCommercial();
        }
        function getRiskTypes() {
            return wapResource.getRiskTypes();
        }
        function getRiskDescription(occupancyType, riskType) {
            return wapResource.getRiskDescription(occupancyType, riskType);
        }
        function GetRiskTypeDescriptionTxCommercial(occupancyType, riskType) {
            return wapResource.GetRiskTypeDescriptionTxCommercial(occupancyType, riskType);
        }
        function getRisksDropdownsData() {
            return wapResource.getRisksDropdownsData();
        }
        function getLocationRisk(applicationId) {
            return wapResource.getLocationRisk(applicationId);
        }
        function getLocationRiskForTexasCommercial(applicationId) {
            return wapResource.getLocationRiskForTexasCommercial(applicationId);
        }

        function getMainLocationByApplication(ApplicationId) {
            return wapResource.getMainLocationByApplication(ApplicationId);
        }

        function insertUpdateLocationCommercialWind(ApplicationId, Data) {
            return wapResource.insertUpdateLocationCommercialWind(ApplicationId, Data);
        }
        function insertUpdateRiskCommercialWind(ApplicationId, Data) {
            return wapResource.insertUpdateRiskCommercialWind(ApplicationId, Data);
        }
        function insertUpdateRiskCommercialWindForTexas(ApplicationId, Data) {
            return wapResource.insertUpdateRiskCommercialWindForTexas(ApplicationId, Data);
        }
        function insertUpdateApplicant(Data, length) {
            return wapResource.insertUpdateApplicant(Data, length);
        }
        function insertUpdateApplicationCommercialWindCitiZenPolicyNum(Data) {
            return wapResource.insertUpdateApplicationCommercialWindCitiZenPolicyNum(Data);
        }
        function insertUpdateApplicationCommercialWindEffectiveDate(Data) {
            return wapResource.insertUpdateApplicationCommercialWindEffectiveDate(Data);
        }

        function deleteLocationById(id) {
            return wapResource.deleteLocationById(id);
        }

        function deleteRiskById(id) {
            return wapResource.deleteRiskById(id);
        }

        function getRequiredDocuments(applicationId) {
            return wapResource.getRequiredDocuments(applicationId);
        }

        function postComment(comment) {
            if (comment.CommentId == "" || comment.CommentId == undefined) {
                comment.CommentId = -1;
            }

            var object = {
                'ApplicationId': comment.applicationId,
                'CommentId': comment.CommentId,
                'Text': comment.Text
            };

            return wapResource.postComment(object);
        }

        function uploadDocument(document) {
            return wapResource.uploadDocument(document);
        }

        function getIfCpnVisible(applicationId) {
            return wapResource.getIfCpnVisible(applicationId);
        }
        function getOccupancyType(applicationId) {
            return wapResource.getOccupancyType(applicationId);
        }

        function getPrequalification(applicationId) {
            return wapResource.getPrequalification(applicationId);
        }
        function getComments(applicationId) {
            return wapResource.getComments(applicationId);
        }
        function getHeaderDetails(quoteNumber) {
            return wapResource.getHeaderDetails(quoteNumber);
        }

        function getApplicationStatus(applicationId) {
            return wapResource.getApplicationStatus(applicationId);
        }
        function updateLastVisitedPage(applicationId, pageNo) {
            return wapResource.updateLastVisitedPage(applicationId, pageNo);
        }
        function getLastVisitedPage(applicationId) {
            return wapResource.getLastVisitedPage(applicationId);
        }
        function getMitigationFields(dataArray) {
            return wapResource.getMitigationFields(dataArray);
        }

        function getWindMitigationFieldsForTexasCommercial(dataArray) {
            return wapResource.getWindMitigationFieldsForTexasCommercial(dataArray);
        }


        function getSummaryDetails(applicationId) {
            var defer = $.Deferred();
            wapResource.getSummaryDetails(applicationId).then(function (data) {
                defer.resolve(data);
            });
            return defer.promise();
        }

        function getSummaryDetailsTxCommercial(applicationId) {
            var defer = $.Deferred();
            wapResource.getSummaryDetailsTxCommercial(applicationId).then(function (data) {
                defer.resolve(data);
            });
            return defer.promise();
        }

        function getSummaryHvhoDetails(applicationId) {
            var defer = $.Deferred();
            wapResource.getSummaryHvhoDetails(applicationId).then(function (data) {
                defer.resolve(data);
            });
            return defer.promise();
        }

        function encryptData(actual) {

            // window.btoa() & window.atob() 11 :59 pm 1 april 12:00 2nd april
            /*var key = 100; //Any integer value
             var result = "";
             var d = new Date();
             var days = d.getDate();
             var no = d.getDay();
             var yr = d.getFullYear();
             var strActual = ((actual * days) + (no * yr)).toString();
             for (var i = 0; i < strActual.length; i++) {
             result += String.fromCharCode(key ^ strActual.charCodeAt(i));
             }
             return encodeURI(result);*/
            var result = window.btoa(actual);
            return encodeURI(result);
        }

        function decryptData(actual) {
            /* actual = decodeURI(actual); 
             var key = 100; //Any integer value
             var result = "";
             for (var i = 0; i < actual.length; i++) {
             result += String.fromCharCode(key ^ actual.charCodeAt(i));
             }
             var d = new Date();
             var days = d.getDate();
             var no = d.getDay();
             var yr = d.getFullYear();
             var strActual = ((parseInt(result) - (no * yr)) / days);
             return strActual;*/
            actual = decodeURI(actual);
            return window.atob(actual);
        }

        function getIfEIFSVsible(applicationId) {
            return wapResource.getIfEIFSVsible(applicationId);
        }
        function getDownloadLinks(phase) {
            return wapResource.getDownloadLinks(phase);
        }

        function getQuotesForApplication(applicationId) {
            return wapResource.getQuotesForApplication(applicationId);
        }

        function getApplicationQuotesForTexasCommercial(applicationId) {
            return wapResource.getApplicationQuotesForTexasCommercial(applicationId);
        }


        function getBCEGS(applicationId, location, programCode, yearBuilt, riskIndex) {
            return wapResource.getBCEGS(applicationId, location, programCode, yearBuilt, riskIndex);
        }

        function getBCEGSCommercialWindHVHO(applicationId, location, programCode) {
            return wapResource.getBCEGSCommercialWindHVHO(applicationId, location, programCode);
        }

        function insertUpdateAdditionalInterests(data, applicationId) {
            return wapResource.insertUpdateAdditionalInterests(data, applicationId);
        }

        function getAdditionalInterest(applicationId) {
            return wapResource.getAdditionalInterest(applicationId);
        }

        function insertUpdateApplicationStatus(applicationData) {
            return wapResource.insertUpdateApplicationStatus(applicationData);
        }

        function insertNotifications(applicationData) {
            return wapResource.insertNotifications(applicationData);
        }

        function insertUpdateApplicationAgentName(data) {
            return wapResource.insertUpdateApplicationAgentName(data);
        }

        function updateSelectedQuote(quoteId) {
            return wapResource.updateSelectedQuote(quoteId);
        }
        function getLocationRiskPaymentPlan(applicationId) {
            return wapResource.getLocationRiskPaymentPlan(applicationId);
        }

        function insertUpdateOrdinanceOrLawCoverage(data, applicationId) {
            return wapResource.insertUpdateOrdinanceOrLawCoverage(data, applicationId);
        }

        function insertUpdatePaymentPlan(payType, isFinanceCompany, applicationId) {
            return wapResource.insertUpdatePaymentPlan(payType, isFinanceCompany, applicationId);
        }

        function getBillingInfo(applicationId) {
            return wapResource.getBillingInfo(applicationId);
        }

        function getOrdinanceOrLawCoverage(data, applicationId) {
            return wapResource.getOrdinanceOrLawCoverage(data, applicationId);
        }

        function getInterestTypes() {
            return wapResource.getInterestTypes();
        }
        function getFinancialInstitutions() {
            return wapResource.getFinancialInstitutions();
        }

        function getLocationIdsByApplication(applicationId) {
            return wapResource.getLocationIdsByApplication(applicationId);
        }

        function getRiskIdsByLocation(locationId) {
            return wapResource.getRiskIdsByLocation(locationId);
        }

        function download() {
            return wapResource.download();
        }

        function insertUpdatePolicyInterest(data) {
            return wapResource.insertUpdatePolicyInterest(data);
        }

        function getPayPlan(applicationId, lob) {
            return wapResource.getPayPlan(applicationId, lob);
        }

        function getRenewalPayPlan() {
            return wapResource.getRenewalPayPlan();
        }

        function insertUpdateBillingInfo(data, applicationId) {
            return wapResource.insertUpdateBillingInfo(data, applicationId);
        }

        function getPolicyInterestListByApplicationId(applicationId) {
            return wapResource.getPolicyInterestListByApplicationId(applicationId);
        }

        function getPolicyInterestById(policyInterestId) {
            return wapResource.getPolicyInterestById(policyInterestId);
        }

        function deletePolicyInterestById(policyInterestId) {
            return wapResource.deletePolicyInterestById(policyInterestId);
        }

        function getRequiredDocumentsForBindingPhase(applicationId) {
            return wapResource.getRequiredDocumentsForBindingPhase(applicationId);
        }

        function getRequiredDocumentsForBindingPhaseTxCommercial(applicationId) {
            return wapResource.getRequiredDocumentsForBindingPhaseTxCommercial(applicationId);
        }

        function generatePDF(applicationId) {
            return wapResource.generatePDF(applicationId);
        }

        function generatePDFHvho(applicationId) {
            return wapResource.generatePDFHvho(applicationId);
        }

        function validateOccupancyTypeAndApproximateValue(occupancyType, approximateValue) {
            return wapResource.validateOccupancyTypeAndApproximateValue(occupancyType, approximateValue);
        }

        function validateOccupancyTypeAndApproximateValueForSelectedAgency(occupancyType, approximateValue,agencyId) {
            return wapResource.validateOccupancyTypeAndApproximateValueForSelectedAgency(occupancyType, approximateValue,agencyId);
        }

        function getAgencyNameByCode(agencyCode) {
            return wapResource.getAgencyNameByCode(agencyCode);
        }

        function getOccupanyTypeQuestionsAndAnswerOptions(applicationId, riskId) {
            return wapResource.getOccupanyTypeQuestionsAndAnswerOptions(applicationId, riskId);
        }

        function getOccupanyTypeSubQuestionsAndAnswerOptionsByQuestionId(data) {
            return wapResource.getOccupanyTypeSubQuestionsAndAnswerOptionsByQuestionId(data);
        }



        function insertUpdateAnswerForSupplementaryQuestion(dataObject, applicationData) {
            return wapResource.insertUpdateAnswerForSupplementaryQuestion(dataObject, applicationData);
        }

        function getSupplementaryQuestionAnswers(riskId) {
            return wapResource.getSupplementaryQuestionAnswers(riskId);
        }
        function getLocationRiskForOccupanyInfo(applicationId){
            return wapResource.getLocationRiskForOccupanyInfo(applicationId);
        }

        function getPolicyDetailsByApplicationId(applicationId){
            return wapResource.getPolicyDetailsByApplicationId(applicationId);
        }

        function getPremiumAfterOLCoverage(applicationId, riskIds) {
            return wapResource.getPremiumAfterOLCoverage(applicationId, riskIds);
        }
        function isFirstLossPolicy(applicationId) {
            return wapResource.isFirstLossPolicy(applicationId);
        }
        function getEffectiveDateWindow(applicationId) {
            var defer = $.Deferred();
            wapResource.getEffectiveDateWindow().then(function (data) {
                var arr = _.uniq(data, function (rw) { return rw.LOB; });
                var returnData = [];
                arr.forEach(function (obj) {

                    var range = _.filter(data, function(r){ return r.LOB == obj.LOB; });
                    if(range == undefined)
                        range = [];

                    var pushObj = {
                        "LOB": obj.LOB,
                        "Range": range
                    };
                    returnData.push(pushObj);
                });
                defer.resolve(returnData);
            });
            return defer.promise();
        }
        function insertUpdateApplicationNoticeAccepted(dataCheckbox, applicationId) {
            return wapResource.insertUpdateApplicationNoticeAccepted(dataCheckbox, applicationId);
        }
        function insertUpdateApplicationPropertyInsured(dataCheckbox, applicationId) {
            return wapResource.insertUpdateApplicationPropertyInsured(dataCheckbox, applicationId);
        }
        function insertUpdateApplicationUWReview(dataCheckbox, applicationId) {
            return wapResource.insertUpdateApplicationUWReview(dataCheckbox, applicationId);
        }
        function insertUpdateApplicationNewPurchase(value, applicationId) {
            return wapResource.insertUpdateApplicationNewPurchase(value, applicationId);
        }
        function insertUpdateApplicationOffBuilderRisk(value, applicationId) {
            return wapResource.insertUpdateApplicationOffBuilderRisk(value, applicationId);
        }
        function getNoticeAcceptedStatus(applicationId) {
            return wapResource.getNoticeAcceptedStatus(applicationId);
        }
        function getPropertyInsuredStatus(applicationId) {
            return wapResource.getPropertyInsuredStatus(applicationId);
        }
        function getUWReviewStatus(applicationId) {
            return wapResource.getUWReviewStatus(applicationId);
        }
        function getOffBuilderRiskOrNewPurchaseStatus(applicationId) {
            return wapResource.getOffBuilderRiskOrNewPurchaseStatus(applicationId);
        }
        function hasPremiumFinanceORMortgageeInPolicy(applicationId, payplan){
            return wapResource.hasPremiumFinanceORMortgageeInPolicy(applicationId, payplan);
        }

        function validateAgencyAccess(agencyId){
            return wapResource.validateAgencyAccess(agencyId);
        }

        function getCancelResetStatusByRole(role) {
            return wapResource.getCancelResetStatusByRole(role);
        }

        function getAgentListByAgencyCode() {
            return wapResource.getAgentListByAgencyCode();
        }
        function getPrintedAgentNameByApplicationId(applicationId) {
            return wapResource.getPrintedAgentNameByApplicationId(applicationId);
        }

        function insertUpdateApplicationPDFAgentName(data) {
            return wapResource.insertUpdateApplicationPDFAgentName(data);
        }

        function getReadOnlyThroughoutStatusByRole(role) {
            return wapResource.getReadOnlyThroughoutStatusByRole(role);
        }

        function getAddCommentsStatusByRole(role) {
            return wapResource.getAddCommentsStatusByRole(role);
        }

        function getSuspendAccessForUserStatusByRole(role) {
            return wapResource.getSuspendAccessForUserStatusByRole(role);
        }

        function getAgencyOnlyApplicationsStatusByRole(data) {
            return wapResource.getAgencyOnlyApplicationsStatusByRole(data);
        }

        function getChangeSystemStatusByRole(data) {
            return wapResource.getChangeSystemStatusByRole(data);
        }

        function getTimeFrameLimitByRole(data) {
            return wapResource.getTimeFrameLimitByRole(data);
        }

        function insertUpdateLoginDetails(data) {
            return wapResource.insertUpdateLoginDetails(data);
        }


        function checkLoggedinUserStatus(agencyId) {
            return wapResource.checkLoggedinUserStatus(agencyId);
        }

        function checkLoggedinUserBindingStatus(agencyId) {
            return wapResource.checkLoggedinUserBindingStatus(agencyId);
        }

        function checkApplicationBindingStatus(applicationId) {
            return wapResource.checkApplicationBindingStatus(applicationId);
        }

        function getBindingSuspendedStates() {
            return wapResource.getBindingSuspendedStates();
        }

        function getAllAgencyList() {
            return wapResource.getAllAgencyList();
        }

        function getAgentListForAgency(agencyCode) {
            return wapResource.getAgentListForAgency(agencyCode);
        }
        function updateSystemStatusForAgency(data) {
            return wapResource.updateSystemStatusForAgency(data);
        }
        function updateSystemStatusForAgent(data) {
            return wapResource.updateSystemStatusForAgent(data);
        }
        function getStateForSuspend() {
            return wapResource.getStateForSuspend();
        }

        function updateSystemStatusForState(data) {
            return wapResource.updateSystemStatusForState(data);
        }

        function getPropertiesByRole(role) {
            return wapResource.getPropertiesByRole(role);
        }

        function getUnderwritingQuestionsForHvho() {
            var defer = $.Deferred();
            var Underwriting = [];
            wapResource.getUnderwritingQuestionsForHvho().then(function (data) {
                var questionObj;
                var answerObj;
                var underwritingObj;
                data.Question.forEach(function (qObj) {
                    questionObj = {
                        'QuestionId': qObj.QuestionId,
                        'QuestionText': qObj.QuestionText,
                        'QuestionType': qObj.QuestionType,
                        'MainQuestionId': qObj.MainQuestionId,
                        'QuestionCode': qObj.QuestionCode,
                        'AnswerType': qObj.AnswerType,
                        "Id": qObj.QuestionId,
                        "IsNumericFormat": qObj.IsNumericFormat
                    };

                    var answers = [];

                    data.Answers.forEach(function (aObj) {
                        var errorMessage;
                        if (aObj.QuestionId == qObj.QuestionId) {
                            if (aObj.WrongAnswerMessage != "") {
                                errorMessage = aObj.WrongAnswerMessage;
                            }
                            answerObj = {
                                'AnswerText': aObj.AnswerText,
                                'ExpectedAnswer': aObj.ExpectedAnswer,
                                'WrongAnswerMessage': errorMessage,
                                'AnswerId': aObj.AnswerId,
                                'IsCancelEnabled': aObj.IsCancelEnabled
                            };

                            answers.push(answerObj);
                        }
                    });

                    if (questionObj.AnswerType != 'Text') {
                        underwritingObj = {
                            'Question': questionObj,
                            'AnswerOption1': answers[0],
                            'AnswerOption2': answers[1],
                            'AnswerOption3': answers[2]
                        }
                    }
                    else {
                        underwritingObj = {
                            'Question': questionObj,
                            'AnswerOption1': ''
                        }
                    }
                    Underwriting.push(underwritingObj);
                });
                var retArr = _.uniq(Underwriting, false, function (p) { return p.Question.QuestionId; });
                defer.resolve(retArr);
            });
            return defer.promise();
        }

        function deleteApplicationDataOnProgramChange(applicationId,occupancyType) {
            return wapResource.deleteApplicationDataOnProgramChange(applicationId,occupancyType);
        }
        function getLocationRiskHvho(applicationId) {
            return wapResource.getLocationRiskHvho(applicationId);
        }

        function getConstructionTypesHvho(applicationId) {
            return wapResource.getConstructionTypesHvho(applicationId);
        }

        function getRisksDropdownsDataHvho(yearBuilt,ConstructionTypeId) {
            return wapResource.getRisksDropdownsDataHvho(yearBuilt,ConstructionTypeId);
        }

        function insertUpdateApplicantHvho(applicationId, applicantName) {
            return wapResource.insertUpdateApplicantHvho(applicationId, applicantName);
        }

        function insertUpdateRiskCommercialWindHvho(ApplicationId, Data) {
            return wapResource.insertUpdateRiskCommercialWindHvho(ApplicationId, Data);
        }

        function insertUpdateRiskForManualOverride(ApplicationId, Data) {
            return wapResource.insertUpdateRiskForManualOverride(ApplicationId, Data);
        }


        function getQuestionsForPremiumSurcharges() {
            return wapResource.getQuestionsForPremiumSurcharges();
        }

        function savePremiumSurchargesAnswersAndCalculateFactors(data) {
            return wapResource.savePremiumSurchargesAnswersAndCalculateFactors(data);
        }

        function getAnswersForPremiumSurchagesQuestionsByApplicationId(applicationId) {
            return wapResource.getAnswersForPremiumSurchagesQuestionsByApplicationId(applicationId);
        }

        function getRequiredDocumentsHVHOForQuoting(applicationId) {
            return wapResource.getRequiredDocumentsHVHOForQuoting(applicationId);
        }
        function generateConsentToRateForm(applicationId) {
            return wapResource.generateConsentToRateForm(applicationId);
        }

        function getApplicationDetailsForBoundPolicy(applicationId) {
            return wapResource.getApplicationDetailsForBoundPolicy(applicationId);
        }
        function getApplicationDetailsForBoundPolicyForTexasCommercial(applicationId) {
            return wapResource.getApplicationDetailsForBoundPolicyForTexasCommercial(applicationId);
        }
        function getOccupancyInformationQuestionsForHvho(applicationId) {
            return wapResource.getOccupancyInformationQuestionsForHvho(applicationId);
        }

        function getAnswersForOccupancyInformationQuestionsHvhoByApplicationId(applicationId) {
            return wapResource.getAnswersForOccupancyInformationQuestionsHvhoByApplicationId(applicationId);
        }

        function insertUpdateSupplementaryAnswersHvho(data) {
            return wapResource.insertUpdateSupplementaryAnswersHvho(data);
        }

        function getLossAndPriorHomeownersWindstormHistory(applicationId) {
            return wapResource.getLossAndPriorHomeownersWindstormHistory(applicationId);
        }

        function insertUpdatePriorHomeownersWindstormInsurance(data) {
            return wapResource.insertUpdatePriorHomeownersWindstormInsurance(data);
        }

        function insertUpdateLossHistory(data) {
            return wapResource.insertUpdateLossHistory(data);
        }

        function deleteSubQuestionAnswersForOccupancyInformationQuestionsHvho(userData) {
            var applicationObject = {
                "ApplicationId": userData.ApplicationId,
                "Underwriting": {
                    "UnderwritingId": 0,
                    "Question": [{ "QuestionId": userData.QuestionId }]
                }
            };

            return wapResource.deleteSubQuestionAnswersForOccupancyInformationQuestionsHvho(applicationObject);
        }
        function getDownloadLinksHvho(phase) {
            return wapResource.getDownloadLinksHvho(phase);
        }

        function validateLocationRisk(applicationId){
            return wapResource.validateLocationRisk(applicationId);
        }

        function generateActivityReport() {
            return wapResource.generateActivityReport();
        }

        function validateLocationHVHO(agentData, applicationId) {
            return wapResource.validateLocationHVHO(agentData, applicationId);
        }

        function insertUpdateActiveHomeownersInsurance(data) {
            return wapResource.insertUpdateActiveHomeownersInsurance(data);
        }

        function insertUpdateActiveFloodInsurance(data) {
            return wapResource.insertUpdateActiveFloodInsurance(data);
        }

        function insertUpdateFloodInsuranceForTexasCommercial(data) {
            return wapResource.insertUpdateFloodInsuranceForTexasCommercial(data);
        }

        function generateRejectionSelectionForm(applicationId) {
            return wapResource.generateRejectionSelectionForm(applicationId);
        }

        function generateContentsCoverageExclusionForm(applicationId) {
            return wapResource.generateContentsCoverageExclusionForm(applicationId);
        }

        function getLossHistoryListByApplicationId(applicationId) {
            return wapResource.getLossHistoryListByApplicationId(applicationId);
        }
        function getFloodInsuranceListByApplicationIdForTexasCommercial(applicationId) {
            return wapResource.getFloodInsuranceListByApplicationIdForTexasCommercial(applicationId);
        }

        function getHasFloodInsuranceByApplicationIdForTexasCommercial(applicationId) {
            return wapResource.getHasFloodInsuranceByApplicationIdForTexasCommercial(applicationId);
        }

        function getLossHistoryById(id) {
            return wapResource.getLossHistoryById(id);
        }

        function getFloodInsuranceByIdForTexasCommercial(id) {
            return wapResource.getFloodInsuranceByIdForTexasCommercial(id);
        }

        function deleteAllLossHistoryByApplicationId(applicationId) {
            return wapResource.deleteAllLossHistoryByApplicationId(applicationId);
        }

        function deleteAllFloodInsuranceByApplicationIdForTxCommercial(applicationId) {
            return wapResource.deleteAllFloodInsuranceByApplicationIdForTxCommercial(applicationId);
        }

        function deleteLossHistoryById(id) {
            return wapResource.deleteLossHistoryById(id);
        }
        function deleteFloodInsuranceByIdForTexasCommercial(id) {
            return wapResource.deleteFloodInsuranceByIdForTexasCommercial(id);
        }

        function getHasLossHistoryByApplicationId(applicationId) {
            return wapResource.getHasLossHistoryByApplicationId(applicationId);
        }

        function insertUpdateApplicationLossHistory(hasLossHistory, applicationId) {
            return wapResource.insertUpdateApplicationLossHistory(hasLossHistory, applicationId);
        }

        function insertUpdateApplicationFloodInsuranceForTexasCommercial(hasFloodInsurance,condominiumProperty, applicationId) {
            return wapResource.insertUpdateApplicationFloodInsuranceForTexasCommercial(hasFloodInsurance, condominiumProperty, applicationId);
        }

        function getRequiredDocumentsTexasForQuoting(applicationId) {
            return wapResource.getRequiredDocumentsTexasForQuoting(applicationId);
        }

        function getHeaderDetailsTexas(quoteNumber) {
            return wapResource.getHeaderDetailsTexas(quoteNumber);
        }

        function getUnderwritingQuestionsForTexasCommercial() {
            var defer = $.Deferred();
            var Underwriting = [];
            wapResource.getUnderwritingQuestionsForTexasCommercial().then(function (data) {
                var questionObj;
                var answerObj;
                var underwritingObj;
                data.Question.forEach(function (qObj) {
                    questionObj = {
                        'QuestionId': qObj.QuestionId,
                        'QuestionText': qObj.QuestionText,
                        'QuestionType': qObj.QuestionType,
                        'MainQuestionId': qObj.MainQuestionId,
                        'QuestionCode':qObj.QuestionCode,
                        'AnswerType': qObj.AnswerType,
                        "Id": qObj.QuestionId,
                        "IsNumericFormat": qObj.IsNumericFormat
                    };

                    var answers = [];

                    data.Answers.forEach(function (aObj) {
                        var errorMessage;
                        if (aObj.QuestionId == qObj.QuestionId) {
                            if (aObj.WrongAnswerMessage != "") {
                                errorMessage = aObj.WrongAnswerMessage;
                            }
                            answerObj = {
                                'AnswerText': aObj.AnswerText,
                                'ExpectedAnswer': aObj.ExpectedAnswer,
                                'WrongAnswerMessage': errorMessage,
                                'AnswerId': aObj.AnswerId,
                                'IsCancelEnabled': aObj.IsCancelEnabled
                            };

                            answers.push(answerObj);
                        }
                    });

                    if(questionObj.AnswerType != 'Text'){
                        underwritingObj = {
                            'Question': questionObj,
                            'AnswerOption1': answers[0],
                            'AnswerOption2': answers[1],
                            'AnswerOption3': answers[2]
                        }
                    }
                    else{
                        underwritingObj = {
                            'Question': questionObj,
                            'AnswerOption1': ''
                        }
                    }
                    Underwriting.push(underwritingObj);
                });
                var retArr = _.uniq(Underwriting, false, function (p) { return p.Question.QuestionId; });
                defer.resolve(retArr);
            });
            return defer.promise();
        }

        function getAdditionalUnderwritingQuestionsForTexasCommercial() {
            return wapResource.getAdditionalUnderwritingQuestionsForTexasCommercial();
        }

        function getPremiumForQuote(applicationId, quoteId, occupancyType) {
            return wapResource.getPremiumForQuote(applicationId, quoteId, occupancyType)
        }

        function getContactInformationByApplicationIdForTexasCommercial(applicationId) {
            return wapResource.getContactInformationByApplicationIdForTexasCommercial(applicationId);
        }

        function getCondominiumPropertyFormAnswerForTexasCommercial(applicationId) {
            return wapResource.getCondominiumPropertyFormAnswerForTexasCommercial(applicationId);
        }

        function insertUpdateApplicationCondominiumPropertyForTexasCommercial(hasFloodInsurance, condominiumProperty, applicationId) {
            return wapResource.insertUpdateApplicationCondominiumPropertyForTexasCommercial(hasFloodInsurance, condominiumProperty, applicationId);
        }
        function insertUpdateContactInformationForTexasCommercial(data) {
            return wapResource.insertUpdateContactInformationForTexasCommercial(data);
        }

        function getBICategoryList(applicationId, noOfUnits, riskDescription) {
            return wapResource.getBICategoryList(applicationId, noOfUnits, riskDescription);
        }

        function insertUpdateUserContactInformation(data) {
            return wapResource.insertUpdateUserContactInformation(data);
        }

        function getUserContactInformation(applicationId) {
            return wapResource.getUserContactInformation(applicationId);
        }

        function generatePDFTexas(applicationId) {
            return wapResource.generatePDFTexas(applicationId);
        }

        function generateQuoteSheetHvho(applicationId, premiumFromService, isActionPrint) {
            return wapResource.generateQuoteSheetHvho(applicationId, premiumFromService, isActionPrint);
        }

        function getUnderwritingQuestionsForClearingHouse() {
            var defer = $.Deferred();
            var Underwriting = [];
            wapResource.getUnderwritingQuestionsForClearingHouse().then(function (data) {
                var questionObj;
                var answerObj;
                var underwritingObj;
                data.Question.forEach(function (qObj) {
                    questionObj = {
                        'QuestionId': qObj.QuestionId,
                        'QuestionText': qObj.QuestionText,
                        'QuestionType': qObj.QuestionType,
                        'MainQuestionId': qObj.MainQuestionId,
                        'QuestionCode': qObj.QuestionCode,
                        'AnswerType': qObj.AnswerType,
                        "Id": qObj.QuestionId,
                        "IsNumericFormat": qObj.IsNumericFormat
                    };

                    var answers = [];

                    data.Answers.forEach(function (aObj) {
                        var errorMessage;
                        if (aObj.QuestionId == qObj.QuestionId) {
                            if (aObj.WrongAnswerMessage != "") {
                                errorMessage = aObj.WrongAnswerMessage;
                            }
                            answerObj = {
                                'AnswerText': aObj.AnswerText,
                                'ExpectedAnswer': aObj.ExpectedAnswer,
                                'WrongAnswerMessage': errorMessage,
                                'AnswerId': aObj.AnswerId,
                                'IsCancelEnabled': aObj.IsCancelEnabled
                            };

                            answers.push(answerObj);
                        }
                    });

                    if (questionObj.AnswerType != 'Text') {
                        underwritingObj = {
                            'Question': questionObj,
                            'Answers': answers
                        }
                    }
                    else {
                        underwritingObj = {
                            'Question': questionObj,
                             'Answers': answers
                        }
                    }
                    Underwriting.push(underwritingObj);
                });
                var retArr = _.uniq(Underwriting, false, function (p) { return p.Question.QuestionId; });
                defer.resolve(retArr);
            });
            return defer.promise();
        }
    }
})();
