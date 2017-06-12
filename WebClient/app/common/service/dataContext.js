/*
 * datacontext that uses the Anuglar $http service
 */

(function () {
    'use strict';

    angular.module('wapClient').service('dataContext', ['$rootScope', '$http', '$resource', '$q', 'localStorageService', '$cookies', '$upload', 'envConfig', dataContext]);
    dataContext.$inject = ['$rootScope', '$http', '$resource', '$q', 'localStorageService', '$cookies', '$upload','envConfig'];
    function dataContext($rootScope, $http, $resource, $q, localStorageService, $cookies, $upload,envConfig) {
        // var apiUrl = $rootScope.remoteAPIUrl;
        var apiUrl = envConfig.apiUrl;
        return {
            signIn: signIn,
            SummaryOfPriorSubmissions: SummaryOfPriorSubmissions,
            GetAllApplications:GetAllApplications,
            getStates: getStates,
            getInsuredAddressStateData: getInsuredAddressStateData,
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
            insertUpdateRiskCommercialWindForTexas: insertUpdateRiskCommercialWindForTexas,
            insertUpdateApplicationCommercialWindEffectiveDate: insertUpdateApplicationCommercialWindEffectiveDate,
            insertUpdateApplicationCommercialWindCitiZenPolicyNum: insertUpdateApplicationCommercialWindCitiZenPolicyNum,
            insertUpdateApplicant: insertUpdateApplicant,
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
            getAgencyNameByCode: getAgencyNameByCode,
            getOccupanyTypeQuestionsAndAnswerOptions: getOccupanyTypeQuestionsAndAnswerOptions,
            getOccupanyTypeSubQuestionsAndAnswerOptionsByQuestionId: getOccupanyTypeSubQuestionsAndAnswerOptionsByQuestionId,
            insertUpdateAnswerForSupplementaryQuestion: insertUpdateAnswerForSupplementaryQuestion,
            getSupplementaryQuestionAnswers: getSupplementaryQuestionAnswers,
            getLocationRiskForOccupanyInfo: getLocationRiskForOccupanyInfo,
            getPolicyDetailsByApplicationId: getPolicyDetailsByApplicationId,
            getPremiumAfterOLCoverage: getPremiumAfterOLCoverage,
            isFirstLossPolicy: isFirstLossPolicy,
            getEffectiveDateWindow: getEffectiveDateWindow,
            getCancelResetStatusByRole: getCancelResetStatusByRole,
            insertUpdateApplicationNoticeAccepted: insertUpdateApplicationNoticeAccepted,
            insertUpdateApplicationPropertyInsured: insertUpdateApplicationPropertyInsured,
            insertUpdateApplicationUWReview : insertUpdateApplicationUWReview,
            getNoticeAcceptedStatus: getNoticeAcceptedStatus,
            getPropertyInsuredStatus: getPropertyInsuredStatus,
            getUWReviewStatus:getUWReviewStatus,
            hasPremiumFinanceORMortgageeInPolicy:hasPremiumFinanceORMortgageeInPolicy,
            validateAgencyAccess:validateAgencyAccess,
            getAgentListByAgencyCode:getAgentListByAgencyCode,
            getPrintedAgentNameByApplicationId:getPrintedAgentNameByApplicationId,
            insertUpdateApplicationPDFAgentName: insertUpdateApplicationPDFAgentName,
            getReadOnlyThroughoutStatusByRole: getReadOnlyThroughoutStatusByRole,
            getAddCommentsStatusByRole : getAddCommentsStatusByRole,
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
            insertUpdateRiskForManualOverride: insertUpdateRiskForManualOverride,
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
            insertUpdateFloodInsuranceForTexasCommercial: insertUpdateFloodInsuranceForTexasCommercial,
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
            insertUpdateApplicationFloodInsuranceForTexasCommercial:insertUpdateApplicationFloodInsuranceForTexasCommercial,
            insertUpdateApplicationOffBuilderRisk: insertUpdateApplicationOffBuilderRisk,
            getOffBuilderRiskOrNewPurchaseStatus: getOffBuilderRiskOrNewPurchaseStatus,
            getRequiredDocumentsTexasForQuoting: getRequiredDocumentsTexasForQuoting,
            getHeaderDetailsTexas: getHeaderDetailsTexas,
            getAdditionalUnderwritingQuestionsForTexasCommercial:getAdditionalUnderwritingQuestionsForTexasCommercial,
            getUnderwritingQuestionsForTexasCommercial: getUnderwritingQuestionsForTexasCommercial,
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


        function signIn(userData) {
            var data = "grant_type=password&username=" + userData.username + "&password=" + encodeURIComponent(userData.password);
            var deferred = $q.defer();

            $http.post(apiUrl + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                if (typeof response.access_token !== 'undefined') {
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + 1);
                    $cookies.put('token', response.access_token, {'expires': expireDate});
                    $cookies.put('agencyId', response.agencyId, { 'expires': expireDate });
                    $cookies.put('userName', encodeURI(window.btoa(userData.username)), { 'expires': expireDate });
                    /*   $cookies.put('role', response.role, { 'expires': expireDate });*/

                    var result = window.btoa(response.role);
                    var role_data =  encodeURI(result);
                    $cookies.put('userRole', role_data, { 'expires': expireDate });

                }
                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function getStates() {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/list/getstates', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function getInsuredAddressStateData() {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/list/getstatesformailingaddress', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function getCountiesByState(stateId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/list/getcounties?stateId=' + stateId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }


        function SummaryOfPriorSubmissions() {

            var deferred = $q.defer();
            var data = {};
            // data.AgencyId = 1;
            data.AgencyId = $cookies.get('agencyId');
            $http.post(apiUrl + 'api/list/applications', data).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function GetAllApplications(hasTimeFrameLimit) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/list/getallapplications?timeframeLimit=' + hasTimeFrameLimit).success(function (response) {
                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }
        function postToLogin(userData) {
            $http.post(apiUrl + 'token', userData)
                .success(function (response, status) {
                    return response;
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
        }

        function validateLocation(agentData, state) {
            //"State": {"StateName":agentData.address.State.StateName},
            // "County": {"CountyName":agentData.address.County.CountyName}
            var data = JSON.stringify({
                "StreetAddress": agentData.address.StreetAddress,
                "City": agentData.address.City,
                "PostalCode": agentData.address.PostalCode,
                "County": { "CountyId": agentData.address.County },
                "State": { "StateId": agentData.address.State, "StateName": state}
            });


            var deferred = $q.defer();
            $http.post(apiUrl + 'api/application/validatelocationcommercial', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;

        }

        function validateLocationTexasCommercial(agentData, state) {
            //"State": {"StateName":agentData.address.State.StateName},
            // "County": {"CountyName":agentData.address.County.CountyName}
            var data = JSON.stringify({
                "StreetAddress": agentData.address.StreetAddress,
                "City": agentData.address.City,
                "PostalCode": agentData.address.PostalCode,
                "County": { "CountyId": agentData.address.County },
                "State": { "StateId": agentData.address.State, "StateName": state }
            });


            var deferred = $q.defer();
            $http.post(apiUrl + 'api/tx/application/validatelocationtexascommercial', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;

        }


        function insertUpdateApplication(agentData) {

            var agencyInsert = $cookies.get('agencyId');
            if(agentData.AgencySelected!= ''){
                var agencyInsert = agentData.AgencySelected;
            }
            var data = JSON.stringify({
                "ApplicationId": parseInt(agentData.applicationId),
                "Agency": {"AgencyId": agencyInsert},
                "Locations": [{
                    //"LocationId": -1,
                    "StreetAddress": agentData.address.StreetAddress,
                    "State": { "StateId": agentData.address.State }
                }],
                "Status": null,
                "Applicant": null,
                "TerritoryId": agentData.territoryId,
                ApproximateValue: agentData.ApproximateValue,
                OccupancyType: agentData.OccupancyType
            });


            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdateapplication', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;

        }

        function insertUpdateApplicationStatus(applicationData) {

            var data = JSON.stringify({
                "ApplicationId": parseInt(applicationData.ApplicationId),
                "Status": { "StatusName": applicationData.Status }
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdateapplication', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;
        }

        function insertNotifications(applicationData) {

            var data = JSON.stringify({
                "applicationId": parseInt(applicationData.ApplicationId),
                "action":  applicationData.Status
            });

            var deferred = $q.defer();
            //$http.get(apiUrl + 'api/list/getallapplications?applicationId=' + parseInt(applicationData.ApplicationId)+'&action='+applicationData.Status).success(function (response) {
            $http.post(apiUrl + 'api/application/insertnotifications?applicationId=' + parseInt(applicationData.ApplicationId)+'&action='+applicationData.Status, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;
        }


        function insertUpdateLocation(agentData, id) {

            var IsManuallyUpdated = 0;
            if(agentData.IsManuallyUpdated === true){
                var IsManuallyUpdated = 1;
            }

            var deferred = $q.defer();
            var data = JSON.stringify({
                "ApplicationId": id,
                "Locations": [{
                    "LocationId": agentData.locationId,
                    "State": { "StateId": agentData.address.State },
                    "County": { "CountyId": agentData.address.County },
                    "StreetAddress": agentData.address.StreetAddress,
                    "StreetOrAptNumber": agentData.address.steApt,
                    "City": agentData.address.City,
                    "PostalCode": agentData.address.PostalCode,
                    "IsMain": "true",
                    "IsActive": "true",
                    "TerritoryId": agentData.territoryId,
                    "StandardizedState": { "StateId": agentData.address2.StandardizedState, "StateName": agentData.address2.StandardizedStateName },
                    "StandardizedCounty": { "CountyId": agentData.address2.StandardizedCounty },
                    "StandardizedStreetAddress": agentData.address2.StandardizedStreetAddress,
                    "StandardizedCity": agentData.address2.StandardizedCity,
                    "StandardizedPostalCode": agentData.address2.StandardizedPostalCode,
                    "IsManuallyUpdated":IsManuallyUpdated
                }]

            });
            $http.post(apiUrl + 'api/core/application/insertupdatelocation', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }


        function getUnderwritingQuestions() {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/list/getunderwritingquestions', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function postUnderwritingAnswers(userData) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/qna/insertupdateunderwriting', userData, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response, status) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;
        }

        function getQuoteNumberForApplication(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/application/quotenumber?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function deleteSubQuestionAnswers(userData) {

            var deferred = $q.defer();

            $http.post(apiUrl + 'api/core/qna/deletesubquestionanswers', userData, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;

        }

        function getApplicationDetails(quoteNumber) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/qna/getapplicationdetails?quoteNumber=' + quoteNumber, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getConstructionTypes() {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/list/getconstructiontypes', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getConstructionTypesForTexasCommercial() {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/tx/list/getconstructiontypesfortexascommercial', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getRequiredDocuments(applicationId) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/list/getrequireddocuments?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function getRiskTypes() {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/list/getrisktypes', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function getRiskDescription(occupancyType, riskType) {

            var deferred = $q.defer();
            $http.get(apiUrl + 'api/list/getrisktypedescription?riskTypeText=' + riskType + '&occupancyTypeId=' + occupancyType, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function GetRiskTypeDescriptionTxCommercial(occupancyType, riskType) {


            var deferred = $q.defer();
            $http.get(apiUrl + 'api/tx/list/GetRiskTypeDescriptionTxCommercial?riskTypeText=' + riskType + '&occupancyTypeId=' + occupancyType, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function postComment(comment) {
            var deferred = $q.defer();

            $http.post(apiUrl + 'api/core/document/insertupdatecomments', comment, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;
        }

        function uploadDocument(document) {
            var deferred = $q.defer();

            $upload.upload({
                url: apiUrl + 'api/core/document/insertupdatedocuments',
                data: document.data,
                file: document.file // or list of files ($files) for html5 only
            }).progress(function (evt) {
                //console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getRisksDropdownsData() {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/list/getdropdowndata', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getLocationRisk(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/application/getlocationrisk?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function getLocationRiskForTexasCommercial(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/tx/application/getlocationriskforapplicationtxcommercial?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }




        function getMainLocationByApplication(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/application/mainlocationbyapplication?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function insertUpdateLocationCommercialWind(applicationId, data) {
            var isMain = false;
            if (data.index == 0) {
                var isMain = true;
            }
            var allRisks = [];
            data.risks.forEach(function(risk){
                var obj = {
                    "ApplicationId": applicationId,
                    "LocationId": data.locationId,
                    "RiskId": risk.riskId,
                    "RiskTypeText": risk.RiskType,
                    'RiskTypeDescriptionId': risk.RiskDescription,
                    "AdditionalDescription": risk.description,
                    "ConstructionTypeId": risk.locState,
                    "YearBuilt": risk.yearBuilt,
                    "NumberOfStories": risk.noOfStories,
                    "NumberOfUnits": risk.noOfUnits,
                    "TotalSquareFootage": risk.totSquareFoootage,
                    "NumberTransientOccupancy": risk.noOfUnit,
                    "MercantileOccupancySquareFootage": risk.squareFootage,
                    "CoverageA": risk.coverageA,
                    "CoverageB": risk.coverageBLim,
                    "coverageC": risk.coverageC,
                    "CoverageD": risk.coverageD,
                    "ReplacementCostValue": risk.replaceCostBuildVal,
                    "ActualCashValue": risk.actualCash,
                    "RoofCover": risk.roofCover,
                    "YearRoofCover": risk.yearRoofCover,
                    "RoofDeck": risk.roofDeck,
                    "RoofShape": risk.roofShape,
                    "RoofWallConnection": risk.roofWallConn,
                    "OpeningProtection": risk.openingProtection,
                    "GlassType": risk.glassType,
                    "SecondaryWaterResistance": risk.secWaterResist,
                    "Tier": risk.Tier,
                    "ARateIndex": risk.ARateIndex,
                    "FirstLoss": risk.FirstLoss,
                    "IsEIFS": risk.IsEIFS,
                    "EIFSComponent": risk.EIFSComponent,
                    "MethodOfAttachment": risk.MethodOfAttachment,
                    "WindLoadResistanceOfSubstrate": parseInt(risk.WindLoadResistanceOfSubstrate),
                    "WaterDrainageSystem": risk.WaterDrainageSystem,
                    "MaintenanceProgram": risk.MaintenanceProgram,
                    "BCEGS": risk.bcegs
                };
                allRisks.push(obj);
            });

            var deferred = $q.defer();

            var IsManuallyUpdated = 0;
            if(data.IsManuallyUpdated === true){
                var IsManuallyUpdated = 1;
            }

            var data = JSON.stringify({
                "ApplicationId": applicationId,
                "LocationId": data.locationId,
                "State": { "StateId": data.state },
                "County": { "CountyId": data.county },
                "StreetAddress": data.address,
                "StreetOrAptNumber": data.ste,
                "City": data.city,
                "PostalCode": data.postalCode,
                "IsMain": isMain,
                "IsActive": "true",
                "TerritoryId": data.territoryId,
                "StandardizedState": { "StateId": data.StandardizedState, "StateName": data.StandardizedStateName },
                "StandardizedCounty": { "CountyId": data.StandardizedCounty },
                "StandardizedStreetAddress": data.StandardizedStreetAddress,
                "StandardizedCity": data.StandardizedCity,
                "StandardizedPostalCode": data.StandardizedPostalCode,
                "IsManuallyUpdated":IsManuallyUpdated,
                "Risk": allRisks
            });
            $http.post(apiUrl + 'api/core/locations/insertupdatelocation', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function insertUpdateRiskCommercialWind(applicationId, data) {
            var deferred = $q.defer();
            var dataInsert = JSON.stringify({
                "ApplicationId": applicationId,
                "LocationId": data.locationId,
                "RiskId": data.riskId,
                "RiskTypeText": data.RiskType,
                'RiskTypeDescriptionId': data.RiskDescription,
                "AdditionalDescription": data.description,
                "ConstructionTypeId": data.locState,
                "YearBuilt": data.yearBuilt,
                "NumberOfStories": data.noOfStories,
                "NumberOfUnits": data.noOfUnits,
                "TotalSquareFootage": data.totSquareFoootage,
                "NumberTransientOccupancy": data.noOfUnit,
                "MercantileOccupancySquareFootage": data.squareFootage,
                "CoverageA": data.coverageA,
                "CoverageB": data.coverageBLim,
                "coverageC": data.coverageC,
                "CoverageD": data.coverageD,
                "ReplacementCostValue": data.replaceCostBuildVal,
                "ActualCashValue": data.actualCash,
                "RoofCover": data.roofCover,
                "YearRoofCover": data.yearRoofCover,
                "RoofDeck": data.roofDeck,
                "RoofShape": data.roofShape,
                "RoofWallConnection": data.roofWallConn,
                "OpeningProtection": data.openingProtection,
                "GlassType": data.glassType,
                "SecondaryWaterResistance": data.secWaterResist,
                "Tier": data.Tier,
                "ARateIndex": data.ARateIndex,
                "FirstLoss": data.FirstLoss,
                "IsEIFS": data.IsEIFS,
                "EIFSComponent": data.EIFSComponent,
                "MethodOfAttachment": data.MethodOfAttachment,
                "WindLoadResistanceOfSubstrate": parseInt(data.WindLoadResistanceOfSubstrate),
                "WaterDrainageSystem": data.WaterDrainageSystem,
                "MaintenanceProgram": data.MaintenanceProgram,
                "BCEGS": data.bcegs
            });
            $http.post(apiUrl + 'api/core/application/insertupdaterisk', dataInsert, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }



        function insertUpdateRiskCommercialWindForTexas(applicationId, data) {
            var deferred = $q.defer();
            var dataToinsert = JSON.stringify({
                "ApplicationId": applicationId,
                "LocationId": data.locationId,
                "RiskId": data.riskId,
                "RiskTypeText": data.RiskType,
                'RiskTypeDescriptionId': data.RiskDescription,
                "AdditionalDescription": data.description,
                "AdditionalUnderwriting":data.AdditionalUnderwriting,
                "LossSettlement":data.LossSettlement,
                "ConstructionTypeId":data.ConstructionClass,
                "YearBuilt": data.yearBuilt,
                "NumberOfStories": data.noOfStories,
                "NumberOfUnits": data.noOfUnits,
                "TotalSquareFootage": data.totSquareFoootage,
                "BuildingLimit": data.BuildingLimit,
                "BuildingReplacementCostValue": data.BuildingReplacementCostValue,
                "BuildingActualCashValue": data.BuildingActualCashValue,
                "IncreasedCostOfConstructionCoverage": data.IncreaseCostOfConstruction,
                "ContentsLimit": data.ContentsLimit,
                "ContentsReplacementCostValue": data.contentsRcv,
                "ContentsActualCashValue": data.ContentsAcv,
                "BusinessIncome":data.BusinessIncome,
                "BICategoryId":data.BICategoryId,
                "BIDailyLimit":data.BIDailyLimit,
                "NumberOfDaysCovered":data.NumberOfDaysCovered,
                "BICoverageLimit":data.BICoverageLimit,
                "SpecialClassLimit":data.SpecialClassLim,
                "SpecialClassItemActualCashValue":data.SpecialClassBuildingActualCashValue,
                "SpecialClassItemReplacementCostValue":data.SpecialClassItemReplacementCostValue,
                "RoofCover": data.roofCover,
                "YearRoofCover": data.yearRoofCover,
                "RoofDeck": data.roofDeck,
                "RoofShape": data.roofShape,
                "OpeningProtection": data.openingProtection,
                "GlassType": data.glassType,
                "Tier": data.Tier,
                "ARateIndex": data.ARateIndex,
                "FirstLoss": data.FirstLoss,
                "IsEIFS": data.IsEIFS,
                "EIFSComponent": data.EIFSComponent,
                "MethodOfAttachment": data.MethodOfAttachment,
                "WindLoadResistanceOfSubstrate": parseInt(data.WindLoadResistanceOfSubstrate),
                "WaterDrainageSystem": data.WaterDrainageSystem,
                "MaintenanceProgram": data.MaintenanceProgram
            });
            $http.post(apiUrl + 'api/tx/application/insertupdaterisk', dataToinsert, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }



        function insertUpdateApplicant(Data, length) {

            var deferred = $q.defer();
            var phone = '';
            var arrayCountryCode = [93, 355, 213, 1684, 376, 244, 1264, 1268, 54, 374, 297, 61, 43, 994, 1242, 973, 880, 1246, 375, 32, 501, 229, 1441, 975, 591, 267, 55, 246, 1284, 673, 359, 257, 855, 237, 1, 204, 226, 289, 306, 343, 365, 387, 403, 416, 418, 431, 437, 438, 450, 514, 519, 548, 579, 581, 587, 604, 613, 639, 647, 705, 709, 742, 778, 780, 782, 807, 819, 825, 867, 873, 902, 905, 238, 599, 1345, 236, 235, 56, 86, 57, 269, 243, 242, 682, 506, 225, 385, 53, 357, 420, 45, 253, 1767, 2, 809, 829, 849, 593, 20, 503, 240, 291, 372, 251, 500, 298, 679, 358, 33, 594, 689, 241, 220, 995, 49, 233, 350, 30, 299, 1473, 1671, 502, 224, 245, 592, 509, 504, 852, 36, 354, 91, 62, 98, 964, 353, 972, 1876, 81, 962, 7, 254, 686, 965, 996, 856, 371, 961, 266, 231, 218, 423, 370, 352, 853, 389, 261, 265, 60, 960, 223, 356, 692, 596, 222, 230, 52, 691, 373, 377, 976, 382, 1664, 212, 258, 95, 264, 674, 977, 31, 687, 64, 505, 227, 234, 683, 672, 850, 1670, 47, 968, 92, 680, 970, 507, 675, 595, 51, 63, 48, 351, 3, 787, 939, 974, 262, 40, 7, 250, 290, 1869, 1758, 590, 508, 1784, 685, 378, 239, 966, 221, 381, 248, 232, 65, 1721, 421, 386, 677, 252, 27, 82, 211, 34, 94, 249, 597, 268, 46, 41, 963, 886, 992, 255, 66, 670, 228, 690, 676, 1868, 216, 90, 993, 1649, 688, 1340, 256, 380, 971, 44, 0, 598, 998, 678, 39, 58, 84, 681, 967, 260, 263];
            if (length != -1) {
                if (Data.applicantPhone != undefined) {
                    if (Data.applicantPhone.length < length && arrayCountryCode.indexOf(parseInt(Data.applicantPhone)) > -1) {
                        phone = '';
                    } else {
                        phone = Data.applicantPhone;
                    }
                }
            } else {
                phone = Data.applicantPhone;
            }
            Data.applicantName  = Data.applicantName ? Data.applicantName : '';
            var data = JSON.stringify({
                "ApplicationId": Data.applicationId,
                "Applicant": {
                    "ApplicantId": Data.applicantId,
                    "ApplicantName": Data.applicantName,
                    "Phone": phone,
                    "InsuredAddressLine1": Data.InsuredAddressLine1,
                    "InsuredAddressLine2": Data.InsuredAddressLine2,
                    "City": Data.InsuredAddressCity,
                    "State": Data.InsuredAddressState,
                    "Zip": Data.InsuredAddressZip,
                    "Email": Data.Email == undefined ? null : Data.Email,
                    "StateName": Data.InsuredAddressStateName,
                    "Country": Data.InsuredAddressCountry
            }
            });
            $http.post(apiUrl + 'api/core/application/insertupdateapplicant', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function insertUpdateApplicationCommercialWindCitiZenPolicyNum(Data) {
            var data = JSON.stringify({
                "ApplicationId": Data.applicationId,
                CitizenPolicyNumber: Data.citizenPolicy
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdateapplication', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function insertUpdateApplicationCommercialWindEffectiveDate(Data) {
            var date_moment = moment(Data.effectiveDate).format('ll');
            var data = JSON.stringify({
                "ApplicationId": Data.applicationId,
                EffectiveDate: date_moment
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdateapplication', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function deleteLocationById(id) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/application/deletelocationbyid?locationId=' + id, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function deleteRiskById(id) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/application/deleteriskbyid?riskId=' + id, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getIfCpnVisible(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/application/getifcpnvisible?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getOccupancyType(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/application/getoccupancytype?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getPrequalification(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/application/prequalificationbyapplication?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getComments(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/document/getComments?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getHeaderDetails(quoteNumber) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/document/getheader?quoteNumber=' + quoteNumber, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }
        function getApplicationStatus(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/application/getstatus?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;

        }
        function updateLastVisitedPage(applicationId, pageNo) {
            var data = JSON.stringify({
                "applicationid": applicationId,
                "LastVisited": pageNo
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/updatelastvisited', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }
        function getLastVisitedPage(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/application/getlastvisited?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }


        function getMitigationFields(dataArray) {
            /*   var data = JSON.stringify({
             "applicationid": applicationId,
             "LastVisited": pageNo
             });*/

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/list/getwindmitigationfields', dataArray, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function getWindMitigationFieldsForTexasCommercial(dataArray) {
            //dataArray not used so for but will need it on future..
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/tx/list/getwindmitigationfields', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getSummaryDetails(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/summary/getsummary?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getSummaryDetailsTxCommercial(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/tx/summary/getsummary?applicationId=' +applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getSummaryHvhoDetails(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/summary/getsummaryhvho?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getIfEIFSVsible(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/application/getifeifsvisible?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getDownloadLinks(phase) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/document/getdownloadlinks?phase='+phase, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getQuotesForApplication(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/list/getapplicationquotes?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getApplicationQuotesForTexasCommercial(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/tx/list/getapplicationquotestxcommercial?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getBCEGS(applicationId, location, programCode, yearBuilt, riskIndex) {
            var deferred = $q.defer();
            var locationObj = {
                'StreetAddress': location.address,
                'City': location.city,
                'PostalCode': location.postalCode,
                'ApplicationId': applicationId,
                'Risk': [{
                    "ApplicationId": applicationId,
                    "LocationId": location.risks[riskIndex].locationId,
                    "RiskId": location.risks[riskIndex].riskId,
                    "RiskTypeText": location.risks[riskIndex].RiskType,
                    'RiskTypeDescriptionId': location.risks[riskIndex].RiskDescription,
                    "AdditionalDescription": location.risks[riskIndex].description,
                    "ConstructionTypeId": location.risks[riskIndex].locState,
                    "YearBuilt": location.risks[riskIndex].yearBuilt,
                    "NumberOfStories": location.risks[riskIndex].noOfStories,
                    "NumberOfUnits": location.risks[riskIndex].noOfUnits,
                    "TotalSquareFootage": location.risks[riskIndex].totSquareFoootage,
                    "NumberTransientOccupancy": location.risks[riskIndex].noOfUnit,
                    "MercantileOccupancySquareFootage": location.risks[riskIndex].squareFootage,
                    "CoverageA": location.risks[riskIndex].coverageA,
                    "CoverageB": location.risks[riskIndex].coverageBLim,
                    "coverageC": location.risks[riskIndex].coverageC,
                    "CoverageD": location.risks[riskIndex].coverageD,
                    "ReplacementCostValue": location.risks[riskIndex].replaceCostBuildVal,
                    "ActualCashValue": location.risks[riskIndex].actualCash,
                    "RoofCover": location.risks[riskIndex].roofCover,
                    "YearRoofCover": location.risks[riskIndex].yearRoofCover,
                    "RoofDeck": location.risks[riskIndex].roofDeck,
                    "RoofShape": location.risks[riskIndex].roofShape,
                    "RoofWallConnection": location.risks[riskIndex].roofWallConn,
                    "OpeningProtection": location.risks[riskIndex].openingProtection,
                    "GlassType": location.risks[riskIndex].glassType,
                    "SecondaryWaterResistance": location.risks[riskIndex].secWaterResist,
                    "Tier": location.risks[riskIndex].Tier,
                    "ARateIndex": location.risks[riskIndex].ARateIndex,
                    "FirstLoss": location.risks[riskIndex].FirstLoss,
                    "IsEIFS": location.risks[riskIndex].IsEIFS,
                    "EIFSComponent": location.risks[riskIndex].EIFSComponent,
                    "MethodOfAttachment": location.risks[riskIndex].MethodOfAttachment,
                    "WindLoadResistanceOfSubstrate": parseInt(location.risks[riskIndex].WindLoadResistanceOfSubstrate),
                    "WaterDrainageSystem": location.risks[riskIndex].WaterDrainageSystem,
                    "MaintenanceProgram": location.risks[riskIndex].MaintenanceProgram

                }]
            };

            $http.post(apiUrl + 'api/core/application/getbcegs?programCode=' + programCode + '&yearBuilt=' + yearBuilt, locationObj, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response, status) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;
        }

        function getBCEGSCommercialWindHVHO(applicationId, location, programCode) {
            var deferred = $q.defer();
            var yearBuilt = 2015;
            if (location.Risk[0].YearBuilt != null && location.Risk[0].YearBuilt != undefined && location.Risk[0].YearBuilt != '') {
                yearBuilt = location.Risk[0].YearBuilt;
            }
            $http.post(apiUrl + 'api/core/application/getbcegs?programCode=' + programCode + '&yearBuilt=' + yearBuilt, location, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response, status) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;
        }

        function insertUpdateAdditionalInterests(data, applicationId) {
            var deferred = $q.defer();
            /*  var data = JSON.stringify({
             "ApplicationId": applicationId,
             "LocationId": data.locationId,
             "RiskId": data.riskId
             });*/
            $http.post(apiUrl + 'api/application/insertupdateadditionalinterests', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }


        function getAdditionalInterest(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/application/getadditionalinterest?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function insertUpdateApplicationAgentName(data) {
            var data = JSON.stringify({
                "ApplicationId": parseInt(data.ApplicationId),
                "AgentName": data.AgentName
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdateapplication', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;
        }

        function updateSelectedQuote(quoteId) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/updateselectedquote?quoteId=' + quoteId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getLocationRiskPaymentPlan(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/application/getlocationandriskids?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function insertUpdateOrdinanceOrLawCoverage(data, applicationId) {
            var deferred = $q.defer();
            /*  var data = JSON.stringify({
             "ApplicationId": applicationId,
             "LocationId": data.locationId,
             "RiskId": data.riskId
             });*/
            $http.post(apiUrl + 'api/application/olcoveragelimit?applicationId=' + applicationId, data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function insertUpdatePaymentPlan(payType, isFinanceCompany, applicationId) {

            var deferred = $q.defer();
            /*  var data = JSON.stringify({
             "ApplicationId": applicationId,
             "LocationId": data.locationId,
             "RiskId": data.riskId
             });*/
            $http.post(apiUrl + 'api/core/application/insertupdatepaymentplan?paymentPlan=' + payType + '&premiumFinance=' + isFinanceCompany + '&applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;

        }


        function getBillingInfo(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/application/getpaymentplandetails?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getOrdinanceOrLawCoverage(applicationId) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/list/getselectedrisksforolcoverage?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function getInterestTypes() {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/list/getinteresttypes', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getFinancialInstitutions() {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/list/getfinancialinstitutions', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getLocationIdsByApplication(applicationId) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/list/getlocationidsbyapplication?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function getRiskIdsByLocation(locationId) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/list/getriskidsbylocation?locationId=' + locationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }
        function download() {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/sumary/savepdf?applicationId=615', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'arraybuffer' }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function insertUpdatePolicyInterest(data) {
            /*   var data = JSON.stringify({
             "ApplicationId": Data.applicationId,
             EffectiveDate: Data.effectiveDate.toLocaleDateString(),
             CitizenPolicyNumber: Data.citizenPolicy
             });*/

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/application/insertupdateadditionalinterests', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function getPayPlan(applicationId, lob) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/list/getpaymentplan?applicationId=' + applicationId + '&lob=' + lob, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getRenewalPayPlan() {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/list/getrenewalpayplanlist', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getPolicyInterestListByApplicationId(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/list/getpolicyinterestlist?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getPolicyInterestById(policyInterestId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/application/getpolicyinterestbyid?policyInterestId=' + policyInterestId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function deletePolicyInterestById(policyInterestId) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/application/deletepolicyinterestbyid?policyInterestId=' + policyInterestId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function insertUpdateBillingInfo(data, applicationId) {
            var dataObj = JSON.stringify({
                "ApplicableCode": data.payPlan
                /*"RenewalPayPlan": {
                 "Id":data.renewalPayPlan,
                 "OtherDescription":data.descriptionOther
                 }*/
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdatepaymentplan?applicationId=' + applicationId, dataObj, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function getRequiredDocumentsForBindingPhase(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/list/getrequireddocumentsforbindingprocess?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getRequiredDocumentsForBindingPhaseTxCommercial(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/tx/list/getrequireddocumentsforbindingprocesstxcommercial?applicationId=' +applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function generatePDF(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/summary/savepdf?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'arraybuffer' }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function generatePDFHvho(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/summary/savepdfhvho?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'arraybuffer' }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function validateOccupancyTypeAndApproximateValue(occupancyType, approximateValue) {
            var agencyId = $cookies.get('agencyId');
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/application/validateprogram?occupancyType=' + occupancyType + '&approximateValue=' + approximateValue + '&code=' + agencyId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function validateOccupancyTypeAndApproximateValueForSelectedAgency(occupancyType, approximateValue,agencyId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/application/validateprogram?occupancyType=' + occupancyType + '&approximateValue=' + approximateValue + '&code=' + agencyId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }


        function getAgencyNameByCode(agencyCode) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/agency/getagencynamebycode?agencyCode=' + agencyCode, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function insertUpdateAnswerForSupplementaryQuestion(dataObject, applicationData) {
            /*  var dataObj = JSON.stringify({
             "QuestionId": dataObject.QuestionId,
             "Answer": dataObject.AnswerText,
             "RiskId": dataObject.RiskId
             '&LocationId='+applicationData.locationId+
             });*/

            var deferred = $q.defer();////////////////////////
            $http.post(apiUrl + 'api/qna/insertupdatesupplementaryanswer?ApplicationId=' + applicationData.applicationId + '&RiskId=' + applicationData.riskId, dataObject, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function getOccupanyTypeQuestionsAndAnswerOptions(applicationId, riskId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/list/getoccupancyinformationquestions?applicationId=' + applicationId + '&riskId=' + riskId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getOccupanyTypeSubQuestionsAndAnswerOptionsByQuestionId(data) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/list/getsubquestionsbyquestionId?questionId=' + data.questionId + '&answerText=' + data.answerText, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getSupplementaryQuestionAnswers(riskId) {
            var deferred = $q.defer();//////////////////
            $http.get(apiUrl + 'api/qna/getsupplementaryanswersbyrisk?riskId=' + riskId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }
        function getLocationRiskForOccupanyInfo(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/application/getrisksforoccupancyinfo?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getPolicyDetailsByApplicationId(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/application/GetPolicyByApplicationId?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }


        function getPremiumAfterOLCoverage(applicationId, riskIds) {

            var deferred = $q.defer();

            $http.post(apiUrl + 'api/application/getpremiumafterolcoverage?applicationId=' + applicationId, riskIds, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function isFirstLossPolicy(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/application/isfirstlosspolicy?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }


        function getEffectiveDateWindow() {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/list/getdatewindow', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getCancelResetStatusByRole(role) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/role/getcancelresetstatusbyrole?role=' + role, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function insertUpdateApplicationPropertyInsured(dataCheckbox, applicationId) {
            var data = JSON.stringify({
                "ApplicationId": parseInt(applicationId),
                "IsPropertyInsured": dataCheckbox
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdateapplication', data, { headers: { 'Content-Type': 'application/json'
            } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;
        }

        function insertUpdateApplicationNewPurchase(value, applicationId) {
            var data = JSON.stringify({
                "ApplicationId": parseInt(applicationId),
                "IsNewPurchase": value
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdateapplication', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;

        }

        function insertUpdateApplicationOffBuilderRisk(value, applicationId) {
            var data = JSON.stringify({
                "ApplicationId": parseInt(applicationId),
                "OffBuilderRisk": value
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdateapplication', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;

        }
        function insertUpdateApplicationUWReview(dataCheckbox, applicationId) {
            var data = JSON.stringify({
                "ApplicationId": parseInt(applicationId),
                "IsUWReview": dataCheckbox
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdateapplication', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;
        }

        function insertUpdateApplicationNoticeAccepted(dataCheckbox, applicationId) {

            var data = JSON.stringify({
                "ApplicationId": parseInt(applicationId),
                "IsNoticeAccepted": dataCheckbox
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdateapplication', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;
        }


        function getNoticeAcceptedStatus(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/application/getnoticestatus?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getPropertyInsuredStatus(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/application/getpropertyinsuredstatus?applicationId=' + applicationId, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getUWReviewStatus(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/application/getuwreviewstatus?applicationId=' + applicationId, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getOffBuilderRiskOrNewPurchaseStatus(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/application/getoffbuilderriskornewpurchasestatus?applicationId=' +applicationId, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function hasPremiumFinanceORMortgageeInPolicy(applicationId, payplan) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/application/validatepolicyinterest?applicationId=' + applicationId + '&payplan='+payplan, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function validateAgencyAccess(agencyId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/agency/validateagencyaccess?agencyCode=' + agencyId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getCancelResetStatusByUserName(userName) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/application/getcancelresetstatusbyusername', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getAgentListByAgencyCode() {
            var agencyId = $cookies.get('agencyId');
            if(agencyId!= '') {
                var deferred = $q.defer();
                $http.get(apiUrl + 'api/core/agent/getagentlistbyagencycode?agencyCode=' + agencyId, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function (response) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
                return deferred.promise;
            }else{
                return false;
            }

        }

        function getPrintedAgentNameByApplicationId(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/agent/getprintedagentnamebyapplicationid?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function insertUpdateApplicationPDFAgentName(data) {

            var data = JSON.stringify({
                "ApplicationId": data.applicationId,
                "PrintedAgentName": data.printedAgentName
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdateapplication', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function getReadOnlyThroughoutStatusByRole(role) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/role/getreadonlythroughoutstatusbyrole?role=' + role, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getAddCommentsStatusByRole(role) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/role/getaddcommentsstatusbyrole?role=' + role, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getSuspendAccessForUserStatusByRole(role) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/role/getsuspendaccessforuserstatusbyrole?role=' + role, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getAgencyOnlyApplicationsStatusByRole(role) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/role/getagencyonlyapplicationsstatusbyrole?role=' + role, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getChangeSystemStatusByRole(role) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/role/getchangesystemstatusbyrole?role=' + role, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getTimeFrameLimitByRole(role) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/role/gettimeframelimitbyrole?role=' + role, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function insertUpdateLoginDetails(data) {

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/agent/insertupdatelogindetails', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function checkLoggedinUserStatus(agencyId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/application/checkLoggedinUserStatus?agencyCode=' + agencyId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function checkLoggedinUserStatus(agencyId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/application/checkLoggedinUserStatus?agencyCode=' + agencyId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function checkLoggedinUserBindingStatus(agencyId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/application/checkLoggedinUserBindingStatus?agencyCode=' + agencyId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function checkApplicationBindingStatus(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/application/checkApplicationBindingStatus?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        /* function getBindingSuspendedStates() {
         var deferred = $q.defer();
         $http.get(apiUrl + 'api/core/application/getbindingsuspendedstates', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
         deferred.resolve(response);
         }).error(function (data, status, headers, config) {
         deferred.reject(status);
         });
         return deferred.promise;
         }*/

        function getAllAgencyList() {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/agency/getagencydetails', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }


        function getAgentListForAgency(agencyCode) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/agent/getagentlistforagency?agencyCode=' + agencyCode, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function updateSystemStatusForAgency(data) {

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/agency/updatesystemstatusforagency', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }


        function updateSystemStatusForAgent(data) {

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/agent/updatesystemstatusforagent', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function checkLoggedinUserBindingStatus(agencyId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/application/checkLoggedinUserBindingStatus?agencyCode=' + agencyId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function checkApplicationBindingStatus(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/application/checkApplicationBindingStatus?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getBindingSuspendedStates() {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/list/getbindingsuspendedstates', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }


        function getStateForSuspend() {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/list/getbindingsuspendedstates', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function updateSystemStatusForState(data) {

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/updatesystemstatusforstate', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function getPropertiesByRole(role) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/role/getpropertiesbyrole?role=' + role, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getUnderwritingQuestionsForHvho() {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/list/getunderwritingquestionsforhvho', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function deleteApplicationDataOnProgramChange(applicationId,occupancyType) {

            var data = JSON.stringify({
                "ApplicationId": applicationId,
                "OccupancyType": occupancyType
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/application/deleteapplicationdataonprogramchange', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;

        }

        function getLocationRiskHvho(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/application/getlocationriskhvho?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function getConstructionTypesHvho() {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/list/getconstructiontypesforhvho', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getRisksDropdownsDataHvho(yearBuilt,ConstructionTypeId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/list/getdropdowndataforhvho?yearBuilt=' + yearBuilt+'&ConstructionTypeId='+ConstructionTypeId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function insertUpdateApplicantHvho(applicantId, applicantName) {

            var deferred = $q.defer();
            /*"ApplicantId": applicantId,*/
            var data = JSON.stringify({
                "ApplicationId": applicantId,
                "Applicant": {
                    "ApplicantName": applicantName
                }
            });
            $http.post(apiUrl + 'api/core/application/insertupdateapplicant', data, {headers: {'Content-Type': 'application/json'} }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getQuestionsForPremiumSurcharges() {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/list/getquestionsforpremiumsurcharges', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function savePremiumSurchargesAnswersAndCalculateFactors(data) {

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/qna/savepremiumsurchargesanswersandcalculatefactors', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function getAnswersForPremiumSurchagesQuestionsByApplicationId(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/qna/getanswersforpremiumsurchagesquestionsbyapplicationid?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }


        function insertUpdateRiskCommercialWindHvho(applicationId, data) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdaterisk', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function insertUpdateRiskForManualOverride(applicationId, data) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdateriskformanualoverride', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }


        function getRequiredDocumentsHVHOForQuoting(applicationId) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/list/getrequireddocumentshvhoforquoting?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function generateConsentToRateForm(applicationId) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/application/generateconsenttorateform?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'arraybuffer' }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getApplicationDetailsForBoundPolicy(applicationId) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/summary/getapplicationdetailsforboundpolicy?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getApplicationDetailsForBoundPolicyForTexasCommercial(applicationId) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/tx/summary/getapplicationdetailsforboundpolicy?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }



        function getOccupancyInformationQuestionsForHvho() {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/list/getoccupancyinformationquestionsforhvho', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function getAnswersForOccupancyInformationQuestionsHvhoByApplicationId(applicationId) {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/qna/getanswersforoccupancyinformationquestionshvhobyapplicationid?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function insertUpdateSupplementaryAnswersHvho(data) {

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/qna/insertupdatesupplementaryanswershvho', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function getLossAndPriorHomeownersWindstormHistory(applicationId) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/application/getlossandpriorhomeownerswindstormhistory?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }


        function insertUpdatePriorHomeownersWindstormInsurance(data) {
            if (data.EffectiveDate != undefined) {
                var EffectiveDate = moment(data.EffectiveDate).format('ll');
            }
            if (data.ExpirationDate != undefined) {
                var ExpirationDate = moment(data.ExpirationDate).format('ll');
            }
            var dataInsert = JSON.stringify({
                "ApplicationId": data.ApplicationId,
                "EffectiveDate": EffectiveDate,
                "ExpirationDate": ExpirationDate,
                "HasPriorWindstormInsurance": data.HasPriorWindstormInsurance,
                "Id": data.Id,
                "PolicyNumber": data.PolicyNumber,
                "PriorInsuranceCarrier": data.PriorInsuranceCarrier,
                "ExpiringPremium": data.ExpiringPremium
            });




            var deferred = $q.defer();
            $http.post(apiUrl + 'api/application/insertupdatepriorhomeownerswindstorminsurance', dataInsert, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function insertUpdateLossHistory(data) {

            var deferred = $q.defer();
            data.DateOfLoss = moment(data.DateOfLoss).format('ll');
            $http.post(apiUrl + 'api/core/application/insertupdatelosshistory', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function deleteSubQuestionAnswersForOccupancyInformationQuestionsHvho(userData) {

            var deferred = $q.defer();

            $http.post(apiUrl + 'api/qna/deletesubquestionanswersforoccupancyinformationquestionshvho', userData, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;

        }

        function getDownloadLinksHvho(phase) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/document/getdownloadlinks?phase=' +phase, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function validateLocationRisk(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/application/validatelocationrisk?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function generateActivityReport() {
            var agencyCode = $cookies.get('agencyId');
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/application/generateactivityreport?agencyCode=' + agencyCode, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'arraybuffer' }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function validateLocationHVHO(agentData, applicationId) {
            //"State": {"StateName":agentData.address.State.StateName},
            // "County": {"CountyName":agentData.address.County.CountyName}
            var data = JSON.stringify({
                "StreetAddress": agentData.address.StreetAddress,
                "City": agentData.address.City,
                "PostalCode": agentData.address.PostalCode,
                "County": { "CountyId": agentData.address.County },
                "ApplicationId": applicationId
            });


            var deferred = $q.defer();
            $http.post(apiUrl + 'api/application/validatelocationhvho', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise;

        }

        function insertUpdateActiveHomeownersInsurance(data) {
            if (data.EffectiveDate != undefined) {
                var EffectiveDate = moment(data.EffectiveDate).format('ll');
            }
            if (data.ExpirationDate != undefined) {
                var ExpirationDate = moment(data.ExpirationDate).format('ll');
            }
            var dataInsert = JSON.stringify({
                "ApplicationId": data.ApplicationId,
                "EffectiveDate": EffectiveDate,
                "ExpirationDate": ExpirationDate,
                "HasActiveHomeownersInsurancePolicy": data.HasActiveHomeownersInsurancePolicy,
                "Id": data.Id,
                "PolicyNumber": data.PolicyNumber,
                "InsuranceCarrier": data.InsuranceCarrier
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/application/insertupdateactivehomeownersinsurance', dataInsert, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function insertUpdateActiveFloodInsurance(data) {
            if (data.EffectiveDate != undefined) {
                var EffectiveDate = moment(data.EffectiveDate).format('ll');
            }
            if (data.ExpirationDate != undefined) {
                var ExpirationDate = moment(data.ExpirationDate).format('ll');
            }
            var dataInsert = JSON.stringify({
                "ApplicationId": data.ApplicationId,
                "EffectiveDate": EffectiveDate,
                "ExpirationDate": ExpirationDate,
                "HasActiveFloodInsurancePolicy": data.HasActiveFloodInsurancePolicy,
                "Id": data.Id,
                "PolicyNumber": data.PolicyNumber,
                "InsuranceCarrier": data.InsuranceCarrier,
                "FloodZone": data.FloodZone
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/application/insertupdateactivefloodinsurance', dataInsert, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }


        function insertUpdateFloodInsuranceForTexasCommercial(data) {
            if (data.EffectiveDate != undefined) {
                var EffectiveDate = moment(data.EffectiveDate).format('ll');
            }
            if (data.ExpirationDate != undefined) {
                var ExpirationDate = moment(data.ExpirationDate).format('ll');
            }
            var dataInsert = JSON.stringify({
                "ApplicationId": data.ApplicationId,
                "EffectiveDate": EffectiveDate,
                "ExpirationDate": ExpirationDate,
                "HasActiveFloodInsurancePolicy": data.HasActiveFloodInsurancePolicy,
                "Id": data.Id,
                "PolicyNumber": data.PolicyNumber,
                "InsuranceCarrier": data.InsuranceCarrier,
                "FloodZone": data.FloodZone
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/tx/application/insertupdatefloodinsurancefortexascommercial', dataInsert, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function generateRejectionSelectionForm(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/application/generateselectionrejectionformforoptionalcoverages?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'arraybuffer' }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function generateContentsCoverageExclusionForm(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/application/generaterequesttoexcludecontentscoverageform?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'arraybuffer' }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getLossHistoryListByApplicationId(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/application/getlosshistorylistbyapplicationid?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }
        function getFloodInsuranceListByApplicationIdForTexasCommercial(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/tx/application/getfloodinsurancelistbyapplicationidfortexascommercial?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }


        function getHasFloodInsuranceByApplicationIdForTexasCommercial(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/tx/application/gethasfloodinsurancebyapplicationidfortexascommercial?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }


        function getLossHistoryById(id) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/application/getlosshistorybyid?id=' + id, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getFloodInsuranceByIdForTexasCommercial(id) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/tx/application/getfloodinsurancebyidfortexascommercial?id=' + id, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }


        function deleteAllLossHistoryByApplicationId(applicationId) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/deletealllosshistorybyapplicationid?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function deleteAllFloodInsuranceByApplicationIdForTxCommercial(applicationId) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/tx/application/deleteallfloodinsurancebyapplicationidfortexascommercial?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function deleteLossHistoryById(id) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/deletelosshistorybyid?id=' + id, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function deleteFloodInsuranceByIdForTexasCommercial(id) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/tx/application/deletefloodinsurancebyidfortexascommercial?id=' + id, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }


        function getHasLossHistoryByApplicationId(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/core/application/gethaslosshistorybyapplicationid?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function insertUpdateApplicationLossHistory(hasLossHistory, applicationId) {

            var data = JSON.stringify({
                "ApplicationId": applicationId,
                "HasLossHistory": hasLossHistory
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/application/insertupdateapplication', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function insertUpdateApplicationFloodInsuranceForTexasCommercial(hasFloodInsurance, condominiumProperty, applicationId) {
            var data = JSON.stringify({
                "ApplicationId": applicationId,
                "HasFloodInsurance": hasFloodInsurance,
                "CondominiumPropertyForm": condominiumProperty
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/tx/application/insertupdateapplication', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }




        function getRequiredDocumentsTexasForQuoting(applicationId) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/tx/list/getrequireddocuments?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function getHeaderDetailsTexas(quoteNumber) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/tx/document/getheader?quoteNumber=' + quoteNumber, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }


        function getUnderwritingQuestionsForTexasCommercial() {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/tx/list/getunderwritingquestions', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getAdditionalUnderwritingQuestionsForTexasCommercial() {

            var deferred = $q.defer();

            $http.get(apiUrl + 'api/tx/list/getadditionalunderwritingquestions', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }


        function getPremiumForQuote(applicationId, quoteId, occupancyType) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/application/requotepolicy?applicationId=' + applicationId + '&quoteId=' + quoteId + "&occupancyType=" + occupancyType, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {
                deferred.resolve(response);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }


        function getContactInformationByApplicationIdForTexasCommercial(applicationId) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/tx/application/getcontactinformationbyapplicationid?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }


        function getCondominiumPropertyFormAnswerForTexasCommercial(applicationId) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/tx/application/getcondominiumpropertyformanswer?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;

        }

        function insertUpdateApplicationCondominiumPropertyForTexasCommercial(hasFloodInsurance, condominiumProperty, applicationId) {
            var data = JSON.stringify({
                "ApplicationId": applicationId,
                "HasFloodInsurance":hasFloodInsurance,
                "CondominiumPropertyForm": condominiumProperty
            });

            var deferred = $q.defer();
            $http.post(apiUrl + 'api/tx/application/insertupdateapplication', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }


        function insertUpdateContactInformationForTexasCommercial(data) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/tx/application/insertupdatecontactinformation', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function getBICategoryList(applicationId, noOfUnits, riskDescription) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/tx/list/getbicategorylist?applicationId=' + applicationId + "&numberOfUnits=" + noOfUnits + "&riskTypeDescriptionId=" + riskDescription, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function insertUpdateUserContactInformation(data) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/core/agent/insertupdateusercontactinformation', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);

                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function getUserContactInformation(applicationId) {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/core/agent/getusercontactinformation?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function generatePDFTexas(applicationId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/tx/summary/savepdf?applicationId=' + applicationId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'arraybuffer' }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function generateQuoteSheetHvho(applicationId, premiumFromService, isActionPrint) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/summary/generatequotesheethvho?applicationId=' + applicationId + '&premiumFromService=' + premiumFromService + '&isActionPrint=' + isActionPrint, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'arraybuffer' }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getUnderwritingQuestionsForClearingHouse() {
            var deferred = $q.defer();

            $http.get(apiUrl + 'api/list/getunderwritingquestionsforclearinghouse', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                deferred.resolve(response);

            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }
    }
})();

