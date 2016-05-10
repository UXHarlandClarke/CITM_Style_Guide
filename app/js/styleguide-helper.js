(function() {
    $("a[href='#']").click(function(e) {
        e.preventDefault();
    });

    var $button = $("<div id='source-button' class='btn btn-primary btn-xs'>&lt; &gt;</div>").click(function() {
        var html = $(this).parent().html();
        html = cleanSource(html);
        $("#source-modal pre").text(html);
        $("#source-modal").modal();
    });

    $('.citm-component [data-toggle="popover"]').popover();
    $('.citm-component [data-toggle="tooltip"]').tooltip();

    $(".citm-component").hover(function() {
        $(this).append($button);
        $button.show();
    }, function() {
        $button.hide();
    });

    function cleanSource(html) {
        html = html.replace(/×/g, "&times;")
            .replace(/«/g, "&laquo;")
            .replace(/»/g, "&raquo;")
            .replace(/←/g, "&larr;")
            .replace(/→/g, "&rarr;");

        var lines = html.split(/\n/);

        lines.shift();
        lines.splice(-1, 1);

        var indentSize = lines[0].length - lines[0].trim().length,
            re = new RegExp(" {" + indentSize + "}");

        lines = lines.map(function(line) {
            if (line.match(re)) {
                line = line.substring(indentSize);
            }

            return line;
        });

        lines = lines.join("\n");

        return lines;
    }

    // Scrollspy.js
    $('body').scrollspy({ target: '#citm-utk-nav' })
    
    // Affix.js
    $('#citm-utk-nav').affix({
        offset: {
            top: 300,
            bottom: function () {
                return (this.bottom = $('.footer').outerHeight(true))
            }
        }
    })
    
    $("#toggle-sidenav").click(function() {
        var txt = $("#sidenav").is(':visible') ? 'Show' : 'Hide';
        $("#toggle-sidenav").text(txt);
    });
    
})();
