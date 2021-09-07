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

describe('oneNetworkIntegrationController', function() {

    beforeEach(function() {
        module('admin-one-network-integration');
        module('one-network-integration');
        module('openlmis-function-decorator');

        inject(function($injector) {
            this.$q = $injector.get('$q');
            this.$controller = $injector.get('$controller');
            this.$state = $injector.get('$state');
            this.$rootScope = $injector.get('$rootScope');
            this.oneNetworkIntegrationService = $injector.get('oneNetworkIntegrationService');
            this.FunctionDecorator = $injector.get('FunctionDecorator');
        });

        this.integration = {
            enabled: true
        };

        spyOn(this.oneNetworkIntegrationService, 'enable')
            .and.returnValue(this.$q.resolve(this.integration));
        spyOn(this.oneNetworkIntegrationService, 'disable')
            .and.returnValue(this.$q.resolve({
                enabled: false
            }));

        var context = this;
        spyOn(this.$state, 'go');
        spyOn(this.FunctionDecorator.prototype, 'decorateFunction').and.callFake(function(fn) {
            context.fn = fn;
            return this;
        });
        spyOn(this.FunctionDecorator.prototype, 'getDecoratedFunction').and.callFake(function() {
            return context.fn;
        });

        this.vm = this.$controller('oneNetworkIntegrationController', {
            integration: this.integration,
            enabled: this.integration.enabled
        });

        this.vm.$onInit();
    });

    describe('onInit', function() {

        it('should expose facility name', function() {
            expect(this.vm.enabled).toEqual(this.integration.enabled);
        });
    });

    describe('changeIntegrationState', function() {

        it('should change integration state to disabled', function() {
            this.vm.enabled = true;

            this.vm.changeIntegrationState();
            this.$rootScope.$apply();

            expect(this.oneNetworkIntegrationService.disable).toHaveBeenCalled();
        });

        it('should change integration state to enabled', function() {
            this.vm.enabled = false;

            this.vm.changeIntegrationState();
            this.$rootScope.$apply();

            expect(this.oneNetworkIntegrationService.enable).toHaveBeenCalled();
        });
    });
});
