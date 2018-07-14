const slugify = str => {
    console.log(str);
    return str
        .replace(/ /g,'-')
        .replace(/ò/g,'o')
        .replace(/à/g,'a')
        .replace(/ù/g,'u')
        .replace(/ì/g,'i')
        .replace(/è/g,'e')
        .replace(/é/g,'e')
        .toLowerCase();
};

const functions = {
    slugify
};

module.exports = functions;