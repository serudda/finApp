/**
 * Specifies the Classes and Interfaces related to Users in our Model
 */

module app.models {

    export interface IUser {
        username: string;
        salary: IMoney;
        investment: IMoney;
        business: IMoney;
    }

    export interface IMoney {
        num: number;
        formatted: string;
    }

    export class User implements IUser {

        username: string;
        salary: IMoney;
        investment: IMoney;
        business: IMoney;

        constructor(data?) {
            if (data) {
                this.username = data.username;
                this.salary = data.salary;
                this.investment = data.investment;
                this.business = data.business;
            }
        }

    }

}