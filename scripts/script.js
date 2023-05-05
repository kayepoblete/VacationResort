"use strict";

let costForm = document.getElementById("costForm");

costForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Selecting all the elements
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let days = Number(document.getElementById("days").value);
    let adults = Number(document.getElementById("adults").value);
    let children = Number(document.getElementById("children").value);
    let checkin = new Date(document.getElementById("checkin").value);
    let selectedRoom = document.querySelector("input[name='roomtype']:checked");
    let selectedDiscount = document.querySelector("input[name='discount']:checked");
    let price;
    let discount;
    let inSeason = false;
    let resultOrigRoomCost = getRoomRate(checkin, selectedRoom.value);

    function getRoomRate(checkindate, roomtype) {
        if (checkindate.getMonth() == 5 || checkindate.getMonth() == 6 || checkindate.getMonth() == 7) {
            inSeason = true;
            if (selectedRoom.value == "Queen") {
            price = 250;
            }
            else if (selectedRoom.value == "King") {
                price = 250;
            }
            if (selectedRoom.value == "2bed") {
                price = 350;
            }
        } 
        else {
            inSeason = false;
            if (selectedRoom.value == "Queen") {
                price = 150;
            }
            else if (selectedRoom.value == "King") {
                price = 150;
            }
            if (selectedRoom.value == "2bed") {
            price = 210;
            }
        }
        return price;
    }

    if (selectedDiscount.value == "None") {
        discount = 0;
    }
    if (selectedDiscount.value == "AA") {
        discount = 0.1;
    }
    if (selectedDiscount.value == "Military") {
        discount = 0.2;
    }

    let costWithDays = price * days;
    let discountCost = costWithDays * discount;
    let totalAfterDiscount = costWithDays - discountCost;
    // Display original room cost
    document.getElementById("displayOrigRoomCost").innerHTML = `Room cost: $${costWithDays.toFixed(2)}`;
    // Display discounted amount
    document.getElementById("displayDiscount").innerHTML = `Discount amount: -$${discountCost.toFixed(2)}`;
    // Display new discount cost
    document.getElementById("displayDiscountCost").innerHTML = `Discount room cost: $${totalAfterDiscount.toFixed(2)}`;
    
    let taxAmount = totalAfterDiscount * 0.12;
    let totalIncludingTaxes = totalAfterDiscount - taxAmount;
    // Display tax amount
    document.getElementById("displayTax").innerHTML = `Tax: $${taxAmount.toFixed(2)}`;
    // Display total cost after tax
    document.getElementById("displayTotalWithTax").innerHTML = `Total cost incl. tax: $${totalIncludingTaxes.toFixed(2)}`;

    output;
});