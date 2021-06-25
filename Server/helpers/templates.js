module.exports = {

    emailResetPassword: `
    <h2>Cambio Password</h2>

    <p>
        Gentile utente,<br>
        La password è stata reimpostata per l'utente $(name) così come richiesto. <br>
        Di seguito è riportata la nuova password generata per il suo account.
    </p>
    
    <p>
        Username: $(username) <br>
        Password: $(password)
    </p>
    
    <p>Se non ha richiesto il reset della password, contatti a più presto l’assistenza. <br>
        Per tornare sul portale clicchi <a href="$(url)">qui</a>.</p>`,

    replaceArray: (string, find, replace) => {
        let replaceString = string;
        
        for (var i = 0; i < find.length; i++) {
            replaceString = replaceString.replace(find[i], replace[i]);
        }
        return replaceString;
    }
}