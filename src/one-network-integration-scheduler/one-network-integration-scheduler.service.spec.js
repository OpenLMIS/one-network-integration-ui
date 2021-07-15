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

describe('oneNetworkIntegrationSchedulerService', function() {

    beforeEach(function() {
        module('one-network-integration-scheduler');

        inject(function($injector) {
            this.$httpBackend = $injector.get('$httpBackend');
            this.$rootScope = $injector.get('$rootScope');
            this.openlmisUrlFactory = $injector.get('openlmisUrlFactory');
            this.oneNetworkIntegrationSchedulerService = $injector.get('oneNetworkIntegrationSchedulerService');
        });

        this.scheduler = {
            schedulerEnabled: true
        };
    });

    describe('getStatus', function() {

        it('should get scheduler status', function() {
            var data;

            var scheduler = this.scheduler;

            this.$httpBackend
                .expectGET(this.openlmisUrlFactory('/api/scheduler/status'))
                .respond(200, scheduler);

            this.oneNetworkIntegrationSchedulerService.getStatus()
                .then(function(response) {
                    data = response;
                });

            this.$httpBackend.flush();
            this.$rootScope.$apply();

            expect(data.schedulerEnabled).toBe(this.scheduler.schedulerEnabled);
        });
    });

    describe('enableScheduler', function() {

        it('should set scheduler status to enabled', function() {
            var data;

            var scheduler = this.scheduler;

            this.$httpBackend
                .expectPUT(this.openlmisUrlFactory('/api/scheduler/enable'))
                .respond(200, scheduler);

            this.oneNetworkIntegrationSchedulerService.enableScheduler()
                .then(function(response) {
                    data = response;
                });

            this.$httpBackend.flush();
            this.$rootScope.$apply();

            expect(data.schedulerEnabled).toBe(this.scheduler.schedulerEnabled);
        });
    });

    describe('disableScheduler', function() {

        it('should set scheduler status to disabled', function() {
            var data;
            this.scheduler.schedulerEnabled = false;
            var scheduler = this.scheduler;

            this.$httpBackend
                .expectPUT(this.openlmisUrlFactory('/api/scheduler/disable'))
                .respond(200, scheduler);

            this.oneNetworkIntegrationSchedulerService.disableScheduler()
                .then(function(response) {
                    data = response;
                });

            this.$httpBackend.flush();
            this.$rootScope.$apply();

            expect(data.schedulerEnabled).toBe(this.scheduler.schedulerEnabled);
        });
    });

    afterEach(function() {
        this.$httpBackend.verifyNoOutstandingExpectation();
        this.$httpBackend.verifyNoOutstandingRequest();
    });
});
