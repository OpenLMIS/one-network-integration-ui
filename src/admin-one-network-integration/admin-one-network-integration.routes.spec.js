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

describe('openlmis.administration.oneNetworkIntegration', function() {

    beforeEach(function() {
        module('admin-one-network-integration');
        module('one-network-integration-scheduler');

        inject(function($injector) {
            this.oneNetworkIntegrationSchedulerService = $injector
                .get('oneNetworkIntegrationSchedulerService');
            this.$q = $injector.get('$q');
            this.$location = $injector.get('$location');
            this.$rootScope = $injector.get('$rootScope');
            this.$state = $injector.get('$state');
        });

        this.scheduler = {
            schedulerEnabled: true
        };

        spyOn(this.oneNetworkIntegrationSchedulerService, 'getStatus')
            .andReturn(this.$q.resolve(this.scheduler));

        this.goToUrl = goToUrl;
        this.getResolvedValue = getResolvedValue;
    });

    describe('state', function() {

        it('should be available under "/administration/oneNetworkIntegration" URI', function() {
            expect(this.$state.current.name).not.toEqual('openlmis.administration.oneNetworkIntegration');

            this.goToUrl('/administration/oneNetworkIntegration');

            expect(this.$state.current.name).toEqual('openlmis.administration.oneNetworkIntegration');
        });

        it('should resolve scheduler', function() {
            this.goToUrl('/administration/oneNetworkIntegration');

            expect(this.getResolvedValue('scheduler')).toEqual(this.scheduler);
            expect(this.oneNetworkIntegrationSchedulerService.getStatus).toHaveBeenCalled();
        });

    });

    function goToUrl(url) {
        this.$location.url(url);
        this.$rootScope.$apply();
    }

    function getResolvedValue(name) {
        return this.$state.$current.locals.globals[name];
    }

});
