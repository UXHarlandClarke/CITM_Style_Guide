var om57068a1e3ff50, om57068a1e3ff50_poll = function() {
    var r = 0;
    return function(n, l) {
        clearInterval(r), r = setInterval(n, l)
    }
}();
! function(e, t, n) {
    if (e.getElementById(n)) {
        om57068a1e3ff50_poll(function() {
            if (window['om_loaded']) {
                if (!om57068a1e3ff50) {
                    om57068a1e3ff50 = new OptinMonsterApp();
                    return om57068a1e3ff50.init({
                        "s": "17558.57068a1e3ff50",
                        "staging": 0,
                        "dev": 0,
                        "beta": 0
                    });
                }
            }
        }, 25);
        return;
    }
    var d = false,
        o = e.createElement(t);
    o.id = n, o.src = "//a.optnmnstr.com/app/js/api.min.js", o.async = true, o.onload = o.onreadystatechange = function() {
        if (!d) {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                try {
                    d = om_loaded = true;
                    om57068a1e3ff50 = new OptinMonsterApp();
                    om57068a1e3ff50.init({
                        "s": "17558.57068a1e3ff50",
                        "staging": 0,
                        "dev": 0,
                        "beta": 0
                    });
                    o.onload = o.onreadystatechange = null;
                } catch (t) {}
            }
        }
    };
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(o)
}(document, "script", "omapi-script");