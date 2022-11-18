const body = document.body

// TEST FORM NODES REFERENCES
const main_form_div = document.querySelector('.test_form')
const form_submit_btn = document.querySelector('#submit_test_form')
form_submit_btn.addEventListener('click', getValues)


// STARTING TEST NODES REFERENCES
const test_page = document.querySelector('.test_page')
const start_test_div = document.querySelector('.start_test_div')
const start_now_btn = document.querySelector('.start_now_btn')





// TEST PAGE NODES REFERENCES
const test_title = document.querySelector('.test_title')
const q_number = document.querySelector('.q_number')
const total_qs = document.querySelector('.total_qs')
const upNumber = document.querySelector('.upNumber')
const sign = document.querySelector('.sign')
const downNumber = document.querySelector('.downNumber')


// RESULTS PAGE NODES REFERENCES
const result_page = document.querySelector('.result_page')
const user_name = document.querySelector('.user_name')
const marks_obtained = document.querySelector('.marks_obtained')
const total_marks = document.querySelector('.total_marks')
const percent_obtained = document.querySelector('.percent_obtained')

// const answer_from_user = document.querySelector('.answer_from_user').value
// const quotient_from_user = document.querySelector('.quotient_from_user').value
// const remainder_from_user =  document.querySelector('.remainder_from_user').value

sound_player("background_music", "start", "loop", 0.5)


const question_done_btn = document.querySelector('.question_done_btn')
question_done_btn.addEventListener('click', getAnswer)


// ENGINE OF THE TEST
// 1. Decide up and down numbers
// 2. Decide the sign
// 3. Done button clicked => Take the answers and evaluate and add marks to a variable
// 4. Do check for negative marking to deduct on every wrong answer
// 5. Keep the number of question in check
// 6. Keep changing the time countdown above



let questions_array = []
let user_answers_array = []
let real_answers_array = []
let right_or_wrong_array = []
let marks = 0;
let current_q_no = 1;

function generateNumbers_and_sign(diff_lvl, sign) {
    let max;
    let min;
    let arithmetic_sign;
    if (diff_lvl ==="very_easy") {
        min = 1
        max = 10
    }
    else if (diff_lvl ==="easy") {
        min = 11
        max = 50
    }
    else if (diff_lvl ==="medium") {
        min = 50
        max = 100
    }
    else if (diff_lvl ==="hard") {
        min = 100
        max = 1000
    }
    else if (diff_lvl ==="very_hard") {
        min = 1000
        max = 10000
    }
    upper_Number = Math.floor(Math.random() * (max - min) + min)
    down_Number = Math.floor(Math.random() * (upper_Number - min) + min)

    if (sign ==="addition") {
        arithmetic_sign = "+"
    }

    else if (sign ==="subtraction") {
        arithmetic_sign = "-"
    }

    else if (sign ==="multiplication") {
        arithmetic_sign = "x"
    }

    else if (sign ==="division") {
        arithmetic_sign = "/"
    }

    // AVOIDING REPEATING PREVIOUS QUESTION's NUMBERS
    for (const num in questions_array) {
        if (upper_Number == num[0] && down_Number == num[1]) {
            generateNumbers_and_sign(diff_lvl, sign)        
        }
    }

    return [upper_Number, down_Number, arithmetic_sign]
    
}

function getAnswer(){
    sound_player("click_sound")

    let ans_of_user;
    if (q_type == 'division') {
        const quotient_from_user = document.querySelector('.quotient_from_user').value
        const remainder_from_user = document.querySelector('.remainder_from_user').value
        ans_of_user = [parseInt(quotient_from_user), parseInt(remainder_from_user)]
        if (isNaN(ans_of_user[0]) || isNaN(ans_of_user[1])) {
            return;            
        }
        if (ans_of_user[0] > 9999800001 || ans_of_user[1] > 9999800001) {
            return;

        }
    }
    else{
        ans_of_user = parseInt(document.querySelector('.answer_from_user').value)
        if (isNaN(ans_of_user)) {
            return;
        }
        if (ans_of_user > 9999800001) {
            return;
        }
    }
    let sign_of_question = sign.textContent;
    user_answers_array.push(ans_of_user);
    up_num = parseInt(upNumber.textContent)
    down_num = parseInt(downNumber.textContent)
    examiner(up_num, down_num, sign_of_question, ans_of_user)
}

function examiner(up_number, down_number, sign_of_question , answer_of_student){
    let real_answer;
    let real_quotient;
    let real_remainder;
    up_number = parseInt(up_number)
    down_number = parseInt(down_number)

    if (sign_of_question!="/") {

        if (sign_of_question === "+") {
            real_answer = up_number + down_number
        }
        else if (sign_of_question === "-") {
            real_answer = up_number - down_number
        }
        else if (sign_of_question === "x") {
            real_answer = up_number * down_number
        }

        if (real_answer === answer_of_student) {
            marks = marks + 1
            right_or_wrong_array.push('right')
        }
        else {
            right_or_wrong_array.push('wrong')
        }
        
    }
    else if (sign_of_question =="/") {
        real_quotient = parseInt(up_number / down_number)
        real_remainder = parseInt(up_number % down_number)
        real_answer = [real_quotient, real_remainder]
        if (real_answer[0] == answer_of_student[0] && real_answer[1] == answer_of_student[1]) {
            marks = marks + 1
            right_or_wrong_array.push('right')
        }
        else {
            right_or_wrong_array.push('wrong')
        }
    }

    real_answers_array.push(real_answer)
    current_q_no = current_q_no+1

    if (current_q_no == amount_of_questions + 1) {
        sound_player("final_question", "start")
        resultGenerator()
    }
    else if (current_q_no == amount_of_questions){
        question_done_btn.style.backgroundColor = 'yellow'
        question_done_btn.textContent = "Let's Finish It!!"
    }
    
    questionBoxGenerator()
}

function resultGenerator(){
    sound_player("results_page_background_music", "stop")
    test_page.style.display = 'none';
    total_marks.textContent = `${amount_of_questions}`
    marks_obtained.textContent = `${marks}`
    user_name.textContent = `${student_name}`
    percent_obtained.textContent = `${((marks / amount_of_questions)*100).toFixed(2)}`
    
    const all_questions_div = document.querySelector('.all_questions_div')

    n = 1
    while (n!=amount_of_questions+1) {
        let q_num = n
        let upnum = questions_array[n-1][0]
        let downum = questions_array[n-1][1]
        let s_of_q = sign.textContent
        let user_answer_ = user_answers_array[n-1]
        let real_answer_ = real_answers_array[n-1]
        let right_or_wrong_; 
        if (right_or_wrong_array[n-1]=="right") {
            right_or_wrong_ = "is_correct"
        }
        else if (right_or_wrong_array[n - 1] == "wrong") {
            right_or_wrong_ = "is_wrong"  
        }

        let question_code = `\n
        <div class="question-serialno">
            <span class="question_number_span">Question <span class="q_num">${q_num}</span></span>

            <div class="q_numbers_div">
                <div class="upNum_div">
                    <span class="upNumber">${upnum}</span>
                </div>
                <div class="downNum_and_sign_div">
                    <span class="sign">${s_of_q}</span>
                    <span class="downNum">${downum}</span>
                </div>
            </div>
            <div class="answers_div">
                <div class="user_answer_div">
                    <span class="user_answer ${right_or_wrong_}">${user_answer_}</span>
                </div>
                <div class="real_answer_div">
                    <span class="real_answer">${real_answer_}</span>
                </div>
            </div>
        </div>
        `
        all_questions_div.innerHTML = all_questions_div.innerHTML + question_code
        n = n+1
    }

    result_page.style.display = 'flex'


}



function questionBoxGenerator(){
    if (q_type == 'division') {
        document.querySelector('.quotient_from_user').value = "";
        document.querySelector('.remainder_from_user').value = "";
    }
    else{
        document.querySelector('.answer_from_user').value = "";
    }
    let q_stuff = generateNumbers_and_sign(diff_lvl ,q_type) 
    let up_num = q_stuff[0] 
    let down_num = q_stuff[1] 
    let num_sign = q_stuff[2] 
    upNumber.textContent = `${up_num}`
    downNumber.textContent = `${down_num}`
    sign.textContent = `${num_sign}`
    q_number.textContent = `${current_q_no}`
    questions_array.push([up_num, down_num])
}

function sound_player(audio_name, start_or_stop="start", loop_or_noloops="noloop", volume=0.5){
    let sound;
    
    sound = document.querySelector(`.${audio_name}`);
    if (sound.duration<5){
        if (sound.currentTime != 0) {
            sound.currentTime = 0;
        }
    }
    // else{
    // }
    
    if (start_or_stop == "start") {
        sound.play()
        sound.play().catch(function (error) {console.log("Browser cannot play sound without user interaction first")});
    }
    else if (start_or_stop == "stop") {
        sound.pause()

    }
    if (loop_or_noloops == "loop") {
        sound.loop = true
    }
    else if (loop_or_noloops == "noloop") {
        sound.loop = false
    }

    sound.volume = volume;
    
}


function createTestpage(){
    sound_player("background_music", "stop")
    sound_player("results_page_background_music", "start", "loop")
    start_test_div.remove();
    test_page.style.display = 'flex';

    if (q_type == "division") {
        document.querySelector('.input_answer_div').remove()
        document.querySelector('.division_answer_div').style.display = 'flex'
    }

    test_title.textContent = `${q_type.toUpperCase()}`
    // if (isNaN(amount_of_questions)) {
    //     amount_of_questions = 10;
    // }
    total_qs.textContent = `${amount_of_questions}`
    questionBoxGenerator()
}


function createStartornotpage(){
    main_form_div.remove()
    start_test_div.style.display = 'flex'
    start_now_btn.addEventListener('click', createTestpage)
}


function getValues() {
    student_name = document.querySelector('#student_name').value;
    q_type = document.querySelector('#questions_type').value;
    diff_lvl = document.querySelector('#difficulty').value;
    amount_of_questions = parseInt(document.querySelector('#no_of_ques').value);
    negative_marking = document.querySelector('#negmarking').checked;

    if (student_name.length < 1 || isNaN(amount_of_questions)){
        return;
    }

    sound_player("click_sound", "start")
    createStartornotpage()
}
