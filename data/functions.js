const slugify = str => {
    //console.log(str);
    return str
        .replace(/ /g, '-')
        .replace(/ò/g, 'o')
        .replace(/à/g, 'a')
        .replace(/ù/g, 'u')
        .replace(/ì/g, 'i')
        .replace(/è/g, 'e')
        .replace(/é/g, 'e')
        .toLowerCase();
};

const sortLocationsByName = locations => {
    return locations.sort((loc1, loc2) => {
        const nameA = loc1.name.toUpperCase();
        const nameB = loc2.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
};

const functions = {
    slugify,
    sortLocationsByName
};

module.exports = functions;