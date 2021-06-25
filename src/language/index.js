import {enUS, itIT } from '@material-ui/data-grid';
import LocalizedStrings from 'react-localization';



const language = 'it';

const strings = new LocalizedStrings({

	en: {
	
		add_element : 'Add new element', 

		cancel : 'Cancel',
		clock : 'Clock',

		delete : 'Delete',
		delete_question : 'Are you sure you want delete this element?',
		doctor : 'Doctor',
		doctors : 'Doctors',


		email : 'Email',
		edit : 'Edit',
		errors :{
			409 : 'Username or email already used'
		},
		exit_to_app : "Exit to app",
		exit_to_app_question : "Are you sure you want to exit?",

		forgot_password : "Forgot password?",

		invalid_credentials: "Invalid credentials",

		name : 'Name',
		no : "No",

		ok : 'Ok',
		
		patient	: 'Patient',
		patients : 'Patients',
		
		recents : 'Recents',
		refresh: 'Refresh',
		request_password : 'Request password',
		reset_password_error : 'The user was not found',
		reset_password_success : 'The Password has been changed',
		

		search : "Search...",
		see_more : "See more",
		send : 'Send',
		sign_in: "Sign In",
		
		tests : 'Tests',

		user : 'User',
		username : 'Username',

		yes : "Yes"
	},

	it: {
		add_element : 'Aggiuungi un nuovo elemento', 

		cancel : 'Annulla',
		clock : 'Orologio',

		delete : 'Cancella',
		delete_question : 'Vuoi cancellare l\'elemento?',
		doctor : 'Dottore',
		doctors : 'Dottori',

		email : 'Email',
		edit : 'Modifica',
		errors :{
			409 : 'Utente o email gia utilizzati'
		},
		exit_to_app : "Uscita dall'app",
		exit_to_app_question : "Sei sicuro di voler uscire all'app?",

		forgot_password : "Password dimenticata?",

		invalid_credentials: "Credenziali invalide",

		name : 'Nome',
		no : "No",
		

		ok : 'Ok',

		patient	: 'Paziente',
		patients : 'Pazienti',

		recents : 'Recenti',
		refresh: 'Refresh',
		request_password : 'Richiedi password',
		reset_password_error : 'L\'utente non è stato trovato.',
		reset_password_success : 'La password è stata cambiata.',
		

		search : "Cerca...",
		see_more : "Vai alla Pagina",
		send : 'Invia',
		sign_in: "Accedi",

		tests : 'Analisi',

		user : 'Utente',
		username : 'Username',
		
		yes : "Si"
	}
});


strings.locale = language === 'it' ? itIT : enUS; 
strings.setLanguage(language);

export default strings
