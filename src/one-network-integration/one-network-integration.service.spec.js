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

describe('oneNetworkIntegrationService', function() {

    beforeEach(function() {
        module('one-network-integration');

        inject(function($injector) {
            this.$httpBackend = $injector.get('$httpBackend');
            this.$rootScope = $injector.get('$rootScope');
            this.openlmisUrlFactory = $injector.get('openlmisUrlFactory');
            this.oneNetworkIntegrationService = $injector.get('oneNetworkIntegrationService');
        });

        this.integration = {
            enabled: true
        };
    });

    describe('getStatus', function() {

        it('should get integration status', function() {
            var data;

            var integration = this.integration;

            this.$httpBackend
                .expectGET(this.openlmisUrlFactory('/api/integration/status'))
                .respond(200, integration);

            this.oneNetworkIntegrationService.getStatus()
                .then(function(response) {
                    data = response;
                });

            this.$httpBackend.flush();
            this.$rootScope.$apply();

            expect(data.enabled).toBe(this.integration.enabled);
        });
    });

    describe('enable', function() {

        it('should set integration status to enabled', function() {
            var data;

            var integration = this.integration;

            this.$httpBackend
                .expectPUT(this.openlmisUrlFactory('/api/integration/enable'))
                .respond(200, integration);

            this.oneNetworkIntegrationService.enable()
                .then(function(response) {
                    data = response;
                });

            this.$httpBackend.flush();
            this.$rootScope.$apply();

            expect(data.enabled).toBe(this.integration.enabled);
        });
    });

    describe('disable', function() {

        it('should set integration status to disabled', function() {
            var data;
            this.integration.enabled = false;
            var integration = this.integration;

            this.$httpBackend
                .expectPUT(this.openlmisUrlFactory('/api/integration/disable'))
                .respond(200, integration);

            this.oneNetworkIntegrationService.disable()
                .then(function(response) {
                    data = response;
                });

            this.$httpBackend.flush();
            this.$rootScope.$apply();

            expect(data.enabled).toBe(this.integration.enabled);
        });
    });

    afterEach(function() {
        this.$httpBackend.verifyNoOutstandingExpectation();
        this.$httpBackend.verifyNoOutstandingRequest();
    });
});
