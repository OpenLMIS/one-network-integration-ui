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
     * Controller for managing one network integration.
     */
    angular
        .module('admin-one-network-integration')
        .controller('oneNetworkIntegrationController', controller);

    controller.$inject = [
        '$state', 'integration', 'oneNetworkIntegrationService', 'FunctionDecorator'
    ];

    function controller($state, integration, oneNetworkIntegrationService, FunctionDecorator) {

        var vm = this;

        vm.$onInit = onInit;
        vm.changeIntegrationState = new FunctionDecorator()
            .decorateFunction(changeIntegrationState)
            .withLoading(true)
            .getDecoratedFunction();
        vm.buttonMessage = undefined;
        vm.headerMessage = undefined;

        /**
         * @ngdoc property
         * @propertyOf admin-one-network-integration.controller:oneNetworkIntegrationController
         * @name enabled
         * @type {boolean}
         *
         * @description
         * Contains enabled - integration status.
         */
        vm.enabled = undefined;

        /**
         * @ngdoc method
         * @methodOf admin-one-network-integration.controller:oneNetworkIntegrationController
         * @name $onInit
         *
         * @description
         * Method that is executed on initiating oneNetworkIntegrationController.
         */
        function onInit() {
            vm.enabled = integration.enabled;
            setMessages();
        }

        /**
         * @ngdoc method
         * @methodOf admin-one-network-integration.controller:oneNetworkIntegrationController
         * @name changeIntegrationState
         *
         * @description
         * Changes integration state and set appropriate messages.
         */
        function changeIntegrationState() {
            if (vm.enabled) {
                oneNetworkIntegrationService.disable()
                    .then(function() {
                        vm.enabled = false;
                        setMessages();
                        $state.reload();
                    });
            } else {
                oneNetworkIntegrationService.enable()
                    .then(function() {
                        vm.enabled = true;
                        setMessages();
                        $state.reload();
                    });
            }
        }

        function setMessages() {
            if (vm.enabled) {
                vm.buttonMessage = 'oneNetworkIntegration.disable';
                vm.headerMessage = 'oneNetworkIntegration.enableMessage';
            } else {
                vm.buttonMessage = 'oneNetworkIntegration.enable';
                vm.headerMessage = 'oneNetworkIntegration.disableMessage';
            }
        }
    }

})();
