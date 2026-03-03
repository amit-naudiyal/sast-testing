$(document).ready(function() {

    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    function escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, function (s) {
            return entityMap[s];
        });
    }

    $('input#OrganisationBusinessNumber').blur(function () {
        var inpfld = $(this);
        var businessNumber = inpfld.val().trim();
        var outtxt = $('div.orgbusinessNumberResult')
        var countryCode = $('#PrimaryAddressCountry').val();

        outtxt.empty();
        outtxt.removeClass('error');
        outtxt.removeClass('success');


       var url = 'ValidateBusinessNumber/'
            + escapeHtml(countryCode)
            + '/'
            + escapeHtml(businessNumber);

        $.ajax({
            type: "GET",
            url: url,
            success: function (msg) {
                if (msg) {
                    var data = JSON.parse(msg)
                    var dataTxt = data['orgbusinessNumberResult'];

                    outtxt.removeClass('error');
                    outtxt.removeClass('success');
                    outtxt.text(dataTxt);

                    if (data['error'])
                        outtxt.addClass('error');
                    else if (dataTxt)
                        outtxt.addClass('success');
                }
            },
            error: function (req, status, error) {
                outtxt.text(error);
                outtxt.addClass('error');
            }
        });        

    });
})