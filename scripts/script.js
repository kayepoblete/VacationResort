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
    let occupancyCount = adults + children;
    let maxOccupancy;
    let price;
    let discount;
    let resultOrigRoomCost = getRoomRate(checkin, selectedRoom.value);

    function getRoomRate(checkindate, roomtype) {
        if (checkindate.getMonth() == 5 || checkindate.getMonth() == 6 || checkindate.getMonth() == 7) {
            if (selectedRoom.value == "Queen") {
                price = 250;
                maxOccupancy = 5;
            }
            else if (selectedRoom.value == "King") {
                price = 250;
                maxOccupancy = 2;
            }
            if (selectedRoom.value == "2bed") {
                price = 350;
                maxOccupancy = 6;
            }
        } 
        else {
            if (selectedRoom.value == "Queen") {
                price = 150;
                maxOccupancy = 5;
            }
            else if (selectedRoom.value == "King") {
                price = 150;
                maxOccupancy = 2;
            }
            if (selectedRoom.value == "2bed") {
                price = 210;
                maxOccupancy = 6;
            }
        }
        return price;
    }

    if (occupancyCount > maxOccupancy) {
        const messageDiv = document.getElementById("messageDiv");
        messageDiv.innerHTML = "The room you selected will not hold your party.";
    }
    else {
        if (selectedDiscount.value == "None") {
            discount = 0;
        }
        if (selectedDiscount.value == "AA") {
            discount = 0.1;
        }
        if (selectedDiscount.value == "Military") {
            discount = 0.2;
        }
    
        let costWithDays = resultOrigRoomCost * days;
        let discountCost = costWithDays * discount;
        let totalAfterDiscount = costWithDays - discountCost;
        // Display no text when occupancy met
        messageDiv.innerHTML = "";

        // Display original room cost
        document.getElementById("displayOrigRoomCost").innerHTML = `Room cost: $${costWithDays.toFixed(2)}`;
        // Display discounted amount
        document.getElementById("displayDiscount").innerHTML = `Discount amount: -$${discountCost.toFixed(2)}`;
        // Display new discount cost
        document.getElementById("displayDiscountCost").innerHTML = `Discount room cost: $${totalAfterDiscount.toFixed(2)}`;
        
        let taxAmount = totalAfterDiscount * 0.12;
        let totalIncludingTaxes = totalAfterDiscount + taxAmount;
        // Display tax amount
        document.getElementById("displayTax").innerHTML = `Tax: $${taxAmount.toFixed(2)}`;
        // Display total cost after tax
        document.getElementById("displayTotalWithTax").innerHTML = `Total cost incl. tax: $${totalIncludingTaxes.toFixed(2)}`;
    
        // Confirmation number
        let confirmName = name.substring(0,3).toUpperCase();
        let confirmMonth = checkin.getMonth();
        let confirmYear = checkin.getFullYear();
        document.getElementById("confirmNumber").innerHTML = `Confirmation #: ${confirmName}-${confirmMonth+1}${confirmYear}-${days}:${adults}:${children}`;
    }
    output;
});