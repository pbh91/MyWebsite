(function () {
    'use strict';

    /**
     * @ngdoc object
     * @name
     *
     * @description
     *
     */


    angular
        .module('dashboard')
        .service('serviceGetSetData', function () {
            var ApplicationId = "";
            var formData = "";
            var formSubmitted = "";

            return {
                getApplicationId: function () {
                    return ApplicationId;
                },
                setApplicationId: function (value) {
                    ApplicationId = value;
                },
                getFormData: function () {
                    return formData;
                },
                setFormData: function (value) {
                    formData = value;
                },
                getFormSubmittedStatus: function () {
                    return formSubmitted;
                },
                setFormSubmittedStatus: function (value) {
                    formSubmitted = value;
                }

            };
        })

    angular.module('dashboard').controller('notEditableCtrl', ['$scope', '$modalInstance', 'status', notEditableCtrl])
    notEditableCtrl.$inject = ['$scope', '$modalInstance', 'status'];
    function notEditableCtrl($scope, $modalInstance, status) {
        $scope.status = status;
        $scope.ok = function () {
            $modalInstance.dismiss('cancel');
        };
    }


    angular.module('dashboard').controller('applicationCancelResetModalCtrl', ['$scope', '$modalInstance', 'data', applicationCancelResetModalCtrl])
    applicationCancelResetModalCtrl.$inject = ['$scope', '$modalInstance', 'data'];
    function applicationCancelResetModalCtrl($scope, $modalInstance, data) {
        $scope.quoteNumber = data.quoteNumber;
        $scope.msgValue = "cancel";

        if (data.isCancel == false) {
            $scope.msgValue = "reset";
        }

        var isOk = true;
        $scope.ok = function () {
            $modalInstance.close(isOk);
        };

        $scope.cancel = function () {
            isOk = false;
            $modalInstance.close(isOk);
        };
    }


    angular.module('dashboard')
        .service('filteredListServiceDashBoard', ['$filter', function ($filter) {

            function searchUtil(item, toSearch, $filter) {

                if (item.EffectiveDate === null)  item.EffectiveDate = '';
                if (item.CreatedOn === null)  item.CreatedOn = '';
                /* Search Text in all 3 fields */
                return (item.QuoteNumber.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 ||
                $filter('date')(item.CreatedOn, "MM/dd/yyyy").indexOf(toSearch.toLowerCase()) > -1 ||
                $filter('date')(item.EffectiveDate, "MM/dd/yyyy").indexOf(toSearch.toLowerCase()) > -1 ||
                item.PolicyType.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 ||
                item.Applicant.ApplicantName.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 ||
                item.Locations[0].StreetAddress.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 ||
                item.AgentName.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 ||
                item.Agency.AgencyName.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 ||
                item.Status.StatusName.toLowerCase().indexOf(toSearch.toLowerCase()) > -1) ? true : false;
            }


            this.searched = function (valLists, toSearch) {
                return _.filter(valLists,
                    function (i) {
                        /* Search Text in all 3 fields */
                        return searchUtil(i, toSearch, $filter);
                    });
            };

            this.paged = function (valLists, pageSize) {
                var retVal = [];
                for (var i = 0; i < valLists.length; i++) {
                    if (i % pageSize === 0) {
                        retVal[Math.floor(i / pageSize)] = [valLists[i]];
                    } else {
                        retVal[Math.floor(i / pageSize)].push(valLists[i]);
                    }
                }
                return retVal;
            };

        }])


    angular.module('dashboard')
        .controller('homeCtrl', ['wapService', 'usSpinnerService', '$cookies', '$scope', '$rootScope', 'dataContext', '$filter', '$location', '$state', '$modal', 'filteredListServiceDashBoard', 'toaster', 'serviceGetSetData', 'localStorageService', homeCtrl])
    homeCtrl.$inject = ['wapService', 'usSpinnerService', '$cookies', '$scope', '$rootScope', 'dataContext', '$filter', '$location', '$state', '$modal', 'filteredListServiceDashBoard', 'toaster', 'serviceGetSetData', 'localStorageService'];
    function homeCtrl(wapService, usSpinnerService, $cookies, $scope, $rootScope, dataContext, $filter, $location, $state, $modal, filteredListServiceDashBoard, toaster, serviceGetSetData, localStorageService) {
        var vm = this;
        vm.ctrlName = 'homeCtrl';

        vm.loadingData = true;
        $scope.currentPath = $location.path();
        $scope.agencyName = $rootScope.agencyName ? $rootScope.agencyName : $cookies.get('agencyName');
        vm.arrFilteredQuoteNumber = [];
        vm.arrFilteredCreatedOn = [];
        vm.arrFilteredEffectiveDate = [];
        vm.arrFilteredPolicyType = [];
        vm.arrFilteredApplicantName = [];
        vm.arrFilteredApplicantAdd = [];
        vm.arrFilteredAgencyName = [];
        vm.arrFilteredStatus = [];
        vm.IsReadOnlyAllRole = false;
        vm.agencyCode = '' ;
        vm.hasTimeFrameLimit = false;
        vm.bindingSuspended = false;
        vm.hasSuspendAccess = false;
        vm.bindingSuspendedStates = [];

        function buildHomePage(response) {

            vm.arrQuoteNumber = [];
            vm.arrCreatedOn = [];
            vm.arrEffectiveDate = [];
            vm.arrPolicyType = [];
            vm.arrApplicantName = [];
            vm.arrStreetAddress = [];
            vm.arrAgencyName = [];
            vm.arrSubmittedBy = [];
            vm.arrStatus = [];

            vm.SubmissionData = JSON.stringify(response);
            vm.SubmissionData = JSON.parse(vm.SubmissionData);

            $.each(vm.SubmissionData, function (i, item) {
                if (item.LOB.indexOf('TX') > -1) {
                    if (vm.SubmissionData[i].PolicyType === 'CRW' || vm.SubmissionData[i].PolicyType === 'CNRW') {
                        vm.SubmissionData[i].PolicyType = 'TX-Commercial';
                    } else {
                        vm.SubmissionData[i].PolicyType = 'TX-' + vm.SubmissionData[i].PolicyType;
                    }
                } else {
                    vm.SubmissionData[i].PolicyType = 'FL-' + vm.SubmissionData[i].PolicyType;
                }
            });

            var QuoteNumber = _.uniq(response, false, function (p) {
                return p.QuoteNumber;
            });
            var createdOn = _.uniq(response, false, function (p) {
                return p.CreatedOn;
            });
            createdOn = $filter('orderBy')(createdOn, 'CreatedOn', true);
            var effectiveDate = _.uniq(response, false, function (p) {
                return p.EffectiveDate;
            });
            effectiveDate = $filter('orderBy')(effectiveDate, 'EffectiveDate', true);
            var policyType = _.uniq(response, false, function (p) {
                return p.PolicyType;
            });
            var applicantNames = _.uniq(response, false, function (p) {
                return p.Applicant.ApplicantName;
            });
            var streetAddress = _.uniq(response, false, function (p) {
                return p.Locations[0].StreetAddress
            });
            var agencyName = _.uniq(response, false, function (p) {
                return p.Agency.AgencyName;
            });

            var agentName = _.uniq(response, false, function (p) {
                return p.AgentName;
            });


            var status = _.uniq(response, false, function (p) {
                return p.Status.StatusName;
            });


            $.each(QuoteNumber, function (i, item) {
                vm.arrQuoteNumber.push({
                    QuoteNumber: item.QuoteNumber
                });
            });

            vm.arrQuoteNumber = $filter('orderBy')(vm.arrQuoteNumber, 'QuoteNumber', true);
            $.each(createdOn, function (i, item) {
                vm.arrCreatedOn.push({
                    createdOn: $filter('date')(item.CreatedOn, "MM/dd/yyyy")
                });
            });

            $.each(effectiveDate, function (i, item) {
                var effDate = item.EffectiveDate;
                if (effDate == null) {
                    /* vm.arrEffectiveDate.push({
                     effectiveDate: ''
                     });*/
                }
                else {
                    vm.arrEffectiveDate.push({
                        effectiveDate: $filter('date')(new Date(effDate), "MM/dd/yyyy")
                    });
                }
            });

            $.each(policyType, function (i, item) {
                if (item.LOB.indexOf('TX') > -1) {
                    if ((item.PolicyType === 'CRW') || (item.PolicyType === 'CNRW')) {
                        vm.arrPolicyType.push({
                            policyType: 'TX-Commercial'
                        });
                    } else {
                        vm.arrPolicyType.push({
                            policyType: 'TX-' + item.PolicyType
                        });
                    }
                } else {
                        vm.arrPolicyType.push({
                            policyType: 'FL-' + item.PolicyType
                        });
                }
            });

            vm.arrPolicyType = _.uniq($filter('orderBy')(vm.arrPolicyType, 'policyType', false), false, function (p) { return p.policyType });

            $.each(applicantNames, function (i, item) {
                if(item.Applicant.ApplicantName!= '') {
                    vm.arrApplicantName.push({
                        applicantName: item.Applicant.ApplicantName
                    });
                }
            });
            vm.arrApplicantName = $filter('orderBy')(vm.arrApplicantName, 'applicantName', false);

            $.each(streetAddress, function (i, item) {
                if(item.Locations[0].StreetAddress!= '') {
                    vm.arrStreetAddress.push({
                        streetAddress: item.Locations[0].StreetAddress
                    });
                }
            });

            vm.arrStreetAddress = $filter('orderBy')(vm.arrStreetAddress, 'streetAddress', false);

            $.each(agencyName, function (i, item) {
                vm.arrAgencyName.push({
                    agencyName: item.Agency.AgencyName
                });
            });

            vm.arrAgencyName = $filter('orderBy')(vm.arrAgencyName, 'agencyName', false);

            $.each(agentName, function (i, item) {
                vm.arrSubmittedBy.push({
                    SubmittedBy: item.AgentName
                });
            });


            vm.arrSubmittedBy = $filter('orderBy')(vm.arrSubmittedBy, 'SubmittedBy', false);
            $.each(status, function (i, item) {
                vm.arrStatus.push({
                    status: item.Status.StatusName
                });
            });

            vm.arrStatus = $filter('orderBy')(vm.arrStatus, 'status', false);

            $scope.pageSize = 8;
            $scope.allItems = vm.SubmissionData;
            $scope.reverse = false;

            $scope.resetAll = function () {
                $scope.filteredList = $scope.allItems;
                $scope.newEmpId = '';
                $scope.newName = '';
                $scope.newEmail = '';
                $scope.searchText = '';
                $scope.currentPage = 0;
                $scope.Header = ['', '', ''];
            }


            //search text box Logic
            $scope.search = function (obj) {
                $scope.filteredList = filteredListServiceDashBoard.searched(vm.SubmissionData, $scope.searchText);
                if ($scope.searchText == '') {
                    $scope.filteredList = $scope.allItems;
                }
                $scope.firstPage();
                $scope.pagination();
            }
            //search text box End

            $scope.customSearchPageFilter = function (action) {

                var day = '';
                switch (action) {
                    case "select-all-QuoteId":
                        selectAllQuoteId();
                        break;
                    case "select-none-QuoteId":
                        vm.arrFilteredQuoteNumber = [];
                        break;
                    case "select-all-CreatedOn":
                        selectAllCreatedOn();
                        break;
                    case "select-none-CreatedOn":
                        vm.arrFilteredCreatedOn = [];
                        break;
                    case "select-all-EffectiveDate":
                        selectAllEffectiveDate();
                        break;
                    case "select-none-EffectiveDate":
                        vm.arrFilteredEffectiveDate = [];
                        break;
                    case "select-all-PolicyType":
                        selectAllPolicyType();
                        break;
                    case "select-none-PolicyType":
                        vm.arrFilteredPolicyType = [];
                        break;
                    case "select-all-ApplicantName":
                        selectAllApplicantName();
                        break;
                    case "select-none-ApplicantName":
                        vm.arrFilteredApplicantName = [];
                        break;
                    case "select-all-StreetAddress":
                        selectAllStreetAddress();
                        break;
                    case "select-none-StreetAddress":
                        vm.arrFilteredApplicantAdd = [];
                        break;
                    case "select-all-AgencyName":
                        selectAllAgencyName();
                        break;
                    case "select-none-AgencyName":
                        vm.arrFilteredAgencyName = [];
                        break;
                    case "select-all-SubmittedByName":
                        selectAllSubmittedByName();
                        break;
                    case "select-none-SubmittedByName":
                        vm.arrFilteredSubmittedBy = [];
                        break;

                    case "select-all-Status":
                        selectAllStatus();
                        break;
                    case "select-none-Status":
                        vm.arrFilteredStatus = [];
                        break;

                }


                function selectAllQuoteId() {
                    vm.arrFilteredQuoteNumber = [];
                    $.each(vm.arrQuoteNumber, function (i, item) {
                        vm.arrFilteredQuoteNumber.push({
                            QuoteNumber: item.QuoteNumber,
                            selected: true
                        });
                    });
                }

                function selectAllCreatedOn() {
                    vm.arrFilteredCreatedOn = [];
                    $.each(vm.arrCreatedOn, function (i, item) {
                        vm.arrFilteredCreatedOn.push({
                            createdOn: item.createdOn,
                            selected: true
                        });
                    });
                }

                function selectAllEffectiveDate() {
                    vm.arrFilteredEffectiveDate = [];
                    $.each(vm.arrEffectiveDate, function (i, item) {
                        vm.arrFilteredEffectiveDate.push({
                            effectiveDate: item.effectiveDate,
                            selected: true
                        });
                    });

                }

                function selectAllPolicyType() {
                    vm.arrFilteredPolicyType = [];
                    $.each(vm.arrPolicyType, function (i, item) {
                        vm.arrFilteredPolicyType.push({
                            policyType: item.policyType,
                            selected: true
                        });
                    });
                }

                function selectAllApplicantName() {
                    vm.arrFilteredApplicantName = [];
                    $.each(vm.arrApplicantName, function (i, item) {
                        vm.arrFilteredApplicantName.push({
                            applicantName: item.applicantName,
                            selected: true
                        });
                    });

                }

                function selectAllStreetAddress() {
                    vm.arrFilteredApplicantAdd = [];
                    $.each(vm.arrStreetAddress, function (i, item) {
                        vm.arrFilteredApplicantAdd.push({
                            streetAddress: item.streetAddress,
                            selected: true
                        });
                    });
                }

                function selectAllAgencyName() {
                    vm.arrFilteredAgencyName = [];
                    $.each(vm.arrAgencyName, function (i, item) {
                        vm.arrFilteredAgencyName.push({
                            agencyName: item.agencyName,
                            selected: true
                        });
                    });
                }

                function selectAllSubmittedByName() {
                    vm.arrFilteredSubmittedBy = [];
                    $.each(vm.arrSubmittedBy, function (i, item) {
                        vm.arrFilteredSubmittedBy.push({
                            SubmittedBy: item.SubmittedBy,
                            selected: true
                        });
                    });
                }



                function selectAllStatus() {
                    vm.arrFilteredStatus = [];
                    $.each(vm.arrStatus, function (i, item) {
                        vm.arrFilteredStatus.push({
                            status: item.status,
                            selected: true
                        });
                    });
                }

                if (vm.arrFilteredQuoteNumber.length === 0 && vm.arrFilteredCreatedOn.length === 0 &&
                    vm.arrFilteredEffectiveDate.length === 0 && vm.arrFilteredPolicyType.length === 0 &&
                    vm.arrFilteredApplicantName.length === 0 && vm.arrFilteredApplicantAdd.length === 0 &&
                    vm.arrFilteredAgencyName.length === 0 && vm.arrFilteredStatus.length === 0&&
                    vm.arrFilteredSubmittedBy.length === 0 && vm.arrFilteredSubmittedBy.length === 0 ) {
                    $scope.filteredList = $scope.allItems;
                }
                else {
                    $scope.filteredList = _.filter($scope.allItems, function (obj) {
                        var isQuoteID = vm.arrFilteredQuoteNumber.filter(function (v) {
                            if (v.QuoteNumber === obj.QuoteNumber) return true;
                        }).length > 0 ? true : false;
                        var isCreatedOn = vm.arrFilteredCreatedOn.filter(function (v) {
                            if (v.createdOn === $filter('date')(obj.CreatedOn, "MM/dd/yyyy")) return true;
                        }).length > 0 ? true : false;
                        var isEffectiveDate = vm.arrFilteredEffectiveDate.filter(function (v) {
                            if (v.effectiveDate === ($filter('date')(obj.EffectiveDate, "MM/dd/yyyy") || '')) return true;
                        }).length > 0 ? true : false;
                        var isPolicyType = vm.arrFilteredPolicyType.filter(function (v) {
                            if (v.policyType === obj.PolicyType) return true;
                        }).length > 0 ? true : false;
                        var isApplicantName = vm.arrFilteredApplicantName.filter(function (v) {
                            if (v.applicantName === obj.Applicant.ApplicantName) return true;
                        }).length > 0 ? true : false;
                        var isStreetAddress = vm.arrFilteredApplicantAdd.filter(function (v) {
                            if (v.streetAddress === obj.Locations[0].StreetAddress) return true;
                        }).length > 0 ? true : false;
                        var isAgencyName = vm.arrFilteredAgencyName.filter(function (v) {
                            if (v.agencyName === obj.Agency.AgencyName) return true;
                        }).length > 0 ? true : false;

                        var isagentName = vm.arrFilteredSubmittedBy.filter(function (v) {
                            if (v.SubmittedBy === obj.AgentName) return true;
                        }).length > 0 ? true : false;

                        var isStatus = vm.arrFilteredStatus.filter(function (v) {
                            if (v.status === obj.Status.StatusName) return true;
                        }).length > 0 ? true : false;

                        if (isQuoteID || isCreatedOn || isEffectiveDate || isPolicyType || isApplicantName || isStreetAddress || isAgencyName || isStatus || isagentName) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                }
                $scope.pagination();
            }

            // Calculate Total Number of Pages based on Search Result
            $scope.pagination = function () {
                $scope.ItemsByPage = filteredListServiceDashBoard.paged($scope.filteredList, $scope.pageSize);
                vm.ItemsByPage = $scope.ItemsByPage;
            };

            $scope.setPage = function () {
                $scope.currentPage = this.n;
            };

            $scope.firstPage = function () {
                $scope.currentPage = 0;
            };

            $scope.lastPage = function () {
                $scope.currentPage = $scope.ItemsByPage.length - 1;
            };

            $scope.prevPage = function () {
                if ($scope.currentPage == 0)
                    return false;
                $scope.currentPage = $scope.currentPage - 1;
            };

            $scope.nextPage = function () {
                if ($scope.currentPage == $scope.ItemsByPage.length - 1)
                    return false;
                $scope.currentPage = $scope.currentPage + 1;
            };

            /* $scope.range = function (input, total) {
             var ret = [];
             if (!total) {
             total = input;
             input = 0;
             }
             for (var i = input; i < total; i++) {
             if (i != 0 && i != total - 1) {
             ret.push(i);
             }
             }
             return ret;
             };*/
            $scope.range = function () {
                var rangeSize = $scope.ItemsByPage.length - 1;
                if (rangeSize > 10)
                    rangeSize = 10;
                var ps = [];

                var start;

                start = $scope.currentPage;

                if (start > $scope.ItemsByPage.length - rangeSize) {

                    start = $scope.ItemsByPage.length - rangeSize;

                }

                for (var i = start; i < start + rangeSize; i++) {

                    ps.push(Math.abs(i));

                }

                return ps;
            };
            $scope.sort = function (sortBy) {
                $scope.resetAll();

                //Applicant.ApplicantName
                if (sortBy == 'ApplicantName') {
                    $scope.columnToOrder = "Applicant.ApplicantName";
                } else if (sortBy == 'QuoteId') {
                    $scope.columnToOrder = "QuoteNumber";
                } else if (sortBy == 'Status') {
                    $scope.columnToOrder = "Status.StatusName";
                } else if (sortBy == 'Addr') {
                    $scope.columnToOrder = "Locations[0].StreetAddress";
                } else  if (sortBy == 'Agency') {
                    $scope.columnToOrder = "Agency.AgencyName";
                }if (sortBy == 'SubmittedBy') {
                    $scope.columnToOrder = "AgentName";
                } else {
                    $scope.columnToOrder = sortBy;
                }
                //$Filter - Standard Service
                $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);

                if ($scope.reverse)
                    var iconName = 'glyphicon glyphicon-chevron-up';
                else
                    var iconName = 'glyphicon glyphicon-chevron-down';

                if (sortBy === 'QuoteId') {
                    $scope.Header[0] = iconName;
                }
                else if (sortBy === 'CreatedOn') {
                    $scope.Header[1] = iconName;
                } else if (sortBy === 'EffectiveDate') {
                    $scope.Header[2] = iconName;
                } else if (sortBy === 'PolicyType') {
                    $scope.Header[3] = iconName;
                } else if (sortBy === 'ApplicantName') {
                    $scope.Header[4] = iconName;
                } else if (sortBy === 'Addr') {
                    $scope.Header[5] = iconName;
                } else if (sortBy === 'SubmittedBy') {
                    $scope.Header[6] = iconName;
                }if (sortBy === 'Agency') {
                    $scope.Header[7] = iconName;
                } else {
                    $scope.Header[8] = iconName;
                }

                $scope.reverse = !$scope.reverse;

                $scope.pagination();
            };
            //By Default sort ny Name
            $scope.sort('');
            //$scope.sort('CreatedOn');
        }

        function SummaryOfPriorSubmissions() {
            wapService.SummaryOfPriorSubmissions().then(function (response) {
                    vm.loadingData = false;
                    buildHomePage(response);
                },
                function (err) {
                    vm.errorMessage = "Some thing went wrong please try again";
                });
        }

        function GetAllApplications(hasTimeFrameLimit) {
            wapService.GetAllApplications(hasTimeFrameLimit).then(function (response) {
                    vm.loadingData = false;
                    buildHomePage(response);
                },
                function (err) {
                    vm.errorMessage = "Some thing went wrong please try again";
                });
        }

        function CheckLoggedinUserBindingStatus(agencyCode) {
            wapService.checkLoggedinUserBindingStatus(agencyCode).then(function (response) {
                    if (response === true) {
                        vm.bindingSuspended = true;
                    }
                },
                function (err) {
                    vm.errorMessage = "Some thing went wrong please try again";
                });
        }

        vm.goToUnderwriting = function (applicationID, status, LOB,PolicyType, IsBoltApplication ) {
            var encryptAppID = wapService.encryptData(applicationID);
            if (status == "Canceled") {
                //toaster.pop('warning', "Request Denied! ", 'This application is ' + status);
                vm.modalInstance = $modal.open({
                    templateUrl: 'notEditable.html',
                    controller: 'notEditableCtrl',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        status: function () {
                            return status;
                        }
                    }
                });
            }
            else if (status == "Declined"){
                if (LOB == 'FL_Commercial') {
                    $state.go("flCommercialNewBusiness.summary", { "applicationId": encryptAppID }); //editable
                } else if (LOB == 'FL_HVHO') {
                    $state.go("hvhoNewBusiness.summary", { "applicationId": encryptAppID }); //editable
                } else if (LOB == 'TX_Commercial') {
                    $state.go("txCommercialNewBusiness.summary", { "applicationId": encryptAppID }); //editable
                }
            }
            else if (status == "Incomplete") {
                serviceGetSetData.setApplicationId(encryptAppID);
                $rootScope.flagReadOnlyHome = 0;
                // $state.go("newBusiness.underwriting", { "applicationId": encryptAppID}); //editable
                $scope.Loading = true;
                wapService.getLastVisitedPage(applicationID).then(function (response) {
                        $scope.Loading = false;
//console.log(response);
                        // alert("Last id=="+response); return false;
                        if (response == 1) {
                            $state.go('preQualification', { "applicationId": encryptAppID });
                        } else if (response == 2) {

                            if(LOB == 'FL_Commercial'){
                                $state.go("flCommercialNewBusiness.underwriting", {"applicationId": encryptAppID}); //editable
                            }else if(LOB == 'FL_HVHO'){
                                $state.go("hvhoNewBusiness.underwriting", {"applicationId": encryptAppID}); //editable
                            }else if(LOB == 'TX_Commercial'){
                                $state.go("txCommercialNewBusiness.underwriting", {"applicationId": encryptAppID}); //editable
                            }

                        } else if (response == 3) {

                            if(LOB == 'FL_Commercial'){
                                $state.go("flCommercialNewBusiness.commercialWind", {"applicationId": encryptAppID}); //editable
                            }else if(LOB == 'FL_HVHO'){
                                $state.go("hvhoNewBusiness.commercialWind", {"applicationId": encryptAppID}); //editable
                            }else if(LOB == 'TX_Commercial'){
                                $state.go("txCommercialNewBusiness.commercialWind", {"applicationId": encryptAppID}); //editable
                            }

                        } else if (response == 4) {

                            if(LOB == 'FL_Commercial'){
                                $state.go("flCommercialNewBusiness.documents", {"applicationId": encryptAppID}); //editable
                            }else if(LOB == 'FL_HVHO'){
                                $state.go("hvhoNewBusiness.documents", {"applicationId": encryptAppID}); //editable
                            }else if(LOB == 'TX_Commercial'){
                                $state.go("txCommercialNewBusiness.documents", {"applicationId": encryptAppID}); //editable
                            }

                        } else if (response == 5) {

                            if(LOB == 'FL_Commercial'){
                                $state.go("flCommercialNewBusiness.summary", {"applicationId": encryptAppID}); //editable
                            }else if(LOB == 'FL_HVHO'){
                                $state.go("hvhoNewBusiness.summary", {"applicationId": encryptAppID}); //editable
                            }else if(LOB == 'TX_Commercial'){
                                $state.go("txCommercialNewBusiness.summary", {"applicationId": encryptAppID}); //editable
                            }

                        } else {
                            if(LOB == 'FL_Commercial'){
                                $state.go("flCommercialNewBusiness.underwriting", {"applicationId": encryptAppID}); //editable
                            }else if(LOB == 'FL_HVHO'){
                                $state.go("hvhoNewBusiness.underwriting", {"applicationId": encryptAppID}); //editable
                            }else if(LOB == 'TX_Commercial'){
                                $state.go("txCommercialNewBusiness.underwriting", {"applicationId": encryptAppID}); //editable
                            }
                        }

                    },
                    function (err) {
                        vm.errorMessage = "Some thing went wrong please try again";
                        vm.loadingData = false;
                        $state.go("flCommercialNewBusiness.preQualification", {"applicationId": encryptAppID}); //editable
                    });

            } else if (status == "Quote Option(s)") {
                $rootScope.flagReadOnlyHome = 0;
                if(LOB == 'FL_Commercial'){
                    $state.go("flCommercialBindingProcess.summary", {"applicationId": encryptAppID});
                }else if(LOB == 'FL_HVHO'){
                    if (IsBoltApplication == true) {
						localStorageService.set("IsBoltApplication_"+applicationID, true);
					}else{
						localStorageService.set("IsBoltApplication_"+applicationID, false);
					}
                    $state.go("hvhoBindingProcess.summary", {"applicationId": encryptAppID});
                }else if(LOB == 'TX_Commercial'){
                    $state.go("txCommercialBindingProcess.summary", {"applicationId": encryptAppID});
                }

            } else if (status == "Bound") {

                $rootScope.flagReadOnlyHome = 0;
                if(LOB == 'FL_Commercial'){
                    $state.go("flCommercialBoundProcess.policyInfo", {"applicationId": encryptAppID});
                }else if(LOB == 'FL_HVHO'){
                    if (IsBoltApplication == true) {
						localStorageService.set("IsBoltApplication_"+applicationID, true);
					}else{
						localStorageService.set("IsBoltApplication_"+applicationID, false);
					}
                    $state.go("hvhoBoundProcess.policyInfo", {"applicationId": encryptAppID});
                }else if(LOB == 'TX_Commercial'){
                    $state.go("txCommercialBoundProcess.policyInfo", {"applicationId": encryptAppID});
                }

            } else {
                serviceGetSetData.setApplicationId(encryptAppID);
                $rootScope.flagReadOnlyHome = 1;
                if (IsBoltApplication == true) {
                    localStorageService.set("IsBoltApplication_" + applicationID, true);
                    $state.go("hvhoBindingProcess.summary", { "applicationId": encryptAppID });
				} else {
                    localStorageService.set("IsBoltApplication_" + applicationID, false);
                    $state.go("preQualification", {"applicationId": encryptAppID});
				}
            }
        }


        function getPropertiesByRole() {
            var role = wapService.decryptData($cookies.get('userRole'));
            wapService.getPropertiesByRole(role).then(function (data) {
                vm.isCancelOrResetApplicable = data.CancelResetApplications;
                if(data.ReadOnlyThroughout  == true){
                    vm.IsReadOnlyAllRole = true;
                    $rootScope.flagReadOnlyHome = 1;
                }

                vm.hasSuspendAccess = data.SuspendAccessForUser;
                vm.hasTimeFrameLimit = data.TimeFrameLimit;
                if (data.AgencyOnlyApplications == true) {
                    SummaryOfPriorSubmissions();

                }else{
                    GetAllApplications(vm.hasTimeFrameLimit);
                }



            });
        }

        /*function getCancelResetStatusByRole() {
         var role = wapService.decryptData($cookies.get('userRole'));
         wapService.getCancelResetStatusByRole(role).then(function (data) {
         vm.isCancelOrResetApplicable = data;
         });
         }*/

        /* function getReadOnlyThroughoutStatusByRole() {
         var role = wapService.decryptData($cookies.get('userRole'));
         wapService.getReadOnlyThroughoutStatusByRole(role).then(function (data) {
         if (data == true) {
         vm.IsReadOnlyAllRole = true;
         $rootScope.flagReadOnlyHome = 1;
         }
         });
         }*/

        /*function getAddCommentsStatusByRole() {
         var role = wapService.decryptData($cookies.get('userRole'));
         wapService.getAddCommentsStatusByRole(role).then(function (data) {
         if (data == true) {
         //need to have logic here....

         }
         });
         }*/

        /*  function getSuspendAccessForUserStatusByRole() {
         var role = wapService.decryptData($cookies.get('userRole'));
         wapService.getSuspendAccessForUserStatusByRole(role).then(function (data) {
         if (data == true) {
         vm.hasSuspendAccess = true;

         }
         });
         }*/


        /*  function getAgencyOnlyApplicationsStatusByRole() {
         var role = wapService.decryptData($cookies.get('userRole'));
         wapService.getTimeFrameLimitByRole(role).then(function (data) {
         vm.hasTimeFrameLimit = data;

         wapService.getAgencyOnlyApplicationsStatusByRole(role).then(function (data) {
         if (data == true) {
         SummaryOfPriorSubmissions();

         }else{
         GetAllApplications(vm.hasTimeFrameLimit);
         }
         });
         });
         }*/

        /*function getChangeSystemStatusByRole() {
         var role = wapService.decryptData($cookies.get('userRole'));
         wapService.getChangeSystemStatusByRole(role).then(function (data) {
         if (data == true) {
         //need to have logic here....
         }
         });
         }*/

        /* function getTimeFrameLimitByRole() {
         var role = wapService.decryptData($cookies.get('userRole'));
         wapService.getTimeFrameLimitByRole(role).then(function (data) {
         if (data == true) {
         //need to have logic here....
         }
         });
         }*/

        function getBindingSuspendedStates() {
            wapService.getBindingSuspendedStates().then(function (data) {
                //if(data.BindingSuspended.toLowerCase() == 'true' )
                vm.bindingSuspendedStates = [];
                data.some(function (current, index, _ary) {
                    if(current.BindingSuspended.toLowerCase() == 'true'){
                        vm.bindingSuspendedStates.push(current);
                    }

                })
                //vm.bindingSuspendedStates = data;
            });
        }

        vm.toggleCancelResetConfirmationModal = function (quoteNumber, action) {

            var isCancel = true;
            if (action == 'Reset') {
                isCancel = false;
            }

            vm.modalInstance = $modal.open({
                templateUrl: 'cancelResetConfirmationModal.html',
                controller: 'applicationCancelResetModalCtrl',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    data: function () {
                        var obj = {'isCancel': isCancel, 'quoteNumber': quoteNumber};
                        return obj;
                    }
                }
            });
            vm.modalInstance.result.then(function (isOk) {
                vm.applicationData = {};
                if (isOk) {
                    vm.applicationData.ApplicationId = parseInt(quoteNumber.slice(3));
                    if (isCancel) {
                        //change to Cancelled
                        vm.applicationData.Status = "Terminated by Agent";
                        wapService.insertUpdateApplicationStatus(vm.applicationData).then(function (success) {
                            wapService.insertNotifications(vm.applicationData).then(function (success) {
                                $state.reload();
                            });
                        });
                    }
                    else {
                        //change to Incompletecoverage must be grater than zero
                        if (_.find(vm.SubmissionData, function (rw) { return rw.QuoteNumber == quoteNumber }).PolicyType == 'FL-HO') {
                            vm.applicationData.Status = 'Quote Option(s)';
                        } else {
                            vm.applicationData.Status = "Incomplete";
                        }
                        wapService.insertUpdateApplicationStatus(vm.applicationData).then(function (success) {
                            wapService.insertNotifications(vm.applicationData).then(function (success) {
                                $state.reload();
                            });
                        });
                    }
                }
            }, function () {
                // console.log('Cancelled');
            })['finally'](function () {
                vm.modalInstance = undefined  // <--- This fixes
            });
        };

        vm.startNewApplication = function () {
            $rootScope.flagReadOnlyHome = 0;
            $state.go("preQualification");

        };

        vm.SuspendBinding = function () {
            $rootScope.flagReadOnlyHome = 0;
            $state.go("suspendAccess");

        };
		
		function GetEffectiveDateWindow(){
			wapService.getEffectiveDateWindow().then(function (response) {
                response.forEach(function (obj) {
                    localStorageService.set(obj.LOB.toLowerCase(), wapService.encryptData(JSON.stringify(obj.Range)));
			    });
            });
		}

        init();

        function init() {
            var modalBox = angular.element("#effectiveDatePopup");
            if (modalBox.length > 0) {
                window.location.reload();
            }
			var boltApplicationKeys = [];
			localStorageService.keys().forEach(function(key){
				if(key.indexOf("IsBoltApplication") == 0){
					var obj = { "key": key, "value": localStorageService.get(key)};
					boltApplicationKeys.push(obj)
				}
			});
			
            localStorageService.clearAll();
			boltApplicationKeys.forEach(function(obj){
				localStorageService.set(obj.key, obj.value);
			});
            vm.agencyCode = $cookies.get('agencyId');
			GetEffectiveDateWindow();
            getBindingSuspendedStates();
            getPropertiesByRole();
            //getReadOnlyThroughoutStatusByRole();
            // getCancelResetStatusByRole();
            //getAddCommentsStatusByRole();
            //getSuspendAccessForUserStatusByRole();
            //getAgencyOnlyApplicationsStatusByRole();
            //getChangeSystemStatusByRole();
            CheckLoggedinUserBindingStatus(vm.agencyCode);
        }


    }


})();
