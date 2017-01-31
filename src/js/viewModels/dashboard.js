/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojchart', 'ojs/ojbutton'],
        function (oj, ko, $) {

            function DashboardViewModel() {
                var self = this;

                var fuelTypes = [{name: 'Bio-Diesel', abbr: 'BD'},
                    {name: 'Compressed Natural Gas', abbr: 'CNG'},
                    {name: 'Electric Charging', abbr: 'ELEC'},
                    {name: 'Ethanol', abbr: 'E85'},
                    {name: 'Hydrogen & Fuel Cell', abbr: 'HY'},
                    {name: 'Liquefied Natural Gas', abbr: 'LNG'},
                    {name: 'Liquefied Petroleum Gas', abbr: 'LPG'}
                ]


                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additionaly available methods.

                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    self.cityVal = ko.observable('San Jose');
                    self.selectVal = ko.observableArray(['CA']);
                    self.pieSeriesValue = ko.observableArray([]);
                    self.groupsValue = ko.observableArray(['Fuel Types'])

                    self.States = [
                        {label: 'ALABAMA', value: 'AL'},
                        {label: 'ALASKA', value: 'AK'},
                        {label: 'AMERICAN SAMOA', value: 'AS'},
                        {label: 'ARIZONA', value: 'AZ'},
                        {label: 'ARKANSAS', value: 'AR'},
                        {label: 'CALIFORNIA', value: 'CA'},
                        {label: 'COLORADO', value: 'CO'},
                        {label: 'CONNECTICUT', value: 'CT'},
                        {label: 'DELAWARE', value: 'DE'},
                        {label: 'DISTRICT OF COLUMBIA', value: 'DC'},
                        {label: 'FEDERATED STATES OF MICRONESIA', value: 'FM'},
                        {label: 'FLORIDA', value: 'FL'},
                        {label: 'GEORGIA', value: 'GA'},
                        {label: 'GUAM', value: 'GU'},
                        {label: 'HAWAII', value: 'HI'},
                        {label: 'IDAHO', value: 'ID'},
                        {label: 'ILLINOIS', value: 'IL'},
                        {label: 'INDIANA', value: 'IN'},
                        {label: 'IOWA', value: 'IA'},
                        {label: 'KANSAS', value: 'KS'},
                        {label: 'KENTUCKY', value: 'KY'},
                        {label: 'LOUISIANA', value: 'LA'},
                        {label: 'MAINE', value: 'ME'},
                        {label: 'MARSHALL ISLANDS', value: 'MH'},
                        {label: 'MARYLAND', value: 'MD'},
                        {label: 'MASSACHUSETTS', value: 'MA'},
                        {label: 'MICHIGAN', value: 'MI'},
                        {label: 'MINNESOTA', value: 'MN'},
                        {label: 'MISSISSIPPI', value: 'MS'},
                        {label: 'MISSOURI', value: 'MO'},
                        {label: 'MONTANA', value: 'MT'},
                        {label: 'NEBRASKA', value: 'NE'},
                        {label: 'NEVADA', value: 'NV'},
                        {label: 'NEW HAMPSHIRE', value: 'NH'},
                        {label: 'NEW JERSEY', value: 'NJ'},
                        {label: 'NEW MEXICO', value: 'NM'},
                        {label: 'NEW YORK', value: 'NY'},
                        {label: 'NORTH CAROLINA', value: 'NC'},
                        {label: 'NORTH DAKOTA', value: 'ND'},
                        {label: 'NORTHERN MARIANA ISLANDS', value: 'MP'},
                        {label: 'OHIO', value: 'OH'},
                        {label: 'OKLAHOMA', value: 'OK'},
                        {label: 'OREGON', value: 'OR'},
                        {label: 'PALAU', value: 'PW'},
                        {label: 'PENNSYLVANIA', value: 'PA'},
                        {label: 'PUERTO RICO', value: 'PR'},
                        {label: 'RHODE ISLAND', value: 'RI'},
                        {label: 'SOUTH CAROLINA', value: 'SC'},
                        {label: 'SOUTH DAKOTA', value: 'SD'},
                        {label: 'TENNESSEE', value: 'TN'},
                        {label: 'TEXAS', value: 'TX'},
                        {label: 'UTAH', value: 'UT'},
                        {label: 'VERMONT', value: 'VT'},
                        {label: 'VIRGIN ISLANDS', value: 'VI'},
                        {label: 'VIRGINIA', value: 'VA'},
                        {label: 'WASHINGTON', value: 'WA'},
                        {label: 'WEST VIRGINIA', value: 'WV'},
                        {label: 'WISCONSIN', value: 'WI'},
                        {label: 'WYOMING', value: 'WY'}
                    ];

                    self.getData = function () {
                        var url = "https://api.data.gov/nrel/alt-fuel-stations/v1/nearest.json?api_key=IfzSwc4snuZkl1rk8nRb8NJGt1YTH2ndbZZLWlTf&location=" + self.cityVal() + "+" + self.selectVal()
                        $.getJSON(url).then(function (data) {
                            var fuels = data.station_counts.fuels;
                            var pieSeries = [];
                            for (var prop in fuels) {
                                if (fuels[prop].total > 0) {
                                    pieSeries.push({name: getFuelName(prop), items: [fuels[prop].total]})
                                }
                            }
                            self.pieSeriesValue(pieSeries);
                        });
                    };

                    var getFuelName = function (prop) {
                        for (var i in fuelTypes) {
                            if (fuelTypes[i].abbr === prop)
                                return fuelTypes[i].name;
                        }
                    }
                };

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    // Implement if needed
                    self.getData();
                };


                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };

                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new DashboardViewModel();
        }
);
