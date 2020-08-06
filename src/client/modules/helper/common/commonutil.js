function objectSpread(target) {
    let thisInstance = this;
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(
                Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                })
            );
        }
        ownKeys.forEach(function (key) {
            defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function normalizeFiles(files) {
    return files.map((file) =>
        objectSpread({}, file, {
            ext: file.name.split(".").pop(),
        })
    );
}

function defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function getQueryVariable(params, variable) {
    var query = params;
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }

}

export { normalizeFiles, objectSpread, getQueryVariable }