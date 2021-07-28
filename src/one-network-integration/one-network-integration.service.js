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
     * @name one-network-integration.oneNetworkIntegrationService
     *
     * @description
     * Responsible for retrieving config info from the One Network integration.
     */
    angular
        .module('one-network-integration')
        .service('oneNetworkIntegrationService', service);

    service.$inject = [
        'openlmisUrlFactory', '$resource'
    ];

    function service(openlmisUrlFactory, $resource) {
        var resource = $resource(openlmisUrlFactory('/api/integration'), {}, {
            getStatus: {
                method: 'GET',
                url: openlmisUrlFactory('/api/integration/status')
            },
            enable: {
                method: 'PUT',
                url: openlmisUrlFactory('/api/integration/enable')
            },
            disable: {
                method: 'PUT',
                url: openlmisUrlFactory('/api/integration/disable')
            }
        });

        this.getStatus = getStatus;
        this.enable = enable;
        this.disable = disable;

        /**
         * @ngdoc method
         * @methodOf one-network-integration.oneNetworkIntegrationService
         * @name getStatus
         *
         * @description
         * Provides current status of integration
         *
         * @return  {Promise}           the promise resolving to the current status
         */
        function getStatus() {
            return resource.getStatus().$promise;
        }

        /**
         * @ngdoc method
         * @methodOf one-network-integration.oneNetworkIntegrationService
         * @name enable
         *
         * @description
         * Enables the integration.
         */
        function enable() {
            return resource.enable().$promise;
        }

        /**
         * @ngdoc method
         * @methodOf one-network-integration.oneNetworkIntegrationService
         * @name disable
         *
         * @description
         * Disables the integration.
         */
        function disable() {
            return resource.disable().$promise;

        }
    }
})();
