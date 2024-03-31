function ValidateURL(urlToCheck) {
    console.log(typeof(urlToCheck),'urlToCheck');
    // Below regular expression can validate input URL with or without http:// etc
    const pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    return pattern.test(urlToCheck);
}