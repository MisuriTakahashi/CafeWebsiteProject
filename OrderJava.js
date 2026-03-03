const ordersContainer = document.getElementById("orders-container");
    const addOrderBtn = document.getElementById("add-order-btn");
    const totalSpan = document.getElementById("total");

    // Save a template of the first order in case the user deletes all of them
    const orderTemplate = ordersContainer.querySelector(".order").cloneNode(true);
    
    function calculateTotal() {
      let totalPrice = 0;
      ordersContainer.querySelectorAll(".order").forEach(order => {
        const sizePrice = parseInt(order.querySelector(".size").value) || 0;
        let addOnsPrice = 0;
        order.querySelectorAll(".addon").forEach(cb => {
          if (cb.checked) addOnsPrice += parseInt(cb.value);
        });
        totalPrice += sizePrice + addOnsPrice;
      });
      totalSpan.textContent = totalPrice;
    }

    function addRemoveListener(order) {
      order.querySelector(".remove-btn").addEventListener("click", e => {
        e.target.closest(".order").remove();
        calculateTotal();
      });
    }

    addRemoveListener(ordersContainer.querySelector(".order"));

    addOrderBtn.addEventListener("click", () => {
      const newOrder = orderTemplate.cloneNode(true);

      newOrder.querySelectorAll("select").forEach(s => s.selectedIndex = 0);
      newOrder.querySelectorAll("input[type=checkbox]").forEach(c => c.checked = false);

      addRemoveListener(newOrder);

      ordersContainer.appendChild(newOrder);

      calculateTotal();
    });

    ordersContainer.addEventListener("change", calculateTotal);
    
    calculateTotal();

    // Confirmation Popup
    const orderPopup = document.getElementById("orderpopup-modal");
    const placeOrderBtn = document.getElementById("place-order-btn");
    const closeBtns = document.querySelectorAll(".close-btn");
    const confirmPopupBtn = document.getElementById("confirm-orderpopup-btn");
    const popupDetails = document.getElementById("orderpopup-details");
    const thankPopup = document.getElementById("thankpopup");
    const confirmThankPopupBtn = document.getElementById("confirm-thankpopup-btn");

    placeOrderBtn.addEventListener("click", () => {
      const name = document.getElementById("customer-name").value;
      const contact = document.getElementById("customer-contact").value;
      const time = document.getElementById("order-time").value;

      if (!name || !contact || !time) {
        alert("Please fill in all customer information.");
        return;
      }

      const formattedTime = (() => {
        let [h, m] = time.split(':');
        let hrs = parseInt(h);
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        const hrs12 = hrs % 12 || 12;
        return `${hrs12}:${m} ${ampm}`;
      })();

      let orderSummary = `<h3>Summary for ${name}</h3>`;
      orderSummary += `<p><strong>Contact:</strong> ${contact}</p>`;
      orderSummary += `<p><strong>Pickup Time:</strong> ${formattedTime}</p>`;
      orderSummary += `<hr>`;

      let total = 0;
      let hasOrder = false;

      ordersContainer.querySelectorAll(".order").forEach((order, index) => {
        const drink = order.querySelector(".drinks").value;
        const sugar = order.querySelector(".sugar").value;
        const sizeSelect = order.querySelector(".size");
        const sizeText = sizeSelect.options[sizeSelect.selectedIndex].text;
        const sizePrice = parseInt(sizeSelect.value) || 0;

        if (drink !== "Choose your drinks" && sizePrice > 0) {
          hasOrder = true;
          let itemTotal = sizePrice;
          let addons = [];
          order.querySelectorAll(".addon").forEach(cb => {
            if (cb.checked) {
              addons.push(cb.parentElement.textContent.trim());
              itemTotal += parseInt(cb.value);
            }
          });

          orderSummary += `<p><strong>Order ${index + 1}:</strong> ${drink} (${sizeText}), Sugar: ${sugar}</p>`;
          if (addons.length > 0) {
            orderSummary += `<p style="font-size: 0.9em; color: #666; margin-left: 15px;">Add-ons: ${addons.join(", ")}</p>`;
          }
          orderSummary += `<p style="text-align: right; font-weight: bold;">Subtotal: ₱${itemTotal}</p>`;
          total += itemTotal;
        }
      });

      if (!hasOrder) {
        alert("Please select at least one drink with a size.");
        return;
      }

      orderSummary += `<hr><p style="font-size: 1.2em; text-align: center; color: #1e5c38;"><strong>Total Price: ₱${total}</strong></p>`;

      popupDetails.innerHTML = orderSummary;
      orderPopup.style.display = "block";
    });

    closeBtns.forEach(btn => {
      btn.onclick = () => {
        orderPopup.style.display = "none";
        thankPopup.style.display = "none";
      };
    });

    confirmPopupBtn.onclick = () => {
      thankPopup.style.display = "block";
      orderPopup.style.display = "none";
    };

    confirmThankPopupBtn.onclick = () => {
      thankPopup.style.display = "none";
      window.location.href = "index.html"; 
    };

    window.onclick = (event) => {
      if (event.target == orderPopup) {
        orderPopup.style.display = "none";
      }
      if (event.target == thankPopup) {
        thankPopup.style.display = "none";
      }
    };