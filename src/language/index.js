import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({

	en: {
	
		add_element : 'Add new element', 

		cancel : 'Cancel',

		delete : 'Delete',
		delete_question : 'Are you sure you want delete this element?',
		doctor : 'Doctor',
		doctors : 'Doctors',


		
		edit : 'Edit',
		errors :{
			409 : 'Already used'
		},
		exit_to_app : "Exit to app",
		exit_to_app_question : "Are you sure you want to exit?",

		forgot_password : "Forgot password?",

		invalid_credentials: "Invalid credentials",

		name : 'Name',
		no : "No",

		ok : 'Ok',
		
		patients : 'Patients',
		
		refresh: 'Refresh',

		search : "Search...",
		
		sign_in: "Sign In",
		
		tests : 'Tests',

		username : 'Username',

		yes : "Yes"
	},

	it: {
		add_element : 'Aggiuungi un nuovo elemento', 

		cancel : 'Annulla',

		delete : 'Cancella',
		delete_question : 'Vuoi cancellare l\'elemento?',
		doctor : 'Dottore',
		doctors : 'Dottori',

		
		

		edit : 'Modifica',
		errors :{
			409 : 'Dato gia utilizzato'
		},
		exit_to_app : "Uscita dall'app",
		exit_to_app_question : "Sei sicuro che vuoi uscire?",

		forgot_password : "Password dimenticata?",

		invalid_credentials: "Credenziali invalide",

		name : 'Nome',
		no : "No",
		

		ok : 'Ok',

		patients : 'Pazienti',

		refresh: 'Refresh',

		search : "Cerca...",
		sign_in: "Accedi",

		tests : 'Analisi',

		username : 'Username',
		
		yes : "Si"
	}
});


strings.setLanguage('en');

export default strings
