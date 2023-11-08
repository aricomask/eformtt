// CDN Source
//----------------------Inputy---------------------//
function styleInputs(inputID) {
    var parentDiv = $('#' + inputID).closest('.cell');
    parentDiv.find('.info').hide();

    parentDiv.addClass('govuk-inset-text govuk-form-group');
    parentDiv.find('.fieldLabel').addClass('govuk-label');

    var inputElement = $('#' + inputID);
    inputElement.addClass('govuk-input');
    var altText = inputElement.attr('alt');

    if (inputElement.prop('required')) {
        parentDiv.find('.fieldLabel').append(' <span class="govuk-required">*</span>');
    }

    if (inputElement.prop('readonly')) {
        inputElement.addClass('govuk-input--readonly');
    }

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === "class") {
                var parentInsetDiv = $('#' + inputID).closest('.govuk-inset-text');
                if ($('#' + inputID).hasClass('error')) {
                    // Zmeňte farbu okraja na červenú, ak je chyba
                    parentInsetDiv.css('border-color', 'red');
                } else {
                    // Zmeňte farbu okraja späť na pôvodnú, ak nie je chyba
                    parentInsetDiv.css('border-color', ''); // alebo ktorákoľvek predvolená farba
                }
            }
        });
    });

    observer.observe(inputElement[0], {
        attributes: true
    });

    var hintText = $('<span/>').attr('id', inputID + '-hint').text(altText).addClass('govuk-hint');
    inputElement.attr('aria-describedby', inputID + '-hint');
    inputElement.before(hintText);

}

function styleAllInputs() {
    // Iterácia cez všetky inputy, ktorých id začína na 'input_'
    $("input[id^='input_']").each(function() {
        // Získanie hodnoty id atribútu
        var inputID = $(this).attr('id');

        // Zavolanie funkcie styleInputs pre každý input
        styleInputs(inputID);
    });
}