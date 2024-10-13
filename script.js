function toggleMenu(){
    const menu = document.querySelector(".menu-links")
    const icon = document.querySelector(".hamburger-icon")
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

// PRICE PAGE

const labelArray = [...document.querySelectorAll(".input_label")].filter(value => {
    return value.control != null
})
console.log(labelArray)

const input_name = document.querySelector("#input_name")
const input_phone = document.querySelector("#input_phone")
const input_pages = document.querySelector("#input_pages")
const input_deadline = document.querySelector("#input_deadline")

const inputArray = [input_name, input_phone, input_pages, input_deadline]

const radio_yes = document.querySelector("#yes")
const radio_no = document.querySelector("#no")
const radio_static = document.querySelector("#static")
const radio_dynamic = document.querySelector("#dynamic")


const emptyMessage = [...document.querySelectorAll(".empty")]
const emptyMessage1 = [...document.querySelectorAll(".empty-radio")]

const button_calc = document.querySelector(".calc")
const button_reset = document.querySelector(".reset")
let button_send = ""

const invalid_number = document.querySelector(".invalid_number");
const invalid_pages = document.querySelector(".invalid_page")
const invalid_date = document.querySelector(".invalid_date")

const audioCoin = new Audio("audio/coin.mp3")

function checkFill(){
    let valid = true
    inputArray.forEach((input, i) => {
        // console.log(input)
        if (!input.checkValidity()){
            emptyMessage[i].classList.remove("empty")
            // labelArray[i].classList.add("red_color")
            // console.log(input)
            input.classList.add("red_border")
            valid = false
        }
    })
    console.log(radio_yes.checkValidity())
    if (!radio_yes.checkValidity()){
        emptyMessage1.at(0).classList.remove("empty-radio")
        valid = false
    }
    if (!radio_static.checkValidity()){
        emptyMessage1.at(1).classList.remove("empty-radio")
        valid = false
    }
    return valid
}

const restoreClasses = function (){
    emptyMessage.forEach(x => x.classList.add("empty"))
    emptyMessage1.forEach(x => x.classList.add("empty-radio"))
    inputArray.forEach((input) =>  input.classList.remove("red_border"))
    invalid_number.classList.add("invalid_number")
    invalid_pages.classList.add("invalid_page")
    invalid_date.classList.add("invalid_date")
    document.querySelector(".left").innerHTML = ""
    document.querySelector(".left").insertAdjacentHTML("afterbegin", `<img src="images/time.png" alt="" width="80%">`)
    // labelArray.forEach(x => x.classList.remove("required_label"))
    // inputFlexArray.forEach(x=> x.classList.remove("required_box"))
    // requiredArray.at(-1).classList.add("hidden")
}


const correct_number = function (){
    if (input_phone.value.length < 10){
        invalid_number.classList.remove("invalid_number")
        return false
    }else{
       return true
    }
}


const correct_pages = function (){
    if (Number(input_pages.value) > 5 || Number(input_pages.value) < 1){
        invalid_pages.classList.remove("invalid_page")
        return false
    }
    return true
}

const correct_date = function (){
    const current_date = new Date();
    const deadline = new Date(input_deadline.value)
    if (Math.floor((deadline - current_date) / 1000 / 60 / 60 / 24) < 1){
        invalid_date.classList.remove("invalid_date")
        return false
    }
    return true
}

const count_price = function (){
    const base_price = 500;
    const pages = Number(input_pages.value) * 50
    const payment = 300 * ((radio_yes.checked ? radio_yes.value : radio_no.value) === "y" ? 1 : 0)
    const type = 200 * ((radio_static.checked ? radio_static.value : radio_dynamic.value) === "d" ? 1 : 0)
    const diff_time = new Date(input_deadline.value) - new Date()

    const days = Math.floor(diff_time / 1000 / 60 / 60 / 24)
    console.log(days)
    let price = base_price + pages + payment + type
    if (days < 3){
        return price * 1.6
    }else if(days < 5){
        return price * 1.3
    }else if(days < 20){
        return price * 1.2
    }else {
        return price * 6
    }
}

let success = "";

button_calc.addEventListener("click", function (e){
    e.preventDefault()
    restoreClasses()
    if(checkFill()){
        if(correct_number() &&
            correct_pages() &&
            correct_date()){
            const html = `
                <h2 class="left-title">Результат</h2>
                <p class="left-description">
                    Ми створимо ${input_pages.value}-сторінковий
                    ${((radio_static.checked ? radio_static.value : radio_dynamic.value) === "d" ? "динамічний" : "статичний")}
                    вебсайт ${((radio_yes.checked ? radio_yes.value : radio_no.value) === "y" ? "з" : "без")} інтеграції платежів.
                       Дякуємо, що вказали крайній термін — ${input_deadline.value} для доставки.

                </p>
                <div class="price-block">
                    <div class="discount-price">
                        <p class="discount-text">Ціна зі знижкою:</p>
                        <p class="discount-result">₴${count_price() * 0.8}.00</p>
                    </div>
                    <div class="full-price">
                        <p class="full-text">Повна ціна:</p>
                        <p class="full-result">₴${count_price()}.00</p>
                    </div>
                </div>
                <button type="button" class="results">Надіслати Результати</button>
                <p class="success none">Запит був успіщно надісланий</p>
            `


            document.querySelector(".left").innerHTML = ""
            document.querySelector(".left").insertAdjacentHTML("afterbegin", html)

            document.querySelector(".results").addEventListener("click", function (e){
                e.preventDefault()
                document.querySelector(".success").classList.remove("none")
            })
            audioCoin.play();
        }
    }


})



button_reset.addEventListener("click", function (e){
    e.preventDefault()
    restoreClasses()
    input_name.value = ""
    input_phone.value = ""
    input_pages.value = ""
    input_deadline.value = ""
    radio_yes.checked = false
    radio_no.checked = false
    radio_static.checked = false
    radio_dynamic.checked = false
})













