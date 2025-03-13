const userForm = document.querySelector("#form");
const userInput = document.querySelector("#input");
const userBox = document.querySelector("#wrapper");

async function renderUser() {
    const inputValue = userInput.value.toLowerCase().trim();
    if (!inputValue) {
        userBox.innerHTML = "<p>Iltimos, ism kiriting!</p>";
        return;
    }

    const dinamicUrl = `https://api.nationalize.io/?name=${inputValue}`;
    
    try {
        const response = await fetch(dinamicUrl);
        const data = await response.json();

        if (!data.country.length) {
            userBox.innerHTML = "<p>Hech qanday ma'lumot topilmadi.</p>";
            return;
        }

        userBox.innerHTML = "";
        data.country.forEach(obyektlar => {
            const flagEmoji = getFlagEmoji(obyektlar.country_id);
            userBox.innerHTML += `
                <p class="text-black pl-[20px]">Davlat: ${flagEmoji} ${obyektlar.country_id}</p>
                <p class="text-black pl-[20px]">Ehtimollik: ${(obyektlar.probability * 100).toFixed(2)}%</p>
            `;
        });

    } catch (error) {
        console.error(error);
        userBox.innerHTML = "<p>Xatolik yuz berdi. Qaytadan urinib ko'ring.</p>";
    }

    userInput.value = "";
}

function getFlagEmoji(countryCode) {
    return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
}

userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    renderUser();
});
