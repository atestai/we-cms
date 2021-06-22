import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({

	en: {
	
		add_element : 'Add new element', 	

		delete : 'Delete',
		delete_question : 'Are you sure you want delete this element?',
		doctor : 'Doctor',
		doctors : 'Doctors',
		
		edit : 'Edit',
		exit_to_app : "Exit to app",
		exit_to_app_question : "Are you sure you want to exit?",

		forgot_password : "Forgot password?",

		invalid_credentials: "Invalid credentials",

		no : "No",
		
		patients : 'Patients',
		
		refresh: 'Refresh',

		search : "Search...",
		
		sign_in: "Sign In",
		
		tests : 'Tests',

		yes : "Yes"
	},

	it: {
		add_element : 'Aggiuungi un nuovo elemento', 

		delete : 'Cancella',
		delete_question : 'Vuoi cancellare l\'elemento?',
		doctor : 'Dottore',
		doctors : 'Dottori',
		

		edit : 'Modifica',
		exit_to_app : "Uscita dall'app",
		exit_to_app_question : "Sei sicuro che vuoi uscire?",

		forgot_password : "Password dimenticata?",

		invalid_credentials: "Credenziali invalide",

		no : "No",

		patients : 'Pazienti',

		refresh: 'Refresh',

		search : "Cerca...",
		sign_in: "Accedi",

		tests : 'Analisi',
		
		yes : "Si"
	}
});


strings.setLanguage('en');

export default strings
