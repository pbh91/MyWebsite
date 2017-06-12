angular.module('wapClient')
    .directive('effectiveDatePanel', function (wapService) {
        return {
            restrict: 'EA',
            scope: {
                name: '=',
                isdisabled: '=',
                lob: '@',
                hastextbox: '@'
            },
            templateUrl: 'common/effectiveDate.html',
            link: function (scope, iElement, iAttrs) {

                var LineOfBusiness = localStorage.getItem(scope.lob.toLowerCase());
                scope.openDatePickerEffectiveDate = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    scope.openedEffectiveDate = true;
                };

                /*            var dateToday = new Date();
                 scope.minDateEffectiveDate = dateToday.setDate((new Date()).getDate() + 1);
                 scope.maxDateEffectiveDate = dateToday.setDate((new Date()).getDate() + 90);*/


                scope.flag = true;
                scope.disabled = function (date, mode) {
                    if (scope.hastextbox) {
                        if (LineOfBusiness === null) {
                            // get next business day
                            var nextBusinessDay;
                            if (moment().day() === 5) { // friday, show monday
                                // set to monday
                                nextBusinessDay = moment().weekday(8).startOf('day');
                            }
                            else if (moment().day() === 6) { // saturday, show monday
                                // set to monday
                                nextBusinessDay = moment().weekday(8).startOf('day');
                            }
                            else {
                                // other days, show next day
                                nextBusinessDay = moment().add('days', 1).startOf('day');
                            }

                            var ninetiethDay = nextBusinessDay.clone().add(90, 'days').startOf('day');

                            var ninetyDaysRange = moment.range(nextBusinessDay.toDate(), ninetiethDay.toDate());
                            date.setHours(0, 0, 0, 0);
                            return !(ninetyDaysRange.contains(date));
                        }
                        else {
                            var response = JSON.parse(wapService.decryptData(LineOfBusiness));

                            // get next business day
                            var nextBusinessDay;
                            if (moment().day() === 5) { // friday, show monday
                                // set to monday
                                nextBusinessDay = moment().weekday(8).startOf('day');
                            }
                            else if (moment().day() === 6) { // saturday, show monday
                                // set to monday
                                nextBusinessDay = moment().weekday(8).startOf('day');
                            }
                            else {
                                // other days, show next day
                                nextBusinessDay = moment().add('days', 1).startOf('day');
                            }

                            var ninetiethDay = nextBusinessDay.clone().add(90, 'days').startOf('day');

                            var ninetyDaysRange = moment.range(nextBusinessDay.toDate(), ninetiethDay.toDate());
                            date.setHours(0, 0, 0, 0);
                            if (response.length > 0) {
                                if (ninetyDaysRange.contains(date)) {
                                    var disabled = true;
                                    var filteredResponse = [];
                                    response.forEach(function (obj) {
                                        var rangeIsValid = ninetyDaysRange.intersect(moment.range(obj.StartDate, obj.EndDate));
                                        if (rangeIsValid) {
                                            filteredResponse.push(obj);
                                        }
                                    });


                                    filteredResponse.forEach(function (obj) {
                                        var range = moment.range(obj.StartDate, obj.EndDate);

                                        if (range.contains(date)) {
                                            //return false;
                                            disabled = false;
                                        }
                                    });
                                    if (filteredResponse.length > 0) {
                                        return disabled;
                                    }
                                    else {
                                        return !(ninetyDaysRange.contains(date));
                                    }
                                } else {
                                    return true;
                                }
                            }
                            else {
                                return !(ninetyDaysRange.contains(date));
                            }
                        }

                    } else {
                        var resetScopeDate = false;

                        if (moment(new moment(scope.name)).isSame(new moment(date), 'day')) {
                            resetScopeDate = true;
                        }
                        if (LineOfBusiness === null) {
                            // get next business day
                            var nextBusinessDay;
                            if (moment().day() === 5) { // friday, show monday
                                // set to monday
                                nextBusinessDay = moment().weekday(8).startOf('day');
                            }
                            else if (moment().day() === 6) { // saturday, show monday
                                // set to monday
                                nextBusinessDay = moment().weekday(8).startOf('day');
                            }
                            else {
                                // other days, show next day
                                nextBusinessDay = moment().add('days', 1).startOf('day');
                            }

                            var ninetiethDay = nextBusinessDay.clone().add(90, 'days').startOf('day');

                            var ninetyDaysRange = moment.range(nextBusinessDay.toDate(), ninetiethDay.toDate());
                            date.setHours(0, 0, 0, 0);

                            if (scope.flag) {
                                scope.flag = false;
                                var new_date = moment(nextBusinessDay);
                                var day = new_date.format('DD');
                                var month = new_date.format('MM');
                                var year = new_date.format('YYYY');
                                var effectiveDateTodayFormatted = month + '/' + day + '/' + year;
                                scope.name = effectiveDateTodayFormatted;
                            }
                            var result = !(ninetyDaysRange.contains(date));
                            if (result && resetScopeDate) {
                                scope.name = '';
                            }
                            return result;
                        }
                        else {


                            var response = JSON.parse(wapService.decryptData(LineOfBusiness));

                            // get next business day
                            var nextBusinessDay;
                            if (moment().day() === 5) { // friday, show monday
                                // set to monday
                                nextBusinessDay = moment().weekday(8).startOf('day');
                            }
                            else if (moment().day() === 6) { // saturday, show monday
                                // set to monday
                                nextBusinessDay = moment().weekday(8).startOf('day');
                            }
                            else {
                                // other days, show next day
                                nextBusinessDay = moment().add('days', 1).startOf('day');
                            }

                            var ninetiethDay = nextBusinessDay.clone().add(90, 'days').startOf('day');

                            var ninetyDaysRange = moment.range(nextBusinessDay.toDate(), ninetiethDay.toDate());
                            date.setHours(0, 0, 0, 0);
                            if (response.length > 0) {
                                if (ninetyDaysRange.contains(date)) {
                                    var disabled = true;
                                    var filteredResponse = [];
                                    response.forEach(function (obj) {
                                        var rangeIsValid = ninetyDaysRange.intersect(moment.range(obj.StartDate, obj.EndDate));
                                        if (rangeIsValid) {
                                            filteredResponse.push(obj);
                                        }
                                    });


                                    filteredResponse.forEach(function (obj) {
                                        var range = moment.range(obj.StartDate, obj.EndDate);

                                        if (range.contains(date)) {
                                            //return false;
                                            if (scope.flag) {
                                                scope.flag = false;
                                                var new_date = moment(date);
                                                var day = new_date.format('DD');
                                                var month = new_date.format('MM');
                                                var year = new_date.format('YYYY');
                                                var effectiveDateTodayFormatted = month + '/' + day + '/' + year;
                                                scope.name = effectiveDateTodayFormatted;
                                            }
                                            disabled = false;
                                        }
                                    });

                                    if (filteredResponse.length > 0) {
                                        if (disabled && resetScopeDate) {
                                            scope.name = '';
                                        }
                                        return disabled;
                                    }
                                    else {
                                        if (scope.flag) {
                                            scope.flag = false;
                                            var new_date = moment(nextBusinessDay);
                                            var day = new_date.format('DD');
                                            var month = new_date.format('MM');
                                            var year = new_date.format('YYYY');
                                            var effectiveDateTodayFormatted = month + '/' + day + '/' + year;
                                            scope.name = effectiveDateTodayFormatted;
                                        }
                                        var result = !(ninetyDaysRange.contains(date));
                                        if (result && resetScopeDate) {
                                            scope.name = '';
                                        }
                                        return result;
                                    }
                                } else {
                                    if (resetScopeDate) {
                                        scope.name = '';
                                    }
                                    return true;
                                }
                            }
                            else {
                                if (scope.flag) {
                                    scope.flag = false;
                                    var new_date = moment(nextBusinessDay);
                                    var day = new_date.format('DD');
                                    var month = new_date.format('MM');
                                    var year = new_date.format('YYYY');
                                    var effectiveDateTodayFormatted = month + '/' + day + '/' + year;
                                    scope.name = effectiveDateTodayFormatted;
                                }
                                var result = !(ninetyDaysRange.contains(date));
                                if (result && resetScopeDate) {
                                    scope.name = '';
                                }
                                return result;
                            }
                        }
                    }

                };

            }


        };
    });