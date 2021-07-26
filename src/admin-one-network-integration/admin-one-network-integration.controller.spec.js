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
        module('one-network-integration-scheduler');
        module('openlmis-function-decorator');

        inject(function($injector) {
            this.$q = $injector.get('$q');
            this.$controller = $injector.get('$controller');
            this.$state = $injector.get('$state');
            this.$rootScope = $injector.get('$rootScope');
            this.oneNetworkIntegrationSchedulerService = $injector.get('oneNetworkIntegrationSchedulerService');
            this.FunctionDecorator = $injector.get('FunctionDecorator');
        });

        this.scheduler = {
            schedulerEnabled: true
        };

        spyOn(this.oneNetworkIntegrationSchedulerService, 'enableScheduler')
            .andReturn(this.$q.resolve(this.scheduler));
        spyOn(this.oneNetworkIntegrationSchedulerService, 'disableScheduler')
            .andReturn(this.$q.resolve({
                schedulerEnabled: false
            }));

        var context = this;
        spyOn(this.$state, 'go');
        spyOn(this.FunctionDecorator.prototype, 'decorateFunction').andCallFake(function(fn) {
            context.fn = fn;
            return this;
        });
        spyOn(this.FunctionDecorator.prototype, 'getDecoratedFunction').andCallFake(function() {
            return context.fn;
        });

        this.vm = this.$controller('oneNetworkIntegrationController', {
            scheduler: this.scheduler,
            schedulerEnabled: this.scheduler.schedulerEnabled
        });

        this.vm.$onInit();
    });

    describe('onInit', function() {

        it('should expose facility name', function() {
            expect(this.vm.schedulerEnabled).toEqual(this.scheduler.schedulerEnabled);
        });
    });

    describe('changeSchedulerState', function() {

        it('should change scheduler state to disabled', function() {
            this.vm.schedulerEnabled = true;

            this.vm.changeSchedulerState();
            this.$rootScope.$apply();

            expect(this.oneNetworkIntegrationSchedulerService.disableScheduler).toHaveBeenCalled();
        });

        it('should change scheduler state to enabled', function() {
            this.vm.schedulerEnabled = false;

            this.vm.changeSchedulerState();
            this.$rootScope.$apply();

            expect(this.oneNetworkIntegrationSchedulerService.enableScheduler).toHaveBeenCalled();
        });
    });
});
