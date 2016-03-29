/**
 * SignUpPageController
 * @description - Sign up Page Controller
 */

module app.pages.signUpPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ISignUpPageController {
        ref: Firebase;
        form: ISignUpForm;
        user: app.models.User;
        error: ISignUpError;
        signUpDataConfig: ISignUpDataConfig;
        activate: () => void;
    }

    export interface ISignUpForm {
        email: string;
    }

    export interface ISignUpError {
        message: string;
    }

    export interface ISignUpDataConfig extends ng.ui.IStateParamsService {
        user: app.models.User;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class SignUpPageController implements ISignUpPageController {

        static controllerId = 'finApp.pages.signUpPage.SignUpPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        ref: Firebase;
        form: ISignUpForm;
        user: app.models.User;
        error: ISignUpError;
        signUpDataConfig: ISignUpDataConfig;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$ionicHistory',
                                '$state',
                                '$stateParams',
                                'finApp.auth.AuthService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService,
                    private $state: ng.ui.IStateService,
                    private $stateParams: ISignUpDataConfig,
                    private AuthService) {

            this.init();

        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            //Get state params
            this.signUpDataConfig = this.$stateParams;

            //Init form
            this.form = {
                email: ''
            };
            //TODO: AngularFire no me permite crear un Usuario nuevo sin una password valida
            // Asi que le asignaremos una temporal para poder permitir crear el user. Buscar
            // Una solucion màs optima
            this.user = {
                username: '',
                email: '',
                password: 'finAppTemporalPassword',
                salary: {
                    num: null,
                    formatted: ''
                },
                investment: {
                    num: null,
                    formatted: ''
                },
                business: {
                    num: null,
                    formatted: ''
                }
            };

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('signUpPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Register Method
        * @description Create new user if current user doesn`t have an account
        */
        register(): void {
            let self = this;

            this.user.email = this.form.email;
            this.AuthService().$createUser(this.user).then(function (user){
                //TODO: Mostrar un popUp diciendo: te crearemos una nueva cuenta: Si o No
                //Si presiona SI, lo deberia llevar a la funcion login()
                console.log('new user: ', user);
            }, function (error){
                //Llevar a la pagina de Logging si ese mail ya esta registrado
                if (error.code === 'EMAIL_TAKEN') {
                    self.$state.go('page.logIn', { user: self.user});
                } else {
                    self.error = error;
                }
            });
        };

        /*
        * Go to back method
        * @description this method is launched when user press back button
        */
        goToBack(): void {
            this.$ionicHistory.goBack();
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.pages.signUpPage')
        .controller(SignUpPageController.controllerId, SignUpPageController);

}
