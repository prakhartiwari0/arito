window.onbeforeunload = function (e) {
  e = e || window.event;

  // For IE and Firefox prior to version 4
  if (e) {
    e.returnValue = 'Sure?';
  }

  // For Safari
  return 'Sure?';
};
// TEST FORM NODES REFERENCES
const main_form_div = document.querySelector('.test_form');
const form_submit_btn = document.querySelector('#submit_test_form');
form_submit_btn.addEventListener('click', (e) => {
  getValues();
});

// STARTING TEST NODES REFERENCES
const test_page = document.querySelector('.test_page');
const start_test_div = document.querySelector('.start_test_div');
const start_now_btn = document.querySelector('.start_now_btn');

// TEST PAGE NODES REFERENCES
const test_title = document.querySelector('.test_title');
const q_number = document.querySelector('.q_number');
const total_qs = document.querySelector('.total_qs');
const prev_btn = document.querySelector('.prev_question_btn');
const next_btn = document.querySelector('.next_question_btn');
const upNumber = document.querySelector('.upNumber');
const sign = document.querySelector('.sign');
const downNumber = document.querySelector('.downNumber');
const retestButton = document.querySelector('.retest_button');
const newTestButton = document.querySelector('.new_test_button');

// RESULTS PAGE NODES REFERENCES
const result_page = document.querySelector('.result_page');
const user_name = document.querySelector('.user_name');
const marks_obtained = document.querySelector('.marks_obtained');
const total_marks = document.querySelector('.total_marks');
const time_taken = document.querySelector('.time_taken');
const percent_obtained = document.querySelector('.percent_obtained');

//VOLUME CONTROL REFERENCES
const zero_volume_img = document.querySelector('[title="Zero Volume"]');
const volume_slidebar = document.getElementById('volume_slidebar');
const full_volume_img = document.querySelector('[title="Full Volume"]');
const all_audio = document.getElementsByTagName('audio');
volume_slidebar.addEventListener('input', volume_updater);
zero_volume_img.addEventListener('click', zero_volume);
full_volume_img.addEventListener('click', full_volume);
// const answer_from_user = document.querySelector('.answer_from_user').value
// const quotient_from_user = document.querySelector('.quotient_from_user').value
// const remainder_from_user =  document.querySelector('.remainder_from_user').value

const question_done_btn = document.querySelector('.question_done_btn')

// the default volume is set to 0
sound_player('background_music', 'start', 'loop', 0)
question_done_btn.addEventListener('click', getAnswer)

prev_btn.addEventListener('click', prevQuestion);
next_btn.addEventListener('click', nextQuestion);

// ENGINE OF THE TEST
// 1. Decide up and down numbers
// 2. Decide the sign
// 3. Done button clicked => Take the answers and evaluate and add marks to a variable
// 4. Do check for negative marking to deduct on every wrong answer
// 5. Keep the number of question in check
// 6. Keep changing the time countdown above

let questions_array = [];
let user_answers_array = [];
let real_answers_array = [];
let right_or_wrong_array = [];
let marks = 0;
let current_q_no = 1;

function get_min_max_numbers(diff_lvl) {
  let maximum_num;
  let mininum_num;
  if (diff_lvl === 'very_easy') {
    mininum_num = 1;
    maximum_num = 10;
  } else if (diff_lvl === 'easy') {
    mininum_num = 11;
    maximum_num = 50;
  } else if (diff_lvl === 'medium') {
    mininum_num = 51;
    maximum_num = 100;
  } else if (diff_lvl === 'hard') {
    mininum_num = 101;
    maximum_num = 1000;
  } else if (diff_lvl === 'very_hard') {
    mininum_num = 1001;
    maximum_num = 10000;
  }
  return [mininum_num, maximum_num];
}

function generateNumbers_and_sign(diff_lvl, sign) {
  let arithmetic_sign;

  min_max = get_min_max_numbers(diff_lvl);
  min = min_max[0];
  max = min_max[1];
  upper_Number = Math.floor(Math.random() * (max - min + 1) + min);
  down_Number = Math.floor(Math.random() * (upper_Number - min + 1) + min);

  if (sign === 'addition') {
    arithmetic_sign = '+';
  } else if (sign === 'subtraction') {
    arithmetic_sign = '-';
  } else if (sign === 'multiplication') {
    arithmetic_sign = 'x';
  } else if (sign === 'division') {
    arithmetic_sign = '/';
  }

  // AVOIDING REPEATING PREVIOUS QUESTION's NUMBERS
  for (const num in questions_array) {
    if (
      upper_Number == questions_array[num][0] &&
      down_Number == questions_array[num][1]
    ) {
      generateNumbers_and_sign(diff_lvl, sign);
    }
  }

  return [upper_Number, down_Number, arithmetic_sign];
}

function getAnswer() {
  sound_player('click_sound');

  let ans_of_user;
  if (q_type == 'division') {
    const quotient_from_user = document.querySelector(
      '.quotient_from_user'
    ).value;
    const remainder_from_user = document.querySelector(
      '.remainder_from_user'
    ).value;
    ans_of_user = [parseInt(quotient_from_user), parseInt(remainder_from_user)];
    if (isNaN(ans_of_user[0]) || isNaN(ans_of_user[1])) {
      return;
    }
    if (ans_of_user[0] > 9999800001 || ans_of_user[1] > 9999800001) {
      return;
    }
  } else {
    ans_of_user = parseInt(document.querySelector('.answer_from_user').value);
    if (isNaN(ans_of_user)) {
      return;
    }
    if (ans_of_user > 9999800001) {
      return;
    }
  }

  if (user_answers_array[current_q_no - 1])
    user_answers_array[current_q_no - 1] = ans_of_user;
  else user_answers_array.push(ans_of_user);

  current_q_no = current_q_no + 1;

  if (current_q_no == amount_of_questions + 1) {
    sound_player('final_question', 'start');
    end_time = Date.now();

    return resultGenerator();
  }

  questionBoxGenerator();
}

function examiner(up_number, down_number, sign_of_question, answer_of_student) {
  let real_answer;
  let real_quotient;
  let real_remainder;
  up_number = parseInt(up_number);
  down_number = parseInt(down_number);

  if (sign_of_question != '/') {
    if (sign_of_question === '+') {
      real_answer = up_number + down_number;
    } else if (sign_of_question === '-') {
      real_answer = up_number - down_number;
    } else if (sign_of_question === 'x') {
      real_answer = up_number * down_number;
    }

    if (real_answer === answer_of_student) {
      marks = marks + 1;
      right_or_wrong_array.push('right');
    } else {
      if (negative_marking) {
        marks = marks - 1;
      }
      right_or_wrong_array.push('wrong');
    }
  } else if (sign_of_question == '/') {
    real_quotient = parseInt(up_number / down_number);
    real_remainder = parseInt(up_number % down_number);
    real_answer = [real_quotient, real_remainder];
    if (
      real_answer[0] == answer_of_student[0] &&
      real_answer[1] == answer_of_student[1]
    ) {
      marks = marks + 1;
      right_or_wrong_array.push('right');
    } else {
      if (negative_marking) {
        marks = marks - 1;
      }
      right_or_wrong_array.push('wrong');
    }
  }

  real_answers_array.push(real_answer);
}

function resultGenerator() {
  total_time = end_time - start_time;
  time_taken_seconds = parseInt(total_time / 1000);
  time_taken_minutes = 00;
  time_taken_hours = 00;

  if (time_taken_seconds > 59) {
    time_taken_minutes = parseInt(time_taken_seconds / 60);
    time_taken_seconds = parseInt(time_taken_seconds - time_taken_minutes * 60);
  }
  if (time_taken_minutes > 59) {
    time_taken_hours = parseInt(time_taken_minutes / 60);
    time_taken_minutes = parseInt(time_taken_minutes - time_taken_hours * 60);
  }

  let total_time_taken_hrs_text_;
  let total_time_taken_mins_text_;
  let total_time_taken_secs_text_;
  if (time_taken_hours == 0) {
    total_time_taken_hrs_text_ = '';
  } else {
    total_time_taken_hrs_text_ = `${time_taken_hours} hrs `;
  }

  if (time_taken_minutes == 0) {
    total_time_taken_mins_text_ = '';
  } else {
    total_time_taken_mins_text_ = `${time_taken_minutes} mins `;
  }

  total_time_taken_secs_text_ = ` ${time_taken_seconds} secs`;
  total_time_taken_text =
    total_time_taken_hrs_text_ +
    total_time_taken_mins_text_ +
    total_time_taken_secs_text_;
  // console.log(time_taken_hours, time_taken_minutes, time_taken_seconds)

  //Generate result array with user_answers_array
  questions_array.forEach(([up_num, down_num], index) => {
    examiner(up_num, down_num, sign.textContent, user_answers_array[index]);
  });

  sound_player('test_page_bg_music', 'stop');

  // To change the background of volume bar, it was showing the background image of body, which was looking weird at the bottom.
  document.body.style.backgroundImage = 'none';
  document.body.style.backgroundColor = 'var(--green)';

  test_page.style.display = 'none';
  total_marks.textContent = `${amount_of_questions}`;
  marks_obtained.textContent = `${marks}`;
  time_taken.textContent = `${total_time_taken_text}`;
  user_name.textContent = `${student_name}`;
  percent_obtained.textContent = `${(
    (marks / amount_of_questions) *
    100
  ).toFixed(2)}`;

  const all_questions_div = document.querySelector('.all_questions_div');

  let n = 1;
  while (n != amount_of_questions + 1) {
    let q_num = n;
    let upnum = questions_array[n - 1][0];
    let downum = questions_array[n - 1][1];
    let s_of_q = sign.textContent;
    let user_answer_ = user_answers_array[n - 1];
    let real_answer_ = real_answers_array[n - 1];
    let right_or_wrong_;
    if (right_or_wrong_array[n - 1] == 'right') {
      right_or_wrong_ = 'is_correct';
      right_or_wrong_question_box = 'rightly_answered';
    } else if (right_or_wrong_array[n - 1] == 'wrong') {
      right_or_wrong_ = 'is_wrong';
      right_or_wrong_question_box = 'wrongly_answered';
    }

    let question_template_element =
      document.querySelector('.question_template');
    let each_question_template =
      question_template_element.content.cloneNode(true);

    each_question_template
      .querySelector('.question-serialno')
      .classList.add(right_or_wrong_question_box);
    each_question_template.querySelector('.q_num').innerText = q_num;
    each_question_template.querySelector('.upNumber').innerText = upnum;
    each_question_template.querySelector('.sign').innerText = s_of_q;
    each_question_template.querySelector('.downNum').innerText = downum;
    each_question_template
      .querySelector('.user_answer')
      .classList.add(right_or_wrong_);
    each_question_template.querySelector('.user_answer').innerText =
      user_answer_;
    each_question_template.querySelector('.real_answer').innerText =
      real_answer_;

    all_questions_div.appendChild(each_question_template);
    n = n + 1;
  }

  result_page.style.display = 'flex';
}

function questionBoxGenerator() {
  const quotientBox = document.querySelector('.quotient_from_user');
  const remainderBox = document.querySelector('.remainder_from_user');
  const answerBox = document.querySelector('.answer_from_user');

  const ans_of_user = user_answers_array[current_q_no - 1];

  if (q_type == 'division') {
    quotientBox.value = ans_of_user?.[0] ?? '';
    remainderBox.value = ans_of_user?.[1] ?? '';
  } else {
    answerBox.value = ans_of_user ?? '';
  }

  let up_num, down_num;

  if (questions_array[current_q_no - 1]) {
    let q_stuff = questions_array[current_q_no - 1];
    up_num = q_stuff[0];
    down_num = q_stuff[1];
  } else {
    let q_stuff = generateNumbers_and_sign(diff_lvl, q_type);
    up_num = q_stuff[0];
    down_num = q_stuff[1];
    sign.textContent = `${q_stuff[2]}`;
    questions_array.push([up_num, down_num]);
  }

  upNumber.textContent = `${up_num}`;
  downNumber.textContent = `${down_num}`;
  q_number.textContent = `${current_q_no}`;

  // This part will focus the first input element in the page. It works both in (Add, Sub, Mul)[which has only one input element]
  // and with Division which has two input elements.
  const answer_input = document.querySelector('input');
  answer_input.focus();

  if (current_q_no == amount_of_questions) {
    question_done_btn.classList.add('finish');
    question_done_btn.textContent = "Let's Finish It!!";
  } else {
    question_done_btn.classList.remove('finish');
    question_done_btn.textContent = 'Done!';
  }
}

function sound_player(
  audio_name,
  start_or_stop = 'start',
  loop_or_noloops = 'noloop',
  volume = volume_slidebar.value * 0.1
) {
  let sound;

  sound = document.querySelector(`.${audio_name}`);
  if (sound.duration < 5) {
    if (sound.currentTime != 0) {
      sound.currentTime = 0;
    }
  }
  // else{
  // }

  if (start_or_stop == 'start') {
    sound.play();
    sound.play().catch(function (error) {
      console.log('Browser cannot play sound without user interaction first');
    });
  } else if (start_or_stop == 'stop') {
    sound.pause();
  }
  if (loop_or_noloops == 'loop') {
    sound.loop = true;
  } else if (loop_or_noloops == 'noloop') {
    sound.loop = false;
  }

  sound.volume = volume;
}

function zero_volume() {
  volume_slidebar.value = 0;
  for (let i = 0; i < all_audio.length; i++) {
    all_audio[i].volume = 0;
  }
}

function full_volume() {
  volume_slidebar.value = 10;
  for (let i = 0; i < all_audio.length; i++) {
    all_audio[i].volume = 1;
  }
}

function volume_updater() {
  let volume = volume_slidebar.value * 0.1;
  for (let i = 0; i < all_audio.length; i++) {
    all_audio[i].volume = volume;
  }
}

function createTestpage() {
  start_time = Date.now();
  sound_player('click_sound', 'start');
  sound_player('background_music', 'stop');
  sound_player('test_page_bg_music', 'start', 'loop');
  start_test_div.style.display = 'none';
  test_page.style.display = 'flex';

  if (q_type == 'division') {
    document.querySelector('.input_answer_div').remove();
    document.querySelector('.division_answer_div').style.display = 'flex';
  }

  test_title.textContent = `${q_type.toUpperCase()}`;
  // if (isNaN(amount_of_questions)) {
  //     amount_of_questions = 10;
  // }
  total_qs.textContent = `${amount_of_questions}`;

  // This code will select all the input elements, and add the event listener to each of them,
  // All the input elements are called because if we add event listener to only one input element,
  // then in the division questions's input elements, only the quotient input will be having this
  // Event, and Remainder Input wouldn't have that, which is not a good thing.
  var answer_all_inputs = [].slice.call(document.querySelectorAll('input'));

  answer_all_inputs.forEach(function (element, index) {
    element.addEventListener('keypress', function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        question_done_btn.click();
      }
    });
  });
  questionBoxGenerator();
}

function createStartornotpage() {
  main_form_div.remove();
  start_test_div.style.display = 'flex';
  start_now_btn.addEventListener('click', createTestpage);
}

// document.querySelector('#difficulty').addEventListener('change', change_max_attr_val())

function change_max_attr_val() {
  diff_level = document.querySelector('#difficulty').value;
  maximum_questions = range_calculator(get_min_max_numbers(diff_level)[1]);
  if (maximum_questions > 55) {
    no_of_ques_label = document.querySelector(
      '#no_of_ques_label'
    ).textContent = `No. of Questions`;
  } else {
    no_of_ques_label = document.querySelector(
      '#no_of_ques_label'
    ).textContent = `No. of Questions (below ${maximum_questions + 1})`;
  }
  document.querySelector('#no_of_ques').setAttribute('max', maximum_questions);
}

function getValues() {
  student_name = document.querySelector('#student_name').value;
  q_type = document.querySelector('#questions_type').value;
  diff_lvl = document.querySelector('#difficulty').value;
  amount_of_questions = parseInt(document.querySelector('#no_of_ques').value);
  negative_marking = document.querySelector('#negmarking').checked;

  max_questions = parseInt(
    document.querySelector('#no_of_ques').getAttribute('max')
  );
  if (
    student_name.length < 1 ||
    isNaN(amount_of_questions) ||
    amount_of_questions > max_questions
  ) {
    return;
  }

  sound_player('click_sound', 'start');
  createStartornotpage();
}

function range_calculator(num) {
  let number = num;
  if (number % 2 == 0) {
    return number * (number / 2) + number / 2;
  } else {
    return number + ((number - 1) * ((number - 1) / 2) + (number - 1) / 2);
  }
}

function prevQuestion() {
  if (current_q_no <= 1) return;

  current_q_no--;
  sound_player('click_sound');

  questionBoxGenerator();
}

function nextQuestion() {
  if (current_q_no === amount_of_questions || !questions_array[current_q_no])
    return;

  current_q_no++;
  sound_player('click_sound');

  questionBoxGenerator();
}

function retakeTest() {
  result_page.style.display = 'none';
  questions_array = [];
  user_answers_array = [];
  real_answers_array = [];
  right_or_wrong_array = [];
  marks = 0;
  current_q_no = 1;

  const answer_divs = document.querySelectorAll('.q_no_div');

  for (const elem of answer_divs) {
    elem.remove();
  }

  document.body.style.backgroundImage = 'url(../assets/images/grid.jpg)';
  document.body.style.backgroundColor = '';
  createStartornotpage();
}

function newTest() {
  window.location.reload();
}

retestButton.addEventListener('click', retakeTest);
newTestButton.addEventListener('click', newTest);
