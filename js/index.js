
// const links = document.querySelector('a')
// links.addEventListener('click', sound_player('click_sound'))

function sound_player(audio_name, start_or_stop = "start", loop_or_noloops = "noloop", volume = 0.5) {
    
    let sound;
    sound = document.querySelector(`.${audio_name}`);
    if (sound.duration < 5) {
        if (sound.currentTime != 0) {
            sound.currentTime = 0;
        }
    }

    if (start_or_stop == "start") {
        sound.play()
        sound.play().catch(function (error) { console.log("Browser cannot play sound without user interaction first") });
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

setTimeout(sound_player("homepage", "start", "loop"), 1000)

