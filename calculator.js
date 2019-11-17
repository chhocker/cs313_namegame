
function getType(type) {
    if (type == "stamped_letters")
        return 1;
    else if (type == "metered_letter")
        return 2;
    else if (type == "large_envelope")
        return 3;
    else
        return 4;
}

function getStampedLetterPrice(weight) {
    if (weight <= 1)
        return 0.55;
    else if (weight <= 2)
        return 0.70;
    else if (weight <= 3)
        return 0.85;
    else
        return 1.00;
}

function getMeteredLetterPrice(weight) {
    if (weight <= 1)
        return 0.50;
    else if (weight <= 2)
        return 0.65;
    else if (weight <= 3)
        return 0.80;
    else
        return 0.95;
}

function getLargeEnvelopeType(weight) {
    if (weight <= 1)
        return 1.00;
    else if (weight <= 2)
        return 1.15;
    else if (weight <= 3)
        return 1.30;
    else if (weight <= 4)
        return 1.45;
    else if (weight <= 5)
        return 1.60;
    else if (weight <= 6)
        return 1.75;
    else if (weight <= 7)
        return 1.90;
    else if (weight <= 8)
        return 2.05;
    else if (weight <= 9)
        return 2.20;
    else if (weight <= 10)
        return 2.35;
    else if (weight <= 11)
        return 2.50;
    else if (weight <= 12)
        return 2.65;
    else
        return 2.80;
}


function getPackagePrice(weight) {
    if (weight <= 4)
        return 3.66;
    else if (weight <= 8)
        return 4.39;
    else if (weight <= 12)
        return 5.19;
    else
        return 5.71;
}

function getRate() {
    var parcelType = req.query.parcel_type;
    var weight = req.query.weight;

    var baseType = getType(parcelType);
    var price = 0;
    switch (baseType) {
        case 1:
            price = getStampedLetterPrice(weight);
            break;
        case 2:
            price = getMeteredLetterPrice(weight);
            break;
        case 3:
            price = getLargeEnvelopeType(weight);
            break;
        default:
            price = getPackagePrice(weight);
    }

   // var exports = { weight: weight, parcelType: parcelType, price: price };
    //res.render('show_rate', exports);

}

module.exports = { getRate: getRate };