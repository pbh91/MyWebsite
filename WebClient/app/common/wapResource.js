(function () {
    'use strict';

    /* @ngdoc object
     * @name TicketResource
     *
     * @description
     *
     */
    angular.module('wapClient').service('wapResource', ['dataContext', wapResource]);
    wapResource.$inject = ['dataContext'];
    function wapResource(dataContext) {
        return {
            signIn: signIn,
            SummaryOfPriorSubmissions: SummaryOfPriorSubmissions,
            GetAllApplications: GetAllApplications,
            getStates: getStates,
            getInsuredAddressStateData:getInsuredAddressStateData,
            getCountiesByState: getCountiesByState,
            insertUpdateApplication: insertUpdateApplication,
            insertUpdateLocation: insertUpdateLocation,
            validateLocation: validateLocation,
            getUnderwritingQuestions: getUnderwritingQuestions,
            postUnderwritingAnswers: postUnderwritingAnswers,
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
            getApplicationStatus:getApplicationStatus,
            updateLastVisitedPage:updateLastVisitedPage,
            getLastVisitedPage:getLastVisitedPage,
            getMitigationFields:getMitigationFields,
            getWindMitigationFieldsForTexasCommercial:getWindMitigationFieldsForTexasCommercial,
            getSummaryDetails: getSummaryDetails,
            getSummaryDetailsTxCommercial: getSummaryDetailsTxCommercial,
            getSummaryHvhoDetails: getSummaryHvhoDetails,
            getIfEIFSVsible: getIfEIFSVsible,
            getDownloadLinks: getDownloadLinks,
            getQuotesForApplication: getQuotesForApplication,
            getApplicationQuotesForTexasCommercial:getApplicationQuotesForTexasCommercial,
            getBCEGS: getBCEGS,
            getBCEGSCommercialWindHVHO: getBCEGSCommercialWindHVHO,
            insertUpdateAdditionalInterests:insertUpdateAdditionalInterests,
            getAdditionalInterest: getAdditionalInterest,
            insertUpdateApplicationStatus: insertUpdateApplicationStatus,
            insertUpdateApplicationAgentName: insertUpdateApplicationAgentName,
            updateSelectedQuote: updateSelectedQuote,
            getLocationRiskPaymentPlan:getLocationRiskPaymentPlan,
            insertUpdateOrdinanceOrLawCoverage:insertUpdateOrdinanceOrLawCoverage,
            insertUpdatePaymentPlan:insertUpdatePaymentPlan,
            getBillingInfo: getBillingInfo,
            getOrdinanceOrLawCoverage:getOrdinanceOrLawCoverage,
            getInterestTypes:getInterestTypes,
            getFinancialInstitutions:getFinancialInstitutions,
            getLocationIdsByApplication:getLocationIdsByApplication,
            getRiskIdsByLocation: getRiskIdsByLocation,
            download: download,
            insertUpdatePolicyInterest:insertUpdatePolicyInterest,
            getPayPlan:getPayPlan,
            getRenewalPayPlan:getRenewalPayPlan,
            getPolicyInterestListByApplicationId: getPolicyInterestListByApplicationId,
            getPolicyInterestById:getPolicyInterestById,
            deletePolicyInterestById:deletePolicyInterestById,
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
            getCancelResetStatusByRole: getCancelResetStatusByRole,
            getEffectiveDateWindow:getEffectiveDateWindow,
            insertUpdateApplicationNoticeAccepted: insertUpdateApplicationNoticeAccepted,
            insertUpdateApplicationPropertyInsured: insertUpdateApplicationPropertyInsured,
            insertUpdateApplicationUWReview : insertUpdateApplicationUWReview,
            getNoticeAcceptedStatus: getNoticeAcceptedStatus,
            getPropertyInsuredStatus: getPropertyInsuredStatus,
            getUWReviewStatus: getUWReviewStatus,
            hasPremiumFinanceORMortgageeInPolicy:hasPremiumFinanceORMortgageeInPolicy,
            validateAgencyAccess :validateAgencyAccess,
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
            deleteApplicationDataOnProgramChange: deleteApplicationDataOnProgramChange,
            getLocationRiskHvho: getLocationRiskHvho,
            getConstructionTypesHvho: getConstructionTypesHvho,
            getRisksDropdownsDataHvho: getRisksDropdownsDataHvho,
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
            getLossHistoryById: getLossHistoryById,
            getFloodInsuranceByIdForTexasCommercial:getFloodInsuranceByIdForTexasCommercial,
            deleteAllLossHistoryByApplicationId: deleteAllLossHistoryByApplicationId,
            deleteAllFloodInsuranceByApplicationIdForTxCommercial:deleteAllFloodInsuranceByApplicationIdForTxCommercial,
            deleteLossHistoryById: deleteLossHistoryById,
            deleteFloodInsuranceByIdForTexasCommercial:deleteFloodInsuranceByIdForTexasCommercial,
            getHasLossHistoryByApplicationId: getHasLossHistoryByApplicationId,
            insertUpdateApplicationLossHistory: insertUpdateApplicationLossHistory,
            insertUpdateApplicationFloodInsuranceForTexasCommercial: insertUpdateApplicationFloodInsuranceForTexasCommercial,
            insertUpdateApplicationOffBuilderRisk: insertUpdateApplicationOffBuilderRisk,
            getOffBuilderRiskOrNewPurchaseStatus: getOffBuilderRiskOrNewPurchaseStatus,
            getRequiredDocumentsTexasForQuoting: getRequiredDocumentsTexasForQuoting,
            getHeaderDetailsTexas: getHeaderDetailsTexas,
            getUnderwritingQuestionsForTexasCommercial: getUnderwritingQuestionsForTexasCommercial,
            getAdditionalUnderwritingQuestionsForTexasCommercial: getAdditionalUnderwritingQuestionsForTexasCommercial,
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
            return dataContext.signIn(data);
        }
        function SummaryOfPriorSubmissions() {
            return dataContext.SummaryOfPriorSubmissions();
        }
        function GetAllApplications(hasTimeFrameLimit) {
            return dataContext.GetAllApplications(hasTimeFrameLimit);
        }
        function getStates() {
            return dataContext.getStates();
        }

        function getInsuredAddressStateData() {
            return dataContext.getInsuredAddressStateData();
        }

        function getCountiesByState(stateId) {
            return dataContext.getCountiesByState(stateId);
        }
        function insertUpdateApplication(agentData) {
            return dataContext.insertUpdateApplication(agentData);
        }
        function insertUpdateLocation(agentData, id) {
            return dataContext.insertUpdateLocation(agentData, id);
        }

        function validateLocation(agentData, state) {
            return dataContext.validateLocation(agentData, state);
        }

        function validateLocationTexasCommercial(agentData, state) {
            return dataContext.validateLocationTexasCommercial(agentData, state);
        }

        function getUnderwritingQuestions() {
            return dataContext.getUnderwritingQuestions();
        }

        function postUnderwritingAnswers(userData) {
            return dataContext.postUnderwritingAnswers(userData)
        }

        function getQuoteNumberForApplication(applicationId) {
            return dataContext.getQuoteNumberForApplication(applicationId);
        }

        function deleteSubQuestionAnswers(userData) {
            return dataContext.deleteSubQuestionAnswers(userData);
        }

        function getApplicationDetails(quoteNumber) {
            return dataContext.getApplicationDetails(quoteNumber);
        }

        function getConstructionTypes() {
            return dataContext.getConstructionTypes();
        }
        function getConstructionTypesForTexasCommercial() {
            return dataContext.getConstructionTypesForTexasCommercial();
        }
        function getRiskTypes() {
            return dataContext.getRiskTypes();
        }
        function getRiskDescription(occupancyType, riskType) {
            return dataContext.getRiskDescription(occupancyType, riskType);
        }
        function GetRiskTypeDescriptionTxCommercial(occupancyType, riskType) {
            return dataContext.GetRiskTypeDescriptionTxCommercial(occupancyType, riskType);
        }
        function getRisksDropdownsData() {
            return dataContext.getRisksDropdownsData();
        }
        function getLocationRisk(applicationId) {
            return dataContext.getLocationRisk(applicationId);
        }

        function getLocationRiskForTexasCommercial(applicationId) {
            return dataContext.getLocationRiskForTexasCommercial(applicationId);
        }


        function getMainLocationByApplication(applicationId) {
            return dataContext.getMainLocationByApplication(applicationId);
        }

        function insertUpdateLocationCommercialWind(ApplicationId, Data) {
            return dataContext.insertUpdateLocationCommercialWind(ApplicationId, Data);
        }

        function insertUpdateRiskCommercialWind(ApplicationId, Data) {
            return dataContext.insertUpdateRiskCommercialWind(ApplicationId, Data);
        }
        function insertUpdateRiskCommercialWindForTexas(ApplicationId, Data) {
            return dataContext.insertUpdateRiskCommercialWindForTexas(ApplicationId, Data);
        }


        function insertUpdateApplicant(Data, length) {
            return dataContext.insertUpdateApplicant(Data, length);
        }
        function insertUpdateApplicationCommercialWindCitiZenPolicyNum(Data) {
            return dataContext.insertUpdateApplicationCommercialWindCitiZenPolicyNum(Data);
        }
        function insertUpdateApplicationCommercialWindEffectiveDate(Data) {
            return dataContext.insertUpdateApplicationCommercialWindEffectiveDate(Data);
        }
        function deleteLocationById(id) {
            return dataContext.deleteLocationById(id);
        }

        function deleteRiskById(id) {
            return dataContext.deleteRiskById(id);
        }


        function getRequiredDocuments(applicationId) {
            return dataContext.getRequiredDocuments(applicationId);
        }

        function postComment(comment) {
            return dataContext.postComment(comment);
        }

        function uploadDocument(document) {
            return dataContext.uploadDocument(document);
        }

        function getIfCpnVisible(applicationId) {
            return dataContext.getIfCpnVisible(applicationId);
        }

        function getOccupancyType(applicationId) {
            return dataContext.getOccupancyType(applicationId);
        }

        function getPrequalification(applicationId) {
            return dataContext.getPrequalification(applicationId);
        }

        function getComments(applicationId) {
            return dataContext.getComments(applicationId);
        }

        function getHeaderDetails(quoteNumber) {
            return dataContext.getHeaderDetails(quoteNumber);
        }

        function getApplicationStatus(applicationId) {
            return dataContext.getApplicationStatus(applicationId);
        }

        function updateLastVisitedPage(applicationId, pageNo) {
            return dataContext.updateLastVisitedPage(applicationId, pageNo);
        }

        function getLastVisitedPage(applicationId) {
            return dataContext.getLastVisitedPage(applicationId);
        }

        function getMitigationFields(dataArray) {
            return dataContext.getMitigationFields(dataArray);

        }
        function getWindMitigationFieldsForTexasCommercial(dataArray) {
            return dataContext.getWindMitigationFieldsForTexasCommercial(dataArray);
        }

        function getSummaryDetails(applicationId) {
            return dataContext.getSummaryDetails(applicationId);
        }

        function getSummaryDetailsTxCommercial(applicationId) {
            return dataContext.getSummaryDetailsTxCommercial(applicationId);
        }

        function getSummaryHvhoDetails(applicationId) {
            return dataContext.getSummaryHvhoDetails(applicationId);
        }

        function getIfEIFSVsible(applicationId) {
            return dataContext.getIfEIFSVsible(applicationId);
        }

        function getDownloadLinks(phase) {
            return dataContext.getDownloadLinks(phase);
        }
        function getQuotesForApplication(applicationId) {
            return dataContext.getQuotesForApplication(applicationId);
        }
        function getApplicationQuotesForTexasCommercial(applicationId) {
            return dataContext.getApplicationQuotesForTexasCommercial(applicationId);
        }

        function getBCEGS(applicationId, location, programCode, yearBuilt, riskIndex) {
            return dataContext.getBCEGS(applicationId, location, programCode, yearBuilt, riskIndex);
        }

        function getBCEGSCommercialWindHVHO(applicationId, location, programCode) {
            return dataContext.getBCEGSCommercialWindHVHO(applicationId, location, programCode);
        }

        function insertUpdateAdditionalInterests(data,applicationId) {
            return dataContext.insertUpdateAdditionalInterests(data,applicationId);
        }

        function getAdditionalInterest(applicationId) {
            return dataContext.getAdditionalInterest(applicationId);
        }

        function insertUpdateApplicationStatus(applicationData) {
            return dataContext.insertUpdateApplicationStatus(applicationData);
        }

        function insertNotifications(applicationData) {
            return dataContext.insertNotifications(applicationData);
        }

        function insertUpdateApplicationAgentName(data) {
            return dataContext.insertUpdateApplicationAgentName(data);
        }

        function updateSelectedQuote(quoteId) {
            return dataContext.updateSelectedQuote(quoteId);
        }

        function getLocationRiskPaymentPlan(applicationId){
            return dataContext.getLocationRiskPaymentPlan(applicationId);
        }

        function insertUpdateOrdinanceOrLawCoverage(data,applicationId) {
            return dataContext.insertUpdateOrdinanceOrLawCoverage(data,applicationId);
        }

        function insertUpdatePaymentPlan(payType, isFinanceCompany,applicationId){
            return dataContext.insertUpdatePaymentPlan(payType, isFinanceCompany,applicationId);
        }

        function getBillingInfo(applicationId) {
            return dataContext.getBillingInfo(applicationId);
        }

        function getOrdinanceOrLawCoverage(data,applicationId){
            return dataContext.getOrdinanceOrLawCoverage(data,applicationId);
        }

        function getInterestTypes(){
            return dataContext.getInterestTypes();
        }
        function getFinancialInstitutions(){
            return dataContext.getFinancialInstitutions();
        }
        function getLocationIdsByApplication(applicationId) {
            return dataContext.getLocationIdsByApplication(applicationId);
        }

        function getRiskIdsByLocation(locationId) {
            return dataContext.getRiskIdsByLocation(locationId);
        }

        function download() {
            return dataContext.download();
        }

        function insertUpdatePolicyInterest(data){
            return dataContext.insertUpdatePolicyInterest(data);
        }

        function getPayPlan(applicationId, lob) {
            return dataContext.getPayPlan(applicationId, lob);
        }

        function getRenewalPayPlan() {
            return dataContext.getRenewalPayPlan();
        }

        function insertUpdateBillingInfo(data, applicationId){
            return dataContext.insertUpdateBillingInfo(data, applicationId);
        }

        function getPolicyInterestListByApplicationId(applicationId) {
            return dataContext.getPolicyInterestListByApplicationId(applicationId);
        }

        function getPolicyInterestById(policyInterestId) {
            return dataContext.getPolicyInterestById(policyInterestId);
        }

        function deletePolicyInterestById(policyInterestId){
            return dataContext.deletePolicyInterestById(policyInterestId);
        }

        function getRequiredDocumentsForBindingPhase(applicationId) {
            return dataContext.getRequiredDocumentsForBindingPhase(applicationId);
        }

        function getRequiredDocumentsForBindingPhaseTxCommercial(applicationId) {
            return dataContext.getRequiredDocumentsForBindingPhaseTxCommercial(applicationId);
        }

        function generatePDF(applicationId) {
            return dataContext.generatePDF(applicationId);
        }

        function generatePDFHvho(applicationId) {
            return dataContext.generatePDFHvho(applicationId);
        }

        function validateOccupancyTypeAndApproximateValue(occupancyType, approximateValue) {
            return dataContext.validateOccupancyTypeAndApproximateValue(occupancyType, approximateValue);
        }
        function validateOccupancyTypeAndApproximateValueForSelectedAgency(occupancyType, approximateValue,agencyId) {
            return dataContext.validateOccupancyTypeAndApproximateValueForSelectedAgency(occupancyType, approximateValue,agencyId);
        }

        function getAgencyNameByCode(agencyCode) {
            return dataContext.getAgencyNameByCode(agencyCode);
        }

        function getOccupanyTypeQuestionsAndAnswerOptions(applicationId, riskId) {
            return dataContext.getOccupanyTypeQuestionsAndAnswerOptions(applicationId, riskId);
        }

        function getOccupanyTypeSubQuestionsAndAnswerOptionsByQuestionId(data) {
            return dataContext.getOccupanyTypeSubQuestionsAndAnswerOptionsByQuestionId(data);
        }


        function insertUpdateAnswerForSupplementaryQuestion(dataObject, applicationData) {
            return dataContext.insertUpdateAnswerForSupplementaryQuestion(dataObject, applicationData);
        }

        function getSupplementaryQuestionAnswers(riskId) {
            return dataContext.getSupplementaryQuestionAnswers(riskId);
        }
        function getLocationRiskForOccupanyInfo(applicationId){
            return dataContext.getLocationRiskForOccupanyInfo(applicationId);
        }
        function getPolicyDetailsByApplicationId(applicationId){
            return dataContext.getPolicyDetailsByApplicationId(applicationId);
        }

        function getPremiumAfterOLCoverage(applicationId, riskIds) {
            return dataContext.getPremiumAfterOLCoverage(applicationId, riskIds);
        }

        function isFirstLossPolicy(applicationId) {
            return dataContext.isFirstLossPolicy(applicationId);
        }

        function getEffectiveDateWindow(applicationId) {
            return dataContext.getEffectiveDateWindow(applicationId);
        }

        function getCancelResetStatusByRole(role) {
            return dataContext.getCancelResetStatusByRole(role);
        }
        function insertUpdateApplicationNoticeAccepted(dataCheckbox, applicationId) {
            return dataContext.insertUpdateApplicationNoticeAccepted(dataCheckbox, applicationId);
        }
        function insertUpdateApplicationPropertyInsured(dataCheckbox, applicationId) {
            return dataContext.insertUpdateApplicationPropertyInsured(dataCheckbox, applicationId);
        }
        function insertUpdateApplicationUWReview(dataCheckbox, applicationId) {
            return dataContext.insertUpdateApplicationUWReview(dataCheckbox, applicationId);
        }
        function insertUpdateApplicationNewPurchase(value, applicationId) {
            return dataContext.insertUpdateApplicationNewPurchase(value, applicationId);
        }
        function insertUpdateApplicationOffBuilderRisk(value, applicationId) {
            return dataContext.insertUpdateApplicationOffBuilderRisk(value, applicationId);
        }
        function getNoticeAcceptedStatus(applicationId) {
            return dataContext.getNoticeAcceptedStatus(applicationId);
        }
        function getPropertyInsuredStatus(applicationId) {
            return dataContext.getPropertyInsuredStatus(applicationId);
        }
        function getUWReviewStatus(applicationId) {
            return dataContext.getUWReviewStatus(applicationId);
        }
        function getOffBuilderRiskOrNewPurchaseStatus(applicationId) {
            return dataContext.getOffBuilderRiskOrNewPurchaseStatus(applicationId);
        }
        function hasPremiumFinanceORMortgageeInPolicy(applicationId, payplan){
            return dataContext.hasPremiumFinanceORMortgageeInPolicy(applicationId, payplan);
        }

        function validateAgencyAccess(agencyId){
            return dataContext.validateAgencyAccess(agencyId);
        }
        function getAgentListByAgencyCode() {
            return dataContext.getAgentListByAgencyCode();
        }

        function getPrintedAgentNameByApplicationId(applicationId) {
            return dataContext.getPrintedAgentNameByApplicationId(applicationId);
        }

        function insertUpdateApplicationPDFAgentName(data) {
            return dataContext.insertUpdateApplicationPDFAgentName(data);
        }

        function getReadOnlyThroughoutStatusByRole(role) {
            return dataContext.getReadOnlyThroughoutStatusByRole(role);
        }

        function getAddCommentsStatusByRole(role) {
            return dataContext.getAddCommentsStatusByRole(role);
        }

        function getSuspendAccessForUserStatusByRole(role) {
            return dataContext.getSuspendAccessForUserStatusByRole(role);
        }

        function getAgencyOnlyApplicationsStatusByRole(data) {
            return dataContext.getAgencyOnlyApplicationsStatusByRole(data);
        }

        function getChangeSystemStatusByRole(data) {
            return dataContext.getChangeSystemStatusByRole(data);
        }

        function getTimeFrameLimitByRole(data) {
            return dataContext.getTimeFrameLimitByRole(data);
        }

        function insertUpdateLoginDetails(data) {
            return dataContext.insertUpdateLoginDetails(data);
        }

        function checkLoggedinUserStatus(agencyId) {
            return dataContext.checkLoggedinUserStatus(agencyId);
        }

        function checkLoggedinUserBindingStatus(agencyId) {
            return dataContext.checkLoggedinUserBindingStatus(agencyId);
        }

        function checkApplicationBindingStatus(applicationId) {
            return dataContext.checkApplicationBindingStatus(applicationId);
        }

        function getBindingSuspendedStates() {
            return dataContext.getBindingSuspendedStates();
        }

        function getAllAgencyList() {
            return dataContext.getAllAgencyList();
        }

        function getAgentListForAgency(agencyCode) {
            return dataContext.getAgentListForAgency(agencyCode);
        }

        function updateSystemStatusForAgency(data) {
            return dataContext.updateSystemStatusForAgency(data);
        }
        function updateSystemStatusForAgent(data) {
            return dataContext.updateSystemStatusForAgent(data);
        }

        function getStateForSuspend() {
            return dataContext.getStateForSuspend();
        }

        function updateSystemStatusForState(data) {
            return dataContext.updateSystemStatusForState(data);
        }
        function getPropertiesByRole(role) {
            return dataContext.getPropertiesByRole(role);
        }

        function getUnderwritingQuestionsForHvho() {
            return dataContext.getUnderwritingQuestionsForHvho();
        }

        function deleteApplicationDataOnProgramChange(applicationId,occupancyType) {
            return dataContext.deleteApplicationDataOnProgramChange(applicationId,occupancyType);
        }

        function getLocationRiskHvho(applicationId) {
            return dataContext.getLocationRiskHvho(applicationId);
        }

        function getConstructionTypesHvho(applicationId) {
            return dataContext.getConstructionTypesHvho(applicationId);
        }
        function getRisksDropdownsDataHvho(yearBuilt,ConstructionTypeId) {
            return dataContext.getRisksDropdownsDataHvho(yearBuilt,ConstructionTypeId);
        }

        function insertUpdateApplicantHvho(applicationId, applicantName) {
            return dataContext.insertUpdateApplicantHvho(applicationId, applicantName);
        }

        function getQuestionsForPremiumSurcharges() {
            return dataContext.getQuestionsForPremiumSurcharges();
        }

        function savePremiumSurchargesAnswersAndCalculateFactors(data) {
            return dataContext.savePremiumSurchargesAnswersAndCalculateFactors(data);
        }
        function insertUpdateRiskCommercialWindHvho(ApplicationId, Data) {
            return dataContext.insertUpdateRiskCommercialWindHvho(ApplicationId, Data);
        }

        function insertUpdateRiskForManualOverride(ApplicationId, Data) {
            return dataContext.insertUpdateRiskForManualOverride(ApplicationId, Data);
        }

        function getAnswersForPremiumSurchagesQuestionsByApplicationId(applicationId) {
            return dataContext.getAnswersForPremiumSurchagesQuestionsByApplicationId(applicationId);
        }

        function getRequiredDocumentsHVHOForQuoting(applicationId) {
            return dataContext.getRequiredDocumentsHVHOForQuoting(applicationId);
        }

        function generateConsentToRateForm(applicationId) {
            return dataContext.generateConsentToRateForm(applicationId);
        }

        function getApplicationDetailsForBoundPolicy(applicationId) {
            return dataContext.getApplicationDetailsForBoundPolicy(applicationId);
        }

        function getApplicationDetailsForBoundPolicyForTexasCommercial(applicationId) {
            return dataContext.getApplicationDetailsForBoundPolicyForTexasCommercial(applicationId);
        }

        function getOccupancyInformationQuestionsForHvho(applicationId) {
            return dataContext.getOccupancyInformationQuestionsForHvho(applicationId);
        }

        function getAnswersForOccupancyInformationQuestionsHvhoByApplicationId(applicationId) {
            return dataContext.getAnswersForOccupancyInformationQuestionsHvhoByApplicationId(applicationId);
        }

        function insertUpdateSupplementaryAnswersHvho(data) {
            return dataContext.insertUpdateSupplementaryAnswersHvho(data);
        }

        function getLossAndPriorHomeownersWindstormHistory(applicationId) {
            return dataContext.getLossAndPriorHomeownersWindstormHistory(applicationId);
        }

        function insertUpdatePriorHomeownersWindstormInsurance(data) {
            return dataContext.insertUpdatePriorHomeownersWindstormInsurance(data);
        }

        function insertUpdateLossHistory(data) {
            return dataContext.insertUpdateLossHistory(data);
        }

        function deleteSubQuestionAnswersForOccupancyInformationQuestionsHvho(data) {
            return dataContext.deleteSubQuestionAnswersForOccupancyInformationQuestionsHvho(data);
        }

        function getDownloadLinksHvho(phase) {
            return dataContext.getDownloadLinksHvho(phase);
        }

        function validateLocationRisk(applicationId){
            return dataContext.validateLocationRisk(applicationId);
        }

        function generateActivityReport() {
            return dataContext.generateActivityReport();
        }

        function validateLocationHVHO(agentData, applicationId) {
            return dataContext.validateLocationHVHO(agentData, applicationId);
        }

        function insertUpdateActiveHomeownersInsurance(data) {
            return dataContext.insertUpdateActiveHomeownersInsurance(data);
        }

        function insertUpdateActiveFloodInsurance(data) {
            return dataContext.insertUpdateActiveFloodInsurance(data);
        }
        function insertUpdateFloodInsuranceForTexasCommercial(data) {
            return dataContext.insertUpdateFloodInsuranceForTexasCommercial(data);
        }

        function generateRejectionSelectionForm(applicationId) {
            return dataContext.generateRejectionSelectionForm(applicationId);
        }

        function generateContentsCoverageExclusionForm(applicationId) {
            return dataContext.generateContentsCoverageExclusionForm(applicationId);
        }

        function getLossHistoryListByApplicationId(applicationId) {
            return dataContext.getLossHistoryListByApplicationId(applicationId);
        }
        function getFloodInsuranceListByApplicationIdForTexasCommercial(applicationId) {
            return dataContext.getFloodInsuranceListByApplicationIdForTexasCommercial(applicationId);
        }
        function getHasFloodInsuranceByApplicationIdForTexasCommercial(applicationId) {
            return dataContext.getHasFloodInsuranceByApplicationIdForTexasCommercial(applicationId);
        }

        function getLossHistoryById(id) {
            return dataContext.getLossHistoryById(id);
        }

        function getFloodInsuranceByIdForTexasCommercial(id) {
            return dataContext.getFloodInsuranceByIdForTexasCommercial(id);
        }

        function deleteAllLossHistoryByApplicationId(applicationId) {
            return dataContext.deleteAllLossHistoryByApplicationId(applicationId);
        }
        function deleteAllFloodInsuranceByApplicationIdForTxCommercial(applicationId) {
            return dataContext.deleteAllFloodInsuranceByApplicationIdForTxCommercial(applicationId);
        }
        function deleteLossHistoryById(id) {
            return dataContext.deleteLossHistoryById(id);
        }
        function deleteFloodInsuranceByIdForTexasCommercial(id) {
            return dataContext.deleteFloodInsuranceByIdForTexasCommercial(id);
        }
        function getHasLossHistoryByApplicationId(applicationId) {
            return dataContext.getHasLossHistoryByApplicationId(applicationId);
        }

        function insertUpdateApplicationLossHistory(hasLossHistory, applicationId) {
            return dataContext.insertUpdateApplicationLossHistory(hasLossHistory, applicationId);
        }
        function insertUpdateApplicationFloodInsuranceForTexasCommercial(hasFloodInsurance, condominiumProperty, applicationId) {
            return dataContext.insertUpdateApplicationFloodInsuranceForTexasCommercial(hasFloodInsurance, condominiumProperty, applicationId);
        }

        function getRequiredDocumentsTexasForQuoting(applicationId) {
            return dataContext.getRequiredDocumentsTexasForQuoting(applicationId);
        }

        function getHeaderDetailsTexas(quoteNumber) {
            return dataContext.getHeaderDetailsTexas(quoteNumber);
        }

        function getUnderwritingQuestionsForTexasCommercial() {
            return dataContext.getUnderwritingQuestionsForTexasCommercial();
        }

        function getAdditionalUnderwritingQuestionsForTexasCommercial() {
            return dataContext.getAdditionalUnderwritingQuestionsForTexasCommercial();
        }

        function getPremiumForQuote(applicationId, quoteId, occupancyType) {
            return dataContext.getPremiumForQuote(applicationId, quoteId, occupancyType);
        }

        function getContactInformationByApplicationIdForTexasCommercial(applicationId) {
            return dataContext.getContactInformationByApplicationIdForTexasCommercial(applicationId);
        }

        function getCondominiumPropertyFormAnswerForTexasCommercial(applicationId) {
            return dataContext.getCondominiumPropertyFormAnswerForTexasCommercial(applicationId);
        }

        function insertUpdateApplicationCondominiumPropertyForTexasCommercial(hasFloodInsurance, condominiumProperty, applicationId) {
            return dataContext.insertUpdateApplicationCondominiumPropertyForTexasCommercial(hasFloodInsurance, condominiumProperty, applicationId);
        }

        function insertUpdateContactInformationForTexasCommercial(data) {
            return dataContext.insertUpdateContactInformationForTexasCommercial(data);
        }

        function getBICategoryList(applicationId, noOfUnits, riskDescription) {
            return dataContext.getBICategoryList(applicationId, noOfUnits, riskDescription);
        }

        function insertUpdateUserContactInformation(data) {
            return dataContext.insertUpdateUserContactInformation(data);
        }

        function getUserContactInformation(applicationId) {
            return dataContext.getUserContactInformation(applicationId);
        }

        function generatePDFTexas(applicationId) {
            return dataContext.generatePDFTexas(applicationId);
        }

        function generateQuoteSheetHvho(applicationId, premiumFromService, isActionPrint) {
            return dataContext.generateQuoteSheetHvho(applicationId, premiumFromService, isActionPrint);
        }

        function getUnderwritingQuestionsForClearingHouse() {
            return dataContext.getUnderwritingQuestionsForClearingHouse();
        }
    }
})();
