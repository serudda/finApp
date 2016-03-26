/**
 * functionsUtilService
 * @description - Service with util functions used accross the whole application
 * @constructor
 */


module app.core.util.functionsUtil {
    'use strict';

    export interface IFunctionsUtilService {
        //properties
        dateFormatted: IDateFormatted;

        //methods
        splitDateFormat: (date: any) => IDateFormatted;
    }

    export interface IDateFormatted {
        day: string;
        month: string;
        year: string;
    }

    export class FunctionsUtilService implements IFunctionsUtilService {

        static serviceId = 'finApp.core.util.FunctionsUtilService';
        dateFormatted: IDateFormatted;

        constructor() {
            console.log('functionsUtil service called');
        }

        splitDateFormat(date): IDateFormatted {
            //Format date to MM/DD/YYYY
            let dateString = moment(date).format('YYYY/MMM/DD').split('/');
            //Split date to day, month and year
            let dateFormatted = {
                day: dateString[2],
                month: dateString[1],
                year: dateString[0]
            };

            return dateFormatted;
        }

        /**
        * formatCurrency
        * @description - format a number to currency string
        * @function
        * @params {number} num - number without format
        * @params {string} formatted - number formatted
        * @return {object} currency - Returns an object with 2 properties: num - number without format
        * and formatted - number formatted.
        */
        formatCurrency(num: number, formatted: string): app.models.IMoney {

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

    }

    angular
        .module('finApp.core.util', [])
        .service(FunctionsUtilService.serviceId, FunctionsUtilService);

}
