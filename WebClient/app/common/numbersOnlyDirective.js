angular.module('wapClient').directive('numbersOnly', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                // this next if is necessary for when using ng-required on your input.
                // In such cases, when a letter is typed first, this parser will be called
                // again, and the 2nd time, the value will be undefined
                if (inputValue == undefined) return ''
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});


angular.module('wapClient').directive('formatCurrency', ['$filter', formatCurrency])
formatCurrency.$inject = ['$filter'];
function formatCurrency($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;


            ctrl.$formatters.unshift(function (a) {
                if (ctrl.$modelValue === '' || ctrl.$modelValue === null || ctrl.$modelValue == undefined) {
                    return ctrl.$modelValue;
                }
                return $filter(attrs.formatCurrency)(ctrl.$modelValue, undefined, 0)
                //return ctrl.$modelValue;
            });


            ctrl.$parsers.unshift(function (viewValue) {
                if (viewValue == "" || viewValue == null || viewValue == undefined) {
                    return;
                }
                if (viewValue == '$') {
                    elem.val("");
                    return;
                }
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '').replace(/[^0-9]/g, '');
                elem.val($filter(attrs.formatCurrency)(plainNumber, undefined, 0));
                return plainNumber;
            });
        }
    };
}

angular.module('wapClient').directive('formatPercentage', ['$filter', formatPercentage])
formatPercentage.$inject = ['$filter'];
function formatPercentage($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;


            ctrl.$formatters.unshift(function (a) {
                if (ctrl.$modelValue === '' || ctrl.$modelValue === null || ctrl.$modelValue == undefined) {
                    return ctrl.$modelValue;
                }
                return $filter(attrs.formatPercentage)(ctrl.$modelValue, undefined, 0) + '%';
                //return ctrl.$modelValue;
            });


            ctrl.$parsers.unshift(function (viewValue) {
                if (viewValue == "" || viewValue == null || viewValue == undefined) {
                    return;
                }
                if (viewValue == '$') {
                    elem.val("");
                    return;
                }
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '').replace(/[^0-9]/g, '');
                elem.val($filter(attrs.formatPercentage)(plainNumber, undefined, 0) + '%');
                return plainNumber;
            });
        }
    };
}


angular.module('wapClient').directive('format', ['$filter', format])
format.$inject = ['$filter'];
function format($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;


            ctrl.$formatters.unshift(function (a) {
                if (ctrl.$modelValue === '' || ctrl.$modelValue === null || ctrl.$modelValue == undefined) {
                    return ctrl.$modelValue;
                }
                return $filter(attrs.format)(ctrl.$modelValue)
                //return ctrl.$modelValue;
            });


            ctrl.$parsers.unshift(function (viewValue) {
                if (viewValue == "" || viewValue == null || viewValue == undefined) {
                    return;
                }
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
                return plainNumber;
            });
        }
    };
}



angular.module('wapClient').directive('realTimeCurrency', ['$filter', '$locale', realTimeCurrency])
realTimeCurrency.$inject = ['$filter', '$locale'];
function realTimeCurrency($filter,$locale) {
    var decimalSep = $locale.NUMBER_FORMATS.DECIMAL_SEP;
    var toNumberRegex = new RegExp('[^0-9\\' + decimalSep + ']', 'g');
    var trailingZerosRegex = new RegExp('\\' + decimalSep + '0+$');
    var filterFunc = function (value) {
        return $filter('currency')(value);
    };

    function getCaretPosition(input) {
        if (!input) return 0;
        if (input.selectionStart !== undefined) {
            return input.selectionStart;
        } else if (document.selection) {
            // Curse you IE
            input.focus();
            var selection = document.selection.createRange();
            selection.moveStart('character', input.value ? -input.value.length : 0);
            return selection.text.length;
        }
        return 0;
    }

    function setCaretPosition(input, pos) {
        if (!input) return 0;
        if (input.offsetWidth === 0 || input.offsetHeight === 0) {
            return; // Input's hidden
        }
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(pos, pos);
        }
        else if (input.createTextRange) {
            // Curse you IE
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    function toNumber(currencyStr) {
        return parseFloat(currencyStr.replace(toNumberRegex, ''), 10);
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, elem, attrs, modelCtrl) {
            modelCtrl.$formatters.push(filterFunc);
            modelCtrl.$parsers.push(function (newViewValue) {
                var oldModelValue = modelCtrl.$modelValue;
                var newModelValue = toNumber(newViewValue);
                modelCtrl.$viewValue = filterFunc(newModelValue);
                var pos = getCaretPosition(elem[0]);
                elem.val(modelCtrl.$viewValue);
                var newPos = pos + modelCtrl.$viewValue.length -
                                   newViewValue.length;
                if ((oldModelValue === undefined) || isNaN(oldModelValue)) {
                    newPos -= 3;
                }
                setCaretPosition(elem[0], newPos);
                return newModelValue;
            });
        }
    };
}




angular.module('wapClient')
    .filter('phonenumber', function() {
        /*
         Format phonenumber as: c (xxx) xxx-xxxx
         or as close as possible if phonenumber length is not 10
         if c is not '1' (country code not USA), does not use country code
         */

        return function (number) {
            /*
             @param {Number | String} number - Number that will be formatted as telephone number
             Returns formatted number: (###) ###-####
             if number.length < 4: ###
             else if number.length < 7: (###) ###

             Does not handle country codes that are not '1' (USA)
             */
            if (!number) { return ''; }

            number = String(number);

            // Will return formattedNumber.
            // If phonenumber isn't longer than an area code, just show number
            var formattedNumber = number;

            // if the first character is '1', strip it out and add it back
            var c = (number[0] == '1') ? '1 ' : '';
            number = number[0] == '1' ? number.slice(1) : number;

            // # (###) ###-#### as c (area) front-end
            var area = number.substring(0,3);
            var front = number.substring(3, 6);
            var end = number.substring(6, 10);

            if (front) {
                formattedNumber = (c + "(" + area + ") " + front);
            }
            if (end) {
                formattedNumber += ("-" + end);
            }
            return formattedNumber;
        };
    });


angular.module('wapClient')
    .directive('replace', function() {
        /*replace="[^a-zA-Z]" with=""*/
        return {
            require: 'ngModel',
            scope: {
                regex: '@replace',
                with: '@with'
            },
            link: function(scope, element, attrs, model) {
                model.$parsers.push(function(val) {
                    if (!val) { return; }
                    var regex = new RegExp(scope.regex);
                    var replaced = val.replace(regex, scope.with);
                    if (replaced !== val) {
                        model.$setViewValue(replaced);
                        model.$render();
                    }
                    return replaced;
                });
            }
        };
    });


function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}