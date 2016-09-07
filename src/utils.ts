export const findById = function (list, id) {
    let idToMatch = parseInt(id);
    return list.find(function (item) {
        return item.id === idToMatch;
    });
};