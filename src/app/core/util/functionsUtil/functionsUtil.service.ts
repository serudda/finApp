/**
* functionsUtilService
* @description - Service with util functions used accross the whole application
* @constructor
*/

module app.core.util.functionsUtil {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IFunctionsUtilService {
        dateFormatted: app.interfaces.IDateFormatted;
        dateMonthToString: (date: string, zone: string) => string;
        getPositionByUid: (array: Array<any>, uid: string) => number;
        groupByYear: (array: Array<any>) => any;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class FunctionsUtilService implements IFunctionsUtilService {

        static serviceId = 'finApp.core.util.FunctionsUtilService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        dateFormatted: app.interfaces.IDateFormatted;
        // --------------------------------

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            console.log('functionsUtil service called');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Split Date Format Method
        * @description Split Date in 3 parts: day, month and year
        */
        public static splitDateFormat(date: string): app.interfaces.IDateFormatted {
            //Format date to MM/DD/YYYY
            let dateString = moment(date).format('YYYY/MMM/DD').split('/');
            //Split date to day, month and year
            let dateFormatted = {
                complete: date,
                day: dateString[2],
                month: dateString[1],
                year: dateString[0]
            };

            return dateFormatted;
        }

        /**
        * dateMonthToString
        * @description - format month to long string (example: 'November')
        * @use - this.FinanceService.dateMonthToString('Mon May 01 2016 01:23:34 GMT-0500 (COT)', 'es-ES');
        * @function
        * @params {string} date - complete date
        * @params {string} zone - specific the language zone (example: 'en-US', 'es-ES')
        * @return {string} month - Returns month formatted to long string (example: 'November')
        */
        dateMonthToString(date, zone): string {
            //VARIABLES
            var dateFormatted = new Date(date);
            var options = {month: "long"};
            var month = dateFormatted.toLocaleDateString(zone, options);
            return month;
        }

        /**
        * formatCurrency
        * @description - format a number to currency string
        * @function
        * @params {number} num - number without format
        * @params {string} formatted - number formatted (if you don't have this value, please send '')
        * @return {object} currency - Returns an object with 2 properties: num - number without format
        * and formatted - number formatted.
        */
        formatCurrency(num: number, formatted: string): app.models.finance.IMoney {

            let currency = {
                num: num,
                formatted: formatted
            };

            if (currency.formatted) {
                currency.num = accounting.unformat(currency.formatted);
            }
            //TODO: Remove '$' hardcode, change it with some variable
            currency.formatted = accounting.formatMoney(currency.num, '$', 0);

            return currency;

        }

        /**
        * generateGuid
        * @description - generate Guid id string
        * @function
        * @return {string} guid - Returns an Guid Id string.
        */
        public static generateGuid(): string {
            var fmt = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
            var guid = fmt.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            return guid;
        }

        /**
        * getPositionByUid
        * @description - get Position on Array by Uid
        * @function
        * @return {number} index - Returns an index position on Array
        */
        getPositionByUid(array, uid): number {
            let index = array.map(function(element){
                return element.Uid;
            }).indexOf(uid);
            return index;
        }

        /**
        * groupByYear
        * @description - take an array and grouping it by Year
        * @function
        * @return {Array<any>} newArrayGroupedByYear - Returns an array grouped by Year
        */
        groupByYear(array): any {
            let newArrayGroupedByYear = _.groupBy(array, function(item:any) {
                return item.dateCreated.year;
            });

            return newArrayGroupedByYear;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('finApp.core.util', [])
    .service(FunctionsUtilService.serviceId, FunctionsUtilService);

}
