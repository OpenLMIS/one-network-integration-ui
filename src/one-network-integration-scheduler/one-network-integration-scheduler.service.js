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
     * @ngdoc service
     * @name one-network-integration-scheduler.oneNetworkIntegrationSchedulerService
     *
     * @description
     * Responsible for retrieving scheduler info from the One Network integration.
     */
    angular
        .module('one-network-integration-scheduler')
        .service('oneNetworkIntegrationSchedulerService', service);

    service.$inject = [
        'openlmisUrlFactory', '$resource'
    ];

    function service(openlmisUrlFactory, $resource) {
        var resource = $resource(openlmisUrlFactory('/api/scheduler'), {}, {
            getStatus: {
                method: 'GET',
                url: openlmisUrlFactory('/api/scheduler/status')
            },
            enableScheduler: {
                method: 'PUT',
                url: openlmisUrlFactory('/api/scheduler/enable')
            },
            disableScheduler: {
                method: 'PUT',
                url: openlmisUrlFactory('/api/scheduler/disable')
            }
        });

        this.getStatus = getStatus;
        this.enableScheduler = enableScheduler;
        this.disableScheduler = disableScheduler;

        /**
         * @ngdoc method
         * @methodOf one-network-integration-scheduler.oneNetworkIntegrationSchedulerService
         * @name getStatus
         *
         * @description
         * Provides current scheduler status
         *
         * @return  {Promise}           the promise resolving to the current scheduler status
         */
        function getStatus() {
            return resource.getStatus().$promise;
        }

        /**
         * @ngdoc method
         * @methodOf one-network-integration-scheduler.oneNetworkIntegrationSchedulerService
         * @name enableScheduler
         *
         * @description
         * Enables the scheduler.
         *
         * @return  {Promise}           the promise resolving to the current scheduler status
         */
        function enableScheduler() {
            return resource.enableScheduler().$promise;
        }

        /**
         * @ngdoc method
         * @methodOf one-network-integration-scheduler.oneNetworkIntegrationSchedulerService
         * @name disableScheduler
         *
         * @description
         * Disables the scheduler.
         *
         * @return  {Promise}           the promise resolving to the current scheduler status
         */
        function disableScheduler() {
            return resource.disableScheduler().$promise;

        }
    }
})();
