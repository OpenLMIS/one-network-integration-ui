/*
 * This program is part of the OpenLMIS logistics management information system platform software.
 * Copyright © 2017 VillageReach
 *
 * This program is free software: you can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU Affero General Public License for more details. You should have received a copy of
 * the GNU Affero General Public License along with this program. If not, see
 * http://www.gnu.org/licenses.  For additional information contact info@OpenLMIS.org. 
 */

(function() {

    'use strict';

    /**
     * @ngdoc controller
     * @name admin-one-network-integration.controller:oneNetworkIntegrationController
     *
     * @description
     * Controller for managing valid sources list screen.
     */
    angular
        .module('admin-one-network-integration')
        .controller('oneNetworkIntegrationController', controller);

    controller.$inject = [
        '$state', 'scheduler', 'oneNetworkIntegrationSchedulerService'
    ];

    function controller($state, scheduler, oneNetworkIntegrationSchedulerService) {

        var vm = this;

        vm.$onInit = onInit;
        vm.enableScheduler = enableScheduler;
        vm.disableScheduler = disableScheduler;

        /**
         * @ngdoc property
         * @propertyOf admin-one-network-integration.controller:oneNetworkIntegrationController
         * @name schedulerEnabled
         * @type {boolean}
         *
         * @description
         * Contains filtered schedulerEnabled.
         */
        vm.schedulerEnabled = undefined;

        /**
         * @ngdoc method
         * @methodOf admin-one-network-integration.controller:oneNetworkIntegrationController
         * @name $onInit
         *
         * @description
         * Method that is executed on initiating oneNetworkIntegrationController.
         */
        function onInit() {
            vm.schedulerEnabled = scheduler.schedulerEnabled;
        }

        function enableScheduler() {
            vm.schedulerEnabled = oneNetworkIntegrationSchedulerService.enableScheduler();
        }

        function disableScheduler() {
            vm.schedulerEnabled = oneNetworkIntegrationSchedulerService.disableScheduler();
        }

    }

})();
